const express = require("express");
const trainerRoutes = require("./src/trainers/routes");
const memberRoutes = require("./src/members/routes");
const app = express();
const port = 3200;
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api/v1/trainers", trainerRoutes);
app.use("/api/v1/members", memberRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
