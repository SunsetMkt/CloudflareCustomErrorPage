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
    yourIpPre: "Your IP is ",
    yourIpPost: " ",
    rayIdPre: "Ray ID is ",
    rayIdPost: " ",
  },

  // Page-specific reason strings
  reasons: {
    index: {
      explain:
        "This is CloudflareCustomErrorPage, a lightweight custom error page written for Cloudflare that uses ejs as a template compiler.",
      howtodo:
        "Check Our Project on <a href='https://github.com/186526/CloudflareCustomErrorPage'>GitHub</a>.",
    },
    "5xxerror": {
      explain: "The web server reported a Server error.",
      howtodo: "Please try again in a few minutes.",
    },
    "1xxxerror": {
      explain: "Cloudflare Edge Network reported a error.",
      howtodo: "Please try again in a few minutes.",
    },
    "block-ip": {
      explain:
        "Request the website owner to investigate their Cloudflare security settings or allow your client IP address. Since the website owner blocked your request, Cloudflare support cannot override a customer's security settings.",
      howtodo:
        "Provide the website owner with a screenshot of the 1006 error message you received.",
    },
    "block-waf": {
      explain:
        "A client or browser is blocked by a Cloudflare customer's Firewall Rules.",
      howtodo:
        "Provide the website owner with a screenshot of the 1020 error message you received.",
    },
    1015: {
      explain: "Your request rate to the current site is too fast.",
      howtodo: "Please try again in a few minutes.",
    },
    "block-country": {
      explain: "Your country or region has been banned by the website owner.",
      howtodo:
        "Contact the website owner to request access from your location.",
    },
    "challenge-ip": {
      explain: "Your IP address needs to be verified to access this website.",
      howtodo: "Complete the challenge below to continue.",
    },
    "challenge-country": {
      explain: "Your location needs to be verified to access this website.",
      howtodo: "Complete the challenge below to continue.",
    },
    "managed-challenge": {
      explain: "Complete a challenge to verify you are human.",
      howtodo: "Complete the challenge below to continue browsing.",
    },
    "interactive-challenge": {
      explain: "Complete an interactive challenge to continue.",
      howtodo: "Solve the challenge presented below to access the website.",
    },
    "js-challenge": {
      explain:
        "This website is using a security service to protect itself from online attacks.",
      howtodo:
        "Please enable JavaScript and wait while we verify your browser.",
    },
  },

  // Page text translations
  pageText: {
    index: "OK",
    "5xxerror": "Server-side Error",
    "1xxxerror": "Cloudflare-side Error",
    "block-ip": "Your IP address has been banned",
    "block-waf": "Access denied",
    1015: "Too Many Requests",
    "block-country": "Country or region banned",
    "challenge-ip": "IP challenge",
    "challenge-country": "Country challenge",
    "managed-challenge": "Managed challenge",
    "interactive-challenge": "Interactive challenge",
    "js-challenge": "JavaScript challenge",
  },
};

exports.i18n = i18n;
