import React, { useState, useEffect } from 'react';
import {
  wrapShape,
} from 'react-shape-editor';
const Table = wrapShape(({ width, height, tableId, reserved, seats}) => {
  let color;
  if (reserved) {
    color = "red"
  }
  return (
  <svg className='table' width="100%" height="100%" >
    <pattern id="pattern-table" x="0" y="0" patternUnits="userSpaceOnUse" height='200' width='200' >
      <image href="table.jpg" />
    </pattern>
    
    <rect className='table' width={width} height={height} fill="url(#pattern-table)" />
    {reserved ? <rect width={width} height={height} fill="rgb(255,0,0,0.25)" /> : null}
    <text x={width/2} y={height/2 - 10} fill="white" fontSize="100%" fontWeight="bold" textAnchor="middle">
      Table: {tableId}
    </text>
    <text x={width/2} y={height/2 + 10} fill="white" fontSize="100%" fontWeight="bold" textAnchor="middle">
      Seats: {seats}
    </text>
    {reserved? <text x={width/2} y={height/2 + 30} fill="white" fontSize="100%" fontWeight="bold" textAnchor="middle"> (Reserved) </text> : null}
    
  </svg>)
});

export default Table;