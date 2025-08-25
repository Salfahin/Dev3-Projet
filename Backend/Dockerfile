FROM node:20

WORKDIR /app

# Copy package manifests first
COPY package.json ../pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the code
COPY . .

# Build the TypeScript code
RUN pnpm build

# Expose API port (adjust to your API’s port)
EXPOSE 3001

# Run the built app
CMD ["node", "dist/index.js"]
