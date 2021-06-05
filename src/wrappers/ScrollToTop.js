import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

function ScrollToTop({children }) {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return <Fragment>{children}</Fragment>;
}

export default ScrollToTop;