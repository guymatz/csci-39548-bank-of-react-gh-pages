// src/components/Debits.js
//
import {Link} from 'react-router-dom';
import React, { useState }  from 'react';

class Debits extends React.component {
  constructor(props) {
    super(props);
    this.state = props.debits;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    var amt = e.target.elements.amount.value;
    var desc = e.target.elements.description.value;
    console.log("Amount: " + amt);
    console.log("Description: " + desc);
    /*
    console.log("Debits length before: " + props.debits.length);
    console.log("totalDebits before: " + props.totalDebits);
    const today = new Date().toLocaleString();
    this.setState([...props.debits, new_debit]);
    */
  }

  handleSubmit(e) {
    console.log('A sbumission: ' + this.state.value);
    e.preventDefault();
  }
  
  /*
  // Create the list of Debit items
  debitsView() {
    //const { debits } = props.debits;
    //return <h1>poopy {props.keys()} now</h1>;

    return this.debits.map((debit) => {
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    })

  };
        {debitsView()}
  */
  // Render the list of Debit items and a form to input new Debit item
  render() {
    return (
      <div>
        <h1>Debits</h1>


        <form onSubmit={this.hankdleSubmit} >
          <label>Description</label>
          <input type="text" name="description" />
          <label>Amount</label>
          <input type="number" name="amount" />
          <button type="submit">Add Debit</button>
        </form>
  
        <Link to="/">Return to Home</Link>
      </div>
  
    )
  }

};

export default Debits;
