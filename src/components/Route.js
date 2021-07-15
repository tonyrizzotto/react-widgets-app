import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const onLocationChange = () => {
    setCurrentPath(window.location.pathname);
    console.log('Location Changed');
  };

  //Listen for a URL change
  useEffect(() => {
    window.addEventListener('popstate', onLocationChange);

    //return a cleanup function to remove event listener
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);
  return currentPath === path ? children : null;
};

export default Route;
