import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import DoesNotExist from './pages/doesNotExist';
import InGame from './pages/inGame';


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<DoesNotExist />} />
      <Route path="/inGame" element={<InGame />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);



