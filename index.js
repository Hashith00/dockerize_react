import fs from "fs";

export const CreateDockerFile = (port) => {
  const filePath = "Dockerfile";

  // Text to add to the file
  const textToAdd = `# Use an official Node.js image as the base image
  FROM node:21-alpine
  
  # Set the working directory in the container
  WORKDIR /app
  
  # This line is importent
  ENV PATH /app/node_modules/.bin:$PATH
  
  # Copy package.json and package-lock.json to the working directory
  COPY package*.json ./
  
  # Install dependencies
  RUN npm install
  
  # Copy the rest of the application code to the working directory
  COPY . .
  
  # Build the React app
  RUN npm run build
  
  # Expose the port the app runs on
  EXPOSE ${port}
  
  # Command to serve the built React app
  CMD ["npm", "start"]`;

  // Create or append to the file
  if (fs.existsSync(filePath)) {
    console.log("File already exists. Skipping creation.");
  } else {
    // Create the file and add text if it doesn't exist
    fs.writeFile(filePath, textToAdd, (err) => {
      if (err) {
        console.error("Error creating file:", err);
        return;
      }
      console.log("File created and text added successfully!");
    });
  }
};

export const CreateDockerFileForVite = (port) => {
  const filePath = "Dockerfile";
  const viteFilePath = "vite.config.js";

  // Text to add to the file
  const DocxkerFIleForVite = `# Use an official Node.js image as the base image
  FROM node:21-alpine
  
  # Set the working directory in the container
  WORKDIR /app
  
  # This line is importent
  ENV PATH /app/node_modules/.bin:$PATH
  
  # Copy package.json and package-lock.json to the working directory
  COPY package*.json ./
  
  # Install dependencies
  RUN npm install
  
  # Copy the rest of the application code to the working directory
  COPY . .
  
  # Build the React app
  RUN npm run build
  
  # Expose the port the app runs on
  EXPOSE ${port}
  
  # Command to serve the built React app
  CMD ["npm", "run", "dev"]`;

  const textAddtoVite = `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: ${port},
    strictPort: false,
  },
  server: {
    port: ${port},
    strictPort: false,
    host: true,
    origin: "http://0.0.0.0:${port}",
  },
});

   `;

  // Code for Vite-React applications
  if (fs.existsSync(viteFilePath)) {
    fs.truncate(viteFilePath, 0, (err) => {
      if (err) {
        console.error("Error removing content from file:", err);
      } else {
        console.log("Content removed from file successfully.");
      }
    });

    fs.writeFile(viteFilePath, textAddtoVite, (err) => {
      if (err) {
        console.error("Error creating file:", err);
        return;
      }
      console.log("File created and text added successfully!");
    });
  } else {
    console.log("This is not a vite project");
  }

  // Create or append to the file
  if (fs.existsSync(filePath)) {
    console.log("File already exists. Skipping creation.");
  } else {
    // Create the file and add text if it doesn't exist
    fs.writeFile(filePath, DocxkerFIleForVite, (err) => {
      if (err) {
        console.error("Error creating file:", err);
        return;
      }
      console.log("File created and text added successfully!");
    });
  }
};

CreateDockerFile(4000);
