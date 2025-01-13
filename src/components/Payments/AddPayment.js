import React from 'react';

const AddPayment = () => {
  return (
    <div>
      <h2>Add New Payment</h2>
      <form>
        <label>Bill Name</label>
        <input type="text" placeholder="Enter Bill Name" />
        <label>Bill Amount</label>
        <input type="number" placeholder="Enter Amount" />
        <label>Bank Account</label>
        <select>
          <option>Account 1</option>
          <option>Account 2</option>
        </select>
        <label>Recurring Payment</label>
        <select>
          <option>None</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <label>Start Date</label>
        <input type="date" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPayment;
