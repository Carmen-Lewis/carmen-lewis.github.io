window.onload = function() {
    console.log("Page loaded");
    setTimeout(function() {
        var rightSection = document.querySelector('.right-section');
        var headerBanner = document.querySelector('.header-banner');
        headerBanner.style.display = 'flex'; // Show the header banner
        console.log("Header banner displayed");
        setTimeout(function() {
            rightSection.classList.add('expand');
            console.log("Right section expanded");
        }, 3000); // Delay the expand animation by 3000ms (3 seconds) after the landing animation
    }, 3000); // Delay for 3000ms (3 seconds) before starting the animations

    const menuIcon = document.querySelector('.menu-icon');
    const menuItems = document.querySelector('.menu-items');

    menuIcon.addEventListener('click', function() {
        menuItems.classList.toggle('open');
        menuIcon.classList.toggle('flip'); // Toggle the flip class
    });
};