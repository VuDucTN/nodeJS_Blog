const Course = require("../Models/Course");

class MeController {
  //[GET] me/courses/courses
  courses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type
      })
    }

    Promise.all([courseQuery.lean(), Course.countDocumentsWithDeleted({ deleted: true })])
      .then(([courses, count]) => {
        res.render("me/courses", { courses, count });
      }).catch(next);
  }

  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .lean()
      .then((course) => {
        res.render("me/trash", { course });
      })
      .catch(next);
  }
}

module.exports = new MeController(); // Xuất một instance của NewsController
