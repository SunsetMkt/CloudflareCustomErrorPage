const i18n = {
  client: "您所运行的客户端",
  edgeNetwork: "Cloudflare 边缘网络",
  webServer: "该站点服务器",
  provider: "与 <a href='https://cloudflare.com'>Cloudflare</a> 一同运行。",
  explain: "发生了什么？",
  howtodo: "我该做什么？",
  
  // Status text internationalization
  status: {
    working: "正常",
    error: "错误", 
    unknown: "未知",
    tooManyRequests: "请求过多",
    challenging: "验证中",
    underAttack: "攻击防护",
    protected: "保护中"
  },
  
  // Common footer strings
  footer: {
    projectLink: '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
    yourIp: "您的 IP 是 <code> ::CLIENT_IP:: (::GEO::) </code>",
    rayId: "Ray ID 是 <code>::RAY_ID::</code>"
  },
  
  // JavaScript parsing strings
  parsing: {
    errorRefNumber: "Error reference number: ",
    cloudflareLocation: "Cloudflare Location: "
  }
};

const createFooter = (i18n, includeHit = false) => {
  const footer = [
    i18n.footer.projectLink,
    i18n.footer.yourIp,
    i18n.footer.rayId
  ];
  if (includeHit) {
    footer.push('Hit in <code id="pop"> undefined </code>');
  }
  return footer;
};

const createHelper = (i18n) => ({
  allWorking: {
    client: {
      status: i18n.status.working,
      color: "green",
    },
    edgeNetwork: {
      status: i18n.status.working,
      color: "green",
    },
    webServer: {
      status: i18n.status.working,
      color: "green",
    },
  },
  ServerError: {
    client: {
      status: i18n.status.working,
      color: "green",
    },
    edgeNetwork: {
      status: i18n.status.working,
      color: "green",
    },
    webServer: {
      status: i18n.status.error,
      color: "red",
    },
  },
  edgeError: {
    client: {
      status: i18n.status.working,
      color: "green",
    },
    edgeNetwork: {
      status: i18n.status.error,
      color: "red",
    },
    webServer: {
      status: i18n.status.unknown,
      color: "yellow",
    },
  },
  edgeBanned: {
    client: {
      status: i18n.status.working,
      color: "green",
    },
    edgeNetwork: {
      status: i18n.status.working,
      color: "green",
    },
    webServer: {
      status: i18n.status.unknown,
      color: "yellow",
    },
  },
  edgeLimit: {
    client: {
      status: i18n.status.tooManyRequests,
      color: "red",
    },
    edgeNetwork: {
      status: i18n.status.working,
      color: "green",
    },
    webServer: {
      status: i18n.status.unknown,
      color: "yellow",
    },
  },
  challenge: {
    client: {
      status: i18n.status.challenging,
      color: "yellow",
    },
    edgeNetwork: {
      status: i18n.status.working,
      color: "green",
    },
    webServer: {
      status: i18n.status.unknown,
      color: "yellow",
    },
  },
  underAttack: {
    client: {
      status: i18n.status.underAttack,
      color: "yellow",
    },
    edgeNetwork: {
      status: i18n.status.working,
      color: "green",
    },
    webServer: {
      status: i18n.status.protected,
      color: "yellow",
    },
  },
});

const helper = createHelper(i18n);

exports.builderConfig = [
  {
    fileName: "zh-CN/index.html",
    statusCode: 200,
    text: "OK",
    card: helper.allWorking,
    reason: {
      explain:
        "这是 CloudflareCustomErrorPage，一个以 ejs 为模板编译器的轻量级错误页面，为 Cloudflare 所编写。",
      howtodo:
        "检查我们的项目，在<a href='https://github.com/186526/CloudflareCustomErrorPage'>GitHub</a>。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/5xxerror.html",
    statusCode: "5xx",
    text: "服务器侧错误",
    card: helper.ServerError,
    reason: {
      explain: "网络服务器汇报了一个错误。",
      howtodo: "请在几分钟后重试。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: (::GEO::) </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
      '请求命中到 <code id="pop"> undefined </code>',
    ],
    script: function () {
      const baseDetils = document.querySelector(".cf-error-details");
      const ErrorMessage = baseDetils.querySelector("h1").innerText;
      const Explain = baseDetils.querySelector("p").innerText;
      let ErrorNumber = "5xx";
      let POP = "undefined";
      baseDetils.querySelector("ul").childNodes.forEach((e) => {
        if (e.innerText !== undefined) {
          let check = e.innerText.replace(i18n.parsing.errorRefNumber, "");
          if (check !== e.innerText) {
            ErrorNumber = check;
            return;
          }
          check = e.innerText.replace(i18n.parsing.cloudflareLocation, "");
          if (check !== e.innerText) {
            POP = check;
            return;
          }
        }
      });
      document.querySelector("header main").innerText = ErrorNumber;
      document.querySelector("header description").innerText = ErrorMessage;
      document.querySelector("explain p").innerText = Explain;
      document.querySelector("text #pop").innerText = POP;
      document.querySelector("title").innerText =
        `${ErrorNumber} | ${ErrorMessage}`;
    },
  },
  {
    fileName: "zh-CN/1xxxerror.html",
    statusCode: "1xxx",
    text: "Cloudflare 侧错误",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare 汇报了一个错误。",
      howtodo: "请在几分钟后重试。",
    },
    footer: createFooter(i18n),
    script: function () {
      const baseDetils = document.querySelector(".cf-error-details");
      const ErrorMessage = baseDetils.querySelector("h1").innerText;
      const Explain =
        baseDetils.querySelector("p").innerText +
        document.querySelector("ul").innerText;
      let ErrorNumber = "5xx";
      let POP = "undefined";
      baseDetils.querySelector("ul.cferror_details").childNodes.forEach((e) => {
        if (e.innerText !== undefined) {
          let check = e.innerText.replace(i18n.parsing.errorRefNumber, "");
          if (check !== e.innerText) {
            ErrorNumber = check;
            return;
          }
          check = e.innerText.replace(i18n.parsing.cloudflareLocation, "");
          if (check !== e.innerText) {
            POP = check;
            return;
          }
        }
      });
      document.querySelector("header main").innerText = ErrorNumber;
      document.querySelector("header description").innerText = ErrorMessage;
      document.querySelector("explain p").innerText = Explain;
      document.querySelector("title").innerText =
        `${ErrorNumber} | ${ErrorMessage}`;
    },
  },
  {
    fileName: "zh-CN/block-ip.html",
    statusCode: 1006,
    text: "您的 IP 已经被封禁",
    card: helper.edgeBanned,
    reason: {
      explain:
        "所请求网站的管理员修改了 Cloudflare 安全级别或者封禁了您的 IP 地址。自从管理员禁用您的 IP 后，Cloudflare 支持不能覆盖他们的配置。",
      howtodo: "请联系管理员并提供该页面。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "zh-CN/block-waf.html",
    statusCode: 1020,
    text: "访问受阻",
    card: helper.edgeBanned,
    reason: {
      explain: "您被该网站所设置的 Cloudflare 防火墙规则所拦截。",
      howtodo: "请联系管理员并提供该页面。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "zh-CN/1015.html",
    statusCode: 1015,
    text: "请求过多",
    card: helper.edgeLimit,
    reason: {
      explain: "您的请求速率过快。",
      howtodo: "请在几分钟后重试。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "zh-CN/block-country.html",
    statusCode: 1009,
    text: "国家或地区被封禁",
    card: helper.edgeBanned,
    reason: {
      explain: "您的国家或地区已被网站所有者封禁。",
      howtodo: "请联系网站所有者申请访问权限。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "zh-CN/challenge-ip.html",
    statusCode: 403,
    text: "IP 验证挑战",
    card: helper.challenge,
    reason: {
      explain: "需要验证您的 IP 地址以访问此网站。",
      howtodo: "完成下方的验证以继续访问。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "zh-CN/challenge-country.html",
    statusCode: 403,
    text: "国家验证挑战",
    card: helper.challenge,
    reason: {
      explain: "需要验证您的地理位置以访问此网站。",
      howtodo: "完成下方的验证以继续访问。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "zh-CN/managed-challenge.html",
    statusCode: 403,
    text: "托管验证挑战",
    card: helper.challenge,
    reason: {
      explain: "完成验证以证明您是真人用户。",
      howtodo: "完成下方的验证以继续浏览。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "zh-CN/interactive-challenge.html",
    statusCode: 403,
    text: "交互式验证挑战",
    card: helper.challenge,
    reason: {
      explain: "完成交互式验证以继续访问。",
      howtodo: "解决下方的验证挑战以访问网站。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "zh-CN/js-challenge.html",
    statusCode: 403,
    text: "JavaScript 验证挑战",
    card: helper.underAttack,
    reason: {
      explain: "该网站正在使用安全服务保护自身免受在线攻击。",
      howtodo: "请启用 JavaScript 并等待我们验证您的浏览器。",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
];

exports.i18n = i18n;
