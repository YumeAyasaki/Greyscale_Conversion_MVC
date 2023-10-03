const uploadForm = document.getElementById('uploadForm');
const grayscaleImageContainer = document.getElementById('grayscaleImageContainer');
const grayscaleImage = document.getElementById('grayscaleImage');

// Function to display the grayscale image
function displayGrayscaleImage(imageData) {
    grayscaleImage.src = imageData; 
}

// Prevent the default form submission and handle it with JavaScript
uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Create a FormData object to send the file
    const formData = new FormData(uploadForm);
    const fileName = formData.get('file').name;

    try {
        // Send the file using a fetch request
        const response = await fetch('/image/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            displayGrayscaleImage(imageUrl);
        } else {
            console.error('Error uploading the file.');
        }
    } catch (error) {
        console.error('Error uploading the file:', error);
    }
});
