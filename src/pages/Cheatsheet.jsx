// Cheatsheet.jsx - migrated from app/components/cheatsheet + react-native (CheatCtrl)
// Both original AngularJS routes used an identical controller/template pair
// that only differed by Firebase topic + heading fallback text, so this
// single component is reused for both /cheatsheet and /reactnative routes.
import { useEffect, useState } from 'react';
import { subscribeCheatsheet } from '../services/cheatService';
import Footer from '../components/Footer';

export default function Cheatsheet({ topic = 'git', title = 'Cheatsheet', themeExtra = '' }) {
  const [isLoading, setIsLoading] = useState(true);
  const [git, setGit] = useState({ data: {} });

  useEffect(() => {
    const unsubscribe = subscribeCheatsheet(topic, (val) => {
      setGit(val || { data: {} });
      setIsLoading(false);
    });
    return unsubscribe;
  }, [topic]);

  return (
    <main
      data-theme={`cheaty${themeExtra ? ` ${themeExtra}` : ''}`}
      className={`main main-card viewport${isLoading ? ' loading' : ''}`}
    >
      <span className="loader ico icon-loading" data-grunticon-embed></span>
      <div data-scrollspy="10" className="artboard">
        <header className="main-head">
          <div className="viewport">
            <h1>
              <span className="ico icon-git-logo" data-grunticon-embed></span>{' '}
              <small>{git.groupTitle || title}</small>
            </h1>
            <div className="gist" dangerouslySetInnerHTML={{ __html: git.gist || '' }} />
          </div>
        </header>
        <main className="main">
          <div className="viewport">
            <div className="deck">
              {Object.values(git.data || {}).map((item, i) => (
                <div className="card" key={i}>
                  <header className="card-header">
                    <h2>{item.title}</h2>
                    <div className="detail">{item.detail}</div>
                  </header>
                  <div className="card-con">
                    {(item.commands || []).map((cmd, ci) => (
                      <div className={`rw fx ${cmd.type || ''}`} key={ci}>
                        <div className="cmd-wrap">
                          <div className="code cmd">
                            <span className="sy">{item.globalCommandPrefix}</span> {cmd.command}
                          </div>
                        </div>
                        <div
                          className="cmd-desc"
                          dangerouslySetInnerHTML={{ __html: cmd.detail || '' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </main>
  );
}
