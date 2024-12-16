const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;



const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, default: "" },
    videoId: { type: String, require: true },
    level: { type: String, default: "" },
    slug: { type: String, slug: "name", unique: true }, //slug lấy value của trường name và chuyển sang dạng chữ thường không dấu.
    // unique ám chỉ tồn tại 1 dữ liệu slug duy nhất không trùng nhau
  },
  {
    _id: false,
    timestamps: true
  }
);

//Add plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement)
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model("Course", Course);
