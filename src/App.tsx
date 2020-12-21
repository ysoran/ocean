import './App.css';
import { Router } from 'react-router-dom';
import MainRoutes from './routes/main-routes';
import history from './utils/history';

function App() {
  return (
    <Router history={history}>
      <MainRoutes />
    </Router>
  );
}


export default App;
