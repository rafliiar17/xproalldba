import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import './styles/fa-all.css';
import LoadingPage from './first';
import Container from './container';
import reportWebVitals from './reportWebVitals';


const App = () => {
  const [isFirstAccess, setIsFirstAccess] = useState(true);

  const handleFirstAccessSubmit = (name) => {
    setIsFirstAccess(false);
    // You can store the name in the state or local storage if necessary
  };

  return (
    <>
      {isFirstAccess ? (
        <LoadingPage onSubmit={handleFirstAccessSubmit} />
      ) : (
        <Container />
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
