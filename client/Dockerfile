# Build stage
# FROM node:16-alpine as build

# Set working directory
# WORKDIR /app

# Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install --legacy-peer-deps


# Copy the rest of the application code and build
# COPY . .
# RUN npm run build

# Production stage
# FROM nginx:alpine

# Copy the build output to Nginx's html directory
# COPY --from=build /app/build /usr/share/nginx/html

# Expose the frontend port
# EXPOSE 80

# Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

# Build the React app
# FROM node:18 AS build
# WORKDIR /app
# COPY . .
# RUN npm install --legacy-peer-deps
# RUN npm run build

# # Serve with Nginx
# FROM nginx:1.25-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Build the React app
FROM node:18 AS build
WORKDIR /app



COPY . .
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
# CMD envsubst '$REACT_APP_API_URL' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'


RUN npm install --legacy-peer-deps
RUN npm run build

# Serve with Nginx
FROM nginx:1.25-alpine

# Install envsubst to inject PORT
RUN apk add --no-cache gettext

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


# ENV PORT=8080
EXPOSE 8080

# Use envsubst to generate nginx config from template
CMD ["nginx", "-g", "daemon off;"]
