// src/components/AccountBalance.js

import React, {Component} from 'react';

class AccountBalance extends Component {
  // Display account balance
  getAccountBalance() {
    console.log("AccountBalance accountBalance: " + this.props.accountBalance);
    return this.props.accountBalance.toFixed(2);
  }

  render() {
    return (
      <div>
        Balance: {this.getAccountBalance()}
      </div>
    );
  }
}

export default AccountBalance;
