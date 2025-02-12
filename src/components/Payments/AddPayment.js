import React, { useState, useEffect } from "react";

const AddPayment = () => {
  const [formValues, setFormValues] = useState({
    billName: "",
    billAmount: "",
    bankAccount: "",
  });
  const [errors, setErrors] = useState({});
  const [showNewAccountInput, setShowNewAccountInput] = useState(false);
  const [billOptions, setBillOptions] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [newBankAccount, setNewBankAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const [billsResponse, accountsResponse] = await Promise.all([
          fetch(`http://localhost:8087/bills/unpaid/${userId}`),
          fetch(`http://localhost:8087/bank-accounts/${userId}`),
        ]);

        const [billsData, accountsData] = await Promise.all([
          billsResponse.json(),
          accountsResponse.json(),
        ]);

        setBillOptions(billsData);
        setBankAccounts(accountsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "billName") {
      const selectedBill = billOptions.find((bill) => bill.billName === value);
      if (selectedBill) {
        setFormValues((prev) => ({
          ...prev,
          billId: selectedBill.billId,
          billAmount: selectedBill.amount,
        }));
      }
    }

    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.billName.trim()) newErrors.billName = "Please select a bill.";
    if (!formValues.billAmount) newErrors.billAmount = "Bill Amount cannot be empty.";
    if (!formValues.bankAccount.trim()) newErrors.bankAccount = "Please select a bank account.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNewBankAccountSubmit = async () => {
    const newErrors = {};

    if (!newBankAccount.trim()) {
      newErrors.newBankAccount = "Bank account number cannot be empty.";
    } else if (!/^\d+$/.test(newBankAccount)) {
      newErrors.newBankAccount = "Bank account number must be numeric.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8087/bank-accounts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          bankAccountNumber: newBankAccount,
        }),
      });

      if (response.ok) {
        alert("New bank account added successfully!");
        setBankAccounts([...bankAccounts, { bankAccountNumber: newBankAccount }]);
        setNewBankAccount("");
        setShowNewAccountInput(false);
        setErrors({}); // Clear errors on successful submit
      } else {
        const errorMessage = await response.text();
        alert(`Failed to add bank account: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error adding bank account:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:8087/payments/make-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          bill: { billId: formValues.billId },
          bankAccount: { bankAccountNumber: formValues.bankAccount },
        }),
      });

      const message = await response.text();
      alert(message);
      setFormValues({ billName: "", billId: "", billAmount: "", bankAccount: "" });
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

  return (
    <div className="add-payment-form-container">
      <h2 style={{ textAlign: "center" }}>Add New Payment</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <form className="add-payment-form" onSubmit={handleSubmit}>
            <label>Bill Name</label>
            <select name="billName" value={formValues.billName} onChange={handleChange}>
              <option value="">Select a bill</option>
              {billOptions.map((bill) => (
                <option key={bill.billId} value={bill.billName}>{bill.billName}</option>
              ))}
            </select>
            {errors.billName && <span className="error-message">{errors.billName}</span>}


            <label>Bill Amount</label>
            <input type="number" placeholder="Auto-filled amount" name="billAmount" value={formValues.billAmount} readOnly />
            {errors.billAmount && <span className="error-message">{errors.billAmount}</span>}

            <label>Bank Account</label>
            <div className="add-account-container">
              <select name="bankAccount" value={formValues.bankAccount} onChange={handleChange}>
                <option value="">Select a bank account</option>
                {bankAccounts.map((account) => (
                  <option key={account.bankAccountNumber} value={account.bankAccountNumber}>
                    {account.bankAccountNumber}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setShowNewAccountInput(true)}>+ Add New Account</button>
            </div>
            {errors.bankAccount && <span className="error-message">{errors.bankAccount}</span>}


          {showNewAccountInput && (
            <div className="form-group">
              <label>New Bank Account</label>
              <input
                type="text"
                placeholder="Enter New Account Number"
                value={newBankAccount}
                onChange={(e) => setNewBankAccount(e.target.value)}
              />
              <button type="button" onClick={handleNewBankAccountSubmit}>Save Account</button>
              {errors.newBankAccount && <span className="error-message">{errors.newBankAccount}</span>}
            </div>
          )}

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddPayment;
