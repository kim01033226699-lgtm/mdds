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

                // 헤더 상호작용 초기화 (모바일 토글/드롭다운)
                initHeaderInteractions();
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

// 헤더 상호작용 초기화: 헤더가 동적으로 주입된 이후에 호출되어야 함
function initHeaderInteractions() {
    // Bootstrap 드롭다운 초기화 (데이터 API와 병행 가능)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggleEl => {
        try {
            // eslint-disable-next-line no-undef
            new bootstrap.Dropdown(toggleEl);
        } catch (e) {
            // bootstrap이 없는 경우 무시
        }
    });

    // 모바일 토글 버튼으로 네비게이션 펼치기/접기
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // 모바일에서 링크 클릭 시 닫기
        navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }

    // 모바일에서 드롭다운 토글 클릭 시 하위 메뉴 펼치기 (992px 미만일 때만)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.classList.toggle('show');
                }
            }
        });
    });
}
