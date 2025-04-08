import { jest } from '@jest/globals';
import { searchRestaurants } from './task.js';

test('displays correct message based on API response', async () => {

  document.body.innerHTML = `
    <input id="searchInput" value=" dish name" />
    <select id="resultsDropdown"></select>
  `;

  // --- Case 1: Empty response ---
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve({ results: [] })
  });
  await searchRestaurants();
  let option = document.querySelector('#resultsDropdown option');
  expect(option.textContent).toBe('No results found');

  // Clear dropdown for the next case
  document.getElementById('resultsDropdown').innerHTML = '';

  // --- Case 2: API returns data ---
  const fakeResponse = { results: [{ name: 'Pizza Palace', rating: '4.5', vicinity: 'Main Street' }] };
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(fakeResponse)
  });
  // Spy on console.log to check that the response is logged
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  await searchRestaurants();
  expect(logSpy).toHaveBeenCalledWith('Search results:', fakeResponse);
  logSpy.mockRestore();
});

