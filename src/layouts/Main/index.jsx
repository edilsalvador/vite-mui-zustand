import PropTypes from 'prop-types';
import Page from 'src/components/Page';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const MainLayout = props => {
  const { children, title } = props;

  return (
    <>
      <Page title={title} />
      <Navbar />
      <>{children}</>
      <Footer />
    </>
  );
};

MainLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default MainLayout;
