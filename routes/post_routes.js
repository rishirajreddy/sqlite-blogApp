const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");
const checkTokem = require("../middlewares/check_token");

router.post("/add",checkTokem.checkToken ,postController.createPost);
router.get("/",postController.getUserPosts);
router.get("/all",postController.getAllPosts);
router.get("/:id", checkTokem.checkToken,postController.getPost);
router.put("/:id", checkTokem.checkToken,postController.updatePost);
router.delete("/:id", checkTokem.checkToken,postController.deletePost);

module.exports  = router;