import React from 'react';

function CustomLink({ to, children, ...rest }) {
  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export default CustomLink;
