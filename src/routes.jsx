import { Routes, Route } from 'react-router-dom';
import { URL_HELPERS } from './config/url';
import Home from './views/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={URL_HELPERS.home} element={<Home />} exact />
    </Routes>
  );
};

export default AppRoutes;
