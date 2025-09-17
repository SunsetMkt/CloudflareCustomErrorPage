const helper = {
  allWorking: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "运行",
      color: "green",
    },
    webServer: {
      status: "运行",
      color: "green",
    },
  },
  ServerError: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "运行",
      color: "green",
    },
    webServer: {
      status: "错误",
      color: "red",
    },
  },
  edgeError: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "错误",
      color: "red",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
  edgeBanned: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "运行",
      color: "green",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
  edgeLimit: {
    client: {
      status: "请求过多",
      color: "red",
    },
    edgeNetwork: {
      status: "运行",
      color: "green",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
  edgeBlocked: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "阻止",
      color: "red",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
  dnsError: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "DNS 错误",
      color: "red",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
  hostError: {
    client: {
      status: "正常",
      color: "green",
    },
    edgeNetwork: {
      status: "配置错误",
      color: "red",
    },
    webServer: {
      status: "未知",
      color: "yellow",
    },
  },
};

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
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
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
          let check = e.innerText.replace("Error reference number: ", "");
          if (check !== e.innerText) {
            ErrorNumber = check;
            return;
          }
          check = e.innerText.replace("Cloudflare Location: ", "");
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
      document.querySelector(
        "title"
      ).innerText = `${ErrorNumber} | ${ErrorMessage}`;
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
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
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
          let check = e.innerText.replace("Error reference number: ", "");
          if (check !== e.innerText) {
            ErrorNumber = check;
            return;
          }
          check = e.innerText.replace("Cloudflare Location: ", "");
          if (check !== e.innerText) {
            POP = check;
            return;
          }
        }
      });
      document.querySelector("header main").innerText = ErrorNumber;
      document.querySelector("header description").innerText = ErrorMessage;
      document.querySelector("explain p").innerText = Explain;
      document.querySelector(
        "title"
      ).innerText = `${ErrorNumber} | ${ErrorMessage}`;
    },
  },
  {
    fileName: "zh-CN/block-ip.html",
    statusCode: 1006,
    text: "您的 IP 已经被封禁",
    card: helper.edgeBanned,
    reason: {
      explain:
        "所请求网站的站长修改了 Cloudflare 安全级别或者封禁了您的 IP 地址。自从站长禁用您的 IP 后，Cloudflare support 不能覆盖他们的配置。",
      howtodo: "请联系站长并提供该页面。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/block-waf.html",
    statusCode: 1020,
    text: "访问受阻",
    card: helper.edgeBanned,
    reason: {
      explain: "您被该网站所设置的 Cloudflare 防火墙规则所拦截。",
      howtodo: "请联系站长并提供该页面。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
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
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1000.html",
    statusCode: 1000,
    text: "DNS 指向禁止的 IP",
    card: helper.dnsError,
    reason: {
      explain: "域名的 DNS 配置指向了 Cloudflare 不允许的 IP 地址。",
      howtodo: "联系网站所有者检查其 DNS 配置。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1001.html",
    statusCode: 1001,
    text: "DNS 解析错误",
    card: helper.dnsError,
    reason: {
      explain: "无法将域名解析为有效的 IP 地址。",
      howtodo: "检查域名并稍后重试。如果问题持续存在，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1002.html",
    statusCode: 1002,
    text: "限制访问",
    card: helper.edgeBlocked,
    reason: {
      explain: "该网站受到限制，无法访问。",
      howtodo: "联系网站所有者了解更多访问限制信息。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1003.html",
    statusCode: 1003,
    text: "不允许直接 IP 访问",
    card: helper.hostError,
    reason: {
      explain: "不允许直接 IP 访问。您必须使用域名。",
      howtodo: "使用域名而不是 IP 地址访问网站。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1004.html",
    statusCode: 1004,
    text: "主机未配置为提供网络流量",
    card: helper.hostError,
    reason: {
      explain: "此主机未配置为通过此协议提供网络流量。",
      howtodo: "联系网站所有者检查其 Cloudflare 配置。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1005.html",
    statusCode: 1005,
    text: "已阻止",
    card: helper.edgeBlocked,
    reason: {
      explain: "请求已被 Cloudflare 安全设置阻止。",
      howtodo: "如果您认为这是错误，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1007.html",
    statusCode: 1007,
    text: "速率限制",
    card: helper.edgeLimit,
    reason: {
      explain: "请求已被 Cloudflare 速率限制。",
      howtodo: "等待一会儿并重试。如果问题持续存在，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1008.html",
    statusCode: 1008,
    text: "DNS 指向禁止的 IP",
    card: helper.dnsError,
    reason: {
      explain: "此域名的 DNS 配置指向了禁止的 IP 地址。",
      howtodo: "联系网站所有者更新其 DNS 配置。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1009.html",
    statusCode: 1009,
    text: "已阻止",
    card: helper.edgeBlocked,
    reason: {
      explain: "对此资源的访问已被 Cloudflare 安全规则阻止。",
      howtodo: "如果您认为应该有访问权限，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1010.html",
    statusCode: 1010,
    text: "访问被拒绝",
    card: helper.edgeBanned,
    reason: {
      explain: "对此资源的访问已被网站所有者拒绝。",
      howtodo: "如果您认为应该有访问权限，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1011.html",
    statusCode: 1011,
    text: "访问被拒绝（国家/地区被阻止）",
    card: helper.edgeBanned,
    reason: {
      explain: "来自您所在国家或地区的访问已被网站所有者阻止。",
      howtodo: "此限制由网站所有者设置。如果您认为这是错误，请联系他们。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1012.html",
    statusCode: 1012,
    text: "访问被拒绝",
    card: helper.edgeBanned,
    reason: {
      explain: "网站所有者已阻止对此资源的访问。",
      howtodo: "联系网站所有者了解更多访问限制信息。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1013.html",
    statusCode: 1013,
    text: "HTTP 主机名和 TLS SNI 主机名不匹配",
    card: helper.hostError,
    reason: {
      explain: "HTTP 请求中的主机名与 TLS SNI 主机名不匹配。",
      howtodo: "检查您的连接并重试。如果问题持续存在，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1014.html",
    statusCode: 1014,
    text: "CNAME 跨用户被禁",
    card: helper.hostError,
    reason: {
      explain: "CNAME 配置违反了 Cloudflare 的跨用户策略。",
      howtodo: "联系网站所有者更新其 DNS 配置。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1016.html",
    statusCode: 1016,
    text: "源服务器 DNS 错误",
    card: helper.dnsError,
    reason: {
      explain: "Cloudflare 无法解析源服务器的 DNS 记录。",
      howtodo: "联系网站所有者检查其源服务器的 DNS 配置。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1018.html",
    statusCode: 1018,
    text: "找不到主机",
    card: helper.dnsError,
    reason: {
      explain: "无法解析主机名或主机名不存在。",
      howtodo: "检查网站 URL 并重试。如果问题持续存在，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1019.html",
    statusCode: 1019,
    text: "计算服务器错误",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare Workers 在处理您的请求时遇到错误。",
      howtodo: "几分钟后重试。如果问题持续存在，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1100.html",
    statusCode: 1100,
    text: "安全验证",
    card: helper.edgeBlocked,
    reason: {
      explain: "Cloudflare 的安全系统检测到异常行为并需要验证。",
      howtodo: "完成安全验证以继续访问网站。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1101.html",
    statusCode: 1101,
    text: "渲染错误",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare Workers 在渲染过程中遇到错误。",
      howtodo: "尝试刷新页面。如果问题持续存在，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "zh-CN/1102.html",
    statusCode: 1102,
    text: "Worker 抛出异常",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare Worker 脚本遇到了未处理的异常。",
      howtodo: "稍后重试。如果问题持续存在，请联系网站所有者。",
    },
    footer: [
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
      "您的 IP 是 <code> ::CLIENT_IP:: </code>",
      "Ray ID 是 <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
];

exports.i18n = {
  client: "您所运行的客户端",
  edgeNetwork: "Cloudflare 边缘网络",
  webServer: "该站点服务器",
  provider: "与 <a href='https://cloudflare.com'>Cloudflare</a> 一同运行。",
  explain: "发生了什么？",
  howtodo: "我该做什么？",
};
