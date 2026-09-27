// App.jsx - migrated from app/index.html + app/js/app.js (root module wiring)
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Cheatsheet from './pages/Cheatsheet';
import Rem from './pages/Rem';
import { useBrowserClass } from './hooks/useBrowserClass';

function App() {
  // adds browser detection class + wires grunticon icon loader, same as MainCtrl.js did
  useBrowserClass();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route
        path="/cheatsheet"
        element={<Cheatsheet topic="git" title="Cheatsheet" />}
      />
      <Route
        path="/reactnative"
        element={<Cheatsheet topic="reactnative" title="React Native" themeExtra="react-native" />}
      />
      <Route path="/rem" element={<Rem />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default App;
