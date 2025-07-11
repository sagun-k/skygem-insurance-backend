import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { initDatabase } from "./bootstrap/init-db.js";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();



const app = express();
app.use(cors()); 

app.use(express.json());
app.use("/api/v1", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(errorHandler);

initDatabase().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`🚀 API server running on port ${PORT}`));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
