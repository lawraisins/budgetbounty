import React, { useState } from "react";

const AddBill = () => {
  const [formValues, setFormValues] = useState({
    billName: "",
    amount: "", // Updated to match backend field name
    recurring: "false", // Backend expects boolean
    dueDate: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // Success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when user types
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.billName.trim()) newErrors.billName = "Bill Name cannot be empty";
    if (!formValues.amount.trim()) newErrors.amount = "Bill Amount cannot be empty";
    if (parseFloat(formValues.amount) < 1) newErrors.amount = "Amount must be at least $1";
    if (!formValues.dueDate.trim()) newErrors.dueDate = "Due Date cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const billData = {
      billName: formValues.billName,
      amount: parseFloat(formValues.amount), // Ensure number
      recurring: formValues.recurring === "true", // Convert to boolean
      dueDate: formValues.dueDate,
      user: { userId: 1 }, // Replace with actual user ID from localStorage or context
      billStatus: "Unpaid", // Default status
    };

    try {
      const response = await fetch("http://localhost:8087/bills/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billData),
      });

      if (response.ok) {
        setMessage("Bill added successfully!");
        setFormValues({ billName: "", amount: "", recurring: "false", dueDate: "" });
      } else {
        setMessage("Failed to add bill. Try again.");
      }
    } catch (error) {
      console.error("Error adding bill:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-payment-form-container">
      <h2 style={{ textAlign: "center" }}>Add New Bill</h2>
      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
      <form className="add-payment-form" onSubmit={handleSubmit}>
        <label>
          Bill Name
          <input type="text" name="billName" value={formValues.billName} onChange={handleChange} />
          {errors.billName && <span className="error-message">{errors.billName}</span>}
        </label>

        <label>
          Bill Amount
          <input type="number" name="amount" value={formValues.amount} onChange={handleChange} />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </label>

        <label>
          Recurring Bill?
          <select name="recurring" value={formValues.recurring} onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>

        <label>
          Due Date
          <input type="date" name="dueDate" value={formValues.dueDate} onChange={handleChange} />
          {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBill;
