import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import SignUpForm from '../../components/SignUpForm';

describe('SignUpForm', () => {
  it('renders SignUpForm component', () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );
  });

  it('submits the form with valid data', async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );

    fireEvent.input(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });

    fireEvent.click(screen.getByText('Sign up'));
  });

  it('handles form submission with invalid data and displays errors', async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Sign up'));
  });

  it('handles "Forgot password" click', () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Forgot password?'));
  });
});
