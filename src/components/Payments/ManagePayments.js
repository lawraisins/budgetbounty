import React, { useEffect, useState } from "react";

const ManagePayments = () => {
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [recurringBills, setRecurringBills] = useState([]);
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

  useEffect(() => {
    if (!userId) return;

    // Fetch unpaid bills
    fetch(`http://localhost:8087/bills/unpaid/${userId}`)
      .then((response) => response.json())
      .then((data) => setUnpaidBills(data))
      .catch((error) => console.error("Error fetching unpaid bills:", error));

    // Fetch recurring bills
    fetch(`http://localhost:8087/bills/recurring/${userId}`)
      .then((response) => response.json())
      .then((data) => setRecurringBills(data))
      .catch((error) => console.error("Error fetching recurring bills:", error));
  }, [userId]);

  return (
    <div>
      <h2>Upcoming Bills</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {unpaidBills.length > 0 ? (
            unpaidBills.map((bill) => (
              <tr key={bill.billId}>
                <td>{bill.billName}</td>
                <td>{bill.dueDate}</td>
                <td>${bill.amount.toFixed(2)}</td>
                <td>{bill.billStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No upcoming bills.</td>
            </tr>
          )}
        </tbody>
      </table>

      <br /><br />
      <h2>Recurring Bills</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Next Payment Date</th>
            <th>Amount</th>
            <th>Recurring</th>
          </tr>
        </thead>
        <tbody>
          {recurringBills.length > 0 ? (
            recurringBills.map((bill) => (
              <tr key={bill.billId}>
                <td>{bill.billName}</td>
                <td>{bill.dueDate}</td>
                <td>${bill.amount.toFixed(2)}</td>
                <td>{bill.recurring ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No recurring bills.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePayments;
