// Footer Loader Script
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    
    if (footerContainer) {
        // 현재 페이지가 pages 폴더에 있는지 확인
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('github.com');
        
        let footerPath;
        if (isGitHubPages) {
            // GitHub Pages에서는 절대 경로 사용
            const repoName = window.location.pathname.split('/')[1] || '';
            footerPath = `/${repoName}/footer.html`;
        } else {
            // 로컬에서는 상대 경로 사용
            footerPath = isInPagesFolder ? '../footer.html' : 'footer.html';
        }
        
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
