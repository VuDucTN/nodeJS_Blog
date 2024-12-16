const Course = require("../Models/Course");

class SiteController {
  //[GET] /home
  index(req, res, next) {
    Course.find({})
      .lean()
      .then((courses) => {
        res.render("home", {
          courses,
        });
      })
      .catch(next);
  }

  // async index(req, res, next){
  //   try {
  //     const courses = await Course.find({});
  //     res.json(courses);
  //   } catch (error) {
  //     next(err);
  //   }
  // }

  //[GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController(); // Xuất một instance của NewsController
