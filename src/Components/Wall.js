import React, { useState, useEffect } from 'react';
import {
  wrapShape,
} from 'react-shape-editor';
const Wall = wrapShape(({ width, height }) => {
  return <svg width="100%" height="100%" >
    <pattern id="pattern-wall" x="0" y="0" patternUnits="userSpaceOnUse" height='200' width='200' >
      <image href="wall3.jpeg" />
    </pattern>
    <rect width={width} height={height} fill="url(#pattern-wall)" />
    <text
      x={width/2}
      y={height/2}
      fill="white"
      fontSize="16"
      fontWeight="bold"
      textAnchor="middle">
    </text>
  </svg>
});

export default Wall;