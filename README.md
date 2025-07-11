# skygem-insurance-backend

## Getting Started

Follow these steps to set up the project for local development:

### 1. Clone the repository

```sh
git clone https://github.com/sagun-k/skygem-insurance-backend.git
cd skygem-insurance-backend
```

### 2. Install dependencies

This project uses [pnpm](https://pnpm.io/). If you don't have pnpm installed, you can install it globally:

```sh
npm install -g pnpm
```

Then install the project dependencies:

```sh
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables (example values shown, replace with your own):

```env

Create database in postgresql since we have use provider as postgresql

# Database connection string
DATABASE_URL="postgresql://user:pas# skygem-insurance-backend

## Getting Started

Follow these steps to set up the project for local development:

### 1. Clone the repository

```sh
git clone https://github.com/sagun-k/skygem-insurance-backend.git
cd skygem-insurance-backend
```

### 2. Install dependencies

This project uses [pnpm](https://pnpm.io/). If you don't have pnpm installed, you can install it globally:

```sh
npm install -g pnpm
```

Then install the project dependencies:

```sh
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables (example values shown, replace with your own):

```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/insurance_db"

# JWT secret key
JWT_SECRET="your_jwt_secret"

# Other environment variables as needed
```

### 4. Set up the database

Run the following command to apply database migrations:

```sh
pnpm prisma migrate deploy
```

To generate Prisma client:

```sh
pnpm prisma generate
```

### 5. Start the development server

```sh
pnpm dev
```

The server should now be running at `http://localhost:3000` (or the port specified in your `.env`).

---

## Additional Scripts

- `pnpm build` - Build the project
- `pnpm start` - Start the production server
- `pnpm prisma studio` - Open Prisma Studio to view and edit your database

---

## API Documentation

Swagger UI is available at `/api-docs` when the server is running.

---

## DevOps & Deployment

You can deploy this backend to AWS using services like ECS (Elastic Container Service) or Elastic Beanstalk. Below are general steps and notes for both approaches:

### Deploying with AWS ECS (Recommended for Dockerized Apps)

1. **Dockerize the Application**
   - Ensure you have a `Dockerfile` in your project root. Example:

     ```Dockerfile
     FROM node:20-alpine
     WORKDIR /app
     COPY . .
     RUN npm install -g pnpm && pnpm install --prod
     CMD ["pnpm", "start"]
     EXPOSE 3000
     ```

2. **Build and Push Docker Image**
   - Build your Docker image:
     ```sh
     docker build -t your-dockerhub-username/skygem-insurance-backend:latest .
     ```
   - Push to Docker Hub or Amazon ECR:
     ```sh
     docker push your-dockerhub-username/skygem-insurance-backend:latest
     # or use AWS ECR push instructions
     ```

3. **Set Up AWS ECS**
   - Create a new ECS cluster (Fargate or EC2 launch type).
   - Define a Task Definition using your pushed Docker image.
   - Set environment variables in the ECS Task Definition (from your `.env`).
   - Configure networking, load balancer, and security groups as needed.
   - Deploy the service.

4. **Database**
   - Use Amazon RDS for PostgreSQL and update your `DATABASE_URL` accordingly.

### Deploying with AWS Elastic Beanstalk

1. **Prepare the App**
   - Ensure your app listens on the port provided by the `PORT` environment variable (Elastic Beanstalk sets this).
   - Add a `Procfile` if needed:
     ```
     web: pnpm start
     ```

2. **Deploy**
   - Install the EB CLI and initialize your environment:
     ```sh
     pip install awsebcli
     eb init
     eb create
     eb deploy
     ```
   - Set environment variables in the Elastic Beanstalk console or via `eb setenv`.

3. **Database**
   - Use Amazon RDS for PostgreSQL and update your `DATABASE_URL` accordingly.

### General Notes

- Always set environment variables securely (never commit secrets to git).
- Use AWS Secrets Manager or SSM Parameter Store for sensitive values.
- Make sure to run database migrations on deployment (e.g., as a post-deploy command).
- Monitor your app using AWS CloudWatch or similar tools.

---

sword@localhost:5432/insurance_db"

# JWT secret key
JWT_SECRET="your_jwt_secret"

# Other environment variables as needed
```

### 4. Set up the database

Run the following command to apply database migrations:

```sh
pnpm prisma migrate deploy
```

To generate Prisma client:

```sh
pnpm prisma generate
```

### 5. Start the development server

```sh
pnpm dev
```



The server should now be running at `http://localhost:3000` (or the port specified in your `.env`).

## Init Database 
For the first time after successfully running the db would create default user with credentials
email:user@skygem.com
password:user123

You can use this credentials to log into system


---

## Additional Scripts

- `pnpm build` - Build the project
- `pnpm start` - Start the production server
- `pnpm prisma studio` - Open Prisma Studio to view and edit your database

---

## API Documentation

Swagger UI is available at `/api-docs` when the server is running.


## Deployment

We can deploy this backend using either AWS ECS (recommended for dokckerized apps) or AWS Elastic Beanstalk

Option 1: Deploying with AWS ECS(Fargate)
1.Dockerfile should be configured as it is done in this project, take that reference.

2. Build and push the docker image

Run this below commands

docker build -t skygem-insurance-backend:latest .
docker tag skygem-insurance-backend:latest <your-dockerhub-username>/skygem-insurance-backend:latest
docker push <your-dockerhub-username>/skygem-insurance-backend:latest

Or use Amazon ECR:

sh
Copy
Edit
# Authenticate
aws ecr get-login-password | docker login --username AWS --password-stdin <your-ecr-url>

# Tag & push
docker tag skygem-insurance-backend:latest <your-ecr-url>/skygem-insurance-backend:latest
docker push <your-ecr-url>/skygem-insurance-backend:latest

3. Configure AWS ECS
    a.Create an ECS Cluster (Fargate launch type recommended).
    b.Create a Task Definition with:
        Your Docker image
        Port 3000 exposed
        Environment variables from your .env
    c.Create a Service to run your task.
    d.Attach a Load Balancer if needed.
    e.Ensure the Security Group allows traffic to port 3000.

4. Use Amazon RDS for PostgreSQL
    a.Create a PostgreSQL DB in Amazon RDS.
    b.Update DATABASE_URL in your ECS environment settings.

