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

The API provides the following endpoints:

### Video Thumbnail List

**GET /api/videos**

Returns a list of video thumbnails.

- **URL Params**
  None

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
            "urlImageThumbnail": "https://example.com/thumbnail1.jpg"
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
        "products": [
          {
            "productId": "product1",
            "linkProduct": "https://www.example.com/product1",
            "title": "Sample Product 1",
            "price": "Rp 280.999"
          },
          // More products...
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
    


