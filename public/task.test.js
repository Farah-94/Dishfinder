import { jest } from '@jest/globals';
import { searchRestaurants } from './task.js';


describe('searchRestaurants function', () => {
  beforeEach(() => {

    document.body.innerHTML = `
      <input id="searchInput" value="test dish" />
      <select id="resultsDropdown"></select>
    `;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('displays "No results found" when API returns an empty result set', async () => {
    const fakeResponse = { results: [] };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeResponse)
    });

    await searchRestaurants();

    const resultsDropdown = document.getElementById('resultsDropdown');
    const option = resultsDropdown.querySelector('option');
    expect(option.textContent).toBe('No results found');
  });
});