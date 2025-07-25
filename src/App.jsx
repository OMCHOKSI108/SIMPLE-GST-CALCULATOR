import { useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(5000);
  const [gstRate, setGstRate] = useState(18);
  const [isExclusive, setIsExclusive] = useState(true);

  const calculateGST = () => {
    if (isExclusive) {
      const gstAmount = amount * (gstRate / 100);
      const totalAmount = parseFloat(amount) + gstAmount;
      return { gstAmount, totalAmount };
    } else {
      const originalAmount = amount / (1 + gstRate / 100);
      const gstAmount = amount - originalAmount;
      return { gstAmount, totalAmount: amount };
    }
  };

  const { gstAmount, totalAmount } = calculateGST();

  return (
    <div className="calculator">
      <h1>FREE GST CALCULATOR</h1>
      <p>Free GST calculator made just for small businesses! With this tool, you'll be able to calculate GST in minutes without any complex math.</p>
      <div className="input-group">
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value || 0)}
          />
        </div>
        <div>
          <label>GST %</label>
          <select value={gstRate} onChange={(e) => setGstRate(e.target.value)}>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </div>
        <div>
          <label>Tax</label>
          <select value={isExclusive ? "Exclusive" : "Inclusive"} onChange={(e) => setIsExclusive(e.target.value === "Exclusive")}>
            <option value="Exclusive">Exclusive</option>
            <option value="Inclusive">Inclusive</option>
          </select>
        </div>
      </div>
      <div className="result">
        <p>₹{amount || 0} <span>+</span> ₹{gstAmount.toFixed(2)} <span>=</span> ₹{totalAmount.toFixed(2)}</p>
        <p>Actual Amount <span>+</span> GST Amount <span>=</span> Total Amount</p>
      </div>
    </div>
  );
}

export default App;