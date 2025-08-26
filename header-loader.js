// 헤더 로더 스크립트
document.addEventListener('DOMContentLoaded', function() {
    // 헤더를 로드할 요소 찾기
    const headerContainer = document.getElementById('header-container');
    
    if (headerContainer) {
        // 현재 페이지 경로 확인
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const headerPath = isInPagesFolder ? '../header.html' : 'header.html';
        
        // 헤더 HTML 파일 로드
        fetch(headerPath)
            .then(response => response.text())
            .then(data => {
                // 현재 페이지 위치에 따라 링크 경로 조정
                if (isInPagesFolder) {
                    data = data.replace(/href="pages\//g, 'href="');
                    data = data.replace(/href="index\.html"/g, 'href="../index.html"');
                }
                
                headerContainer.innerHTML = data;
                
                // 현재 페이지에 맞는 active 클래스 설정
                setActiveNavItem();
            })
            .catch(error => {
                console.error('헤더 로드 중 오류:', error);
                // 오류 시 기본 헤더 표시
                headerContainer.innerHTML = `
                    <header class="header">
                        <div class="main-header">
                            <div class="container">
                                <div class="row align-items-center">
                                    <div class="col-md-6">
                                        <div class="logo">
                                            <i class="fas fa-dove"></i>
                                            <span>물댄동산교회</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6 text-end">
                                        <div class="bible-verse">
                                            "내 혀의 말을 알지 못하시는 자가 없으시니이다. 여호와여" - 시편 139:4
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                `;
            });
    }
});

// 현재 페이지에 맞는 네비게이션 아이템에 active 클래스 설정
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // 현재 페이지와 링크 경로 비교
        if (link.getAttribute('href')) {
            const href = link.getAttribute('href');
            if (currentPath.endsWith(href) || 
                (currentPath === '/' && href === 'index.html') ||
                (currentPath.includes('/pages/') && href.includes(currentPath.split('/').pop()))) {
                link.classList.add('active');
                
                // 드롭다운 메뉴의 경우 부모 아이템도 active로 설정
                const dropdownItem = link.closest('.dropdown-item');
                if (dropdownItem) {
                    const dropdownToggle = dropdownItem.closest('.dropdown').querySelector('.dropdown-toggle');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
            }
        }
    });
}
