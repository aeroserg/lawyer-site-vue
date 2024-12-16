# Use Node.js as base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm ci --legacy-peer-deps 

# Copy the entire backend project
COPY . .

# Expose the application port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
