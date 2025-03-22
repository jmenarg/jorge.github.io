document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadCvBtn');
    
    downloadBtn.addEventListener('click', async () => {
        const response = await fetch('./assets/files/mi-cv.pdf');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mi-cv.pdf';
        link.click();
        window.URL.revokeObjectURL(url); // Limpia el objeto URL
    });
});
