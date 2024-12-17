# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy the source code and build the project
COPY . .
RUN npm run build

# Expose the port for Vite preview
EXPOSE 4173

# Run Vite preview to serve the 'dist' folder
CMD ["npm", "run", "preview"]
