// Landing.jsx - migrated from app/components/landing/landing.html + landing.js (LandingCtrl)
import { useCallback, useEffect, useMemo, useState } from 'react';
import ProgressiveImg from '../components/ProgressiveImg';
import Footer from '../components/Footer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getBasic, getConfig, getHistory, getLatestStat, getStat } from '../services/dataService';
import { dateDiff, getProTechs, getTechTitle, getWins } from '../utils/util';

const WALL_COUNT = 8;

export default function Landing() {
  const { get, set } = useLocalStorage();
  const config = useMemo(() => getConfig(), []);

  const [dbi, setDbi] = useState(() => get('dbi') || {});
  const [dbl, setDbl] = useState(() => get('dbl') || []);
  const [dbs, setDbs] = useState(() => get('dbs') || {});
  const [hello, setHello] = useState('');

  // fetch basic profile info
  useEffect(() => {
    getBasic().then((data) => {
      set('dbi', data);
      setDbi(data);
    });
  }, [get, set]);

  // fetch contest history (persisted for parity with the original app; not rendered on this page)
  useEffect(() => {
    getHistory()
      .then((data) => {
        const content = data?.result?.content;
        if (content) set('dbh', content);
      })
      .catch(() => {});
  }, [set]);

  // fetch challenge stats
  useEffect(() => {
    getStat()
      .then((data) => {
        const content = data?.result?.content;
        if (content) {
          set('dbs', content);
          setDbs(content);
        }
      })
      .catch(() => {});
  }, [set]);

  // fetch latest stat / wins (used for the "recent work" wall)
  useEffect(() => {
    getLatestStat()
      .then((data) => {
        const content = data?.result?.content;
        if (!content) return;
        const wins = getWins(content);
        set('dbl', wins);
        setDbl(wins);
      })
      .catch(() => {});
  }, [set]);

  const diffDate = useCallback(
    (item) => `${dateDiff(item.submissionEndDate, item.registrationStartDate)} days`,
    []
  );

  const send = useCallback(
    (e) => {
      e.preventDefault();
      const msg = hello;
      setHello('');
      window.location = `mailto:${dbi.email}?subject=Hello &body=${msg}`;
    },
    [hello, dbi]
  );

  const enter = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        send(e);
      }
    },
    [send]
  );

  const wall = (dbl || []).slice(0, WALL_COUNT);

  return (
    <div className="page artboard sans" data-theme="sans">
    <main className="main main-card viewport">
      <div className="sn-rw centered th1">
        <header className="main-head">
          <div className="lt"></div>
          <div className="rt"></div>
        </header>

        <div className="card card-h1">
          <ProgressiveImg
            lqSrc={dbi.localPhotoLinkLq || './external/hi4sandy-lq.jpg'}
            hqSrc={dbi.localPhotoLink || './external/hi4sandy.jpg'}
            alt={dbi.name}
          />
          <h1 className="nm">
            <span>{dbi.name}</span>
            <span>{dbi.surname}</span>
          </h1>
          <h2 className="tagline">{dbi.tagline || '\u00A0'}</h2>
        </div>
      </div>

      <div className="sn-rw th-lgt exp cvs">
        <figure className="curve1 icon-curve1"></figure>
        <div className="snc">
          <div className="bg-tx">Skills</div>
          <div className="card card-skill">
            <div className="info-group">
              <h2 id="stats">Stats</h2>
              <div className="rw-s wi">
                <i className="icon-trophy" data-grunticon-embed></i>
                <span className="v">{(dbs.DEVELOP && dbs.DEVELOP.wins) || '\u00A0'}</span>
                <span className="u">
                  <a
                    href="https://www.topcoder.com/members/hi4sandy/details/?track=DEVELOP&subTrack=UI_PROTOTYPE_COMPETITION"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    topcoder
                  </a>{' '}
                  wins
                </span>
              </div>
              <div className="rw-s nw">
                <i className="icon-collection-add" data-grunticon-embed></i>
                <span className="v">{config.tcoFinalistCount}</span>{' '}
                <span className="u">
                  {' '}
                  times{' '}
                  <a
                    href="https://www.topcoder.com/community/topcoder-opens/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TCO
                  </a>{' '}
                  finalist
                </span>
                <div className="tagline">{config.tcoFinalistDesc}</div>
              </div>

              <section className="apps-section">
                <h3>Apps</h3>
                <div className="rw-s nw">
                  <div className="app-thumb">
                    <a
                      className="app-wrap"
                      href="https://itunes.apple.com/in/app/time-keeper/id1230340803?mt=8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <figure className="app-icons">
                        <img
                          src="http://is1.mzstatic.com/image/thumb/Purple118/v4/d9/7f/39/d97f39c5-bf33-c928-e361-97bfb70d7967/source/175x175bb.jpg"
                          alt=""
                        />
                      </figure>
                      <h4 className="app-name tagline">Timekeeper </h4>
                    </a>
                    <div className="appstore-links">
                      <div className="u">
                        <a
                          href="https://itunes.apple.com/in/app/time-keeper/id1230340803?mt=8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          On iOS
                        </a>
                      </div>
                      <div className="u">
                        <a
                          href="https://play.google.com/store/apps/details?id=com.sanstimekeeper&hl=en"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          On Android
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="whatIdo">
                {config.whatIDo.map((item, i) => (
                  <h3 key={i} dangerouslySetInnerHTML={{ __html: item.html }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <figure className="curve2 icon-curve2"></figure>
      </div>

      <div className="sn-rw th-beta has-top-curve has-coderwall">
        <div className="bg-grad"></div>
        <div className="gear-sn">
          <figure className="fig">
            <i className="icon-gear" data-grunticon-embed></i>
          </figure>
          <h2 id="RecentWork">Recent work</h2>
        </div>
        <div className="coderwall centered theme-2star">
          {wall.map((item, index) => (
            <div
              key={item.id}
              className={`wallpost${index === wall.length - 1 ? ' hanging' : ''}`}
            >
              <a
                href={`https://www.topcoder.com/challenge-details/${item.id}/?type=develop`}
                target="_blank"
                rel="noopener noreferrer"
                className="uderlayed-link"
              ></a>
              <span className="sno">{index + 1}</span>
              <h3>
                <a
                  href={`https://www.topcoder.com/challenge-details/${item.id}/?type=develop`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </h3>
              <div className="wc">
                <div className="speed">
                  Completed in <em>{diffDate(item)}</em>
                </div>
                <div className="tech-involved">
                  <div className="l">Based on:</div>
                  <div className="techs">
                    {getProTechs(item).map((tech) => (
                      <i
                        key={tech}
                        title={getTechTitle(tech)}
                        className={`icon ${tech}`}
                        data-grunticon-embed
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <figure className="abstract-footer icon-abstract1" data-grunticon-embed></figure>
      </div>

      <div className="sn-rw th-lgt showcase th-ziggy coderwall-effect">
        <div className="bg-tx">2</div>
        <h2 id="BackToWork">Labs</h2>
        <div className="bg-ziggy icon-abstract3-2" data-grunticon-embed></div>
        <div className="exploders">
          <div className="exploder">
            <figure className="bg">
              <img className="lq" src="./external/cheatsheat-ip6-lq.jpg" alt="" />
              <img className="hq" src="./external/cheatsheat-ip6.png" alt="" />
              <div className="color-filter"></div>
            </figure>
            <a href="#/cheatsheet" className="masked-lnk"></a>
            <h3>Git Cheatsheet</h3>
          </div>
          <div className="exploder">
            <figure className="bg">
              <img className="lq" src="./external/map-layer-lq.jpg" alt="" />
              <img className="hq" src="./external/map-layer.jpg" alt="" />
              <div className="color-filter"></div>
            </figure>
            <h3>Visualization Project</h3>
          </div>
          <div className="exploder">
            <figure className="bg">
              <img className="lq" src="./external/px2rem-5x-lq.png" alt="" />
              <img className="hq" src="./external/px2rem-5x.png" alt="" />
              <div className="color-filter"></div>
            </figure>
            <a href="#/rem" className="masked-lnk"></a>
            <h3>px to rem</h3>
          </div>
        </div>
      </div>

      <div className="sn-rw th-lgt th-quoty">
        <h2 id="SayHello" className="hide">
          Say Hello
        </h2>
        <form className="frm quote">
          <label htmlFor="iph">Get in touch</label>
          <div className="rw">
            <div>
              <input
                type="text"
                autoComplete="off"
                name="hello"
                id="iph"
                value={hello}
                onChange={(e) => setHello(e.target.value)}
                onKeyUp={enter}
              />
            </div>
            <a className={`lk-send${hello ? ' a' : ''}`} onClick={send}>
              Send
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </main>
    </div>
  );
}
