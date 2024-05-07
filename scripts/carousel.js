import { fetchFilesFromFolder, extractMetadataFromHTML } from './fetch-pages.js';

const folderPath = 'pages/all-other-pages';

// Create cards for carousel
async function generateSmallCardsFromFiles(files) {
    const CarouselContainer = document.querySelector('.item-list');

    for (const file of files) {
        if (file.type === 'file' && file.name.endsWith('.html')) {
            const cardSmall = document.createElement('div');
            cardSmall.classList.add('item');

            cardSmall.addEventListener('click', () => {
                window.location.href = `/${folderPath}/${file.name}`;
            });

            const response = await fetch(file.download_url);
            const htmlContent = await response.text();
            const { title, image, type } = extractMetadataFromHTML(htmlContent);

            cardSmall.innerHTML = `
                <div class="card-inner-small">
                    <div class="card-preview">
                        <img src="${image}" alt="Card Image">
                    </div>
                    <p><span class="type">${type}</span> ${title}</p>
                </div>
            `;

            CarouselContainer.appendChild(cardSmall);
        }
    }
}

// Fetch files from the specified folder and generate cards
fetchFilesFromFolder(folderPath)
    .then(data => generateSmallCardsFromFiles(data))
    .catch(error => console.error('Error fetching files:', error));