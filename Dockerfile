# Use a base image with Node.js and npm pre-installed
FROM node:18.14.0

# Create and set the working directory in the container
WORKDIR /adoptemos-app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the Node.js application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the TypeScript code (modify the command as needed)
RUN npm run build

# Expose the port that your Node.js application will listen on
EXPOSE 8080

# Define the command to run when the container starts
CMD npm start