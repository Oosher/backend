

# Project Store Website - Backend

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Authentication](#authentication)
- [Security](#security)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The Project Store Website Backend is the server-side component of the e-commerce platform. It utilizes MongoDB for database storage, bcrypt for password encryption, JWT for authentication, and integrates several tools and libraries such as Express.js, Express Router, Morgan, and Joi for building and managing RESTful APIs.

## Features
- **API Endpoints:** Provides RESTful APIs for user registration, authentication, product management, and order processing.
- **Database Integration:** Connects to a MongoDB database to store user data, product information, and order details.
- **Authentication:** Implements a secure authentication system with JWT (JSON Web Tokens) for user sessions.



API Endpoints
    Here are some of the key API endpoints and their functionality:

    POST users/newuser: Register a new user.
    POST users/login: Authenticate a user and issue a JWT token.
    PUT users/: Authenticate a user and update the user.
    GET products: Retrieve a list of products.
    POST products/createnewproduct: Create a new product.
    PUT products/products:  update a product.
    PUT products/products:  update a product.
    DELETE products/:productId/:userId: delete a product if you are an admin.
    POST products/neworder: Creates a new order.
    GET products/orders/:email/:userName: gets the user orders .
    GET products/orders/statuses: gets the orders statuses.
    PUT products/orders/updateOrders: updates teh orders status. 
    
    
    ...
    Document all your API endpoints along with their request methods, URL paths, and expected responses in this section.

Database
    The backend uses MongoDB as the database system. Describe the database schema, models, and any relevant details about how data is structured and stored in MongoDB.

Authentication
    User authentication is implemented using JWT (JSON Web Tokens) for user sessions. Explain how users can register, log in, and securely manage their accounts using JWT. Mention how the JWT token is used to authenticate requests.

Security
    Detail the security measures implemented in your backend, including data validation using Joi, input sanitization, protection against common security threats, error handling, and logging with Morgan. Highlight how bcrypt is used to securely hash and store passwords.

Technologies Used
Node.js
Express.js
Express Router
MongoDB
bcrypt
JWT (JSON Web Tokens)
Morgan (for logging)
Joi (for request validation)