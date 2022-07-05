// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super();
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
      credits: [],
      debits: []
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  addDebit(d) {
    console.log("Subtracting " + JSON.stringify(d))
    const updatedState = {...this.state, debits: this.state.debits.concat(d)};
    updatedState.accountBalance = updatedState.accountBalance - parseFloat(d.amount)
    this.setState(updatedState);
  }

  addCredit(c) {
    console.log("Adding " + parseFloat(c.amount))
    console.log(" ---- to " + JSON.stringify(this.state.accountBalance))
    const updatedState = {...this.state, credits: this.state.credits.concat(c)};
    updatedState.accountBalance = updatedState.accountBalance + parseFloat(c.amount)
    this.setState(updatedState);
  }

  async componentDidMount() {
    // Get Credits
    if (this.state.debits.length === 0) {
      let linkToDebitsAPI = 'https://moj-api.herokuapp.com/debits';
      try {
        let resp = await axios.get(linkToDebitsAPI);
        // console.log("Resp Debits: " + resp);
        this.setState({debits: resp.data});
        // console.log("DEBITS: " + this.state.debits);
      }
      catch (error) {
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.status);
        }
      }
    }
    if (this.state.credits.length === 0) {
      let linkToCreditAPI = 'https://moj-api.herokuapp.com/credits';
      try {
        let resp = await axios.get(linkToCreditAPI);
        console.log("Resp Credits: " + resp);
        this.setState({credits: resp.data});
        console.log("CREDITS: " + this.state.credits);
      }
      catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      }
    }

    console.log("AccountBalance before adding debits: " + this.state.accountBalance);
    for (const debit of this.state.debits) {
      console.log("Subtracting " + parseFloat(debit.amount) + " from " + this.state.accountBalance);
      const updatedState = {...this.state}
      updatedState.accountBalance = updatedState.accountBalance - parseFloat(debit.amount)
      this.setState(updatedState);
    }
    console.log("AccountBalance AFTER adding debits: " + this.state.accountBalance);

    for (const credit of this.state.credits) {
      console.log("Adding " + parseFloat(credit.amount) + " to " + this.state.accountBalance);
      const updatedState = {...this.state}
      updatedState.accountBalance = updatedState.accountBalance + parseFloat(credit.amount)
      this.setState(updatedState);
    }
    console.log("accountBalance: " + this.state.accountBalance);

  }


  // Create Routes and React elements to be rendered using React components
  render() {
    // Create React elements
    const HomeComponent = () => (<Home totalDebits={this.state.totalDebits} accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const DebitsComponent = () => (<Debits addDebitClicked={this.addDebit.bind(this)} debits={this.state.debits} accountBalance={this.state.accountBalance} />)  // Pass props to "Debits" component
    const CreditsComponent = () => (<Credits addCreditClicked={this.addCredit.bind(this)} credits={this.state.credits} accountBalance={this.state.accountBalance} />)  // Pass props to "Credits" component

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
