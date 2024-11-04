# Stage 1: Build the Next.js app
FROM oven/bun:latest AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN bun run build

# Stage 2: Serve the Next.js app
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["bun", "start"]