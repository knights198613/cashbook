const shortId = require("shortid");
var express = require("express");
const mongoose = require("mongoose");
const { accountsModel } = require("../../db/accountsModel");
const { successCode, successMsg, errorCode, errorMsg } = require("../../constant");

//创建路由
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "记账本" });
});

//记账本列表
router.get("/account/list", function (req, res, next) {
  // 获取accounts数组
  accountsModel
    .find()
    .select("-_id -__v")
    .sort({ time: -1 })
    .then(
      (data) => {
        res.json({
          code: successCode,
          msg: successMsg,
          data: data,
        });
      },
      (err) => {
        res.json({ code: errorCode, msg: errorMsg, data: null });
      }
    );
});

//记账提交信息处理
router.post("/account/subItem", function (req, res, next) {
  let { item, time, type, amount, remark } = req.body;
  //TODO: 缺少表单验证
  let date = new Date(time);
  let id = shortId.generate();
  accountsModel
    .create({
      id,
      item,
      time: date,
      type,
      amount,
      remark,
    })
    .then(
      (data) => {
        res.json({
          code: successCode,
          msg: successMsg,
          data: data,
        });
      },
      (err) => {
        res.json({
          code: errorCode,
          msg: errorMsg,
          data: err,
        });
      }
    );
});

//删除一条记账记录
router.delete("/account/:id", function (req, res, next) {
  let { id } = req.params;
  //db.get("accounts").remove({ id: id }).write();
  accountsModel.deleteOne({ id }).then(
    (data) => {
      res.json({
        code: successCode,
        msg: successMsg,
        data: data,
      });
    },
    (err) => {
      res.json({
        code: errorCode,
        msg: errorMsg,
        data: null,
      });
    }
  );
});

//获取单个账单信息
router.get("/account/:id", function (req, res, next) {
  let { id } = req.params;
  accountsModel.findOne({ id: id }).then(
    (data) => {
      res.json({
        code: successCode,
        msg: successMsg,
        data: data,
      });
    },
    (err) => {
      res.json({
        code: errorCode,
        msg: errorMsg,
        data: err,
      });
    }
  );
});

//修改一条账单
router.patch("/account/:id", (req, res, next) => {
  let { id } = req.params;
  let { item, time, type, amount, remark } = req.body;
  accountsModel
    .updateOne({ id: id }, { item, time: time.trim(), type, amount, remark })
    .then(
      (data) => {
        res.json({
          code: successCode,
          msg: successMsg,
          data: data,
        });
      },
      (err) => {
        res.json({
          code: errorCode,
          msg: errorMsg,
          data: err,
        });
      }
    );
});

module.exports = router;
