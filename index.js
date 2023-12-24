const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const dev = require("./config");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes middleware
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req, res) => res.send("Server Application"));

// route error handle
app.all("*", (req, res) => res.status(404).send(`${req.url} route no found`));

// server port
const port = dev.app.serverPort;

// app listen
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDb();
});
