# Use the official Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port
# EXPOSE 5000
EXPOSE 8080

# Start the backend server
CMD ["npm", "start"]
