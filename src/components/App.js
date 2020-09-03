import React, { useEffect, useRef, useState } from 'react';
// import ConvertSvgForReact from '../converter';
import ReactDOMServer , { renderToStaticMarkup, } from 'react-dom/server';
import Navigation from './Navigation'
const navigation = <Navigation />
let String = ReactDOMServer.renderToStaticMarkup(navigation)


function App(props) {

  return (
    <>
      String
      <div>Hello</div>
    </>
  );
}
// new ConvertSvgForReact(App)
export default App;