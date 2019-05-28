FROM node:10

#create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port of app
EXPOSE 8080 

# Run the app, according to what is defined in app's package.json
CMD [ "npm", "start" ]