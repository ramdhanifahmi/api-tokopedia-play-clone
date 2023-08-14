# Tokopedia Play Clone API

This repository contains the API for the Tokopedia Play Clone project. It provides endpoints to interact with video, product, and comment data. The API is built using Node.js, Express, and MongoDB.

## Database Structure

The database for this API uses MongoDB as the backend database. It consists of three main collections:




1. **Video Collection**:
    - `videoId` (String): Unique identifier for each video.
    - `urlImageThumbnail` (String): URL of the video thumbnail image.
    - `createdAt` (Number): Timestamp in milliseconds when the video was created.
    - `createdBy` (String): User who created the video.
    - `updatedAt` (Number): Timestamp in milliseconds when the video was last updated.
    - `updatedBy` (String): User who last updated the video.
```
{
  "videoId": "vid001",
  "urlImageThumbnail": "https://example.com/thumbnail1.jpg",
  "createdAt": 1679874856000,
  "createdBy": "user123",
  "updatedAt": 1679988531000,
  "updatedBy": "user456"
}
```

2. **Product Collection**:
    - `videoId` (String): Identifier of the video associated with the product.
    - `productId` (String): Unique identifier for each product.
    - `linkProduct` (String): URL link to the product.
    - `title` (String): Title of the product.
    - `price` (Number): Price of the product.
    - `createdAt` (Number): Timestamp in milliseconds when the product was created.
    - `createdBy` (String): User who created the product.
    - `updatedAt` (Number): Timestamp in milliseconds when the product was last updated.
    - `updatedBy` (String): User who last updated the product.
```
{
  "videoId": "vid001",
  "productId": "product1",
  "linkProduct": "https://www.example.com/product1",
  "title": "Sample Product 1",
  "price": 2000,
  "createdAt": 1679874856000,
  "createdBy": "user123",
  "updatedAt": 1679988531000,
  "updatedBy": "user456"
}
```

3. **Comment Collection**:
    - `videoId` (String): Identifier of the video associated with the comment.
    - `userName` (String): Username of the commenter.
    - `comment` (String): The comment text.
    - `createdAt` (Number): Timestamp in milliseconds when the comment was created.
    - `createdBy` (String): User who created the comment.
    - `updatedAt` (Number): Timestamp in milliseconds when the comment was last updated.
    - `updatedBy` (String): User who last updated the comment.
```
{
  "videoId": "vid001",
  "userName": "user789",
  "comment": "This is a great video!",
  "createdAt": 1679874856000,
  "createdBy": "user789",
  "updatedAt": 1679988531000,
  "updatedBy": "user789"
}
```

## API Structure

The Tokopedia Play Clone API is structured using the Node.js and Express framework, with MongoDB as the database. The project follows a modular architecture to keep the code organized and maintainable. Below is an overview of the main components and directories in the project:

### Directory Structure
```
api-tokopedia-play-clone/
|-- src/
| |-- models/
| | |-- comment.js
| | |-- product.js
| | |-- video.js
| |-- routes/
| | |-- routes.js
| |-- utils/
| | |-- utils.js
| |-- .env
| |-- dummyData.js
| |-- index.js
|-- package.json
|-- package-lock.json
|-- README.md
```

### Description of Directories and Files

1. `src/`: This directory contains the main source code of the application.

2. `src/models/`: This directory contains the MongoDB models for the different entities in the application. Each model is defined as a separate file (comment.js, product.js, video.js).

3. `src/routes/`: The routes directory holds the API endpoints for handling different HTTP requests. All of Http rquests currently in one file (routes.js)

4. `src/utils/`: The utils directory contains utility functions used across the application. In this project, we have two utility functions for formatting currency and timestamps.

5. `src/index.js`: This is the entry point of the application. It sets up the Express server, connects to the MongoDB database, and defines the routes.

6. `src/.env`: The .env file holds environment variables, such as the MongoDB connection URL and the port number, which are used to configure the application.

7. `src/dataDummy.js`: This file contains JavaScript objects that represent dummy documents for the `Video`, `Product`, and `Comment` collections. These objects serve as mock data and provide a sample dataset to work with before integrating the actual MongoDB database.

8. `package.json`: The package.json file includes the project dependencies and scripts required for running and managing the application.

9. `README.md`: The README file provides documentation for the project, including installation instructions, API usage, and project structure.

The directory structure is designed to keep the code organized and modular. The `models/` directory holds the MongoDB models for each entity in the application, and the `routes/` directory contain the API endpoints for each resource to improve maintainability. The `utils/` directory contains utility functions used throughout the application. The `index.js` file serves as the entry point of the application and is responsible for setting up the server and connecting to the database. The `package.json` file manages project dependencies, and the `.env` file holds environment-specific configuration variables.


## List API Request and Response

The API provides the following endpoints:

### Video Thumbnail List

**GET /api/videos**

Returns a list of video thumbnails.

- **URL Params Optional:**
  `videoId=[string]`

- **Data Params**
  None

- **Headers**
  Content-Type: application/json

- **Success Response**
    - **Code:** 200
    - **Content:**
      ```
      {
         "videos": [
          {
            "videoId": "vid001",
            "urlImageThumbnail": "https://example.com/thumbnail1.jpg",
            "embedYoutubeId": "youtube001",
            "productName": "Product Name 1"
          },
          // More video thumbnails...
        ]
      }
      ```

- **Error Response**
    - **Code:** 500
    - **Content:**
      ```
      {
        "error": "Internal server error"
      }
      ```

### Product List

**GET /api/products**

Returns a list of products associated with a specific video.

- **URL Params:** videoId or title is required in query parameters
  `videoId=[string]`
  `title=[string]`


- **Data Params**
  None

- **Headers**
  Content-Type: application/json

- **Success Response**
    - **Code:** 200
    - **Content:**
      ```
      {
        "products": [
          {
            "productId": "product1",
            "linkProduct": "https://www.example.com/product1",
            "title": "Sample Product 1",
            "price": "Rp 280.999"
          },
          // More products...
        ]
      }
      ```

- **No Product Found Response**
    - **Code:** 200
    - **Content:**
      ```
      []
      ```

- **Error Response**
    - **Code:** 400
    - **Content:**
      ```
      {
        "error": "videoId or title is required in query parameters"
      }
      ```

### Comment List

**GET /api/comments**

Returns a list of comments associated with a specific video.

- **URL Params**
  **Required:** `videoId=[string]`

- **Data Params**
  None

- **Headers**
  Content-Type: application/json

- **Success Response**
    - **Code:** 200
    - **Content:**
      ```
      {
        "comments": [
          {
            "userName": "user1",
            "comment": "This is a great video!",
            "timestamp": "13:50 23-07-2023"
          },
          // More comments...
        ]
      }
      ```

- **Error Response**
    - **Code:** 400
    - **Content:**
      ```
      {
        "error": "videoId is required in query parameters"
      }
      ```

### Submit Comment

**POST /api/comments**

Submits a new comment for a video.

- **URL Params**
  None

- **Data Params**
```
  {
  "videoId": "vid001",
  "userName": "john_doe",
  "comment": "Great video!"
  }
  ```


- **Headers**
  Content-Type: application/json

- **Success Response**
- **Code:** 200
- **Content:**
  ```
  {
    "success": true
  }
  ```

- **Error Response**
- **Code:** 400
- **Content:**
  ```
  {
    "error": "videoId, userName, and comment are required in the request body"
  }
  ```

OR

- **Code:** 500
- **Content:**
  ```
  {
    "error": "Internal server error"
  }
  ```

## How to Run Locally

1. Install Node.js and MongoDB on your local machine if you haven't already.

2. Clone this repository to your local machine.

3. In the src directory of the project, go to a `.env` file and set the following environment variables:
   ```
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/tokopedia_play
   ```
- Adjust the `PORT` as per your preference.


4. Install the required dependencies by running:
   ```
   npm install
   ```

5. Seed the database with the dummy data by running:
   ```
   npm run seed
   ```

6. Start the API server by running:
    ```
   npm start
   ```

7. The API should now be running locally on `http://localhost:3000`.

**Note to Grader:** 
Please ensure that you have Node.js, MongoDB, and npm installed on your local machine before following the "How to Run Locally" instructions.
The provided seed data will populate the database with dummy data for testing purposes. If you encounter any issues, please feel free to contact me for assistance.
    


