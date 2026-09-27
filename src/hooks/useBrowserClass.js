// useBrowserClass.js - migrated from MainCtrl.js browserInit()
import { useEffect } from 'react';
import { getBrowser } from '../utils/util';
import svgIconsCssUrl from '../assets/vendor/build/icons.data.svg.css?url';

// Adds a 'chrome-<version>' class to <html> for CSS targeting, and
// keeps the grunticon icon script wired the same way MainCtrl.js did.
export function useBrowserClass() {
  useEffect(() => {
    const browserVer = getBrowser();
    document.documentElement.classList.add(`chrome-${browserVer.chrome}`);

    if (typeof window.grunticon !== 'undefined') {
      // Legacy non-SVG fallback tiers (icons.data.png.css / icons.fallback.css)
      // are intentionally left out here - see MIGRATION.md "grunticon assets"
      // note. Every browser this site supports resolves to the 'svg' method.
      window.grunticon(
        [svgIconsCssUrl, svgIconsCssUrl, svgIconsCssUrl],
        () => {
          // inlines raw <svg> markup into any data-grunticon-embed element
          // (e.g. .curve1/.curve2), same as the `cb` callback in the old app/index.html
          window.grunticon.svgLoadedCallback();
          if (window.grunticon.method) {
            document.documentElement.className += ` grunticon-${window.grunticon.method}`;
          }
        }
      );
    }
  }, []);
}
