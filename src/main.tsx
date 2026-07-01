import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AppErrorBoundary from './components/system/AppErrorBoundary';
import { PLATFORM_MODE } from './config/platformMode';
import './styles/index.css';
import './styles/platform-mode.css';
import './enhancements/ErbilEvidenceUpgrade.css';
import './enhancements/RegulatoryReadinessUpgrade.css';
import './enhancements/ErbilEvidenceUpgrade';
import './enhancements/RegulatoryReadinessUpgrade';

document.documentElement.dataset.platformMode = PLATFORM_MODE;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);
