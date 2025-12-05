FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install -g pm2
RUN npm install

# Copy all project files
COPY . .
RUN npx prisma generate


# Build TypeScript → dist
RUN npm run build

# Expose port (change if needed)
EXPOSE 3000

# Run production server with PM2
CMD ["npm", "start"]
