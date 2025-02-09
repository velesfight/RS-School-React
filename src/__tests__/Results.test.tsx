import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Results from '../Results'; // Путь к компоненту
import userEvent from '@testing-library/user-event';

const mockResults = [
  { uid: '1', name: 'Character 1', gender: 'M' },
  { uid: '2', name: 'Character 2', gender: 'F' },
];

describe('Results Component', () => {
  it('displays the correct number of characters', () => {
    render(<Results results={mockResults} onClick={() => {}} />);
    expect(screen.getAllByRole('row')).toHaveLength(3); // Включая заголовок таблицы
  });

  it('displays a message when no results are found', () => {
    render(<Results results={[]} onClick={() => {}} />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('triggers onClick when a character is clicked', () => {
    const onClickMock = vi.fn(); // Используем vi.fn() вместо jest.fn()
    render(<Results results={mockResults} onClick={onClickMock} />);

    // Проверяем, что отображаются персонажи с нумерацией
    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();

    // Кликаем по строке, которая соответствует первому персонажу
    userEvent.click(screen.getByText('Character 1'));

    // Проверяем, что onClickMock был вызван с правильным объектом
    expect(onClickMock).toHaveBeenCalledWith(mockResults[0]);
  });
});
