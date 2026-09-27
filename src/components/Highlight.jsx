import React from 'react';

const HighlightedText = ({ text, color }) => {
  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const highlightStyle = {
    content: '""',
    position: 'absolute',
    bottom: '8px',
    left: 0,
    right: 0,
    height: '25%',
    backgroundColor: color,
    zIndex: -1,
  };

  return (
    <span className="highlighted-text" style={containerStyle}>
      {text}
      <span className="highlighted-background" style={highlightStyle}></span>
    </span>
  );
}

export default HighlightedText;
