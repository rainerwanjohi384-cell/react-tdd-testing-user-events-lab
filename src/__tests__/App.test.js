import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("renders the newsletter form", () => {
  render(<App />);
  
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByText(/submit/i)).toBeInTheDocument();
});

test("allows the user to type in the name and email inputs", async () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  
  await userEvent.type(nameInput, "Alice");
  await userEvent.type(emailInput, "alice@example.com");
  
  expect(nameInput.value).toBe("Alice");
  expect(emailInput.value).toBe("alice@example.com");
});

test("allows the user to select interests", async () => {
  render(<App />);
  
  const interests = screen.getAllByRole("checkbox");
  await userEvent.click(interests[0]); // select first interest
  
  expect(interests[0].checked).toBe(true);
});

test("shows a personalized message on submit", async () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByText(/submit/i);
  
  await userEvent.type(nameInput, "Alice");
  await userEvent.type(emailInput, "alice@example.com");
  await userEvent.click(submitButton);
  
  expect(screen.getByText(/thank you, alice/i)).toBeInTheDocument();
});