import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Form from './components/Form';

class LandingPage extends Component {
  classMethodClick = () => {
    console.log('click two');
  }

  classMethodClickWithBind() {
    console.log(' FIX.3 - this is NOT ideal/performant because bind is called every render');
  }

  render() {
    return (
      <div>
        <h1>
          This is the landing page.
        </h1>
        <Button onClick={console.log('FIX.2 me to log to console on click')}>Click One</Button>
        <Button onClick={this.classMethodClick}>Click Two</Button>
        <Button onClick={this.classMethodClickWithBind.bind(this)}>Click Three</Button>
        <div style={{ padding: '24px' }} >
          <Link to="/checkout/offer-99">This is a link to check out with offer 99</Link>
        </div>
        <h1>
          The Form here is a separate component.
        </h1>
        <Form />
      </div>
    );
  }
}

export default LandingPage;
