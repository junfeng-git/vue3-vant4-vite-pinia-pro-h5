//createUserList:次函数执行会返回一个数组
function createUserList() {
  return [
    {
      userId: 1,
      username: "admin",
      password: "123456",
      token: "ZHESHICESHITOKEN",
    },
  ];
}
export default [
  {
    url: "/api/user/login",
    method: "post",
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body;
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password
      );
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: "账号或者密码不正确" } };
      }
      //如果有返回成功信息
      const { token } = checkUser;
      return { code: 200, data: { token } };
    },
  },
];
