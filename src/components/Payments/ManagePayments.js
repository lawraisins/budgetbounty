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
        </tbody>
      </table>
    </div>
  );
};

export default ManagePayments;
