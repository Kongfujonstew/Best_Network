import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import Landing from 'routes/Landing';
import Checkout from 'routes/Checkout';

const App = () => (
  <main>
    <Header />
      <Switch>
        <Route exact path="/checkout/404" component={() => <div>404 Offer Not Found</div>}/>
        <Route path="/checkout/" component={Checkout} />
        <Route path="/" component={Landing} />
      </Switch>
  </main>
);

export default App;
