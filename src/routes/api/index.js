const router = require("express").Router();
const exceptionHelper = require("../../helpers/exception");

const posts = require("./posts");

router.get("/", (req, res) => res.send({ message: "api is working properly" }));
router.use("/posts", posts);

router.use("*", (req, res) =>
  exceptionHelper.throw(
    404,
    `resource was not found. could not process [${req.method}] ${req.originalUrl}`
  )
);

module.exports = router;
