// 헤더 로더 스크립트 (DOM 상태에 따라 즉시/지연 실행)
(function initHeaderLoader() {
    const run = () => {
        const headerContainer = document.getElementById('header-container');
        if (!headerContainer) return;

        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('github.com');
        
        let headerPath;
        if (isGitHubPages) {
            // GitHub Pages에서는 절대 경로 사용
            const repoName = window.location.pathname.split('/')[1] || '';
            headerPath = `/${repoName}/header.html`;
        } else {
            // 로컬에서는 상대 경로 사용
            headerPath = isInPagesFolder ? '../header.html' : 'header.html';
        }

        fetch(headerPath)
            .then(response => response.text())
            .then(data => {
                if (isGitHubPages) {
                    // GitHub Pages에서 링크 수정
                    const repoName = window.location.pathname.split('/')[1] || '';
                    data = data.replace(/href="pages\//g, `href="/${repoName}/pages/`);
                    data = data.replace(/href="index\.html"/g, `href="/${repoName}/index.html"`);
                } else if (isInPagesFolder) {
                    // 로컬에서 pages 폴더일 때
                    data = data.replace(/href="pages\//g, 'href="');
                    data = data.replace(/href="index\.html"/g, 'href="../index.html"');
                }

                headerContainer.innerHTML = data;

                setActiveNavItem();
                initHeaderInteractions();
                
                // 모바일 드롭다운 초기화
                if (typeof initMobileDropdowns === 'function') {
                    initMobileDropdowns();
                }
                if (typeof initMobileMenu === 'function') {
                    initMobileMenu();
                }
            })
            .catch(error => {
                console.error('헤더 로드 중 오류:', error);
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
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();

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
    // 모바일 토글 버튼으로 네비게이션 펼치기/접기
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // 기존 이벤트 리스너 제거 후 새로 추가
        navbarToggler.replaceWith(navbarToggler.cloneNode(true));
        const newToggler = document.querySelector('.navbar-toggler');
        
        newToggler.addEventListener('click', function(e) {
            e.preventDefault();
            navbarCollapse.classList.toggle('show');
        });

        // 모바일에서 일반 링크 클릭 시 메뉴 닫기 (드롭다운 토글은 제외)
        navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });

        // 모바일에서 드롭다운 아이템 클릭 시 메뉴 닫기
        navbarCollapse.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // 드롭다운 메뉴 초기화 (script.js에서 처리하므로 여기서는 제거)
    // Bootstrap 드롭다운 초기화 (데스크톱용)
    if (typeof bootstrap !== 'undefined') {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggleEl => {
            try {
                new bootstrap.Dropdown(toggleEl, {
                    boundary: 'viewport'
                });
            } catch (e) {
                console.log('Bootstrap dropdown initialization failed:', e);
            }
        });
    }

    // 모바일에서 바깥 영역 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            // 네비게이션 영역 외부 클릭 시에만 닫기
            if (!e.target.closest('.navbar-collapse')) {
                document.querySelectorAll('.navbar-collapse .dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                    const toggleEl = menu.previousElementSibling;
                    if (toggleEl && toggleEl.classList.contains('dropdown-toggle')) {
                        toggleEl.setAttribute('aria-expanded', 'false');
                    }
                    const pd = menu.closest('.dropdown');
                    if (pd) pd.classList.remove('show');
                });
            }
        }
    });
}
