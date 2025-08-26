// Footer Loader Script
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    
    if (footerContainer) {
        // 현재 페이지가 pages 폴더에 있는지 확인
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const footerPath = isInPagesFolder ? '../footer.html' : 'footer.html';
        
        fetch(footerPath)
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Footer 로드 중 오류 발생:', error);
                footerContainer.innerHTML = '<p>Footer 로드 중 오류가 발생했습니다.</p>';
            });
    }
});
