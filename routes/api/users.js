const express = require("express");
const ctrl = require("../../controllers/auth");

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.get("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.post("/signup", ctrl.signup);

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.put("/verify", ctrl.verify);

module.exports = router;
