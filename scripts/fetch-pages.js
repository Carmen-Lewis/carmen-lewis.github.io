// Specify the folder path in your GitHub repository
const folderPath = 'pages/all-other-pages';

// Function to fetch list of files from a folder in GitHub repository
async function fetchFilesFromFolder(folderPath) {
    const response = await fetch(`https://api.github.com/repos/Carmen-Lewis/carmen-lewis.github.io/contents/${folderPath}`);
    const data = await response.json();
    return data;
}

// Function to fetch metadata from HTML content
function extractMetadataFromHTML(htmlContent) {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
    const title = doc.querySelector('title').textContent || '';
    const description = doc.querySelector('meta[name="description"]').getAttribute('content') || '';
    const image = doc.querySelector('meta[name="image"]').getAttribute('content') || '';
    const keywordsString = doc.querySelector('meta[name="keywords"]').getAttribute('content') || ''; // Get keywords string
    console.log('Keywords string:', keywordsString); // Debugging: Check the value of keywordsString
    const keywords = keywordsString.split(',').map(keyword => keyword.trim()); // Split keywords string into array
    console.log('Keywords array:', keywords); // Debugging: Check the value of keywords array
    const author = doc.querySelector('meta[name="author"]').getAttribute('content') || '';
    const date = doc.querySelector('meta[name="date"]').getAttribute('content') || '';
    const type = doc.querySelector('meta[name="type"]').getAttribute('content') || '';
    return { title, description, image, keywords, author, date, type };
}

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
                        <div class="card-preview-text-inner">
                            <span class="type">${type}</span>${title}
                            <p>${description}</p>
                        </div>
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