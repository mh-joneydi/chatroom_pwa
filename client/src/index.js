import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './styles/theme';
import './styles/index.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import store from './redux/store';
import {Provider} from 'react-redux';


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <Provider store={store}>
                    <App />
                </Provider>
        </ThemeProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

