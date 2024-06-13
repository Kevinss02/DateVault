import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CuteButton from '../../components/CuteButton';

describe('CuteButton', () => {
  it('renders CuteButton component', () => {
    render(<CuteButton onClick={() => {}}>Click me</CuteButton>);
  });

  it('executes onClick function when clicked', () => {
    let clicked = false;
    const onClickMock = () => {
      clicked = true;
    };
    render(<CuteButton onClick={onClickMock}>Click me</CuteButton>);

    fireEvent.click(screen.getByText('Click me'));

    expect(clicked).toBe(true);
  });

  it('applies additional className and style', () => {
    render(
      <CuteButton
        onClick={() => {}}
        className='custom-styles'
        style={{ color: 'red' }}
      >
        Click me
      </CuteButton>,
    );

    const button = screen.getByText('Click me');
    expect(button.classList.contains('custom-styles')).toBe(true);
    expect(button.style.color).toBe('red');
  });

  it('applies default type if not provided', () => {
    render(<CuteButton onClick={() => {}}>Click me</CuteButton>);

    const button = screen.getByText('Click me');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('applies the provided type', () => {
    render(
      <CuteButton onClick={() => {}} type='submit'>
        Click me
      </CuteButton>,
    );

    const button = screen.getByText('Click me');
    expect(button.getAttribute('type')).toBe('submit');
  });
});
