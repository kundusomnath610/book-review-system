Book Review Project:-
--------------------
Project Overview:-
------------------

This is a Book Review API built with Node.js, Express, and MongoDB. It allows users to:

Sign up and log in securely using JWT-based authentication.

Add new books to the database.

Retrieve lists of books with pagination and filtering options.

View details of a single book, including its reviews and average rating.

Search books by title or author.

Add, update, and delete reviews on books — with ownership and authentication enforced.

The project demonstrates common backend patterns such as RESTful routing, JWT authentication, password hashing, data validation, and MongoDB relationships (using Mongoose).





Project Setup Instructions:-
---------------------------
Prerequisites:
---------------
Node.js installed (version 14 or later recommended)

MongoDB instance (local or cloud-based like MongoDB Atlas)

Git (optional, for cloning the repository)

Future Progress:
-----------------

Create a frontend using React.js, HTML, and Tailwind CSS.
It can be connected to SQL databases (e.g., PostgreSQL, MySQL) to support a large user base.
Containerize the application with Docker to simplify collaboration with other developers.
Implement code coverage testing and core functionality tests.
Deploy the application on AWS or Azure.

There are many more future progress and improvement scopes.


Installation Steps in Local Machine:
--------------------
Clone the repository for run in the Local Machine:
---------------------------------------------------
Clone command
-----------------
    git clone https://github.com/kundusomnath610/book-review-system.git

Install dependencies
------------------------
    mkdir book-review-api
            ⬇️
    cd book-review-api
            ⬇️
    npm init -y (Create package.json)
    npm install

    You need install the following packages: {
    express: Web framework for Node.js
    mongoose: MongoDB ODM to interact with the database
    dotenv: For environment variables
    bcryptjs: To hash passwords
    jsonwebtoken: For JWT authentication

    }
                ⬇️
    npm install express mongoose dotenv bcryptjs jsonwebtoken

    For easier development, install nodemon to auto-restart server on code changes:
                ⬇️
    npm install --save-dev nodemon

    Or You can add a script in package.json
                ⬇️

    "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
    }



Create a .env file in the root directory and add the following environment variable:
-------------------
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string (Ex: mongodb://localhost:27017/yourDB)
    JWT_SECRET=your_jwt_secret_key

Start the server
--------------------
1. For development
---------------------
    npm run dev

2. For Production
-----------------
    npm start

The API endpoint will be running at
---------------------------------
    http://localhost:5000/api

How to Run Locally
-------------------
Ensure MongoDB is running (locally or accessible via the connection string).
Make sure your .env is properly configured with your MongoDB URI and JWT secret.
Start the server using the commands above.

Use API tools like Postman or curl to interact with endpoints, such as
------------------------------------------------------------------------

    POST /api/signup to create a new user

    POST /api/login to log in and receive a JWT token

    POST /api/books to add a book (requires authentication)

    GET /api/books to list books

    POST /api/books/:id/reviews to add a review to a book (authenticated users only)
   


