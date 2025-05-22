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

The API Documentation using Postman
------------------------------------
    Link: https://documenter.getpostman.com/view/18655648/2sB2qai1x9

How to Run Locally
-------------------
Ensure MongoDB is running (locally or accessible via the connection string).
Make sure your .env is properly configured with your MongoDB URI and JWT secret.
Start the server using the commands above.

Use API tools like Postman to interact with endpoints, such as
------------------------------------------------------------------------

POST /api/signup to create a new user :-

![User SignUp](https://github.com/user-attachments/assets/6b6258ca-73aa-4245-9994-3ce52254701d)

POST /api/login to log in and receive a JWT token

Genarate The Token For Login :-

![Token Genatate for Login](https://github.com/user-attachments/assets/1e65d377-14d9-4f67-8462-0a5e46b807ed)

If User Name And Password are wrong then:

![invalid access](https://github.com/user-attachments/assets/015f04f4-d23e-4bd1-98e8-ba6f548184e4)

Users Credentials Store in DataBase:

![User Store in db](https://github.com/user-attachments/assets/7eb5ec14-806b-4b8c-9959-8dbde2680efa)



If User Not Login And try to Add Book Then it Occure Unauthorized User:

![Unauthorize User](https://github.com/user-attachments/assets/cdbcc8fc-c59a-415e-ad39-9fa00a57efb5)



POST /api/books to add a book (requires authentication)

After Successfully Authentication User can Add(Post) the Book: 

![Add Book](https://github.com/user-attachments/assets/1fe72658-3b9e-436b-a07f-725e4277e65d)

GET /api/books to list books

Get All Book :-

![Get all Book](https://github.com/user-attachments/assets/44ab13f9-9c28-4c81-9eb8-c31902ca2584)

All Book In MongoDB Database:-

![Get all book in Mongodb](https://github.com/user-attachments/assets/da50c841-7d3f-4171-98f7-076c73e07d43)

Get Book BY ID And Include Review and AVG_Rating:
![get book by id](https://github.com/user-attachments/assets/fb5faa52-7114-4145-b151-dff79c73b0e8)

Get Another Book With Review and Rating

![Another book review](https://github.com/user-attachments/assets/7aeacd7f-6344-4e57-8d98-649a3f1724a0)



Filter Book using Author and Genre:

![get book by Author](https://github.com/user-attachments/assets/6df8170a-5395-469f-8f4c-be2469e1a230)


POST /api/books/:id/reviews to add a review to a book (authenticated users only)

Submit a review using ID (Authenticated users only):-
![Review The Book](https://github.com/user-attachments/assets/a4dceb7d-d86c-4dbd-963e-b994f37beb0c)

one review per user per book, If you review again for same book it occure error.(Alradey review)

![Already Review by this id](https://github.com/user-attachments/assets/3aaf2f39-df55-4eb3-a1e8-6beec13e2e99)

Book Review Store In Data Base:
![Book Review Store in database](https://github.com/user-attachments/assets/1e415b9c-74b3-4128-9964-d9c79d61247f)


Update the Book Review:

![Update Book Review](https://github.com/user-attachments/assets/7ec8c5bc-182a-499c-8a5f-9a538da7c785)

Delete The Book Review:

![Delete review](https://github.com/user-attachments/assets/27bd75d6-4539-4ea1-940e-9164d165068c)

GET /api/Search

Search books by title or author (partial and case-insensitive)

![SearchBook](https://github.com/user-attachments/assets/0ea38f3b-e4ac-46ce-9f92-0ed867db54c8)

If Parameters Missing It Occure Message:

![Missing Search param](https://github.com/user-attachments/assets/49c81d19-92e4-4927-989a-8c157299df3a)

If Book Not Found In the DataBase:

![if search not exist](https://github.com/user-attachments/assets/22e63024-1fae-42c4-b32a-a8890356b683)



Book Review API – Schema Design for MongoDB.

Represents a registered user who can write reviews.

| Field     | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| id        | ObjectId | Primary key (auto-generated) |
| name      | String   | Full name of the user        |
| password  | String   | Hashed password              |
| createdAt | Date     | Account creation time        |


Represents a book that can be reviewed.

| Field     | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| id        | ObjectId | Primary key (auto-generated) |
| bookId    | ObjectId | References `Book.id`         |
| userId    | ObjectId | References `User.id`         |
| rating    | Number   | Rating (e.g., 1–5)           |
| comment   | String   | Review text                  |
| createdAt | Date     | Review time                  |





   


