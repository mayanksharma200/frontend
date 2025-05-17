import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css';  // Import global CSS here
import 'react-toastify/dist/ReactToastify.css'; // alr

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
