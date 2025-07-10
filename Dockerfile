# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY server/package*.json ./
RUN npm install

# Copy server source code
COPY server/. ./

# Expose port (change if your app uses a different port)
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
