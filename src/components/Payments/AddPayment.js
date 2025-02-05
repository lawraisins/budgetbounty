import React, { useState } from "react";

const AddPayment = () => {
  const [formValues, setFormValues] = useState({
    billName: "",
    billAmount: "",
    bankAccount: "",
  });

  const [errors, setErrors] = useState({});
  const [showNewAccountInput, setShowNewAccountInput] = useState(false);

  // Hardcoded Bill Options (Replace this with API later)
  const billOptions = [
    { billId: 1, billName: "Rent", amount: 950.00 },
    { billId: 2, billName: "Utilities", amount: 220.00 },
    { billId: 3, billName: "Internet", amount: 50.00 }
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Auto-fill bill amount when bill name is selected
    if (name === "billName") {
      const selectedBill = billOptions.find((bill) => bill.billName === value);
      if (selectedBill) {
        setFormValues((prev) => ({ ...prev, billAmount: selectedBill.amount }));
      }
    }

    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  // Show new bank account input
  const handleAddAccountClick = () => {
    setShowNewAccountInput(true);
  };

  // Validate form before submission
  const validate = () => {
    const newErrors = {};

    if (!formValues.billName.trim()) {
      newErrors.billName = "Please select a bill";
    }

    if (!formValues.billAmount) {
      newErrors.billAmount = "Bill Amount cannot be empty";
    }

    if (!formValues.bankAccount.trim() || formValues.bankAccount === "select-account") {
      newErrors.bankAccount = "Please select a bank account";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Payment added successfully!");
      setFormValues({
        billName: "",
        billAmount: "",
        bankAccount: "",
      });
      setShowNewAccountInput(false);
    }
  };

  return (
    <div className="add-payment-form-container">
      <h2 style={{ textAlign: "center" }}>Add New Payment</h2>
      <form className="add-payment-form" onSubmit={handleSubmit}>
        <label>
          Bill Name
          <select
            name="billName"
            value={formValues.billName}
            onChange={handleChange}
            className={errors.billName ? "error" : ""}
          >
            <option value="">Select a bill</option>
            {billOptions.map((bill) => (
              <option key={bill.billId} value={bill.billName}>
                {bill.billName}
              </option>
            ))}
          </select>
          {errors.billName && <span className="error-message">{errors.billName}</span>}
        </label>

        <label>
          Bill Amount
          <input
            type="number"
            placeholder="Auto-filled amount"
            name="billAmount"
            value={formValues.billAmount}
            readOnly
          />
        </label>

        <label>
          Bank Account
          <div className="add-account-container">
            <select
              name="bankAccount"
              value={formValues.bankAccount}
              onChange={handleChange}
              className={errors.bankAccount ? "error" : ""}
            >
              <option value="select-account">Select a bank account</option>
              <option value="Account 1">Account 1</option>
              <option value="Account 2">Account 2</option>
            </select>
            <button type="button" onClick={handleAddAccountClick}>
              + Add New Account
            </button>
          </div>
          {errors.bankAccount && <span className="error-message">{errors.bankAccount}</span>}
        </label>

        {showNewAccountInput && (
          <input type="text" className="new-account-input" placeholder="Enter New Account Number" />
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPayment;
