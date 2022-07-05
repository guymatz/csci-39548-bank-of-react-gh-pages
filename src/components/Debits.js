// src/components/Debits.js
//
import {Link} from 'react-router-dom';

const Debits = (props) => {

  console.log("props.Debits in Debits: " + props.debits.length);
  console.log("props.accountBalance in Debits: " + props.accountBalance);

  const submitHandler = (e) => {
    e.preventDefault(); // ?
    var amt = e.target.elements.amount.value;
    var desc = e.target.elements.description.value;
    console.log("+++ Amount: " + amt);
    console.log("+++ Description: " + desc);
    console.log("+++ Debits length before: " + props.debits.length);
    console.log("+++ accountBalance before: " + props.accountBalance);

    //App.addDebit({"description":desc, "amount":amt});

    const today = new Date().toISOString().split('T')[0];
    //console.log("Today is : " + today);
    props.addDebitClicked({id: Math.floor(Math.random() * 10000), "description":desc, "amount":amt, "date":today});
    //setTotalDebits(80);
    console.log("Debits length after: " + props.debits.length);
    console.log("accountBalance after: " + props.accountBalance);

  };

  // Create the list of Debit items
  let debitsView = () => {
    //const { debits } = props.debits;
    //return <h1>poopy {props.keys()} now</h1>;

    return props.debits.map((debit) => {
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    })

  };
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={submitHandler} >
        <label>Description</label>
        <input type="text" name="description" />
        <label>Amount</label>
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>

      <Link to="/">Return to Home</Link>
    </div>

  )

};

export default Debits;
