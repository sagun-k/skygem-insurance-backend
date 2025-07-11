FROM node:20-alpine

WORKDIR /app

# Copy package manager files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install all dependencies
RUN pnpm install

# Copy rest of the app
COPY . .

# Generate Prisma client before build
RUN pnpx prisma generate

# Build TypeScript to JS
RUN pnpm run build

# Optionally prune dev dependencies
RUN pnpm prune --prod

# Expose your app port
EXPOSE 3010

# Run the app
CMD ["pnpm", "start"]
