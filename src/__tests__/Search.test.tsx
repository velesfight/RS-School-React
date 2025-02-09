import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';
import { vi } from 'vitest';

beforeEach(() => {
  global.localStorage.clear();
});

describe('Search Component', () => {
  it('saves the input value to localStorage when the search button is clicked', () => {
    const onSearchMock = vi.fn();

    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test query' } });

    fireEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('test query');

    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('loads the value from localStorage when the component is mounted', () => {
    localStorage.setItem('searchQuery', 'test query');

    const onSearchMock = vi.fn();

    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test query');
  });
});
