const { Router } = require("express");
const controller = require("./controller");
const { addMember } = require("./queries");

const router = Router();

router.get("/", controller.getMembers);
router.post("/", controller.addMember);
module.exports = router;
