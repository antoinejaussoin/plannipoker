VERSION := $(shell cat ../VERSION)
TARGET_ARCHS=linux/arm64,linux/amd64


publish:
	docker push antoinejaussoin/plannipoker-frontend:${VERSION}
	docker push antoinejaussoin/plannipoker-frontend:latest

run: build
	docker run -p 3000:80 antoinejaussoin/plannipoker-frontend:latest 

build:
	docker build -f ./Dockerfile \
	-t antoinejaussoin/plannipoker-frontend:${VERSION} \
	-t antoinejaussoin/plannipoker-frontend:latest \
	.

buildx:
	docker buildx build --pull --platform ${TARGET_ARCHS} \
	-f ./Dockerfile \
	-t antoinejaussoin/plannipoker-frontend:${VERSION} \
	-t antoinejaussoin/plannipoker-frontend:latest \
	--push .
