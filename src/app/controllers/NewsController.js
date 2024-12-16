class NewsController {
  //[GET] /new
  index(req, res) {
    res.render("news");
  }

  //[GET] /news/:slug
  show(req, res) {
    res.send("New show page");
  }
}

module.exports = new NewsController(); // Xuất một instance của NewsController
