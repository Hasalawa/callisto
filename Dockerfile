# Step 1: Use the official Node.js 22 image as a parent image
FROM node:22-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port Vite runs on (usually 5173)
EXPOSE 5173

# Step 7: Run the application
# We use --host to make it accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]