window.onload = function() {

    const menuIcon = document.querySelector('.menu-icon');
    const menuItems = document.querySelector('.menu-items');

    menuIcon.addEventListener('click', function() {
        menuItems.classList.toggle('open');
        menuIcon.classList.toggle('flip'); // Toggle the flip class
    });

    const prev = document.getElementById('prev-btn')
    const next = document.getElementById('next-btn')
    const list = document.getElementById('item-list')

    const itemWidth = 350
    const padding = 20

    prev.addEventListener('click',()=>{
        list.scrollLeft -= itemWidth + padding
    })

    next.addEventListener('click',()=>{
        list.scrollLeft += itemWidth + padding
    })

    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.getElementById('search-bar');

    searchBar.style.display = 'none';

    searchIcon.addEventListener('click', function() {
        // Toggle the visibility of the search bar
        if (searchBar.style.display === 'none') {
            searchBar.style.display = 'block';
            searchIcon.classList.add('search-selected');
        } else {
            searchBar.style.display = 'none';
            searchIcon.classList.remove('search-selected');
        }
    });

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

    const tagsIcon = document.querySelector('.tags-icon');
    const tagCloud = document.querySelector('.tag-cloud');

    tagCloud.style.display = 'none';

    tagsIcon.addEventListener('click', function() {
        if (tagCloud.style.display === 'none') {
            tagCloud.style.display = 'flex';
            tagsIcon.classList.add('tags-selected');
        } else {
            tagCloud.style.display = 'none';
            tagsIcon.classList.remove('tags-selected');
        }
    });
};
