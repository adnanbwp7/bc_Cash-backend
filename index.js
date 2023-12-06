import express from "express";
import cors from "cors";
import router from "./controller.js";
import connectDB from "./ConnectDB.js";
const app = express();

app.use(cors())
app.use(express.json());

// Use the routes module
app.use('/api', router);
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB('mongodb://127.0.0.1:27017/b_cash')
    app.listen(PORT, () => {
      console.log(`Server is Listening on http://localhost:${PORT}`)
    });
  } catch (error) {
    console.log(error);
  }
}
start()

