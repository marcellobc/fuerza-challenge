const router = require("express").Router();

const postsController = require("../../controllers/posts");

router.get("/", postsController.findAll);
router.get("/:id", postsController.find);
router.post("/", postsController.create);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.delete);

module.exports = router;
