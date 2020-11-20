FROM node:lts-alpine
ENV LTOKEN "请设置LTOKEN"
ENV LTUID "请设置LTUID"
ENV TZ "Asia/Shanghai"
ENV COOKIES "[]"
RUN mkdir -p /app && apk add --no-cache git tzdata
WORKDIR /app
ADD mihoyo-signin ./mihoyo-signin
ADD autosign.js ./
ADD package.json ./
RUN chmod +x autosign.js && yarn install && cd mihoyo-signin && yarn install

#ENTRYPOINT [ "/usr/bin/env" ]
CMD [ "autosign.js" ]