
function smallScreen() { // this function is used to show the navigation bar in the small screen when the user click on the icon
    var x = document.getElementById("navbar");
    if (x.className === "navigation") { // check if the class name is equal to navigation
      x.className += " responsive"; // add the class name navigation responsive
    } else {
      x.className = "navigation"; // if the class name is not equal to navigation then it will set the class name to navigation
    }
  }

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
        }, 5000); // Change slide every 4 seconds
    }

    startSliders();
});


  async function searchRestaurants() {
    const input = document.getElementById('searchInput').value.toLowerCase(); // Get the input value and convert it to lowercase
    const resultsDropdown = document.getElementById('resultsDropdown'); // Get the dropdown element inside select tag
    // resultsDropdown.innerHTML = '<option value="">select </option>'; // you can rewrite in option tag
    try { // it is used to handle the error
        const response = await fetch(`http://localhost:3000/search?query=${input}`); // await is used to pause the execution until fetch completes 
        const data = await response.json(); // await is used to pause the execution until data convert in json format
        if (data.results.length > 0) { // check if the results has somthing and not empty
            data.results.forEach(restaurant => { // loop through the results. forEach is a method that calls a function for each element in the array
                const option = document.createElement('option'); // create an option element for each restaurant
                option.value = restaurant.name; // set the value of the option to the restaurant name
                option.textContent = `${restaurant.name} - Rating: ${restaurant.rating} - vicinity: ${restaurant.vicinity}`; //The text content includes the restaurant name, rating, and vicinity.
                resultsDropdown.appendChild(option); //it is adding option element in the resultsDropdown and option element has value and textContent.
            });
        } else { // if the results is empty then it will show the message in the dropdown
            const option = document.createElement('option');
            option.value = ''; // it will set the value of the option to empty
            option.textContent = 'No results found'; //it will show the message in the dropdown
            resultsDropdown.appendChild(option); 
        }
    } catch (error) { // it will handle the error
        console.error('Error:', error); // it will show the error in the console
        const option = document.createElement('option'); // it will create the option element
        option.value = '';      // it will set the value of the option to empty
        option.textContent = 'An error occurred while fetching data.'; // it will show the message in the dropdown
        resultsDropdown.appendChild(option); // it will add the option element in the resultsDropdown
    }
  }
  
  function optionFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function store() {
    var selectedRestaurant = document.getElementById("resultsDropdown").value;
    if (selectedRestaurant) {
      localStorage.setItem("selectedRestaurant", selectedRestaurant);
    }
  }
  


  function displayRestaurantName() {
    var restaurantName = localStorage.getItem("selectedRestaurant");
    if (restaurantName) {
      document.getElementById("restaurantName").innerText += restaurantName;
    }
  }
  
