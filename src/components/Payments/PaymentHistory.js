import React from 'react';

const PaymentHistory = () => {
  return (
    <div>
      <h2>Payment History</h2>
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
            <td>17/03/2024</td>
            <td>$950.00</td>
            <td>Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
