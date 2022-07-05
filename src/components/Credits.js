// src/components/Credits.js
//
import {Link} from 'react-router-dom';

const Credits = (props) => {

  //console.log("props.Credits in Credits: " + props.credits.length);
  //console.log("props.accountBalance (" + typeof(props.accountBalance) + ") in Credits: " + props.accountBalance);

  const submitHandler = (e) => {
    e.preventDefault(); // ?
    var amt = e.target.elements.amount.value;
    var desc = e.target.elements.description.value;
    console.log("+++ Amount: " + amt);
    console.log("+++ Description: " + desc);
    console.log("+++ Credits length before: " + props.credits.length);
    console.log("+++ accountBalance before: " + props.accountBalance);

    //App.addCredit({"description":desc, "amount":amt});

    const today = new Date().toISOString().split('T')[0];
    //console.log("Today is : " + today);
    props.addCreditClicked({id: Math.floor(Math.random() * 10000), "description":desc, "amount":amt, "date":today});
    //setTotalCredits(80);
    console.log("Credits length after: " + props.credits.length);
    console.log("accountBalance after: " + props.accountBalance);

  };

  // Create the list of Credit items
  let creditsView = () => {
    //const { credits } = props.credits;
    //return <h1>poopy {props.keys()} now</h1>;

    return props.credits.map((credit) => {
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    })

  };
  // Render the list of Credit items and a form to input new Credit item
  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit={submitHandler} >
        <label>Description</label>
        <input type="text" name="description" />
        <label>Amount</label>
        <input type="number" name="amount" />
        <button type="submit">Add Credit</button>
      </form>

      <Link to="/">Return to Home</Link>
    </div>

  )

};

export default Credits;
