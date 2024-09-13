# Customer Management System (Work in Progress)

A comprehensive Spring Boot application for managing customer data, demonstrating key concepts like RESTful APIs, Spring Data JPA, PostgreSQL integration, and more. This project is currently under development and showcases a fully functional CRUD application, complete with database integration and preparation for deployment to the cloud.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Database Configuration](#database-configuration)
6. [Deploying to Cloud](#deploying-to-cloud)
7. [Docker Integration](#docker-integration)

## Features

- **CRUD Operations:** Create, Read, Update, Delete functionality for customer data.
- **RESTful APIs:** Exposes endpoints for managing customers.
- **Spring Data JPA:** Integrated with PostgreSQL for data persistence.
- **JDBC Support:** Alternative data access strategy using JDBC for custom queries.
- **Cloud Deployment:** Deployed on AWS Elastic Beanstalk with PostgreSQL RDS.
- **Error Handling:** Robust error handling with custom exceptions.
- **Environment Flexibility:** Easily switch between local and cloud databases.
- **Docker Support:** Optionally containerize your application for consistent deployment.
- **Security:** Basic setup with room for adding Spring Security.

> **Note:** This project is fully functional and deployed to AWS, but additional features and improvements may be added.

## Technologies Used

- **Java 17**
- **Spring Boot 3**
- **Spring Data JPA**
- **JDBC**
- **PostgreSQL**
- **Hibernate**
- **Maven**
- **Docker**
- **Flyway**
- **AWS Elastic Beanstalk**
- **RESTful APIs**

## Setup and Installation

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL (for local database)
- Docker
- AWS Account (for cloud deployment)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/customer-management-system.git
   cd customer-management-system
2. **Choose Data Access Method:**
   - **JPA:** By default, the application is configured to use JPA.
   - **JDBC:** To switch to JDBC, update the `@Repository("jdbc")` qualifier in the `CustomerDao` implementation you want to use and adjust any configurations if necessary

3. **Configure the Database:**
  Update the application.yaml file with your local or cloud PostgreSQL credentials.
  For local setup:
   ```bash
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5332/customer
       username: your_local_username
       password: your_local_password
4. **Build the Application:**
   ```bash
   mvn clean install
5. **Run the Application:**
   ```bash
   mvn spring-boot:run

## Running the Application

- **API Live:**
  - http://spring-boot-api-env.eba-zujs8n9m.ca-central-1.elasticbeanstalk.com/api/v1/customers

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
## Docker Integration

1. **Docker Configuration:**
   - The application has been containerized using Docker with the following setup:
   ```yaml
    services:
     db:
       image: postgres
       environment:
         POSTGRES_USER: kareemabdo
         POSTGRES_PASSWORD: password
       ports:
         - "5332:5432"
     app:
       image: kareemabdose/spring-boot-example:latest
       ports:
         - "8095:8095"
    ```
2. **Running Docker Locally:**
   -To run the application using Docker:
   ```
      docker-compose up
   ```
3.**Building Docker Image with Jib:**
   -The Docker image is built using Jib and pushed to Docker Hub.
   -Image Name: kareemabdose/spring-boot-example:latest
