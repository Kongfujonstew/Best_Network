/* eslint-disabl */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from '../../../../../../../src/theme';
import MV18 from './index';

export default () => {
  storiesOf('Checkout Upsell MV18', module)
    .add('upsell mv18, numInstallment=1', () => (
      <MuiThemeProvider theme={theme}>
        <MV18
          numInstallments={1}
          interval=""
          amount="197.00"
          paymentDescription="Add this to your order for only $197.00."
        />
      </MuiThemeProvider>
    ))

    .add('upsell mv18, numInstallment=3', () => (
      <MuiThemeProvider theme={theme}>
        <MV18
          numInstallments={3}
          interval="month"
          amount="88.88"
          paymentDescription="Add this to your order for only $88.00."
        />
      </MuiThemeProvider>
    ));
};
