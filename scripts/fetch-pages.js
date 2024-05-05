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
    const keywords = doc.querySelector('meta[name="keywords"]').getAttribute('content') || '';
    const author = doc.querySelector('meta[name="author"]').getAttribute('content') || '';
    const date = doc.querySelector('meta[name="date"]').getAttribute('content') || '';
    const type = doc.querySelector('meta[name="type"]').getAttribute('content') || '';
    console.log('Title element:', doc.querySelector('image'));
    return { title, description, image, keywords, author, date, type };
}

// Function to generate card elements based on file names and metadata
//                    <div class="card-preview-horizontal">
// <img src="/images/card-preview-placeholder.png" alt="Card Image">
//</div>
async function generateCardsFromFiles(files) {
    const container = document.querySelector('.card-container');

    for (const file of files) {
        if (file.type === 'file' && file.name.endsWith('.html')) {
            const card = document.createElement('div');
            card.classList.add('card');

            const response = await fetch(file.download_url);
            const htmlContent = await response.text();

            const { title, description, image, keywords, author, date, type } = extractMetadataFromHTML(htmlContent);
            
            card.innerHTML = `
                <a href="${folderPath}/${file.name}">

                    <p><span class="type">${type}</span>${title}</p>
                    <p>${description}</p>
                </a>
            `;

            container.appendChild(card);
        }
    }
}

// Fetch files from the specified folder and generate cards
fetchFilesFromFolder(folderPath)
    .then(data => generateCardsFromFiles(data))
    .catch(error => console.error('Error fetching files:', error));