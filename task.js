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
            // Move to the next slide
            currentIndex = (currentIndex + 1) % imageSlides.length;

            // Apply the transform to both sliders
            imageSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            reviewSlider.style.transform = `translateX(-${currentIndex * 100}%)`;

            // If we're at the end of the slides, add a delay
            if (currentIndex === imageSlides.length - 1) {
                setTimeout(() => {
                    currentIndex = -1; // Reset index to start from 0 on the next interval
                }, 4000); // Delay time in milliseconds
            }
        }, 5000); // Change slide every 5 seconds
    }

    startSliders();
});


async function searchRestaurants() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const resultsDropdown = document.getElementById('resultsDropdown');
  resultsDropdown.innerHTML = '';

  try {
      const response = await fetch(`http://localhost:3000/search?query=${input}`);
      const data = await response.json();
      console.log('Search results:', data); // Debugging line
      if (data.results.length > 0) {
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

  
  function optionFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function store() {
var selectedRestaurant = document.getElementById("resultsDropdown").value;
    if (selectedRestaurant)
       {
      localStorage.setItem("selectedRestaurant", selectedRestaurant);
    }
  }
  


  function displayRestaurantName() {
    const restaurantName = localStorage.getItem("selectedRestaurant");
    if (restaurantName) {
        document.getElementById("restaurantName").innerText += restaurantName;
        localStorage.removeItem("selectedRestaurant"); // Clear the restaurant name from local storage
    }
}

  
