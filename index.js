import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./routes/userRouter.js";

const app = express();

const PORT = process.env.PORT || 5000;

const url = process.env.MONGODB_URI || "mongodb://localhost/react-users";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const con = mongoose.connection;
con.on("open", () => {
  console.log("MongoDB connected!");
});

const corsOptions = { origin: true, credentials: true };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("uploads"));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server connected @ ${PORT}`);
});
