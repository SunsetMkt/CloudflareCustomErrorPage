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

const createFooter = (i18n, includeHit = false) => {
  const footer = [
    { key: "footer.projectLink", value: i18n.footer.projectLink },
    { 
      key: "footer.yourIp", 
      type: "placeholder",
      prePart: { key: "footer.yourIpPre", value: i18n.footer.yourIpPre },
      placeholder: "::CLIENT_IP:: (::GEO::)",
      postPart: { key: "footer.yourIpPost", value: i18n.footer.yourIpPost }
    },
    { 
      key: "footer.rayId",
      type: "placeholder", 
      prePart: { key: "footer.rayIdPre", value: i18n.footer.rayIdPre },
      placeholder: "::RAY_ID::",
      postPart: { key: "footer.rayIdPost", value: i18n.footer.rayIdPost }
    }
  ];
  if (includeHit) {
    footer.push({ key: "footer.hitIn", value: i18n.footer.hitIn });
  }
  return footer;
};

// Get the status i18n key from status value
const getStatusKey = (statusValue) => {
  const statusMap = {
    "Working": "working",
    "Error": "error", 
    "Unknown": "unknown",
    "Too Many Requests": "tooManyRequests",
    "Challenging": "challenging",
    "Under Attack": "underAttack",
    "Protected": "protected"
  };
  return statusMap[statusValue] || statusValue.toLowerCase().replace(/\s+/g, '');
};

// Export helper functions for use by app.js
exports.createHelper = createHelper;
exports.createFooter = createFooter;
exports.getStatusKey = getStatusKey;

// Page specifications without language-specific content
exports.builderConfig = [
  {
    fileName: "index.html",
    statusCode: 200,
    textKey: "index",
    cardType: "allWorking",
    reasonKey: "index",
    footerType: "simple",
    script: function () {},
  },
  {
    fileName: "5xxerror.html",
    statusCode: "5xx",
    textKey: "5xxerror",
    cardType: "ServerError",
    reasonKey: "5xxerror",
    footerType: "withHit",
    script: function (i18n) {
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
    fileName: "1xxxerror.html",
    statusCode: "1xxx",
    textKey: "1xxxerror",
    cardType: "edgeError",
    reasonKey: "1xxxerror",
    footerType: "standard",
    script: function (i18n) {
      const baseDetils = document.querySelector(".cf-error-details");
      const ErrorMessage = baseDetils.querySelector("h1").innerText;
      const Explain =
        baseDetils.querySelector("p").innerText +
        document.querySelector("ul").innerText;
      let ErrorNumber = "1xxx";
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
    fileName: "block-ip.html",
    statusCode: 1006,
    textKey: "block-ip",
    cardType: "edgeBanned",
    reasonKey: "block-ip",
    footerType: "standard",
    script: function () {},
  },
  {
    fileName: "block-waf.html",
    statusCode: 1020,
    textKey: "block-waf",
    cardType: "edgeBanned",
    reasonKey: "block-waf",
    footerType: "standard",
    script: function () {},
  },
  {
    fileName: "1015.html",
    statusCode: 1015,
    textKey: "1015",
    cardType: "edgeLimit",
    reasonKey: "1015",
    footerType: "standard",
    script: function () {},
  },
  {
    fileName: "block-country.html",
    statusCode: 1009,
    textKey: "block-country",
    cardType: "edgeBanned",
    reasonKey: "block-country",
    footerType: "standard",
    script: function () {},
  },
  {
    fileName: "challenge-ip.html",
    statusCode: 403,
    textKey: "challenge-ip",
    cardType: "challenge",
    reasonKey: "challenge-ip",
    footerType: "standard",
    script: function () {},
  },
  {
    fileName: "challenge-country.html",
    statusCode: 403,
    textKey: "challenge-country",
    cardType: "challenge",
    reasonKey: "challenge-country",
    footerType: "standard",
    script: function () {},
  },
  {
    fileName: "managed-challenge.html",
    statusCode: 403,
    textKey: "managed-challenge",
    cardType: "challenge",
    reasonKey: "managed-challenge",
    footerType: "standard",
    script: function () {},
  },
  {
    fileName: "interactive-challenge.html",
    statusCode: 403,
    textKey: "interactive-challenge",
    cardType: "challenge",
    reasonKey: "interactive-challenge",
    footerType: "standard",
    script: function () {},
  },
  {
    fileName: "js-challenge.html",
    statusCode: 403,
    textKey: "js-challenge",
    cardType: "underAttack",
    reasonKey: "js-challenge",
    footerType: "standard",
    script: function () {},
  },
];