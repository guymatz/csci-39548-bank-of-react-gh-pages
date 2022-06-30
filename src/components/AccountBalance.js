// src/components/AccountBalance.js

import React, {Component} from 'react';

class AccountBalance extends Component {
  // Display account balance
  getAccountBalance() {
    console.log("AccountBalance totalCredits: " + this.props.totalCredits);
    return this.props.totalCredits - this.props.totalDebits;
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
