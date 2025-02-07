import React, { useEffect, useState } from "react";

const ManagePayments = () => {
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [recurringBills, setRecurringBills] = useState([]);
  const userId = localStorage.getItem("userId");

  const [sortOptionUnpaid, setSortOptionUnpaid] = useState('asc'); // Sorting for unpaid bills
  const [sortOptionRecurring, setSortOptionRecurring] = useState('asc'); // Sorting for recurring bills
//fillercomment
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8087/bills/unpaid/${userId}`)
      .then((response) => response.json())
      .then((data) => setUnpaidBills(data))
      .catch((error) => console.error("Error fetching unpaid bills:", error));

    fetch(`http://localhost:8087/bills/recurring/${userId}`)
      .then((response) => response.json())
      .then((data) => setRecurringBills(data))
      .catch((error) => console.error("Error fetching recurring bills:", error));
  }, [userId]);

  const sortedUnpaidBills = unpaidBills.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);

    return sortOptionUnpaid === 'asc'
      ? dateA - dateB
      : dateB - dateA;
  });

  const sortedRecurringBills = recurringBills.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);

    return sortOptionRecurring === 'asc'
      ? dateA - dateB
      : dateB - dateA;
  });

  return (
    <div>
      <div className="bill-headers">
      <h2>Upcoming Bills</h2>
      <div className="sort-controls">
      </div>
        <select value={sortOptionUnpaid} onChange={(e) => setSortOptionUnpaid(e.target.value)}>
          <option value="asc">Ascending (Oldest First)</option>
          <option value="desc">Descending (Newest First)</option>
        </select>
      </div>
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
          {sortedUnpaidBills.length > 0 ? (
            sortedUnpaidBills.map((bill) => (
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
      <div className="bill-headers"> 
      <h2>Recurring Bills</h2>
      <div className="sort-controls">
      </div>
        <select value={sortOptionRecurring} onChange={(e) => setSortOptionRecurring(e.target.value)}>
          <option value="asc">Ascending (Oldest First)</option>
          <option value="desc">Descending (Newest First)</option>
        </select>
      </div>
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
          {sortedRecurringBills.length > 0 ? (
            sortedRecurringBills.map((bill) => (
              <tr key={bill.billId}>
                <td>{bill.billName}</td>
                <td>{bill.dueDate}</td>
                <td>${bill.amount.toFixed(2)}</td>
                <td>{bill.recurring ? 'Yes' : 'No'}</td>
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
