build-docker:
	docker build -t server_container .

create-container:
	docker run -u 0 -it -p 8081:8081  -v $(shell pwd):/workspace server_container bash 
