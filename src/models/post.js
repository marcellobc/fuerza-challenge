const db = require("../database/connection");
const { Schema } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = db.model("Post", schema);
