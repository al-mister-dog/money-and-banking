const express = require("express");
const router = express.Router();
const {requireLogin} = require("../middleware/auth")
const { setGame, getGame } = require("../controllers/game");

router.post("/set-game", requireLogin, setGame);
router.get("/get-game", requireLogin, getGame);
module.exports = router;
