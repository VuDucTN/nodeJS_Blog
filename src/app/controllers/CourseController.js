const Course = require("../Models/Course");

class CourseController {
  //[GET] /courses/:slug
  index(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });

        // res.send(course);
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[POST] /corses/store
  store(req, res, next) {
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    const newCourse = new Course(req.body);
    newCourse
      .save()
      .then(() => res.redirect("/me/store/courses"))
      .catch(next);
  }

  //[GET] /courses/edit/:id
  edit(req, res, next) {
    Course.findById(req.params.id)
      .lean()
      .then((course) => res.render("courses/edit", { course }))
      .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/store/courses"))
      .catch(next);
  }

  //[DELETE] /courses/delete/:id
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[PATCH] /courses/restore/:id
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[DELETE] /courses/force/:id
  destroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[POST] /courses/handle-form-actions
  handleFromAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } }) //$in : là tìm trong danh sách mảng có id hay không
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.redirect("back");
    }
  }
}

module.exports = new CourseController(); // Xuất một instance của NewsController
