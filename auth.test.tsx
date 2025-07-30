import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/login'; // Assuming you have a login page component
import Register from '../pages/register'; // Assuming you have a register page component

describe('Authentication Pages', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('renders registration form', () => {
    render(<Register />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  // Additional tests for form submission can be added here
});
