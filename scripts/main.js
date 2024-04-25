window.onload = function() {

    const menuIcon = document.querySelector('.menu-icon');
    const menuItems = document.querySelector('.menu-items');

    menuIcon.addEventListener('click', function() {
        menuItems.classList.toggle('open');
        menuIcon.classList.toggle('flip'); // Toggle the flip class
    });
};
