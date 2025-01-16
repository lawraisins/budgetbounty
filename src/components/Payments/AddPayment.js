import React, { useState } from "react";

const AddPayment = () => {
  const [formValues, setFormValues] = useState({
    billName: "",
    billAmount: "",
    bankAccount: "",
    recurrence: "",
    startDate: "",
  });

  const [errors, setErrors] = useState({});
  const [showNewAccountInput, setShowNewAccountInput] = useState(false);

  const handleAddAccountClick = () => {
    setShowNewAccountInput(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when the user types
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.billName.trim()) {
      newErrors.billName = "Bill Name cannot be empty";
    }

    if (!formValues.billAmount.trim()) {
      newErrors.billAmount = "Bill Amount cannot be empty";
    } else if (parseFloat(formValues.billAmount) < 1) {
      newErrors.billAmount = "Bill Amount must be at least $1";
    }

    if (!formValues.bankAccount.trim() || formValues.bankAccount === "select-account") {
      newErrors.bankAccount = "Please select a bank account";
    }

    if (!formValues.recurrence.trim() || formValues.recurrence === "select-recurrence") {
      newErrors.recurrence = "Please select a recurrence";
    }

    if (!formValues.startDate.trim()) {
      newErrors.startDate = "Start Date cannot be empty";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      // Clear form after submission
      setFormValues({
        billName: "",
        billAmount: "",
        bankAccount: "",
        recurrence: "",
        startDate: "",
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
          <input
            type="text"
            placeholder="Enter Bill Name"
            name="billName"
            value={formValues.billName}
            onChange={handleChange}
            className={errors.billName ? "error" : ""}
          />
          {errors.billName && <span className="error-message">{errors.billName}</span>}
        </label>

        <label>
          Bill Amount
          <input
            type="number"
            placeholder="Enter Amount"
            name="billAmount"
            value={formValues.billAmount}
            onChange={handleChange}
            className={errors.billAmount ? "error" : ""}
          />
          {errors.billAmount && <span className="error-message">{errors.billAmount}</span>}
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
          <input
            type="text"
            className="new-account-input"
            placeholder="Enter New Account Number"
          />
        )}

        <label>
          Recurring Payment
          <select
            name="recurrence"
            value={formValues.recurrence}
            onChange={handleChange}
            className={errors.recurrence ? "error" : ""}
          >
            <option value="select-recurrence">Select recurrence</option>
            <option value="None">None</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          {errors.recurrence && <span className="error-message">{errors.recurrence}</span>}
        </label>

        <label>
          Start Date
          <input
            type="date"
            name="startDate"
            value={formValues.startDate}
            onChange={handleChange}
            className={errors.startDate ? "error" : ""}
          />
          {errors.startDate && <span className="error-message">{errors.startDate}</span>}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPayment;
