FROM node:12.14.1
ADD . .
RUN npm install
RUN chmod +x start.sh
ENTRYPOINT [ "./start.sh" ]
