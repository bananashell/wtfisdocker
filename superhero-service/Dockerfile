# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Command to run the application
RUN ["chmod", "+x", "./docker-entrypoint.sh"]
CMD ./docker-entrypoint.sh