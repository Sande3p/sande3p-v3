// Footer.jsx - migrated from app/components/footer/footer.html + FooterCtrl
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getBasic } from '../services/dataService';

export default function Footer() {
  const { get, set } = useLocalStorage();
  const [dbi, setDbi] = useState(() => get('dbi') || {});
  const navigate = useNavigate();

  useEffect(() => {
    getBasic().then((data) => {
      set('dbi', data);
      setDbi(data);
    });
  }, [get, set]);

  const scrollTop = useCallback(() => {
    document.querySelector('body').scrollTop = 0;
    navigate('/');
  }, [navigate]);

  return (
    <footer className="main-footer viewport">
      <div className="copyright">
        <a
          href="https://creativecommons.org/publicdomain/zero/1.0/"
          className="cc0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="ico icon-zero" data-grunticon-embed></i>{' '}
          <span className="tx">Creative Commons CC0</span>
        </a>{' '}
        {(dbi.connects || []).map((cc) => (
          <span key={cc.href}>
            {' '}
            |{' '}
            <a href={cc.href} className="cc0" target="_blank" rel="noopener noreferrer">
              <i className="ico" data-grunticon-embed></i> <span>{cc.name}</span>
            </a>
          </span>
        ))}{' '}
        |{' '}
        <a className="lk" onClick={scrollTop}>
          <span className="nb">{dbi.name}</span> <span className="nb">{dbi.surname}</span>
        </a>
      </div>
    </footer>
  );
}
