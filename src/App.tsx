import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <main className="wrapper">
          <LandingPage />
        </main>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
