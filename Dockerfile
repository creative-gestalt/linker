FROM node:lts-alpine as build-stage
# make app directory
RUN mkdir /home/node/linker
# copy package.json files for install
COPY ./package.json /home/node/linker

# install, copy, build frontend
RUN cd /home/node/linker && yarn
COPY ./ /home/node/linker
RUN cd /home/node/linker && npm run build

FROM node:lts-alpine as prod-stage
# copy dist to prod
COPY --from=build-stage /home/node/linker/dist /linker/dist
# install serve for frontend
RUN npm i -g serve
# expose ports and run servers
EXPOSE 8080
# run the server
ENTRYPOINT cp assets/links.json /linker/dist/ \
    && cp assets/background.jpg /linker/dist/assets/ \
    && serve -s /linker/dist -l 8080