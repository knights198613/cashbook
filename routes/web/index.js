const shortId = require("shortid");
var express = require("express");
const mongoose = require("mongoose");
//导入格式化日期模块
const moment = require("moment");
const { accountsModel } = require("../../db/accountsModel");

//创建路由
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/users/login");
});

//记账本列表
router.get("/account/list", function (req, res, next) {
  let { uid, username } = req.session;
  // 获取accounts数组
  accountsModel
    .find({ uid: uid, username: username })
    .sort({ time: -1 })
    .then(
      (data) => {
        res.render("list", { title: "记账本-列表", accounts: data });
      },
      (err) => {
        res.render("result", {
          title: "记账本-查询记录失败",
          msg: "查询记录失败，抱歉哦~~",
          redirectUrl: "/account/create",
        });
      }
    );
});

//返回记账页面
router.get("/account/create", function (req, res, next) {
  let { uid, username } = req.session;
  res.render("create", {
    title: "记账本-添加记录",
    uid: uid,
    username: username,
  });
});

//记账提交信息处理
router.post("/account/subItem", function (req, res, next) {
  let { item, time, type, amount, remark, uid, username } = req.body;
  let id = shortId.generate();
  accountsModel
    .create({
      id,
      item,
      time,
      type,
      amount,
      remark,
      uid,
      username,
    })
    .then(
      (data) => {
        res.render("result", {
          title: "记账本提交记录成功",
          msg: "提交记录成功哦~~",
          redirectUrl: "/account/list",
        });
      },
      (err) => {
        console.log(err);
        res.render("result", {
          title: "记账本-提交记录失败",
          msg: "提交记录失败，抱歉哦~~",
          redirectUrl: "/account/create",
        });
      }
    );
});

//删除一条记账记录
router.get("/account/delete", function (req, res, next) {
  let { id } = req.query;
  accountsModel.deleteOne({ id }).then(
    (data) => {
      res.render("result", {
        title: "记账本-删除记录成功",
        msg: "删除记账记录成功哦~~",
        redirectUrl: "/account/list",
      });
    },
    (err) => {
      res.render("result", {
        title: "记账本-删除记录失败",
        msg: "删除记账记录失败哦~~",
        redirectUrl: "/account/list",
      });
    }
  );
});

//修改页面
router.get("/account/modify/:id", function (req, res, next) {
  let { id } = req.params;
  accountsModel.findOne({ id }).then(
    (data) => {
      let timeStr = moment(data.time).format("YYYY-MM-DD");
      res.render("modify", {
        title: "记账本-修改页面",
        account: {
          item: data.item,
          timeStr: timeStr,
          type: data.type,
          amount: data.amount,
          remark: data.remark,
          uid: data.uid,
          username: data.username,
          id: data.id,
        },
      });
    },
    (err) => {
      res.render("result", {
        title: "记账本-修改记录失败",
        msg: "记账修改失败哦~~",
        redirectUrl: "/account/list",
      });
    }
  );
});

//修改处理
router.post("/account/modify", function (req, res, next) {
  let { uid, username } = req.body;
  //console.log(req.body);
  accountsModel.findOneAndUpdate({ uid: uid, username }, { ...req.body }).then(
    (data) => {
      //let timeStr = moment(data.time).format("YYYY-MM-DD");
      res.render("result", {
        title: "记账本-修改成功",
        msg: "修改记账记录成功",
        redirectUrl: "/account/list",
      });
    },
    (err) => {
      res.render("result", {
        title: "记账本-修改记录失败",
        msg: "记账修改失败哦~~",
        redirectUrl: "/account/list",
      });
    }
  );
});
module.exports = router;
