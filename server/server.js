const express = require("express");
const trainerRoutes = require("./src/trainers/routes");
const app = express();
const port = 3200;
const cors = require("cors");

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/sahal", (req, res) => {
//   res.send("Hello im sahal");
// });

app.use("/api/v1/trainers", trainerRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
