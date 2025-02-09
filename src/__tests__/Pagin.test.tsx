import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Pagination from '../PAgination';

global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({
    characters: [
      { uid: '1', name: 'Character 1', gender: 'M' },
      { uid: '2', name: 'Character 2', gender: 'F' },
    ],
    page: { totalPages: 3 },
  }),
});

describe('Pagination Component', () => {
  const onPageChangeMock = vi.fn();

  const Wrapper = ({
    currentPage,
    allPages,
  }: {
    currentPage: number;
    allPages: number;
  }) => (
    <MemoryRouter initialEntries={[`/search/${currentPage}`]}>
      <Routes>
        <Route
          path="/search/:page"
          element={
            <Pagination
              currentPage={currentPage}
              allPages={allPages}
              onPageChange={onPageChangeMock}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('updates the URL when the "Prev" button is clicked', async () => {
    const currentPage = 2;
    const allPages = 3;

    render(<Wrapper currentPage={currentPage} allPages={allPages} />);

    fireEvent.click(screen.getByText('Prev'));

    await waitFor(() => {
      expect(onPageChangeMock).toHaveBeenCalledWith(1);

      expect(window.location.pathname).toBe('/search/1');
    });
  });

  it('updates the URL when the "Next" button is clicked', async () => {
    const currentPage = 2;
    const allPages = 3;

    render(<Wrapper currentPage={currentPage} allPages={allPages} />);

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(onPageChangeMock).toHaveBeenCalledWith(3);
      expect(window.location.pathname).toBe('/search/3');
    });
  });

  it('does not allow navigation to the previous page when on the first page', async () => {
    const currentPage = 1;
    const allPages = 3;

    render(<Wrapper currentPage={currentPage} allPages={allPages} />);

    fireEvent.click(screen.getByText('Prev'));

    await waitFor(() => {
      // Проверяем, что onPageChange не был вызван
      expect(onPageChangeMock).not.toHaveBeenCalled();
      // Проверяем, что URL не изменился
      expect(window.location.pathname).toBe('/search/1');
    });
  });

  it('does not allow navigation to the next page when on the last page', async () => {
    const currentPage = 3;
    const allPages = 3;

    render(<Wrapper currentPage={currentPage} allPages={allPages} />);

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(onPageChangeMock).not.toHaveBeenCalled();

      expect(window.location.pathname).toBe('/search/3');
    });
  });
});
