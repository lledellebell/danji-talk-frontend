import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';

function App() {
  return (
    <Router>
      <main className="wrapper">
        <LandingPage />
      </main>
    </Router>
  );
}

export default App;
