# Имя пользователя Docker Hub
DOCKER_USER = aeroserg

# Имена образов
BACKEND_IMAGE = $(DOCKER_USER)/backend:latest
FRONTEND_IMAGE = $(DOCKER_USER)/frontend:latest

# Имя виртуальной машины (можно заменить на IP-адрес или hostname)
VM_HOST = root@194.58.114.45

# Путь к файлу Docker Compose на удалённой машине
REMOTE_COMPOSE_PATH = ./docker-compose.yaml

# Пути для сохранения и восстановления данных
UPLOADS_VOLUME = lawyer-site-vue_strapi_uploads
UPLOADS_BACKUP = ./uploads_backup

.PHONY: all backend frontend deploy save-uploads restore-uploads clean-backup

all: backend frontend deploy

# Сборка backend образа
backend:
	cd backend && npm run build
	docker build -t $(BACKEND_IMAGE) ./backend --platform linux/amd64
	docker push $(BACKEND_IMAGE)

# Сборка frontend образа
frontend:
	docker build -t $(FRONTEND_IMAGE) ./frontend --platform linux/amd64
	docker push $(FRONTEND_IMAGE)

# Сохранить изображения из тома в локальную директорию
save-uploads:
	@echo "Сохраняем изображения из тома $(UPLOADS_VOLUME) в $(UPLOADS_BACKUP)..."
	mkdir -p $(UPLOADS_BACKUP)
	docker run --rm -v $(UPLOADS_VOLUME):/data -v $(UPLOADS_BACKUP):/backup busybox sh -c "cp -a /data/. /backup/"

# Восстановить изображения из локальной директории в том
restore-uploads:
	@echo "Восстанавливаем изображения из $(UPLOADS_BACKUP) в том $(UPLOADS_VOLUME)..."
	docker run --rm -v $(UPLOADS_BACKUP):/backup -v $(UPLOADS_VOLUME):/data busybox sh -c "cp -a /backup/. /data/"

# Удалить временную директорию с бэкапом
clean-backup:
	@echo "Удаляем локальную директорию $(UPLOADS_BACKUP)..."
	rm -rf $(UPLOADS_BACKUP)

# Полный процесс деплоя с сохранением и восстановлением изображений
deploy:
	@echo "Начинаем процесс деплоя..."
	make save-uploads
	@echo "Копируем docker-compose.yaml на удалённую машину $(VM_HOST)..."
	scp $(REMOTE_COMPOSE_PATH) $(VM_HOST):/root/lawyer-site-vue
	@echo "Выполняем обновление на удалённой машине..."
	ssh $(VM_HOST) "cd ~/lawyer-site-vue && git pull"
	ssh $(VM_HOST) "cd ~/lawyer-site-vue && docker compose pull && docker compose up --build -d && docker system prune -a"
	make restore-uploads
	make clean-backup
	@echo "Деплой завершён!"
