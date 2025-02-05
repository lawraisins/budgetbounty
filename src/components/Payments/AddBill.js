import React, { useState } from "react";

const AddBill = () => {
  const [formValues, setFormValues] = useState({
    billName: "",
    billAmount: "",
    recurring: "No",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!formValues.dueDate.trim()) {
      newErrors.dueDate = "Due Date cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Bill added successfully!");
      // Clear form after submission
      setFormValues({
        billName: "",
        billAmount: "",
        recurring: "No",
        dueDate: "",
      });
    }
  };

  return (
    <div className="add-payment-form-container">
      <h2 style={{ textAlign: "center" }}>Add New Bill</h2>
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
          Recurring Bill?
          <select
            name="recurring"
            value={formValues.recurring}
            onChange={handleChange}
            className={errors.recurring ? "error" : ""}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          {errors.recurring && <span className="error-message">{errors.recurring}</span>}
        </label>

        <label>
          Due Date
          <input
            type="date"
            name="dueDate"
            value={formValues.dueDate}
            onChange={handleChange}
            className={errors.dueDate ? "error" : ""}
          />
          {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBill;
