import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './enhancements/ErbilEvidenceUpgrade.css';
import './enhancements/RegulatoryReadinessUpgrade.css';
import './enhancements/ErbilEvidenceUpgrade';
import './enhancements/RegulatoryReadinessUpgrade';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
