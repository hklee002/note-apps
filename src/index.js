import React from 'react'
import { render } from 'react-dom'
import { Provider  } from 'react-redux'
import { Router } from 'react-router-dom'
import configureStore from './store'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './components/App'


const store = configureStore();
const history = createBrowserHistory()

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
