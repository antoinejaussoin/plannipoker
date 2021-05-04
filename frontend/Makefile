VERSION := $(shell cat ../VERSION)
TARGET_ARCHS=linux/arm64,linux/amd64

build: build-frontend

publish:
	docker push antoinejaussoin/plannipoker:${VERSION}
	docker push antoinejaussoin/plannipoker:latest

run: build
	docker run -p 3000:80 antoinejaussoin/plannipoker:latest 

build-frontend:
	docker build -f ./Dockerfile \
	-t antoinejaussoin/plannipoker:${VERSION} \
	-t antoinejaussoin/plannipoker:latest \
	.

buildx-frontend:
	docker buildx build --pull --platform ${TARGET_ARCHS} \
	-f ./Dockerfile \
	-t antoinejaussoin/plannipoker:${VERSION} \
	-t antoinejaussoin/plannipoker:latest \
	--push .

install:
	docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
	docker buildx create --name xbuilder --use
	docker buildx inspect --bootstrap