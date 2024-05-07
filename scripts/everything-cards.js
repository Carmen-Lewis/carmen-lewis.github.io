import { fetchFilesFromFolder, extractMetadataFromHTML } from './fetch-pages.js';

const folderPath = 'pages/all-other-pages';

// Function to generate card elements based on file names and metadata
async function generateCardsFromFiles(files) {
    const container = document.querySelector('.card-container');

    for (const file of files) {
        if (file.type === 'file' && file.name.endsWith('.html')) {
            const card = document.createElement('div');
            card.classList.add('card');

            // Add click event listener to the card
            card.addEventListener('click', () => {
                window.location.href = `/${folderPath}/${file.name}`;
            });

            const response = await fetch(file.download_url);
            const htmlContent = await response.text();
            const { title, description, image, keywords, author, date, type } = extractMetadataFromHTML(htmlContent);
            
            const keywordSpans = keywords.map(keyword => `<span class="tag"">${keyword}</span>`).join('');
            
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-preview-horizontal">
                        <img src="${image}" alt="Card Image">
                    </div>
                    <div class="card-preview-text">
                        <span class="type">${type}</span> ${title}
                        <p>${description}</p>
                        <div class="keyword-span">${keywordSpans}</div>
                    </div>
                </div>
            `;

            container.appendChild(card);
        }
    }
}

// Fetch files from the specified folder and generate cards
fetchFilesFromFolder(folderPath)
    .then(data => generateCardsFromFiles(data))
    .catch(error => console.error('Error fetching files:', error));