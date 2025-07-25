import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { TodoProvider } from './contexts/TodoContext.tsx';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <TodoProvider>
          <App/>
      </TodoProvider>      
  </StrictMode>
  
);