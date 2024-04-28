window.onload = function() {
    const enterLink = document.querySelector('.enter');
    const rightSection = document.querySelector('.right-section');
    
    enterLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        
        // Expand the right section
        rightSection.style.width = '75%';
        
        // Hide the "Enter" link
        enterLink.style.opacity = '0';
        
        // Redirect to main.html after the transition animation finishes
        setTimeout(function() {
            window.location.href = "pages/main.html";
        }, 1000); // Adjust the delay to match the duration of your transition animation
    });
};

