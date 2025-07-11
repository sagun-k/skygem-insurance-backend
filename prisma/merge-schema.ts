import fs from "fs";
import path from "path";

const basePath = path.join(__dirname, "base.prisma");
const modelsDir = path.join(__dirname, "models");
const outputPath = path.join(__dirname, "schema.prisma");

const baseSchema = fs.readFileSync(basePath, "utf-8");

const modelFiles = fs
  .readdirSync(modelsDir)
  .filter((file) => file.endsWith(".prisma"))
  .map((file) => fs.readFileSync(path.join(modelsDir, file), "utf-8"));

const fullSchema = [baseSchema, ...modelFiles].join("\n\n");

fs.writeFileSync(outputPath, fullSchema);

console.log("✅ schema.prisma generated successfully!");
