import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import SearchPage from './components/SearchForm';
import FavoritesPage from './components/FavoritesPage';
import NotFound from './components/NotFound';
const BookDetails = lazy(() => import('./components/BookDetails'));

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route
            path="/book/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <BookDetails />
              </Suspense>
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
