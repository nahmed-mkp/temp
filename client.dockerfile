### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:16.14-alpine as builder

LABEL author="Akshay Chand <achand@mkpcap.com>"
LABEL version="1.0.0"
LABEL description="Prizm&trade; Web interface"

RUN addgroup -S prizm && adduser -S prizm-user -G prizm

WORKDIR /prizm-web

RUN chown -R prizm-user:prizm /prizm-web

RUN chmod 755 /prizm-web

COPY package.json ./

COPY package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i --legacy-peer-deps && cp -R ./node_modules ./prizm-web

USER prizm-user

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

ARG environmentName

RUN npm run build-prod

### STAGE 2: Setup ###

FROM nginx:1.18.0-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /prizm-web/src/assets/ /prizm-web/dist/client/assets/
COPY --from=builder /prizm-web/src/favicon.ico /prizm-web/dist/client/favicon.ico

COPY --from=builder /prizm-web/src/assets/ /usr/share/nginx/html/assets/
COPY --from=builder /prizm-web/src/favicon.ico /usr/share/nginx/html/favicon.ico

COPY --from=builder /prizm-web/dist/client /usr/share/nginx/html



CMD ["nginx", "-g", "daemon off;"]
