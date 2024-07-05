// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <App />,
// document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import DataProvider from './redux/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(

  <DataProvider>
    <App />
  </DataProvider>
  ,
  document.getElementById('root')
);

reportWebVitals();