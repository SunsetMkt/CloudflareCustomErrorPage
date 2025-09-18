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
    protected: "保护中",
  },

  // Common footer strings
  footer: {
    projectLink:
      '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
    yourIpPre: "您的 IP 是 ",
    yourIpPost: " ",
    rayIdPre: "Ray ID 是 ",
    rayIdPost: " ",
    hitIn: '请求命中到 <code id="pop"> undefined </code>',
  },

  // Page-specific reason strings
  reasons: {
    index: {
      explain:
        "这是 CloudflareCustomErrorPage，一个以 ejs 为模板编译器的轻量级错误页面，为 Cloudflare 所编写。",
      howtodo:
        "检查我们的项目，在<a href='https://github.com/186526/CloudflareCustomErrorPage'>GitHub</a>。",
    },
    "5xxerror": {
      explain: "网络服务器汇报了一个错误。",
      howtodo: "请在几分钟后重试。",
    },
    "1xxxerror": {
      explain: "Cloudflare 汇报了一个错误。",
      howtodo: "请在几分钟后重试。",
    },
    "block-ip": {
      explain:
        "所请求网站的管理员修改了 Cloudflare 安全级别或者封禁了您的 IP 地址。自从管理员禁用您的 IP 后，Cloudflare 支持不能覆盖他们的配置。",
      howtodo: "请联系管理员并提供该页面。",
    },
    "block-waf": {
      explain: "您被该网站所设置的 Cloudflare 防火墙规则所拦截。",
      howtodo: "请联系管理员并提供该页面。",
    },
    1015: {
      explain: "您的请求速率过快。",
      howtodo: "请在几分钟后重试。",
    },
    "block-country": {
      explain: "您的国家或地区已被网站所有者封禁。",
      howtodo: "请联系网站所有者申请访问权限。",
    },
    "challenge-ip": {
      explain: "需要验证您的 IP 地址以访问此网站。",
      howtodo: "完成下方的验证以继续访问。",
    },
    "challenge-country": {
      explain: "需要验证您的地理位置以访问此网站。",
      howtodo: "完成下方的验证以继续访问。",
    },
    "managed-challenge": {
      explain: "完成验证以证明您是真人用户。",
      howtodo: "完成下方的验证以继续浏览。",
    },
    "interactive-challenge": {
      explain: "完成交互式验证以继续访问。",
      howtodo: "解决下方的验证挑战以访问网站。",
    },
    "js-challenge": {
      explain: "该网站正在使用安全服务保护自身免受在线攻击。",
      howtodo: "请启用 JavaScript 并等待我们验证您的浏览器。",
    },
  },

  // Page text translations
  pageText: {
    index: "OK",
    "5xxerror": "服务器侧错误",
    "1xxxerror": "Cloudflare 侧错误",
    "block-ip": "您的 IP 已经被封禁",
    "block-waf": "访问受阻",
    1015: "请求过多",
    "block-country": "国家或地区被封禁",
    "challenge-ip": "IP 验证挑战",
    "challenge-country": "国家验证挑战",
    "managed-challenge": "托管验证挑战",
    "interactive-challenge": "交互式验证挑战",
    "js-challenge": "JavaScript 验证挑战",
  },
};

exports.i18n = i18n;
