var createError = require("http-errors");
var express = require("express");
var path = require("path");
//导入cookie解析模块
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//导入会话控制模块
const session = require("express-session");
// 引入MongoDB存储会话数据
const MongoStore = require("connect-mongo");

const { cashBookDb } = require("./constant");

//导入路由
var indexRouter = require("./routes/web/index");
var usersRouter = require("./routes/web/users");
//导入api接口得路由
var accountsRouter = require("./routes/api/accounts");

var app = express();

app.use(
  session({
    name: "sid", //设置cookie的名字， 默认值是：connect.sid
    secret: "wjwj", //参与加密的密钥，  加��
    resave: true, //表示每次访问都重新保存session
    saveUninitialized: false, //是否每次请求都设置一个cookie用来存储session的id
    store: MongoStore.create({
      mongoUrl: cashBookDb, // MongoDB的URL
      collectionName: "sessions", // MongoDB的collection名称
      autoRemove: "interval", //是否删除过期的存储session信息， 默认native只是删除浏览器端， interval会删除服务器端和数据库存储的。
    }),
    cookie: {
      maxAge: 60 * 1000 * 15, // cookie的生命周期
      httpOnly: true, // cookie只用在http中， 前端js无法获取此cookie(document.cookie禁用)
    },
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//注册路由
app.use("/", indexRouter);
app.use("/users", usersRouter);
//注册api接口路由
app.use("/api", accountsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
