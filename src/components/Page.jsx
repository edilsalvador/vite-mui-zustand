/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const { VITE_GA_MEASUREMENT_ID: GA_MEASUREMENT_ID } = import.meta.env;

function Page({ title }) {
  const location = useLocation();

  useEffect(() => {
    if (__NODE_ENV__ !== 'production' || !GA_MEASUREMENT_ID) {
      return;
    }

    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname,
        page_name: title,
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Helmet>
      <title>SAMPLE: {title}</title>
    </Helmet>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Page;
