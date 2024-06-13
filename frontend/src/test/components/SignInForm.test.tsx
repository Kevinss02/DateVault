import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import SignInForm from '../../components/SignInForm';

describe('SignInForm', () => {
  it('renders SignInForm component', () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>,
    );
  });

  it('submits the form with valid data', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Sign in'));
  });

  it('handles form submission with invalid data and displays errors', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Sign in'));
  });

  it('handles "Forgot password" and "Sign up" clicks', () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Forgot password?'));
    fireEvent.click(screen.getByText('Sign up'));
  });
});
