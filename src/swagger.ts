import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Insurance Backend API",
      version: "1.0.0",
      description: "API documentation for Insurance backend",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  // Path to the API docs
  apis: ["./src/routes/*.ts"], // <-- path to your route files with swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
