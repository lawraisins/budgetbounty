import React from 'react';

const ManagePayments = () => {
  return (
    <div>
      <h2>Upcoming Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Date of Payment</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rent</td>
            <td>17/04/2024</td>
            <td>$950.00</td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>22/04/2024</td>
            <td>$220.00</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>

      <br></br> <br></br>
      <h2>Recurring Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Next Payment Date</th>
            <th>Amount</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rent</td>
            <td>17/05/2024</td>
            <td>$950.00</td>
            <td>Monthly</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>22/05/2024</td>
            <td>$230.00</td>
            <td>Monthly</td>
          </tr>
        </tbody>
      </table>
    </div>

    
  );
};

export default ManagePayments;
