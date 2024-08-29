# Customer Management System (Work in Progress)

A comprehensive Spring Boot application for managing customer data, demonstrating key concepts like RESTful APIs, Spring Data JPA, PostgreSQL integration, and more. This project is currently under development and showcases a fully functional CRUD application, complete with database integration and preparation for deployment to the cloud.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Database Configuration](#database-configuration)
6. [Deploying to Cloud](#deploying-to-cloud)

## Features

- **CRUD Operations:** Create, Read, Update, Delete functionality for customer data.
- **RESTful APIs:** Exposes endpoints for managing customers.
- **Spring Data JPA:** Integrated with PostgreSQL for data persistence.
- **Error Handling:** Robust error handling with custom exceptions.
- **Environment Flexibility:** Easily switch between local and cloud databases.
- **Docker Support:** Optionally containerize your application for consistent deployment.
- **Security:** Basic setup with room for adding Spring Security.

> **Note:** This project is a work in progress. Additional features, improvements, and documentation will be added as development continues.

## Technologies Used

- **Java 17**
- **Spring Boot 3**
- **Spring Data JPA**
- **PostgreSQL**
- **Hibernate**
- **Maven**
- **Docker**
- **RESTful APIs**

## Setup and Installation

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL
- Docker (optional, for containerization)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/customer-management-system.git
   cd customer-management-system
2. **Configure the Database:
  Update the application.yaml file with your local or cloud PostgreSQL credentials.
  For local setup:
   ```bash
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5332/customer
       username: your_local_username
       password: your_local_password
3. **Build the Application:
   ```bash
   mvn clean install
4. **Run the Application:
   ```bash
   mvn spring-boot:run

## Running the Application

- **Local Environment:**
  - Ensure PostgreSQL is running locally on the specified port.
  - Access the application at the default port `8095`: [http://localhost:8095](http://localhost:8095)

- **Testing APIs:**
  - Use tools like Postman or cURL to interact with the exposed endpoints.
  - Example: To get all customers:
    ```bash
    GET http://localhost:8095/api/v1/customers
    ```
## Database Configuration

- **Local Database:**
  - The `application.yaml` is configured to connect to a local PostgreSQL instance. You can modify this file to connect to a different database as needed.

- **Cloud Database:**
  - For cloud deployment, update the `application.yaml` with the cloud database credentials.
  - Example configuration for cloud:
    ```yaml
    spring:
      datasource:
        url: jdbc:postgresql://cloud-db-host:5432/customer
        username: cloud_user
        password: cloud_password
    ```
## Deploying to Cloud

1. **Update `application.yaml`:**
   - Modify the `datasource.url`, `username`, and `password` to point to your cloud database.

2. **Deploy the Application:**
   - Deploy using your preferred cloud provider (e.g., AWS, Azure, GCP).
   - Ensure the cloud environment is set up with the correct database and environment variables.

3. **Docker Option:**
   - If using Docker, build the Docker image:
     ```bash
     docker build -t customer-management-system .
     ```
   - Run the Docker container:
     ```bash
     docker-compose up
     ```
