import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import DoesNotExist from './pages/doesNotExist';


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<DoesNotExist />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);



