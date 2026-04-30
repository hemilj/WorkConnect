import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<main className="flex-grow"><Login /></main>} />
          <Route path="/register" element={<main className="flex-grow"><Register /></main>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
