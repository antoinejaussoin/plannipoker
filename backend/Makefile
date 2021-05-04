VERSION := $(shell cat ../VERSION)
TARGET_ARCHS=linux/arm64,linux/amd64

publish:
	docker push antoinejaussoin/plannipoker-backend:${VERSION}
	docker push antoinejaussoin/plannipoker-backend:latest
	
build:
	docker build \
	-t antoinejaussoin/plannipoker-backend:${VERSION} \
	-t antoinejaussoin/plannipoker-backend:latest \
	.

buildx:
	docker buildx build --pull --platform ${TARGET_ARCHS} \
	-t antoinejaussoin/plannipoker-backend:${VERSION}-beta \
	--push .

run: build
	docker run -p 3030:3030 antoinejaussoin/plannipoker-backend:latest 
