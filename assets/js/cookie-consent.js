

window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#000"
      },
      "button": {
        "background": "#f1d600"
      }
    },
    "type": "opt-out",
    "content": {
      "message": "I use cookies to gain important analytic info in order to provide you with the best experience possible, and by using this website you agree to the cookie policy 🥰",
      "href": "https://blog.liorp.dev/terms/"
    },
    onInitialise: function (status) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        if (type === 'opt-in' && didConsent) {
          // enable cookies
          loadGAonConsent();
        }
        if (type === 'opt-out' && !didConsent) {
          // disable cookies
        }
      },
      onStatusChange: function(status, chosenBefore) {
        var type = this.options.type;
        var didConsent = this.hasConsented();
        if (type === 'opt-in' && didConsent) {
          // enable cookies
          loadGAonConsent();
        }
        if (type === 'opt-out' && !didConsent) {
          // disable cookies
        }
      },
      onRevokeChoice: function() {
        var type = this.options.type;
        if (type === 'opt-in') {
          // disable cookies
        }
        if (type === 'opt-out') {
          // enable cookies
          loadGAonConsent();
        }
      }
  });