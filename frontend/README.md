# rebuild app
work-directory -
## backend+frontend

```bash
    make all
```

dont forget to enter `y` when deleting unused containers!

## backend

```bash
    make push-backend && make deploy
```

## frontend

```bash
    make push-frontend && make deploy
```

### UPDATE ONLY VIA MAKE FILE, IT SAVES IMAGES LOADED TO AMDIN PANEL
