import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/productRoutes.js";
import { fileURLToPath } from "url";
// configure env
dotenv.config();

// database
connectDB();

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.get("/", (req, res) => {
//   res.send({
//     message: "Welcome to ecommerce app",
//   });
// });

// port
const port = process.env.port;

// run listen
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
