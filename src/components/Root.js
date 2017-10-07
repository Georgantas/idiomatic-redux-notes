
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'; // note: old version of react-router is used
import App from './App'

// parentheses in route indicate that it's optional

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/(:filter)' component={App} />
        </Router>
    </Provider>
)

export default Root;
