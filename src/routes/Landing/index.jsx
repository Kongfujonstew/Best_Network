import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class LandingPage extends Component {
  classMethodClick = () => {
    console.log('click two');
  }

  classMethodClickWithBind() {
    console.log(' FIX - this is NOT ideal because bind is called every render');
  }

  render() {
    return (
      <div>
        <h1>
          This is the landing page.
        </h1>
        <Button onClick={console.log('FIX me to log to console on click')}>Click One</Button>
        <Button onClick={this.classMethodClick}>Click Two</Button>
        <Button onClick={this.classMethodClickWithBind.bind(this)}>Click Three</Button>
        <div style={{ padding: '24px'}} >
          <Link to="/checkout/offer-99">Check out with offer 99</Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
