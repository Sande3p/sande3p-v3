// Landing.jsx - migrated from app/components/landing/landing.html + landing.js (LandingCtrl)
import { useCallback, useEffect, useMemo, useState } from "react";
import ProgressiveImg from "../components/ProgressiveImg";
import Footer from "../components/Footer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  getBasic,
  getConfig,
  getHistory,
  getLatestStat,
  getStat,
} from "../services/dataService";
import configData from "../config";
import { getProTechs, getTechTitle } from "../utils/util";

const WALL_COUNT = 8;

export default function Landing() {
  const { get, set } = useLocalStorage();
  const config = useMemo(() => getConfig(), []);

  const [dbi, setDbi] = useState(() => get("dbi") || {});
  const [dbl, setDbl] = useState(() => get("dbl") || []);
  const [dbs, setDbs] = useState(() => get("dbs") || {});
  const [hello, setHello] = useState("");

  // fetch basic profile info
  useEffect(() => {
    getBasic().then((data) => {
      set("dbi", data);
      setDbi(data);
    });
  }, [get, set]);

  // fetch contest history (persisted for parity with the original app; not rendered on this page)
  useEffect(() => {
    getHistory()
      .then((data) => {
        const content = data?.result?.content;
        if (content) set("dbh", content);
      })
      .catch(() => {});
  }, [set]);

  // fetch challenge stats
  useEffect(() => {
    getStat()
      .then((data) => {
        const content = data?.result?.content;
        if (content) {
          set("dbs", content);
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
        if (!Array.isArray(content)) return;
        set("dbl", content);
        setDbl(content);
      })
      .catch(() => {});
  }, [set]);

  const send = useCallback(
    (e) => {
      e.preventDefault();
      const msg = hello;
      setHello("");
      window.location = `mailto:${dbi.email}?subject=Hello &body=${msg}`;
    },
    [hello, dbi],
  );

  const enter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        send(e);
      }
    },
    [send],
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
              lqSrc={dbi.localPhotoLinkLq || "./external/hi4sandy-lq.jpg"}
              hqSrc={dbi.localPhotoLink || "./external/hi4sandy.jpg"}
              alt={dbi.name}
            />
            <h1 className="nm">
              <span>{dbi.name}</span>
              <span>{dbi.surname}</span>
            </h1>
            <h2 className="tagline">{dbi.tagline || "\u00A0"}</h2>
          </div>
        </div>

        <div className="sn-rw th-lgt exp cvs">
          <figure className="curve1 icon-curve1"></figure>
          <div className="snc">
            <div className="bg-tx">Skills</div>
            <div className="card card-skill">
              <div className="info-group">
                <h2 id="stats">Skills and Awards</h2>
                <div className="stats-row">
                  <div className="rw-s wi">
                    <div className="stat-item">
                      <i className="icon-trophy" data-grunticon-embed></i>
                      <span className="v">
                        {(dbs.DEVELOP && dbs.DEVELOP.wins) || "\u00A0"}
                      </span>
                    </div>
                    <div className="u">
                      <a
                        href={configData.topcoderProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        topcoder
                      </a>{" "}
                      challenge wins
                    </div>
                  </div>

                  <div className="rw-s nw">
                    <div className="stat-item">
                      <i className="icon-collection-add" data-grunticon-embed></i>
                      <span className="v">{config.tcoFinalistCount}x</span>
                      <span className="u">
                        <a
                          href="https://www.topcoder.com/community/member-programs/topcoder-open/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          TCO
                        </a>{" "}
                        finalist
                      </span>
                    </div>

                    <div className="stat-item">
                      <i className="icon-collection-add" data-grunticon-embed></i>
                      <span className="v">{config.tcoTripWinnerCount}x</span>
                      <span className="u">
                        <a
                          href="https://www.topcoder.com/community/member-programs/topcoder-open/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          TCO
                        </a>{" "}
                        trip winner
                      </span>
                    </div>
                  </div>
                </div>

                <section className="apps-section hide">
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
                    <h3
                      key={i}
                      dangerouslySetInnerHTML={{ __html: item.html }}
                    />
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
              <div className="gear-illustration" aria-hidden="true">
                <svg viewBox="0 0 218.6 286.4" xmlns="http://www.w3.org/2000/svg">
                  <g className="gear-ring gear-ring--slow">
                    <path
                      id="node1"
                      className="gear-1"
                      d="M66.1 271.4c6.4 6.4 15.8 10.1 20.2 8.1.8-.4 4.3-4.5 7.8-9.1 5.6-7.4 7-8.7 11.7-10.9 8.5-3.8 19.3-3.2 26.7 1.7 3.2 2.1 4.5 4.1 9.3 13s5.6 10.6 9.4 11.8c7.3 2.2 21.4-4.6 23.7-11.6.9-2.7.5-4.3-3.4-14.1s-4.2-11.6-3.8-15.3c1-8.7 7.6-17.4 16-21.4 4.7-2.2 6.6-2.4 15.9-1.8 5.8.4 11.2.4 12 0 4.9-2.3 8.2-13.8 6.6-23.3-.7-4.2-1.1-4.8-3.8-6.3s-7.3-2-12.5-2.6c-13.5-1.4-20.9-6.8-24.8-18.4-3.3-9.5-1.6-16.6 6.6-27.4 4.2-5.7 5.6-9.9 4-13.2s-11.6-11.1-16.6-12.5-8.9.1-15.6 9.6c-4.6 6.7-5.3 7.3-11.8 10.3s-7.5 3.1-13.6 2.4a30.4 30.4 0 0 1-11.4-3.5c-4.5-2.6-5.1-3.4-10.1-13-3-5.6-6.3-10.9-7.3-11.6-2.9-2.3-8.3-1.6-15.8 2-12.2 5.7-13.2 9.5-6.4 24.3 3.3 7.2 3.5 8.3 2.8 14a24.6 24.6 0 0 1-4.5 12c-3.6 5.3-4.4 6-10.8 9s-7.3 3.2-15.5 2.3c-11.6-1-15 0-17.4 5.6s-2.8 17.3-1.2 20.7 5.6 5 12.7 5.5c9.1.6 13.6 1.9 18.2 5.1 8.6 6 13.4 20 10 29.2a55.3 55.3 0 0 1-6.1 10.6c-6.9 9.4-7.1 13-1.2 18.8zm21.2-72.9a41.4 41.4 0 0 1 9.3-24.4c4.1-4.9 5.5-6 12.8-9.3s9-3.7 15.4-3.7a41.6 41.6 0 0 1 24.7 8.8c4.3 3.5 5.3 5 9.2 13.5s4.4 10 4 16.4c-.5 8.8-4.8 19.4-10.5 25.2s-16.5 10.9-24.9 11.5c-10.3.7-22.2-4.1-29.9-11.8-5.2-5.4-10.3-18.3-10.1-26.1z"
                    />
                  </g>
                  <g className="gear-ring gear-ring--fast">
                    <path
                      id="node2"
                      className="gear-1"
                      d="M6.1 105.7c3.2 2.8 4.7 2.7 12.2-.8 9.6-4.3 16.4-3.5 24.7 2.8 4.1 3.3 6.2 9.8 5.6 17.8s.4 11.7 5 13.2 12.1 1.6 14.7.4 3.9-4.8 4.1-10.4c.3-9.3 4.2-15.5 11.7-19s14.8-2.4 22 3.4 10.4 5.3 15.6-.9 5.7-10 4.5-12.7-3.7-4.2-7-6.6c-6.5-4.7-10.1-10.5-9.9-15.8.5-10.5 4.4-16.1 13.9-20.6 3.5-1.6 6.8-3.6 7.5-4.5 2.5-3.2 0-12.5-4.7-17.3-2.9-3-6.4-2.9-14.1.7s-10.4 3.5-16 1.1c-9.8-4-13.5-10.3-13-21.9.3-4.3 0-8.8-.6-10.1-2.1-4.6-17.6-6.3-20.7-2.2-.7 1.1-2 5.8-2.7 10.5C57.4 23 55.1 26.4 47.3 30s-11.9 3.2-20.7-2.4-11.4-5.9-15.7-1-7 10.9-5.8 13.6 3.8 4.4 7.3 7c9.2 7.1 11.5 14.1 8.2 24.1-1.8 5.7-4.2 8.1-11.2 11.3-3.5 1.6-7.2 3.9-8.1 5.1-3.1 3.5-.4 13.4 4.8 18zm31.4-36.8c.9-22.9 27.8-35.2 45.6-21.1a28.1 28.1 0 0 1-5.6 47.7c-10.7 4.9-24.8 2.4-32.5-6a31.1 31.1 0 0 1-7.5-20.6z"
                    />
                  </g>
                </svg>
              </div>
            </figure>
            <h2 id="RecentWork">Experiences</h2>
          </div>
          <div className="coderwall centered theme-2star">
            {wall.map((item, index) => (
              <div
                key={item.id}
                className={`wallpost${index === wall.length - 1 ? " hanging" : ""}`}
              >
                <a
                  href={`https://www.topcoder.com/challenge-details/${item.id}/?type=develop`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uderlayed-link"
                ></a>
                <span className="sno">{index + 1}</span>
                <h3>{item.title}</h3>
                <div className="wc">
                  <div className="work-meta">
                    <div className="work-company">{item.company}</div>
                    {item.location && (
                      <div className="work-location">{item.location}</div>
                    )}
                  </div>
                  <div className="tech-involved">
                    <div className="l">Techstack:</div>
                    <div className="techs">
                      {getProTechs(item).map((tech) => (
                        <i
                          key={tech}
                          title={getTechTitle(tech)}
                          className={`${tech} colored`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  {Array.isArray(item.highlights) &&
                    item.highlights.length > 0 && (
                      <ul className="work-highlights">
                        {item.highlights.map((highlight, highlightIndex) => (
                          <li key={`${item.id}-highlight-${highlightIndex}`}>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </div>
            ))}
          </div>
          <figure
            className="abstract-footer icon-abstract1"
            data-grunticon-embed
          ></figure>
        </div>

        <div className="sn-rw th-lgt showcase th-ziggy coderwall-effect">
          <div className="bg-tx">2</div>
          <h2 id="BackToWork">Labs</h2>
          <div className="bg-ziggy icon-abstract3-2" data-grunticon-embed></div>
          <div className="exploders">
            <div className="exploder">
              <figure className="bg">
                <img
                  className="lq"
                  src="./external/cheatsheat-ip6-lq.jpg"
                  alt=""
                />
                <img
                  className="hq"
                  src="./external/cheatsheat-ip6.png"
                  alt=""
                />
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
              <a className={`lk-send${hello ? " a" : ""}`} onClick={send}>
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
