// ProgressiveImg.jsx - migrated from app/js/directive.js (progressiveImg directive)
import { useState } from 'react';

// Renders a low-quality placeholder image that swaps to 'hq-loaded'
// styling once the high quality image has finished loading.
export default function ProgressiveImg({ lqSrc, hqSrc, alt, figureClassName = 'fig' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`${figureClassName}${loaded ? ' hq-loaded' : ''}`}>
      <img className="lq" src={lqSrc} alt={alt} />
      <img className="hq" src={hqSrc} alt={alt} onLoad={() => setLoaded(true)} />
    </figure>
  );
}
