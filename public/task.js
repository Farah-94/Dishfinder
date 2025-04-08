/* jshint esversion: 8 */

function smallScreen() { 
  var x = document.getElementById("navbar");
  if (x.className === "navigation") { 
      x.className += " responsive"; 
  } else {
      x.className = "navigation"; 
  }
}

document.querySelectorAll('a').forEach(function(anchor) {
  anchor.addEventListener('click', function() {
      smallScreen(); 
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  const imageSlider = document.querySelector('#image-slider .slides');
  const reviewSlider = document.querySelector('#review-slider .slides');
  const imageSlides = document.querySelectorAll('#image-slider .slide');
  const reviewSlides = document.querySelectorAll('#review-slider .slide');
  let currentIndex = 0;

  function startSliders() {
      setInterval(() => {
          currentIndex = (currentIndex + 1) % imageSlides.length;

          imageSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
          reviewSlider.style.transform = `translateX(-${currentIndex * 100}%)`;

          if (currentIndex === imageSlides.length - 1) {
              setTimeout(() => {
                  currentIndex = -1;
              }, 4000);
          }
      }, 5000);
  }

  startSliders();
});

async function searchRestaurants() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultsDropdown = document.getElementById('resultsDropdown');
  resultsDropdown.innerHTML = '';

  try {
    const response = await fetch(`https://dish-finder-c849795c3a91.herokuapp.com/search?query=${input}`);
    const data = await response.json();
    console.log('Search results:', data);

    if (data.results.length > 0) {
      const headerOption = document.createElement('option');
      headerOption.value = '';
      headerOption.textContent = 'Results received';
      resultsDropdown.appendChild(headerOption);

      data.results.forEach(restaurant => {
        const option = document.createElement('option');
        option.value = restaurant.name;
        option.textContent = `${restaurant.name} - Rating: ${restaurant.rating} - vicinity: ${restaurant.vicinity}`;
        resultsDropdown.appendChild(option);
      });
    } else {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No results found';
      resultsDropdown.appendChild(option);
    }
  } catch (error) {
    console.error('Error:', error);
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'An error occurred while fetching data.';
    resultsDropdown.appendChild(option);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', searchRestaurants);
});

function optionFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function store() {
  var selectedRestaurant = document.getElementById("resultsDropdown").value;
  if (selectedRestaurant) {
    localStorage.setItem("selectedRestaurant", selectedRestaurant);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById("resultsDropdown");
  if (dropdown) {
    dropdown.addEventListener('change', store);
  } else {
    console.error("Element with ID 'resultsDropdown' not found.");
  }
});


function displayRestaurantName() {
  const restaurantName = localStorage.getItem("selectedRestaurant");
  if (restaurantName) {
      document.getElementById("restaurantName").innerText += restaurantName;
      localStorage.removeItem("selectedRestaurant");
  }
}

// globally accessible functions
window.searchRestaurants = searchRestaurants;
window.store = store;
window.optionFunction = optionFunction;