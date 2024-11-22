//mongodb数据库配置
const cashBookDb = "mongodb://127.0.0.1:27017/cashbook";

//api接口常量
const successCode = "0000";
const errorCode = "4444";
const successMsg = "接口请求成功";
const errorMsg = "接口请求失败";

module.exports = {
  cashBookDb, // mongodb数据库连接字符串
  successCode, // 成功返回
  successMsg,
  errorCode, //
  errorMsg, // 失败返回
};
