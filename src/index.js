// Khai báo theo cú pháp CommonJS
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const SortMiddlewares = require("./app/middlewares/SortMiddlewares");
const methodOverride = require("method-override");
const route = require("./routes/index.js");
const db = require("./config/db");

//Khai báo theo cú pháp ECMAScript Modules (ESM) -- thêm "type": "module" trong package.json
// import path from "path";
// import express from "express";
// import morgan from "morgan";
// import { engine } from "express-handlebars";

db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "./public")));

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//custom middlewares
app.use(SortMiddlewares)

//Show log về những yêu cầu từ máy khách đến server
app.use(morgan("combined"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {

        const sortType = field === sort.column ? sort.type : 'default'

        const icons = {
          default: "chevron-expand-outline",
          asc: "chevron-down-outline",
          desc: "chevron-up-outline",
        }

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        }

        const icon = icons[sortType]
        const type = types[sortType]

        return `<a href="?_sort&column=${field}&type=${type}">
            <ion-icon name="${icon}"></ion-icon>
          </a>`
      }
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./resources/views"));

//route init
route(app);

app.listen(port, () => {
  console.log(`App listening at: http://127.0.0.1:${port}`);
});
