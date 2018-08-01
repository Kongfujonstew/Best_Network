import 'babel-polyfill';
import '!style-loader!css-loader!sass-loader!styles.scss';

import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import App from 'containers/App';
import store, { history } from 'store';


const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer>
          <Component />
        </AppContainer>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/App', () => renderApp(App));
}