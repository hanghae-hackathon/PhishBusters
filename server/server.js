const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const apiRouter = require("./routes/api");

const compression = require("compression");

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/@api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
