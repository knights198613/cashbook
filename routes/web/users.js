var express = require("express");
const md5 = require("md5");
const userModel = require("../../db/userModel");
const shortId = require("shortid");

//创建路由
var router = express.Router();

//用户登录页
router.get("/login", (req, res, next) => {
  res.render("user/login", { title: "记账本-用户登录页" });
});

//用户登录处理
router.post("/login", function (req, res, next) {
  let { username, password } = req.body;
  if (!username || !password) {
    res.render("result", {
      title: "记账本-登录失败",
      msg: "用户名或密码不能为空~",
      redirectUrl: "/users/login",
    });
    return;
  }
  userModel.findOne({ username, password: md5(password) }).then(
    (data) => {
      if (data) {
        req.session.username = username;
        req.session.uid = data.id;
        res.redirect("/account/list");
        return;
      } else {
        res.render("result", {
          title: "记账本-登录失败",
          msg: "用户名或密码错误~",
          redirectUrl: "/users/login",
        });
        return;
      }
    },
    (err) => {
      res.render("result", {
        title: "记账本-登录失败",
        msg: "系统错误，请稍后重试~",
        redirectUrl: "/users/login",
      });
      return;
    }
  );
});

//用户退出登录
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

//用户注册页面
router.get("/reg", (req, res, next) => {
  res.render("user/reg", { title: "记账本用户注册页" });
});

//用户注册处理
router.post("/reg", (req, res, next) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.render("result", {
      title: "记账本-注册失败",
      msg: "用户名或密码不能为空~",
      redirectUrl: "/users/reg",
    });
    return;
  }
  userModel.findOne({ username }, "username ").then((data) => {
    if (data && data.username === username) {
      res.render("result", {
        title: "记账本-注册失败",
        msg: "该用户名已存在~",
        redirectUrl: "/users/login",
      });
      return;
    }
  });

  let id = shortId();
  userModel.create({ id, username, password: md5(password) }).then(
    (data) => {
      res.render("result", {
        title: "记账本-注册成功",
        msg: "恭喜您注册成功，请登录~",
        redirectUrl: "/users/login",
      });
    },
    (err) => {
      console.log(err);
      res.render("result", {
        title: "记账本-注册失败",
        msg: "注册失败，请检查您的信息是否已存在~",
        redirectUrl: "/users/reg",
      });
    }
  );
});

module.exports = router;
