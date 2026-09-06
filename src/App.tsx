/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { ProblemDetail } from './pages/ProblemDetail';
import { Infrastructure } from './pages/Infrastructure';
import { Impact } from './pages/Impact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="explore/problem/:id" element={<ProblemDetail />} />
          <Route path="accountability" element={<Infrastructure />} />
          <Route path="impact" element={<Impact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
