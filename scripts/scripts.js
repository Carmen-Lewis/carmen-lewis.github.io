window.onload = function() {
    setTimeout(function() {
        var rightSection = document.querySelector('.right-section');
        var headerBanner = document.querySelector('.header-banner');
        headerBanner.style.display = 'flex'; // Show the header banner
        setTimeout(function() {
            rightSection.classList.add('expand');
        }, 3000); // Delay the expand animation by 3000ms (3 seconds) after the landing animation
    }, 3000); // Delay for 3000ms (3 seconds) before starting the animations
};