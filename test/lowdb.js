//导入lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
//数据存储文件
const adapter = new FileSync("db.json");

// 创建db
const db = low(adapter);

// 初始化
//db.defaults({ posts: [], user: {} }).write();

//查找id=1的对象
// let result = db.get("posts").find({ id: 1 }).value();
// console.log(result);

// posts对象写入数据
// db.get("posts").push({ id: 1, title: "lowdb is awesome" }).write();
// db.get("posts").push({ id: 15, title: "fuck javascript" }).write();

//在posts数组最前插入一个对象
// db.get("posts").unshift({ id: 10, title: "I love nodejs" }).write();

// 删除posts数组中的id为15的元素
// let rs = db.get("posts").remove({ id: 10 }).write();
// console.log("删除的对象是：", rs);

//更新对象
db.get("posts").find({ id: 1 }).assign({ title: "fuck you hard" }).write();
// 获取posts数组
console.log(db.get("posts").value());
