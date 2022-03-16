const Game = require("../models/game");

exports.setGame = (req, res) => {
  const { country, tradeBloc, alliance, governmentControl } = req.body;
  const userId = req.user._id;
  const game = new Game({
    country,
    tradeBloc,
    alliance,
    governmentControl,
    userId,
  });
  game.save((err, g) => {
    if (err) {
      return res.status(400).json({ error: "there was an error" });
    }
    return res.json({ message: "ok" });
  });
};

exports.getGame = (req, res) => {
  ("getGame")
  const id = req.user._id;
  
  Game.findOne({ userId: id }, (err, g) => {
    if (err) {
      return res.status(400).json({ error: "there was an error" });
    }
    (g)
    return res.json(g);
  });
};
