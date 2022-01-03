import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import App from './App';
import DoesNotExist from './misc/doesNotExist';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<DoesNotExist />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);


reportWebVitals();
