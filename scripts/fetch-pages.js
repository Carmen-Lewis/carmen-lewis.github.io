// Specify the folder path in your GitHub repository
const folderPath = 'pages/all-other-pages';

// Function to fetch list of files from a folder in GitHub repository
export async function fetchFilesFromFolder(folderPath) {
    const response = await fetch(`https://api.github.com/repos/Carmen-Lewis/carmen-lewis.github.io/contents/${folderPath}`);
    const data = await response.json();
    return data;
}

// Function to fetch metadata from HTML content
export function extractMetadataFromHTML(htmlContent) {
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