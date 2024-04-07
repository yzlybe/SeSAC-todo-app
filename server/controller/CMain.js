const { Todo } = require("../models");
// test 용 api
exports.getIndex = (req, res) => {
  res.send("response from api server [GET /api-server]");
};
exports.getUser = (req, res) => {
  res.send("response from api server [GET /api-server/user]");
};

// GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll(); // [{id, text, done}]
    res.json(todoAll);
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR, 관리자에게 문의하세요");
  }
};

// POST /api-server/todo
exports.postTodo = async (req, res) => {
  /* {
    id: 모델 정의 시 auto_increment 속성을 추가해두었음(데이터 필요 x)
    text: 할 일 (o)
    done: 모델 정의 시 defaultValue로 false(0)를 처리해두었음(x)
  } */
  try {
    // req.body = {text:"~~~~"}
    const { text } = req.body;
    await Todo.create({
      text,
    });
    res.send({ isSuccess: true });
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR, 관리자에게 문의하세요");
  }
};
