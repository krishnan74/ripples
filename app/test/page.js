import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [choice, setChoice] = useState("Option 1");
  const [range, setRange] = useState(50);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>
            Text:
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ marginLeft: "10px", marginBottom: "10px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Choice:
            <select
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              style={{ marginLeft: "10px", marginBottom: "10px" }}
            >
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Range:
            <input
              type="range"
              value={range}
              min="0"
              max="100"
              onChange={(e) => setRange(e.target.value)}
              style={{ marginLeft: "10px", marginBottom: "10px" }}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <h3>Your Form Data:</h3>
          <p>Text: {text}</p>
          <p>Choice: {choice}</p>
          <p>Range: {range}</p>
          <img
            src="https://via.placeholder.com/150"
            alt="placeholder"
            style={{ marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}