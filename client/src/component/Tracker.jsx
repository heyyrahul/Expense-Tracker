import React, { useState } from "react";
import axios from "axios";

const Tracker = () => {
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/transactions`,
        formData
      );
      alert("Transaction created successfully!");
      setFormData({
        type: "",
        category: "",
        amount: "",
        date: "",
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction. Please try again.");
    }
  };

  return (
    <div>
      <h3>Tracker Component</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="">Select Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>
        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {formData.type === "Income" ? (
              <optgroup label="Income">
                <option value="Salary">Salary</option>
                <option value="Gifts">Gifts</option>
                <option value="Refunds">Refunds</option>
                <option value="Other">Other</option>
              </optgroup>
            ) : (
              <optgroup label="Expense">
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Shopping">Shopping</option>
                <option value="Housing">Housing</option>
                <option value="Bills">Bills</option>
                <option value="Vehicle & Transport">Vehicle & Transport</option>
                <option value="Lifestyle">Lifestyle</option>
              </optgroup>
            )}
          </select>
        </label>
        <label>
          Amount in Rupees:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Tracker;
