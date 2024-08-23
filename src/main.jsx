import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import App from './App.jsx'
import './index.css'
import UserStore from './core/UserStore.js';
import AuthStore from './core/AuthStore.js';

const store = configureStore({
  reducer: {
    userStore: UserStore,
    authStore: AuthStore
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
)
