import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Details from '../Details';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Мокируем fetch API
global.fetch = vi.fn(
  () =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          characters: [
            {
              uid: 'CHMA0000174718',
              name: 'Character 1',
              gender: 'M',
              birthYear: 2259,
            },
          ],
        }),
    }) as unknown as Promise<Response>
);

describe('Details Component', () => {
  it('displays the character details', async () => {
    render(
      <MemoryRouter initialEntries={['/details/CHMA0000174718']}>
        <Routes>
          <Route path="/details/:uid" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    // Ждем, пока данные загрузятся, и проверяем, что они отображаются
    await waitFor(() => {
      expect(screen.getByText('Name: Character 1')).toBeInTheDocument();
      expect(screen.getByText('UID: CHMA0000174718')).toBeInTheDocument();
      expect(screen.getByText('Gender: M')).toBeInTheDocument();
    });
  });

  it('displays a loading indicator while fetching data', () => {
    render(
      <MemoryRouter initialEntries={['/details/CHMA0000174718']}>
        <Routes>
          <Route path="/details/:uid" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText('Loading character details...')
    ).toBeInTheDocument();
  });

  it('handles errors when data fetching fails', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    render(
      <MemoryRouter initialEntries={['/details/CHMA0000174718']}>
        <Routes>
          <Route path="/details/:uid" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Network Error')).toBeInTheDocument();
    });
  });

  it('displays a message when no character is found', async () => {
    global.fetch = vi.fn(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ characters: [] }),
        }) as unknown as Promise<Response>
    );

    render(
      <MemoryRouter initialEntries={['/details/unknown']}>
        <Routes>
          <Route path="/details/:uid" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('No character details found.')
      ).toBeInTheDocument();
    });
  });
});
