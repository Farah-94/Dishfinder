
function clickFunction() {
    var x = document.getElementById("navbar");
    if (x.className === "navigation") {
      x.className += " responsive";
    } else {
      x.className = "navigation";
    }
  }
  $(document).ready(function () {
    let currentIndex = 0;
    const slides = $('.slides');
    const slideCount = $('.slide').length;
  
    function showNextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      slides.css('transform', 'translateX(' + (-currentIndex * 100) + '%)');
    }
  
    setInterval(showNextSlide, 4000); // Change image every 4 seconds
  });
  