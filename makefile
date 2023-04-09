#----config
version :=1.0.3
user_docker :=tawanyummy#userId docker


name :=evoting-client:$(version)


up:
	docker-compose up -d --force-recreate
	docker tag $(name) $(user_docker)/$(name)

down:
	docker-compose down
	docker rmi $(name)
	docker rmi $(user_docker)/$(name)

test:
	docker run -d -e API_URL=https://default.dev.api.com --publish 5000:80 $(user_docker)/$(name)

#upload docker images to docker hub
push:
	docker push $(user_docker)/$(name)

#รัน make up



#in aws ec2
#docker run -d -p 5000:80 tawanyummy/evoting-client:1.0.1