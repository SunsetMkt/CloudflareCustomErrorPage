const helper = {
  allWorking: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Working",
      color: "green",
    },
  },
  ServerError: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Error",
      color: "red",
    },
  },
  edgeError: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Error",
      color: "red",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
  edgeBanned: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
  edgeLimit: {
    client: {
      status: "Too Many Requests",
      color: "red",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
  challenge: {
    client: {
      status: "Challenging",
      color: "yellow",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
  underAttack: {
    client: {
      status: "Under Attack",
      color: "yellow",
    },
    edgeNetwork: {
      status: "Working",
      color: "green",
    },
    webServer: {
      status: "Protected",
      color: "yellow",
    },
  },
};

exports.builderConfig = [
  {
    fileName: "index.html",
    statusCode: 200,
    text: {
      en: "OK",
      zh: "OK",
    },
    card: helper.allWorking,
    reason: {
      explain: {
        en: "This is CloudflareCustomErrorPage, a lightweight custom error page written for Cloudflare that uses ejs as a template compiler.",
        zh: "这是 CloudflareCustomErrorPage，一个以 ejs 为模板编译器的轻量级错误页面，为 Cloudflare 所编写。",
      },
      howtodo: {
        en: "Check Our Project on <a href='https://github.com/186526/CloudflareCustomErrorPage'>GitHub</a>.",
        zh: "检查我们的项目，在<a href='https://github.com/186526/CloudflareCustomErrorPage'>GitHub</a>。",
      },
    },
    footer: {
      en: ['From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.'],
      zh: ['来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目'],
    },
    script: function () {},
  },
  {
    fileName: "5xxerror.html",
    statusCode: "5xx",
    text: {
      en: "Server-side error",
      zh: "服务器侧错误",
    },
    card: helper.ServerError,
    reason: {
      explain: {
        en: "The web server reported an error.",
        zh: "网络服务器汇报了一错误。",
      },
      howtodo: {
        en: "Please try again in a few minutes.",
        zh: "请在几分钟后重试。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
        'Hit in <code id="pop"> undefined </code>',
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
        '位于 <code id="pop"> undefined </code>',
      ],
    },
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
      document.querySelector("title").innerText =
        `${ErrorNumber} | ${ErrorMessage}`;
      document.querySelector("#pop").innerText = POP;
    },
  },
  {
    fileName: "1xxxerror.html",
    statusCode: "1xxx",
    text: {
      en: "Access denied",
      zh: "访问被拒绝",
    },
    card: helper.edgeError,
    reason: {
      explain: {
        en: "The owner of this website has banned you from accessing the site.",
        zh: "该网站的所有者已封锁您对该网站的访问权限。",
      },
      howtodo: {
        en: "Please contact the site owner to request access.",
        zh: "请联系网站所有者以请求访问权限。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
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
      document.querySelector("title").innerText =
        `${ErrorNumber} | ${ErrorMessage}`;
    },
  },
  {
    fileName: "block-ip.html",
    statusCode: 1006,
    text: {
      en: "Your IP has been banned",
      zh: "您的 IP 已经被封禁",
    },
    card: helper.edgeBanned,
    reason: {
      explain: {
        en: "The administrator of the requested website has changed Cloudflare security level or blocked your IP address. Since the administrator disabled your IP, Cloudflare support cannot override their configuration.",
        zh: "所请求网站的管理员修改了 Cloudflare 安全级别或者封禁了您的 IP 地址。自从管理员禁用您的 IP 后，Cloudflare 支持不能覆盖他们的配置。",
      },
      howtodo: {
        en: "Please contact the administrator and provide this page.",
        zh: "请联系管理员并提供该页面。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
        'Hit in <code id="pop"> undefined </code>',
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
        '位于 <code id="pop"> undefined </code>',
      ],
    },
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
          }
        }
      });
      document.querySelector("header main").innerText = ErrorNumber;
      document.querySelector("header description").innerText = ErrorMessage;
      document.querySelector("explain p").innerText = Explain;
      document.querySelector("title").innerText =
        `${ErrorNumber} | ${ErrorMessage}`;
      document.querySelector("#pop").innerText = POP;
    },
  },
  {
    fileName: "block-waf.html",
    statusCode: 1020,
    text: {
      en: "Access denied",
      zh: "访问被拒绝",
    },
    card: helper.edgeBanned,
    reason: {
      explain: {
        en: "A client or browser is blocked by a Cloudflare customer's Firewall Rules.",
        zh: "客户端或浏览器被 Cloudflare 客户的防火墙规则阻止。",
      },
      howtodo: {
        en: "Provide the website owner with a screenshot of the 1020 error message you received.",
        zh: "向网站所有者提供您收到的 1020 错误消息的屏幕截图。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
    script: function () {},
  },
  {
    fileName: "1015.html",
    statusCode: 1015,
    text: {
      en: "Too Many Requests",
      zh: "请求过多",
    },
    card: helper.edgeLimit,
    reason: {
      explain: {
        en: "Your request rate to the current site is too fast.",
        zh: "您对当前站点的请求速度过快。",
      },
      howtodo: {
        en: "Please try again in a few minutes.",
        zh: "请在几分钟后重试。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
    script: function () {},
  },
  {
    fileName: "block-country.html",
    statusCode: 1009,
    text: {
      en: "Country or region banned",
      zh: "国家或地区被封禁",
    },
    card: helper.edgeBanned,
    reason: {
      explain: {
        en: "Your country or region has been banned by the website owner.",
        zh: "您的国家或地区已被网站所有者封禁。",
      },
      howtodo: {
        en: "Contact the website owner to request access from your location.",
        zh: "请联系网站所有者申请访问权限。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
    script: function () {},
  },
  {
    fileName: "challenge-ip.html",
    statusCode: 403,
    text: {
      en: "IP challenge",
      zh: "IP 验证挑战",
    },
    card: helper.challenge,
    reason: {
      explain: {
        en: "Your IP address needs to be verified to access this website.",
        zh: "需要验证您的 IP 地址以访问此网站。",
      },
      howtodo: {
        en: "Complete the challenge below to continue.",
        zh: "完成下方的验证以继续访问。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
    script: function () {},
  },
  {
    fileName: "challenge-country.html",
    statusCode: 403,
    text: {
      en: "Country challenge",
      zh: "国家验证挑战",
    },
    card: helper.challenge,
    reason: {
      explain: {
        en: "Your location needs to be verified to access this website.",
        zh: "需要验证您的地理位置以访问此网站。",
      },
      howtodo: {
        en: "Complete the challenge below to continue.",
        zh: "完成下方的验证以继续访问。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
    script: function () {},
  },
  {
    fileName: "managed-challenge.html",
    statusCode: 403,
    text: {
      en: "Managed challenge",
      zh: "托管验证挑战",
    },
    card: helper.challenge,
    reason: {
      explain: {
        en: "Complete the challenge to prove you are a human.",
        zh: "完成验证以证明您是真人用户。",
      },
      howtodo: {
        en: "Complete the challenge below to continue.",
        zh: "完成下方的验证以继续浏览。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
    script: function () {},
  },
  {
    fileName: "interactive-challenge.html",
    statusCode: 403,
    text: {
      en: "Interactive challenge",
      zh: "交互式验证挑战",
    },
    card: helper.challenge,
    reason: {
      explain: {
        en: "Complete the interactive challenge to continue.",
        zh: "完成交互式验证以继续访问。",
      },
      howtodo: {
        en: "Solve the challenge below to access the website.",
        zh: "解决下方的验证挑战以访问网站。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
    script: function () {},
  },
  {
    fileName: "js-challenge.html",
    statusCode: 403,
    text: {
      en: "JavaScript challenge",
      zh: "JavaScript 验证挑战",
    },
    card: helper.underAttack,
    reason: {
      explain: {
        en: "This website is using a security service to protect itself from online attacks.",
        zh: "该网站正在使用安全服务保护自身免受在线攻击。",
      },
      howtodo: {
        en: "Please enable JavaScript and wait while we verify your browser.",
        zh: "请启用 JavaScript 并等待我们验证您的浏览器。",
      },
    },
    footer: {
      en: [
        'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
        'Your IP is <code class="ip-container"> <span class="ip-hidden">Click to reveal</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID is <code>::RAY_ID::</code>",
      ],
      zh: [
        '来自 <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> 项目',
        '您的 IP 是 <code class="ip-container"> <span class="ip-hidden">点击显示</span><span class="ip-shown" style="display:none"> ::CLIENT_IP:: (::GEO::) </span></code>',
        "Ray ID 是 <code>::RAY_ID::</code>",
      ],
    },
    script: function () {},
  },
];

exports.i18n = {
  en: {
    client: "Your Client",
    edgeNetwork: "Cloudflare Edge Network",
    webServer: "Web Server",
    provider: "Running with <a href='https://cloudflare.com'>Cloudflare</a>.",
    explain: "What happened?",
    howtodo: "What can I do?",
  },
  zh: {
    client: "您所运行的客户端",
    edgeNetwork: "Cloudflare 边缘网络",
    webServer: "该站点服务器",
    provider: "与 <a href='https://cloudflare.com'>Cloudflare</a> 一同运行。",
    explain: "发生了什么？",
    howtodo: "我该做什么？",
  },
};