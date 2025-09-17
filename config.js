const i18n = {
  client: "Your Client",
  edgeNetwork: "Cloudflare Edge Network",
  webServer: "Web Server",
  provider: "Running with <a href='https://cloudflare.com'>Cloudflare</a>.",
  explain: "What happened?",
  howtodo: "What can I do?",

  // Status text internationalization
  status: {
    working: "Working",
    error: "Error",
    unknown: "Unknown",
    tooManyRequests: "Too Many Requests",
    challenging: "Challenging",
    underAttack: "Under Attack",
    protected: "Protected",
  },

  // Common footer strings
  footer: {
    projectLink:
      'From the <a href="https://github.com/186526/CloudflareCustomErrorPage">186526/CloudflareCustomErrorPage</a> project.',
    yourIp: "Your IP is <code> ::CLIENT_IP:: (::GEO::) </code>",
    rayId: "Ray ID is <code>::RAY_ID::</code>",
    hitIn: 'Hit in <code id="pop"> undefined </code>',
  },

  // JavaScript parsing strings
  parsing: {
    errorRefNumber: "Error reference number: ",
    cloudflareLocation: "Cloudflare Location: ",
  },
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

const createFooter = (i18n, includeHit = false) => {
  const footer = [
    i18n.footer.projectLink,
    i18n.footer.yourIp,
    i18n.footer.rayId,
  ];
  if (includeHit) {
    footer.push(i18n.footer.hitIn);
  }
  return footer;
};

const helper = createHelper(i18n);

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
    footer: [i18n.footer.projectLink],
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
    footer: createFooter(i18n, true),
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
    fileName: "1xxxerror.html",
    statusCode: "1xxx",
    text: "Cloudflare-side Error",
    card: helper.edgeError,
    reason: {
      explain: "Cloudflare Edge Network reported a error.",
      howtodo: "Please try again in a few minutes.",
    },
    footer: createFooter(i18n),
    script: function () {
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
    text: "Your IP address has been banned",
    card: helper.edgeBanned,
    reason: {
      explain:
        "Request the website owner to investigate their Cloudflare security settings or allow your client IP address. Since the website owner blocked your request, Cloudflare support cannot override a customer’s security settings.",
      howtodo:
        "Provide the website owner with a screenshot of the 1006 error message you received.",
    },
    footer: createFooter(i18n),
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
    footer: createFooter(i18n),
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
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "block-country.html",
    statusCode: 1009,
    text: "Country or region banned",
    card: helper.edgeBanned,
    reason: {
      explain: "Your country or region has been banned by the website owner.",
      howtodo:
        "Contact the website owner to request access from your location.",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "challenge-ip.html",
    statusCode: 403,
    text: "IP challenge",
    card: helper.challenge,
    reason: {
      explain: "Your IP address needs to be verified to access this website.",
      howtodo: "Complete the challenge below to continue.",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "challenge-country.html",
    statusCode: 403,
    text: "Country challenge",
    card: helper.challenge,
    reason: {
      explain: "Your location needs to be verified to access this website.",
      howtodo: "Complete the challenge below to continue.",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "managed-challenge.html",
    statusCode: 403,
    text: "Managed challenge",
    card: helper.challenge,
    reason: {
      explain: "Complete a challenge to verify you are human.",
      howtodo: "Complete the challenge below to continue browsing.",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "interactive-challenge.html",
    statusCode: 403,
    text: "Interactive challenge",
    card: helper.challenge,
    reason: {
      explain: "Complete an interactive challenge to continue.",
      howtodo: "Solve the challenge presented below to access the website.",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
  {
    fileName: "js-challenge.html",
    statusCode: 403,
    text: "JavaScript challenge",
    card: helper.underAttack,
    reason: {
      explain:
        "This website is using a security service to protect itself from online attacks.",
      howtodo:
        "Please enable JavaScript and wait while we verify your browser.",
    },
    footer: createFooter(i18n),
    script: function () {},
  },
];

exports.i18n = i18n;
