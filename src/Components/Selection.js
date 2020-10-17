import React, { useState, useEffect } from 'react';
import {
  wrapShape,
} from 'react-shape-editor';
const Selection = wrapShape(({ width, height}) => {
  return <rect fill="rgba(229,240,244,0.3)" height="10" stroke="rgba(53,33,140,0.3)" stroke-width="1" width="10" x="-5" y="42.5" style="cursor: ew-resize; opacity: 1;"></rect>
});

export default Selection;