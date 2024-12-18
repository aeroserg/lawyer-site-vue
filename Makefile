# Имя пользователя Docker Hub
DOCKER_USER = aeroserg

# Имена образов
BACKEND_IMAGE = $(DOCKER_USER)/backend:latest
FRONTEND_IMAGE = $(DOCKER_USER)/frontend:latest

# Имя виртуальной машины (можно заменить на IP-адрес или hostname)
VM_HOST = root@194.58.114.45 

# Путь к файлу Docker Compose на удалённой машине
REMOTE_COMPOSE_PATH = ./docker-compose.yaml

.PHONY: all backend frontend push-backend push-frontend deploy

all: push-backend push-frontend deploy


# Сборка backend образа
backend:
	docker build -t $(BACKEND_IMAGE) ./backend --platform linux/amd64

# Сборка frontend образа
frontend:
	docker build -t $(FRONTEND_IMAGE) ./frontend --platform linux/amd64

# Загрузка backend образа в Docker Hub
push-backend: backend
	docker push $(BACKEND_IMAGE)

# Загрузка frontend образа в Docker Hub
push-frontend: frontend
	docker push $(FRONTEND_IMAGE)

# Деплой на виртуальную машину
deploy:
	# Копируем docker-compose.yaml на удалённую машину
	scp $(REMOTE_COMPOSE_PATH) $(VM_HOST):/root/lawyer-site-vue
	# Пуллим изменения и образы на удалённой машине
	ssh $(VM_HOST) "cd ~/lawyer-site-vue && git pull"
	ssh $(VM_HOST) "cd ~/lawyer-site-vue && docker compose pull && docker compose up --build -d && docker system prune -a"

