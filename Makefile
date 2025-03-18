PROJECT_NAME=alma
COMPOSE_FILE=./docker-compose.dev.yml
DOCKER_COMPOSE=docker-compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) --env-file=./.env.docker

up:
	$(DOCKER_COMPOSE) up -d $(SERVICE)

up-build:
	$(DOCKER_COMPOSE) up -d --build $(SERVICE)

down:
	$(DOCKER_COMPOSE) down -v $(SERVICE)

build:
	$(DOCKER_COMPOSE) build $(SERVICE)

start:
	$(DOCKER_COMPOSE) start $(SERVICE)

stop:
	$(DOCKER_COMPOSE) stop $(SERVICE)

logs:
	$(DOCKER_COMPOSE) logs $(SERVICE)

restart:
	$(DOCKER_COMPOSE) restart $(SERVICE)

remove:
	$(DOCKER_COMPOSE) rm -f $(SERVICE)