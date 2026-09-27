// Rem.jsx - migrated from app/components/rem/rem.html + rem.js (RemCtrl)
import { useMemo, useState } from 'react';
import Footer from '../components/Footer';

function getRem(fontSize) {
  const store = [];
  for (let i = 10; i <= 40; i++) {
    store.push(`${i}px => ${((1 / fontSize) * i).toFixed(4)} rem`);
  }
  return store;
}

export default function Rem() {
  const [baseSize, setBaseSize] = useState('16');

  const pxStore = useMemo(() => {
    const v = parseFloat(baseSize);
    return v ? getRem(v) : [];
  }, [baseSize]);

  return (
    <main data-theme="rem" className="main main-card cover viewport">
      <div data-scrollspy="10" className="artboard">
        <header className="main-head shadow md">
          <div className="viewport">
            <h1>
              <span className="ico logo-ico" data-grunticon-embed></span>px to rem
            </h1>
          </div>
        </header>
        <div className="main-con">
          <div className="viewport">
            <div className="deck">
              <div className="card limit-height">
                <header className="card-header fx">
                  <h2>Base size:</h2>
                  <div className="detail">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      role="text"
                      id="sizePx"
                      className="text-ctrl"
                      onInput={(e) => setBaseSize(e.currentTarget.textContent)}
                    >
                      16
                    </span>
                    <span className={!baseSize ? 'hidden' : ''}> px</span>
                  </div>
                </header>
                <div className="card-con columned limit-height">
                  {pxStore.map((val) => (
                    <div className="rw fx" key={val}>
                      <div className="cmd-wrap">
                        <div className="code cmd">
                          <span className="sy">{val}</span>
                        </div>
                      </div>
                      <div className="cmd-desc"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
