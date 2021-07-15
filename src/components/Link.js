import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    //prevent default function
    event.preventDefault();
    //allows you to update the url
    window.history.pushState({}, '', href);

    //make a naviation event to tell route component that URL has changed
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };
  return (
    <a
      onClick={onClick}
      className={className}
      href={href}
      children={children}
    ></a>
  );
};

export default Link;
