# eCommerce App

## Video Demo

[Click Here](https://youtu.be/gLekjGD4XjY)

## Description

This eCommerce platform enables users to upload products, write reviews, and add items to a watchlist. It's built using the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. Azure Cloud Services are utilized for uploading and storing product photos.

## Features

- **Product Upload**: Users can upload product details and photos.
- **Reviews**: Users can leave reviews for products.
- **Watchlist**: Users can add products to a watchlist for later reference.

## Prerequisites

- Node.js v20.9.0
- MongoDB (Local or Cloud instance)
- Azure account with Blob Storage set up for photo uploads

## Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/danielkoryat/ecommerce.git]
   ```

2. Install server dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Create a .env file in the server directory and populate it with your variables:

   ```
   PORT=[DESIRED_PORT]
   MONGO_URI=[YOUR_MONGODB_URI]
   JWT_SECRET=[YOUR_JWT_SECRET]
   BASE_URL=[YOUR_BASE_URL]
   AZURE_STORAGE_CONNECTION_STRING=[YOUR_AZURE_STORAGE_CONNECTION_STRING]
   CONTAINER_NAME=[YOUR_AZURE_CONTAINER_NAME]
   ```

## Running the Application

Start the backend server:

```
npm run dev
```

In a new terminal window, start the frontend client:

```
npm start
```

The application should now be accessible at localhost:[PORT].

```

## Deployment

The application can be deployed using various hosting services. Ensure that all environment variables are configured in your hosting service.

```
