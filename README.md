# Backend API Documentation

## Overview

This project is a backend system built using Node.js with the Express.js framework. It includes user and admin functionalities with secure authentication, product management, and event/error logging. The implementation emphasizes modularity, scalability, and security.

# Features

## Authentication & Authorization
JWT (JSON Web Token) is used for secure authentication and authorization.
Role-based access control for users and admins to ensure security and privacy.
## Product Management
Admins can perform full CRUD operations (Create, Read, Update, Delete) on products.
Multer is used for seamless image upload functionality for products.
## API Endpoints
Designed RESTful APIs for users and admins.
Users can view and interact with products.
Admins have advanced access for product management.
## API Documentation
API documentation is implemented using Swagger API for clarity and ease of integration.
## Logging & Error Handling
Winston is used for event and error logging.
Integrated a custom error handler with the logger to categorize and specify errors effectively.
## CORS Configuration
Configured CORS middleware to handle cross-origin requests, allowing secure interaction between the backend and frontend.





