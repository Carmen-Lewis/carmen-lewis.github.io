window.onload = function() {

    const menuIcon = document.querySelector('.menu-icon');
    const menuItems = document.querySelector('.menu-items');

    menuIcon.addEventListener('click', function() {
        menuItems.classList.toggle('open');
        menuIcon.classList.toggle('flip');
    });

    const prev = document.getElementById('prev-btn')
    const next = document.getElementById('next-btn')
    const list = document.getElementById('item-list')

    const itemWidth = 350
    const padding = 20

    if (prev && next && list) {
        const itemWidth = 350;
        const padding = 20;

        prev.addEventListener('click', () => {
            list.scrollLeft -= itemWidth + padding;
        });

        next.addEventListener('click', () => {
            list.scrollLeft += itemWidth + padding;
        });
    }

    // Fetch the JSON data
    fetch('/data/tags.json')
    .then(response => response.json())
    .then(data => {
    const tagCloud = document.querySelector('.tag-cloud');

    // Generate HTML for each tag
    data.tags.forEach(tag => {
        const tagName = typeof tag === 'string' ? tag : tag.name; // Accessing name property
        const tagElement = document.createElement('span');
        tagElement.textContent = tagName;
        tagElement.classList.add('tag');
        tagCloud.appendChild(tagElement);
    });
    })
    .catch(error => console.error('Error fetching tags:', error));
};
