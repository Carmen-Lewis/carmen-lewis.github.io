// Function to fetch list of files from a folder in GitHub repository
async function fetchFilesFromFolder(folderPath) {
    const response = await fetch(`https://api.github.com/repos/Carmen-Lewis/carmen-lewis.github.io/contents/${folderPath}`);
    const data = await response.json();
    return data;
}

// Function to generate card elements based on file names
function generateCardsFromFiles(files) {
    const container = document.querySelector('.card-container');

    files.forEach(file => {
        if (file.type === 'file' && file.name.endsWith('.html')) {
            const card = document.createElement('div');
            card.classList.add('card');

            const fileName = file.name.replace('.html', '');
            card.innerHTML = `
                <a href="${folderPath}/${file.name}">
                    <h2>${file.title}</h2>
                </a>
            `;

            container.appendChild(card);
        }
    });
}

// Specify the folder path in your GitHub repository
const folderPath = 'pages/all-other-pages';

// Fetch files from the specified folder and generate cards
fetchFilesFromFolder(folderPath)
    .then(data => generateCardsFromFiles(data))
    .catch(error => console.error('Error fetching files:', error));
