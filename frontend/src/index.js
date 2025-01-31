import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import dotenv from 'dotenv';

dotenv.config();

const root = createRoot(document.getElementById('root'));
root.render(<App />);
