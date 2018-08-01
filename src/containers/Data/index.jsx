// This doesn't work (in this repo)
// Just here to show you what the frontend code looks like

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Api from '../../lib/api.js';

class Data extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { d: null };
    this.Component = props.component;
    // TODO: Add second parameter for spec content
    if (props.url) {
      this.url = props.url;
    }
  }

  componentDidMount() {
    let url;
    if (this.props.url.length > 1) {
      url = this.props.url;
    } else {
      const path = location.pathname.split('/');
      let slug = path[path.length - 1];
      url = `/content/${slug}`;
    }

    if (window.urlsCache[url]) {
      console.log('using cached data for url: ', url);
      this.setState({ d: window.urlsCache[url] });
    } else {
      Api.get(url)
        .then((d) => {
          this.setState({ d });
          window.urlsCache[url] = d;
        });
    }

    //TODO handle err, refetching if fail
  }

  render() {
    const { state: { d }, Component } = this;

    if (!d) {
      return <div>Loading data . . .</div>;
    }

    return <Component {...d} />;
  }
}

Data.propTypes = {
  component: PropTypes.func.isRequired,
  url: PropTypes.string
};

Data.defaultProps = {
  url: '/'
};

export default (component, url) => () => <Data component={component} url={url} />;
