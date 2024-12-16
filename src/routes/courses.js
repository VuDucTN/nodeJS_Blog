const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/CourseController");

router.get("/create", courseController.create);
router.get("/edit/:id", courseController.edit);

router.post("/handle-form-actions", courseController.handleFromAction);
router.post("/store", courseController.store);

router.put("/:id", courseController.update);
router.patch("/restore/:id", courseController.restore);

router.delete("/:id", courseController.delete);
router.delete("/force/:id", courseController.destroy);

router.get("/:slug", courseController.index);

module.exports = router;
