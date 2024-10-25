# Customer Management System (Work in Progress) 

A comprehensive Spring Boot application for managing customer data, demonstrating key concepts like RESTful APIs, Spring Data JPA, PostgreSQL integration, and more. This project is currently under development and showcases a fully functional CRUD application, complete with database integration and preparation for deployment to the cloud.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Database Configuration](#database-configuration)
6. [Deploying to AWS Elastic Beanstalk](#Deploying-to-AWS-Elastic-Beanstalk)
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
- **CI/CD Pipeline:** Integrated with GitHub Actions for continuous integration and continuous deployment (CI/CD) to automatically build, test, and deploy the application.
- **Slack Integration:** Slack notifications set up to report build and deployment statuses.
- **React Frontend:** Built a frontend using React (Vite, Axios, and Chakra UI) to interact with the backend and display customer data.
- **Domain and SSL/TLS Support:** Configured with AWS Route 53 and AWS Certificate Manager for custom domain management and secure HTTPS connections via SSL/TLS.

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
- **GitHub Action**
- **Slack**
- **React**
- **Angular**
- **AWS Route 53**
- **AWS Certificate Manager**
- **SSL/TLS**

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
   git clone https://github.com/KareemAbdoSE/Full-Stack-Developer-Project.git
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
  - https://customer-api.kareemabdose.com

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
## Deploying to AWS Elastic Beanstalk
You can deploy this application to AWS Elastic Beanstalk using Docker. All you need to do is upload the Dockerrun.aws.json file and adjust the database configuration to point to your own database.

### Prerequisites
- AWS Account: Ensure you have an AWS account with necessary permissions.
- AWS CLI: Installed and configured with your AWS credentials.
- Docker Hub Account: For hosting your Docker image.
- PostgreSQL Database: Set up an AWS RDS instance or any accessible PostgreSQL database.

### Steps to Deploy

1. **Set Up Your PostgreSQL Database**
   - Create a PostgreSQL database instance (e.g., AWS RDS).
   - Note the database endpoint, port, database name, username, and password.

2. **Modify the Database Configuration**
   - Update your `application.yaml` or use environment variables.
   - Using `application.yaml`:
    ```yaml
    spring:
      datasource:
        url: jdbc:postgresql://your-db-endpoint:5432/your-db-name
        username: your-db-username
        password: your-db-password
    ```
   - Recommended: Use environment variables to avoid hardcoding credentials.

3. **Prepare the Dockerrun.aws.json File**
   - Ensure the `Dockerrun.aws.json` file is at the root of your project.
   
   Example `Dockerrun.aws.json`:
    ```json
    {
      "AWSEBDockerrunVersion": "1",
      "Image": {
        "Name": "your-dockerhub-username/customer-management-system:latest",
        "Update": "true"
      },
      "Ports": [
        {
          "ContainerPort": "8095"
        }
      ]
    }
    ```

   Replace `your-dockerhub-username/customer-management-system:latest` with your actual Docker image name.

4. **Build and Push Docker Image**
   - Build the Docker image:
    ```bash
    docker build -t your-dockerhub-username/customer-management-system:latest .
    ```
   - Push the image to Docker Hub:
    ```bash
    docker push your-dockerhub-username/customer-management-system:latest
    ```

5. **Create an Elastic Beanstalk Application**
   - Log in to the AWS Management Console.
   - Navigate to AWS Elastic Beanstalk.
   - Click on **Create Application**.
   - **Application Name**: Enter a name for your application.
   - **Platform**: Select Docker.
   - **Application Code**: Choose **Upload your code** and upload the `Dockerrun.aws.json` file.

6. **Configure Environment Settings**
   - **Environment Properties**: Add environment variables for sensitive data.
     Example:
    ```bash
    SPRING_DATASOURCE_URL: jdbc:postgresql://your-db-endpoint:5432/your-db-name
    SPRING_DATASOURCE_USERNAME: your-db-username
    SPRING_DATASOURCE_PASSWORD: your-db-password
    ```
   - **Load Balancer Settings**: Elastic Beanstalk uses an Application Load Balancer (ALB) by default.
   - **Port Configuration**:
     - Listener Port: 80 (HTTP)
     - Protocol: HTTP
     - Forward to: 8095 (Container Port)
     - Health Check Path: Set to `/actuator/health` or any endpoint that returns a 200 status code.
   - **Instance Type**: Choose an appropriate EC2 instance type (e.g., `t2.micro`).

7. **Security Group Configuration**
   - Ensure that the security group allows inbound traffic on port 80 (HTTP). If using HTTPS, configure SSL certificates and allow port 443.

8. **Create the Environment**
   - Review all settings.
   - Click **Create Environment**.
   - Wait for the environment to be set up and the application to be deployed.

9. **Access Your Application**
   - Once deployed, access the application via the environment URL provided by Elastic Beanstalk. 
   - Example: `http://your-environment.elasticbeanstalk.com/api/v1/customers`

## Important Notes
- **Database Connectivity**: Ensure that the database security group allows inbound traffic from the Elastic Beanstalk instances.
- **Environment Variables**: Using environment variables for sensitive information enhances security and flexibility.
- **Load Balancer Configuration**: Elastic Beanstalk sets up a load balancer for you. If you need to customize it (e.g., for SSL termination), you can modify settings in the AWS Console.
- **Scaling**: Elastic Beanstalk can automatically scale your application based on demand. Configure autoscaling policies if needed.
- **Monitoring**: Utilize AWS CloudWatch for monitoring application logs and performance metrics.

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
