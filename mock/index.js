//模拟返回10条用户信息+
export default [
  {
    url: "/api/userInfo", //匹配到指定url
    method: "get", //请求类型
    response: () => {
      return {
        code: 1,
        msg: "操作成功",
        "result|10": {
          userName: "少年的范儿",
          phone: "18388888888",
          password: "123456",
          desc: "坚持，绝不轻易放弃！",
          avatar:
            "https://profile-avatar.csdnimg.cn/50dba479a529427cbb47770829e8d2b0_m0_49045925.jpg!1",
          token: `Bearer ${"@word(32)"}`,
        },
      };
    },
  },
  {
    url: "/homeMenu/getList", // 菜单列表
    method: "get", //请求类型
    response: () => {
      return {
        code: 1,
        msg: "操作成功",
        "result|16": [
          {
            menuName: "@cword(3,3)", //100-200之间的随机整数
            jumpType: "@natural(1,11)",
            jumpUrl: "@url(https)",
            menuImageUrl: "@image(44, @color, 我是文本)",
          },
        ],
      };
    },
  },
  {
    url: "/goodsBanner/list", // banner 列表
    method: "get", //请求类型
    response: () => {
      return {
        code: 1,
        msg: "操作成功",
        "result|6": [
          {
            bannerType: "@natural(1,5)",
            jumpUrl: "@url(https)",
            "url|1": [
              "https://img1.baidu.com/it/u=1063627317,4109173401&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
              "https://img1.baidu.com/it/u=2734240624,2848071286&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500",
              "https://img1.baidu.com/it/u=900329638,1715201440&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
              "https://img0.baidu.com/it/u=4162443464,2854908495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
              "https://img0.baidu.com/it/u=1931706057,3494340607&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
              "https://img1.baidu.com/it/u=1876627393,303388089&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
              "https://img1.baidu.com/it/u=1393608433,1663672027&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
              "https://img0.baidu.com/it/u=3643895624,2552772604&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675",
              "https://img2.baidu.com/it/u=3750649395,919624016&fm=253&fmt=auto&app=138&f=PNG?w=667&h=500",
            ],
          },
        ],
      };
    },
  },
];
