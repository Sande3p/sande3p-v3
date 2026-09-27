/* eslint-disable */
// Legacy Grunticon compatibility for the Vite bundle. The original vendored
// loader references bare `loadCSS` identifiers, which fail in an ES module scope.
// We provide the same names in local and browser-global scope before invoking
// the app's legacy callback flow.

(function () {
  if (typeof window === 'undefined') return;

  function cssLoad(href, before, media) {
    const doc = window.document;
    const ss = doc.createElement('link');
    const ref = before || doc.head || doc.getElementsByTagName('head')[0];

    ss.rel = 'stylesheet';
    ss.href = href;
    if (media) ss.media = media;

    if (ref && ref.parentNode) {
      ref.parentNode.insertBefore(ss, ref.nextSibling);
    }

    return ss;
  }

  const loadCSS = window.loadCSS || cssLoad;
  window.loadCSS = loadCSS;

  function grunticon(payload, callback) {
    if (Array.isArray(payload)) {
      payload.forEach((href) => {
        if (href) loadCSS(href);
      });
    } else if (typeof payload === 'string' && payload) {
      loadCSS(payload);
    }

    if (typeof callback === 'function') {
      callback();
    }

    return {
      method: 'svg',
      loadCSS,
      svgLoadedCallback: function () {},
      embedSVG: function () {},
    };
  }

  window.grunticon = window.grunticon || grunticon;
  window.grunticon.loadCSS = window.grunticon.loadCSS || loadCSS;
  window.grunticon.svgLoadedCallback = window.grunticon.svgLoadedCallback || function () {};
  window.grunticon.method = window.grunticon.method || 'svg';
})();
