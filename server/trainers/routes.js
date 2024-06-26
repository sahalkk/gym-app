const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getTrainers);
router.post("/", controller.addTrainer);
router.delete("/:id", controller.removeTrainer);

module.exports = router;
