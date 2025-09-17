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
  edgeBlocked: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Blocked",
      color: "red",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
  dnsError: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "DNS Error",
      color: "red",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
  hostError: {
    client: {
      status: "Working",
      color: "green",
    },
    edgeNetwork: {
      status: "Configuration Error",
      color: "red",
    },
    webServer: {
      status: "Unknown",
      color: "yellow",
    },
  },
};

exports.builderConfig = [
  {
    fileName: "index.html",
    statusCode: 200,
    text: "OK",
    card: helper.allWorking,
    reason: {
      explain:
        "This is CloudflareCustomErrorPage, a lightweight custom error page written for Cloudflare that uses ejs as a template compiler.",
      howtodo:
        "Check Our Project on <a href='https://github.com/186526/CloudflareCustomErrorPage'>GitHub</a>.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
    ],
    script: function () {},
  },
  {
    fileName: "5xxerror.html",
    statusCode: "5xx",
    text: "Server-side Error",
    card: helper.ServerError,
    reason: {
      explain: "The web server reported a Server error.",
      howtodo: "Please try again in a few minutes.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
      'Hit in <code id="pop"> undefined </code>',
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
    fileName: "1xxxerror.html",
    statusCode: "1xxx",
    text: "Cloudflare-side Error",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare Edge Network reported a error.",
      howtodo: "Please try again in a few minutes.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
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
    fileName: "block-ip.html",
    statusCode: 1006,
    text: "Your IP address has been banned",
    card: helper.edgeBanned,
    reason: {
      explain:
        "Request the website owner to investigate their Cloudflare security settings or allow your client IP address. Since the website owner blocked your request, Cloudflare support cannot override a customer’s security settings.",
      howtodo:
        "Provide the website owner with a screenshot of the 1006 error message you received.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "block-waf.html",
    statusCode: 1020,
    text: "Access denied",
    card: helper.edgeBanned,
    reason: {
      explain:
        "A client or browser is blocked by a Cloudflare customer’s Firewall Rules.",
      howtodo:
        "Provide the website owner with a screenshot of the 1020 error message you received.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1015.html",
    statusCode: 1015,
    text: "Too Many Requests",
    card: helper.edgeLimit,
    reason: {
      explain: "Your request rate to the current site is too fast.",
      howtodo: "Please try again in a few minutes.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1000.html",
    statusCode: 1000,
    text: "DNS points to prohibited IP",
    card: helper.dnsError,
    reason: {
      explain: "The domain's DNS configuration points to an IP address that is not allowed by Cloudflare.",
      howtodo: "Contact the website owner to check their DNS configuration.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1001.html",
    statusCode: 1001,
    text: "DNS resolution error",
    card: helper.dnsError,
    reason: {
      explain: "The domain cannot be resolved to a valid IP address.",
      howtodo: "Check the domain name and try again later. Contact the website owner if the problem persists.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1002.html",
    statusCode: 1002,
    text: "Restricted",
    card: helper.edgeBlocked,
    reason: {
      explain: "The website is restricted and cannot be accessed.",
      howtodo: "Contact the website owner for more information about access restrictions.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1003.html",
    statusCode: 1003,
    text: "Direct IP access not allowed",
    card: helper.hostError,
    reason: {
      explain: "Direct IP access is not allowed. You must use the domain name.",
      howtodo: "Access the website using its domain name instead of the IP address.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1004.html",
    statusCode: 1004,
    text: "Host not configured to serve web traffic",
    card: helper.hostError,
    reason: {
      explain: "This host is not configured to serve web traffic over this protocol.",
      howtodo: "Contact the website owner to check their Cloudflare configuration.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1005.html",
    statusCode: 1005,
    text: "Blocked",
    card: helper.edgeBlocked,
    reason: {
      explain: "The request has been blocked by Cloudflare security settings.",
      howtodo: "Contact the website owner if you believe this is an error.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1007.html",
    statusCode: 1007,
    text: "Rate limited",
    card: helper.edgeLimit,
    reason: {
      explain: "The request has been rate limited by Cloudflare.",
      howtodo: "Wait a moment and try again. If the problem persists, contact the website owner.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1008.html",
    statusCode: 1008,
    text: "DNS points to prohibited IP",
    card: helper.dnsError,
    reason: {
      explain: "The DNS configuration for this domain points to a prohibited IP address.",
      howtodo: "Contact the website owner to update their DNS configuration.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1009.html",
    statusCode: 1009,
    text: "Blocked",
    card: helper.edgeBlocked,
    reason: {
      explain: "Access to this resource has been blocked by Cloudflare security rules.",
      howtodo: "Contact the website owner if you believe you should have access.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1010.html",
    statusCode: 1010,
    text: "Access denied",
    card: helper.edgeBanned,
    reason: {
      explain: "Access to this resource has been denied by the website owner.",
      howtodo: "Contact the website owner if you believe you should have access.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1011.html",
    statusCode: 1011,
    text: "Access denied (country blocked)",
    card: helper.edgeBanned,
    reason: {
      explain: "Access from your country or region has been blocked by the website owner.",
      howtodo: "This restriction is set by the website owner. Contact them if you believe this is an error.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1012.html",
    statusCode: 1012,
    text: "Access denied",
    card: helper.edgeBanned,
    reason: {
      explain: "The website owner has blocked access to this resource.",
      howtodo: "Contact the website owner for more information about this access restriction.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1013.html",
    statusCode: 1013,
    text: "HTTP hostname and TLS SNI hostname mismatch",
    card: helper.hostError,
    reason: {
      explain: "The hostname in the HTTP request does not match the TLS SNI hostname.",
      howtodo: "Check your connection and try again. Contact the website owner if the problem persists.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1014.html",
    statusCode: 1014,
    text: "CNAME Cross-User Banned",
    card: helper.hostError,
    reason: {
      explain: "The CNAME configuration violates Cloudflare's cross-user policies.",
      howtodo: "Contact the website owner to update their DNS configuration.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1016.html",
    statusCode: 1016,
    text: "Origin DNS error",
    card: helper.dnsError,
    reason: {
      explain: "Cloudflare could not resolve the origin server's DNS records.",
      howtodo: "Contact the website owner to check their origin server's DNS configuration.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1018.html",
    statusCode: 1018,
    text: "Host not found",
    card: helper.dnsError,
    reason: {
      explain: "The hostname could not be resolved or does not exist.",
      howtodo: "Check the website URL and try again. Contact the website owner if the problem persists.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1019.html",
    statusCode: 1019,
    text: "Compute server error",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare Workers encountered an error while processing your request.",
      howtodo: "Try again in a few minutes. Contact the website owner if the problem persists.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1100.html",
    statusCode: 1100,
    text: "Security challenge",
    card: helper.edgeBlocked,
    reason: {
      explain: "Cloudflare's security systems have detected unusual behavior and require verification.",
      howtodo: "Complete the security challenge to continue accessing the website.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1101.html",
    statusCode: 1101,
    text: "Rendering error",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare Workers encountered an error during rendering.",
      howtodo: "Try refreshing the page. Contact the website owner if the problem persists.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
  {
    fileName: "1102.html",
    statusCode: 1102,
    text: "Worker threw exception",
    card: helper.edgeError,
    reason: {
      explain: "A Cloudflare Worker script encountered an unhandled exception.",
      howtodo: "Try again later. Contact the website owner if the problem persists.",
    },
    footer: [
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
      "Your IP is <code> ::CLIENT_IP:: </code>",
      "Ray ID is <code>::RAY_ID::</code>",
    ],
    script: function () {},
  },
];

exports.i18n = {
  client: "Your Client",
  edgeNetwork: "Cloudflare Edge Network",
  webServer: "Web Server",
  provider:
    "Running with <a href='https://cloudflare.com'>Cloudflare</a>.",
  explain: "What happened?",
  howtodo: "What can I do?",
};
