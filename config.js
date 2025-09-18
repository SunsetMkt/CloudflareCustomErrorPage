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
exports.getStatusKey = getStatusKey;

// Page specifications without language-specific content
exports.builderConfig = [
  {
    fileName: "index.html",
    statusCode: 200,
    textKey: "index",
    cardType: "allWorking",
    reasonKey: "index",
    script: function () {},
  },
  {
    fileName: "5xxerror.html",
    statusCode: "5xx",
    textKey: "5xxerror",
    cardType: "ServerError",
    reasonKey: "5xxerror",
    script: function () {},
  },
  {
    fileName: "1xxxerror.html",
    statusCode: "1xxx",
    textKey: "1xxxerror",
    cardType: "edgeError",
    reasonKey: "1xxxerror",
    script: function () {},
  },
  {
    fileName: "block-ip.html",
    statusCode: 1006,
    textKey: "block-ip",
    cardType: "edgeBanned",
    reasonKey: "block-ip",
    script: function () {},
  },
  {
    fileName: "block-waf.html",
    statusCode: 1020,
    textKey: "block-waf",
    cardType: "edgeBanned",
    reasonKey: "block-waf",
    script: function () {},
  },
  {
    fileName: "1015.html",
    statusCode: 1015,
    textKey: "1015",
    cardType: "edgeLimit",
    reasonKey: "1015",
    script: function () {},
  },
  {
    fileName: "block-country.html",
    statusCode: 1009,
    textKey: "block-country",
    cardType: "edgeBanned",
    reasonKey: "block-country",
    script: function () {},
  },
  {
    fileName: "challenge-ip.html",
    statusCode: 403,
    textKey: "challenge-ip",
    cardType: "challenge",
    reasonKey: "challenge-ip",
    script: function () {},
  },
  {
    fileName: "challenge-country.html",
    statusCode: 403,
    textKey: "challenge-country",
    cardType: "challenge",
    reasonKey: "challenge-country",
    script: function () {},
  },
  {
    fileName: "managed-challenge.html",
    statusCode: 403,
    textKey: "managed-challenge",
    cardType: "challenge",
    reasonKey: "managed-challenge",
    script: function () {},
  },
  {
    fileName: "interactive-challenge.html",
    statusCode: 403,
    textKey: "interactive-challenge",
    cardType: "challenge",
    reasonKey: "interactive-challenge",
    script: function () {},
  },
  {
    fileName: "js-challenge.html",
    statusCode: 403,
    textKey: "js-challenge",
    cardType: "underAttack",
    reasonKey: "js-challenge",
    script: function () {},
  },
];