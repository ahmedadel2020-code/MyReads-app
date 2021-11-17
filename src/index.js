import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css';

ReactDOM.render(
    
    // wrap our App inside BrowserRouter 

    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')

)
