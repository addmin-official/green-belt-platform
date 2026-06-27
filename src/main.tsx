import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './enhancements/ErbilEvidenceUpgrade.css';
import './enhancements/ErbilEvidenceUpgrade';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
