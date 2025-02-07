import React, { useState, useEffect } from "react";

const AddBill = () => {
  const [formValues, setFormValues] = useState({
    billName: "",
    amount: "",
    recurring: "false",
    dueDate: "",
    userId: "", // Added user selection
  });

  const [users, setUsers] = useState([]); // Store all users
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // Success message

  // Fetch all users from the backend when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8087/bills/users");
        if (!response.ok) throw new Error("Failed to fetch users.");
        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when user types
  };

  // Validate input fields
  const validate = () => {
    const newErrors = {};
    if (!formValues.billName.trim()) newErrors.billName = "Bill Name cannot be empty";
    if (!formValues.amount.trim()) newErrors.amount = "Bill Amount cannot be empty";
    if (parseFloat(formValues.amount) < 1) newErrors.amount = "Amount must be at least $1";
    if (!formValues.dueDate.trim()) newErrors.dueDate = "Due Date cannot be empty";
    if (!formValues.userId.trim()) newErrors.userId = "Please select a user";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const billData = {
      billName: formValues.billName,
      amount: parseFloat(formValues.amount), // Ensure number format
      recurring: formValues.recurring === "true", // Convert to boolean
      dueDate: formValues.dueDate,
      user: { userId: formValues.userId }, // Assign selected userId
      billStatus: "Unpaid",
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
        setFormValues({ billName: "", amount: "", recurring: "false", dueDate: "", userId: "" });
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

        <label>
          Assign to User
          <select name="userId" value={formValues.userId} onChange={handleChange}>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.userId} - {user.username} {/* Show userId + username for clarity */}
              </option>
            ))}
          </select>
          {errors.userId && <span className="error-message">{errors.userId}</span>}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBill;
