import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
    submitted: false,
  });

  const interestsList = ["React", "JavaScript", "CSS"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((i) => i !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, submitted: true }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email
          <input name="email" value={formData.email} onChange={handleChange} />
        </label>
        <fieldset>
          <legend>Interests</legend>
          {interestsList.map((interest) => (
            <label key={interest}>
              <input
                type="checkbox"
                value={interest}
                checked={formData.interests.includes(interest)}
                onChange={handleChange}
              />
              {interest}
            </label>
          ))}
        </fieldset>
        <button type="submit">Submit</button>
      </form>

      {formData.submitted && (
        <div>
          Thank you, {formData.name}! You signed up with {formData.email}.
          {formData.interests.length > 0 && (
            <p>Your interests: {formData.interests.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;