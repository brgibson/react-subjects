////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

class CheckoutForm extends React.Component {
  state = {
    shippingName: "",
    shippingState: "",
    previous: {
      shippingName: "",
      shippingState: "",
    },
  }

  updateShippingValue = (evt) => {
    var newState = this.state;
    newState[evt.target.name] = newState.previous[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  setShippingSameAsBilling = (evt) => {
    if (evt.target.checked) {
      //set the shipping the same as the billing
      evt.target.form.shippingName.readOnly = evt.target.form.shippingState.readOnly = true;
      this.setState({
        shippingName: evt.target.form.billingName.value,
        shippingState: evt.target.form.billingState.value,
      });
    } else {
      //set the shipping back to the previous value, before clicking the 'same as billing' button
      evt.target.form.shippingName.readOnly = evt.target.form.shippingState.readOnly = false;
      this.setState({
        shippingName: this.state.previous.shippingName,
        shippingState: this.state.previous.shippingState,
      });
    }
  }

  render() {
    const {
      shippingName,
      shippingState
    } = this.state;

    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input type="text" name="billingName"/></label>
            </p>
            <p>
              <label>Billing State: <input type="text" size="2" name="billingState"/></label>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label><input type="checkbox" onChange={this.setShippingSameAsBilling}/> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input type="text"
                                           value={shippingName}
                                           name="shippingName"
                                           onChange={this.updateShippingValue}/></label>
            </p>
            <p>
              <label>Shipping State: <input type="text"
                                            value={shippingState}
                                            size="2"
                                            name="shippingState"
                                            onChange={this.updateShippingValue}/></label>
            </p>
          </fieldset>

          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<CheckoutForm/>, document.getElementById('app'))
