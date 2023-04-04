import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CustomThemeWrapper } from './theme';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <CustomThemeWrapper>
        <App />
      </CustomThemeWrapper>
    </BrowserRouter>
  </StrictMode>
);
