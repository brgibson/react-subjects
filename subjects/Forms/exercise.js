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
import serializeForm from 'form-serialize'
import { render, findDOMNode } from 'react-dom'

const CheckoutForm = React.createClass({
  getInitialState() {
      return {
        shippingName: 'default shipping name',
        shippingStateCode: 'default state code',
        backupShippingName: '',
        backupShippingStateCode: ''
      }
  },
    setShippingName(event) {
        this.uncheckSameAsBilling()
        this.setState({shippingName: event.target.value})
        this.setState({backupShippingName: event.target.value})
    },
    setShippingStateCode(event) {
        this.uncheckSameAsBilling()
        this.setState({shippingStateCode: event.target.value})
        this.setState({backupShippingStateCode: event.target.value})
    },
    uncheckSameAsBilling() {
        const form = findDOMNode(this.refs.form)
        form['same-as-billing'].checked = false
    },
    toggleSameAsBilling(event) {
        const form = findDOMNode(this.refs.form)
        const formData = serializeForm(form, { hash: true })

        if (event.target.checked) {
            this.setState({backupShippingName: this.state.shippingName})
            this.setState({backupShippingStateCode: this.state.shippingStateCode})
            this.setState({shippingName: formData['billing-name'] || ''})
            this.setState({shippingStateCode: formData['billing-state-code'] || ''})
        } else {
            this.setState({shippingName: this.state.backupShippingName})
            this.setState({shippingStateCode: this.state.backupShippingStateCode})
        }
    },
    render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form ref='form'>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input name="billing-name" defaultValue='tom jones' type="text"/></label>
            </p>
            <p>
              <label>Billing State: <input name="billing-state-code" defaultValue='NV' type="text" size="2"/></label>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label><input name="same-as-billing" type="checkbox" onChange={this.toggleSameAsBilling}/> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input name="shipping-name"
                                        value={this.state.shippingName}
                                        onChange={this.setShippingName}
                                        type="text"/></label>
            </p>
            <p>
              <label>Shipping State: <input name="shipping-state-code"
                                            value={this.state.shippingStateCode}
                                            onChange={this.setShippingStateCode}
                                            type="text" size="2"/></label>
            </p>
          </fieldset>
        </form>
      </div>
    )
  }
})

render(<CheckoutForm/>, document.getElementById('app'))
