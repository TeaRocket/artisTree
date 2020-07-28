const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");
const socket = require("../socket");

router.post("/:id", (req, res) => {
  const { message } = req.body;
  return Message.create({
    from: req.user._id,
    to: req.params.id,
    text: message,
  }).then((message) => {
    User.findById(message.to).then((user) => {
      if (socket.io && user.socket) {
        socket.io.to(user.socket).emit("message", { message });
      }
    });
    res.status(200).json({ message });
  });
});

const oneMessagePerChat = (arr) => {
  const allMessages = [...arr].reverse();
  const arrOfUniqueMessages = [];

  for (let msg of allMessages) {
    const msgIsUnique = arrOfUniqueMessages.every(
      (uniqueM) =>
        (uniqueM.to.username !== msg.to.username ||
          uniqueM.from.username !== msg.from.username) &&
        (uniqueM.from.username !== msg.to.username ||
          uniqueM.to.username !== msg.from.username)
    );
    if (msgIsUnique) {
      arrOfUniqueMessages.push(msg);
    }
  }
  return arrOfUniqueMessages;
};

router.get("/", (req, res) => {
  Message.find({
    $or: [{ from: req.user._id }, { to: req.user._id }],
  })
    .populate("from")
    .populate("to")
    .then((messages) => {
      res.json(oneMessagePerChat(messages));
    });
});

router.get("/:id", (req, res) => {
  Message.find({
    $or: [
      { $and: [{ from: req.params.id }, { to: req.user._id }] },
      { $and: [{ from: req.user._id }, { to: req.params.id }] },
    ],
  })
    .populate("from")
    .populate("to")
    .then((messages) => {
      res.json(messages);
    });
});

module.exports = router;
