# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:buster as react-build

# Add Maintainer Info
LABEL maintainer="LitmusChaos"

ARG TARGETARCH
ARG REACT_APP_KB_CHAOS_VERSION
ARG REACT_APP_BUILD_TIME
ARG REACT_APP_HUB_BRANCH_NAME

ENV ARCH=${TARGETARCH}
# Checking environment variables
RUN env

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /frontend

# Copies package.json and package-lock.json to Docker environment
COPY package.json ./
COPY package-lock.json ./

# Installs all node packages except Cypress
RUN CYPRESS_INSTALL_BINARY=0 yarn install

# Copies everything over to Docker environment
COPY . ./

# Finally runs the application
RUN yarn run build

# Stage 2: the production environment
FROM nginxinc/nginx-unprivileged:1.18-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY  --from=react-build /frontend/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

















# # Docker Image which is used as foundation to create
# # a custom Docker Image with this Dockerfile
# FROM alpine as react-build

# # Add Maintainer Info
# LABEL maintainer="LitmusChaos"

# ARG TARGETARCH
# ARG REACT_APP_KB_CHAOS_VERSION
# ARG REACT_APP_BUILD_TIME
# ARG REACT_APP_HUB_BRANCH_NAME

# # Checking environment variables
# RUN env

# # Install generally useful things
# # Install generally useful things
# RUN apk --update add \
#         sudo \
# 	htop\
#         bash\
#         make\
#         git \
#         curl\
#         iproute2\
#         stress-ng\
#         openssh-client\
# #        libc6-compat \
#         sshpass
        
# RUN rm -rf /var/lib/apt/lists/*

# # Change default shell from ash to bash
# RUN sed -i -e "s/bin\/ash/bin\/bash/" /etc/passwd     

# RUN export ARCH=$(echo ${TARGETPLATFORM} | cut -d / -f2)


# # A directory within the virtualized Docker environment
# # Becomes more relevant when using Docker Compose later
# WORKDIR /frontend

# # Copies package.json and package-lock.json to Docker environment
# COPY package.json ./
# COPY package-lock.json ./

# RUN apk add --update nodejs npm


# RUN if [[ "$TARGETARCH" == "amd64" ]] ; then \
#        wget https://nodejs.org/dist/v12.18.0/node-v12.18.0-linux-x64.tar.xz && tar -xJf node-v12.18.0-linux-x64.tar.xz &&\
# cd node-v12.18.0-linux-x64/ && ls -a && sudo cp -r * /usr/local/; \
#     else wget https://nodejs.org/dist/v12.18.0/node-v12.18.0-linux-${TARGETARCH}.tar.xz && tar -xJf node-v12.18.0-linux-${TARGETARCH}.tar.xz &&\
# cd node-v12.18.0-linux-${TARGETARCH}/ && ls -a && sudo cp -r * /usr/local/; fi

# # Installs all node packages except Cypress
# RUN ARCH=${TARGETARCH} npm install

# # Copies everything over to Docker environment
# COPY . ./


# # Finally runs the application
# RUN npm run build

# # Stage 2: the production environment
# FROM nginxinc/nginx-unprivileged:1.18-alpine
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY  --from=react-build /frontend/build /usr/share/nginx/html
# EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"]
