import React, { useEffect, useState } from "react";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8087/payments/history/${userId}`)
      .then((response) => response.json())
      .then((data) => setPayments(data))
      .catch((error) => console.error("Error fetching payments:", error));
  }, [userId]);

  return (
    <div>
      <h2>Payment History</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Date of Payment</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.paymentId}>
                <td>{payment.bill.billName}</td>
                <td>{payment.paymentDate}</td>
                <td>${payment.paymentAmount.toFixed(2)}</td>
                <td>{payment.bill.billStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No payment history available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
