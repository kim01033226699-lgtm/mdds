// GitHub Pages에서 CSS 경로 처리
function fixCSSPaths() {
    const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('github.com');
    if (isGitHubPages) {
        const repoName = window.location.pathname.split('/')[1] || '';
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        
        cssLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('../') && href.includes('styles.css')) {
                link.setAttribute('href', `/${repoName}/styles.css`);
            }
        });
    }
}

// 관리자 설정 로드 및 적용
function applyAdminConfig() {
    const config = JSON.parse(localStorage.getItem('mdds_admin_config') || '{}');

    // 푸터 YouTube 링크 업데이트
    const ytLink = document.getElementById('footer-youtube-link');
    if (ytLink && config.youtube?.channelUrl) {
        ytLink.href = config.youtube.channelUrl;
    }
}

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // CSS 경로 수정
    fixCSSPaths();

    // 관리자 설정 적용
    setTimeout(applyAdminConfig, 500); // 푸터 로드 후 적용
    
    // 네비게이션 활성화
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // 스크롤 시 네비게이션 활성화
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 부드러운 스크롤
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 이벤트 슬라이더 기능
    const eventCards = document.querySelectorAll('.event-card');
    const eventNavBtns = document.querySelectorAll('.event-nav .nav-btn');
    let currentEventIndex = 0;
    
    function showEvents(startIndex) {
        eventCards.forEach((card, index) => {
            if (index >= startIndex && index < startIndex + 4) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // 초기 이벤트 표시
    showEvents(0);
    
    // 이벤트 네비게이션 버튼 이벤트
    eventNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (index === 0) { // 왼쪽 버튼
                currentEventIndex = Math.max(0, currentEventIndex - 1);
            } else { // 오른쪽 버튼
                currentEventIndex = Math.min(eventCards.length - 4, currentEventIndex + 1);
            }
            showEvents(currentEventIndex);
        });
    });
    
    // 목회자 슬라이더 기능
    const pastorNavBtns = document.querySelectorAll('.pastor-nav .nav-btn');
    const pastors = [
        {
            name: '김목사',
            title: '담임목사',
            description: '하나님의 말씀을 통해 교회를 섬기며, 모든 성도들이 영적으로 성장할 수 있도록 인도하고 있습니다. 20년간의 목회 경험을 바탕으로 따뜻한 마음으로 교회를 이끌어가고 있습니다.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
        },
        {
            name: '이목사',
            title: '부목사',
            description: '청년부와 교육 사역을 담당하며, 젊은 세대들이 하나님의 말씀을 통해 영적으로 성장할 수 있도록 돕고 있습니다.',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
        },
        {
            name: '박목사',
            title: '전도목사',
            description: '선교와 전도 사역을 담당하며, 지역사회와 세계에 복음을 전파하는 일에 헌신하고 있습니다.',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
        }
    ];
    
    let currentPastorIndex = 0;
    
    function updatePastor() {
        const pastor = pastors[currentPastorIndex];
        const pastorImage = document.querySelector('.pastor-image img');
        const pastorName = document.querySelector('.pastor-info h3');
        const pastorTitle = document.querySelector('.pastor-title');
        const pastorDescription = document.querySelector('.pastor-description');
        
        pastorImage.src = pastor.image;
        pastorImage.alt = pastor.name;
        pastorName.textContent = pastor.name;
        pastorTitle.textContent = pastor.title;
        pastorDescription.textContent = pastor.description;
    }
    
    // 목회자 네비게이션 버튼 이벤트
    pastorNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (index === 0) { // 왼쪽 버튼
                currentPastorIndex = currentPastorIndex === 0 ? pastors.length - 1 : currentPastorIndex - 1;
            } else { // 오른쪽 버튼
                currentPastorIndex = currentPastorIndex === pastors.length - 1 ? 0 : currentPastorIndex + 1;
            }
            updatePastor();
        });
    });
    
    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.service-card, .event-card, .pastor-card, .sermon-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 검색 기능
    const searchIcon = document.querySelector('.navbar-nav .nav-link i.fa-search');
    const searchIconTop = document.querySelector('.top-bar .social-icons .fa-search');
    
    function openSearch() {
        const searchTerm = prompt('검색어를 입력하세요:');
        if (searchTerm) {
            // 실제 검색 기능 구현 (현재는 알림만 표시)
            alert(`"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다.`);
        }
    }
    
    if (searchIcon) {
        searchIcon.parentElement.addEventListener('click', openSearch);
    }
    
    if (searchIconTop) {
        searchIconTop.parentElement.addEventListener('click', openSearch);
    }
    
    // 드롭다운 메뉴 초기화 (데스크톱용)
    function initDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            // 기존 이벤트 리스너 제거
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.dropdown');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                
                // 다른 드롭다운 메뉴들 닫기
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                        const menuToggle = menu.previousElementSibling;
                        if (menuToggle && menuToggle.classList.contains('dropdown-toggle')) {
                            menuToggle.setAttribute('aria-expanded', 'false');
                        }
                        const menuParent = menu.closest('.dropdown');
                        if (menuParent) {
                            menuParent.classList.remove('show');
                        }
                    }
                });
                
                const isCurrentlyShown = dropdownMenu.classList.contains('show');
                
                if (isCurrentlyShown) {
                    dropdownMenu.classList.remove('show');
                    dropdown.classList.remove('show');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    dropdownMenu.classList.add('show');
                    dropdown.classList.add('show');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
        
        // 데스크톱에서 드롭다운 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            if (window.innerWidth >= 992 && !e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                    const menuToggle = menu.previousElementSibling;
                    if (menuToggle && menuToggle.classList.contains('dropdown-toggle')) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                    const menuParent = menu.closest('.dropdown');
                    if (menuParent) {
                        menuParent.classList.remove('show');
                    }
                });
            }
        });
    }
    
    // 초기 드롭다운 설정
    initDropdowns();
    
    // 헤더 로드 후 드롭다운 재초기화
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 헤더가 로드되면 드롭다운 재초기화
                    setTimeout(() => {
                        initDropdowns();
                    }, 100);
                }
            });
        });
        
        observer.observe(headerContainer, {
            childList: true,
            subtree: true
        });
    }
    
    // 모바일 메뉴 토글 (전역 함수로 설정)
    window.initMobileMenu = function() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            // 기존 이벤트 리스너 제거
            const newToggler = navbarToggler.cloneNode(true);
            navbarToggler.parentNode.replaceChild(newToggler, navbarToggler);
            
            newToggler.addEventListener('click', function(e) {
                e.preventDefault();
                navbarCollapse.classList.toggle('show');
            });
            
            // 모바일에서 드롭다운 토글 클릭 시 하위 메뉴 열기/닫기
            const mobileDropdownToggles = navbarCollapse.querySelectorAll('.dropdown-toggle');
            mobileDropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const dropdown = this.closest('.dropdown');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    const isCurrentlyShown = dropdownMenu.classList.contains('show');
                    
                    // 다른 드롭다운 메뉴들 닫기
                    navbarCollapse.querySelectorAll('.dropdown-menu').forEach(menu => {
                        if (menu !== dropdownMenu) {
                            menu.classList.remove('show');
                            const menuParent = menu.closest('.dropdown');
                            if (menuParent) {
                                menuParent.classList.remove('show');
                            }
                        }
                    });
                    
                    // 현재 드롭다운 토글
                    if (isCurrentlyShown) {
                        dropdownMenu.classList.remove('show');
                        dropdown.classList.remove('show');
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        dropdownMenu.classList.add('show');
                        dropdown.classList.add('show');
                        this.setAttribute('aria-expanded', 'true');
                    }
                });
            });
            
            // 모바일 메뉴에서 일반 링크 클릭 시 메뉴 닫기 (드롭다운 토글은 제외)
            const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navbarCollapse.classList.remove('show');
                });
            });
            
            // 모바일에서 드롭다운 아이템 클릭 시 메뉴 닫기
            const dropdownItems = navbarCollapse.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth < 992) {
                        navbarCollapse.classList.remove('show');
                    }
                });
            });
        }
    }
    
    // 초기 모바일 메뉴 설정
    initMobileMenu();
    
    // 큰글씨 모드 토글 기능
    initLargeFontMode();
    
    // 우상단 큰글씨 모드 버튼 생성
    createLargeFontControl();
    
    
    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // 이미지 로딩 최적화
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
        });
    });
    
    // 푸터 연도 자동 업데이트
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // 로딩 완료 후 애니메이션 시작
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // 툴팁 기능
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: #fff;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
        });
    });
    
    // 팝업 모달 기능 초기화
    initPopupModals();
    
    // 콘솔 메시지
    console.log('물댄동산교회 웹사이트가 로드되었습니다. 🕊️');
    console.log('하나님의 사랑이 여러분과 함께하시길 바랍니다. 🙏');
    
});

// 팝업 모달 기능 초기화
function initPopupModals() {
    // 모달 요소들
    const videoModal = document.getElementById('videoModal');
    const audioModal = document.getElementById('audioModal');
    const videoFrame = document.getElementById('videoFrame');
    const audioFrame = document.getElementById('audioFrame');
    
    // YouTube 재생목록에서 최신 설교 정보를 가져오는 함수
    async function loadLatestSermon() {
        // 관리자 설정에서 재생목록 ID 로드 (없으면 기본값)
        const adminConfig = JSON.parse(localStorage.getItem('mdds_admin_config') || '{}');
        const PLAYLIST_ID = adminConfig.sermon?.playlistId || 'PLuyd60PWgGd2rEYGrUkFLffSaQZDjOd1H';
        
        try {
            // RSS2JSON API를 사용하여 재생목록 정보 가져오기
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`)}`);
            const data = await response.json();
            
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                // 최신 영상 정보
                const latestVideo = data.items[0];
                const videoId = latestVideo.link.split('v=')[1];
                const title = latestVideo.title;
                const published = new Date(latestVideo.pubDate);
                const publishedDate = published.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).replace(/\./g, '.').replace(/\s/g, '');
                
                // 설교 정보 업데이트
                updateSermonInfo(title, videoId, publishedDate);
                
                // 전역 변수로 설정하여 팝업에서 사용
                window.currentSermon = {
                    title: title,
                    pastor: "정종한목사",
                    date: publishedDate,
                    videoId: videoId
                };
            } else {
                // 기본 정보로 설정
                setDefaultSermonInfo();
            }
            
        } catch (error) {
            console.error('설교 정보 로드 오류:', error);
            setDefaultSermonInfo();
        }
    }
    
    // 설교 정보를 화면에 업데이트하는 함수
    function updateSermonInfo(title, videoId, date) {
        const sermonTitle = document.querySelector('.sermon-title');
        const sermonDetails = document.querySelector('.sermon-details');
        
        if (sermonTitle) {
            sermonTitle.textContent = title;
            sermonTitle.classList.remove('loading');
        }
        
        if (sermonDetails) {
            sermonDetails.textContent = `│물댄동산교회│정종한목사│${date}`;
        }
    }
    
    // 기본 설교 정보 설정
    function setDefaultSermonInfo() {
        const sermonTitle = document.querySelector('.sermon-title');
        if (sermonTitle) {
            sermonTitle.textContent = "자유를 주셨으니(갈5:1,13-15)";
            sermonTitle.classList.remove('loading');
        }
        
        window.currentSermon = {
            title: "자유를 주셨으니(갈5:1,13-15)",
            pastor: "정종한목사",
            date: "2025.01.19",
            videoId: "VIDEO_ID_HERE"
        };
    }
    
    // 페이지 로드 시 최신 설교 정보 가져오기
    loadLatestSermon();
    
    // YouTube 버튼 클릭 이벤트 - 팝업에서 바로 실행
    const youtubeBtn = document.getElementById('youtube-popup');
    if (youtubeBtn) {
        youtubeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!window.currentSermon || window.currentSermon.videoId === "VIDEO_ID_HERE") {
                alert("설교 영상이 준비 중입니다. 곧 업로드될 예정입니다.");
                return;
            }
            
            // 모달 먼저 표시
            videoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // 사용자 상호작용 후 YouTube 영상 로드 (자동재생 보장)
            setTimeout(() => {
                const videoUrl = `https://www.youtube.com/embed/${window.currentSermon.videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&enablejsapi=1&origin=${window.location.origin}`;
                videoFrame.src = videoUrl;
                
                // iframe 로드 후 자동재생 강제 실행
                videoFrame.onload = function() {
                    setTimeout(() => {
                        try {
                            videoFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                        } catch (e) {
                            console.log('자동재생 시도 중...');
                        }
                    }, 1000);
                };
            }, 100);
        });
    }
    
    // 음성 버튼 클릭 이벤트 - 백그라운드에서만 재생
    const audioBtn = document.getElementById('audio-popup');
    if (audioBtn) {
        audioBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!window.currentSermon || window.currentSermon.videoId === "VIDEO_ID_HERE") {
                alert("설교 음성이 준비 중입니다. 곧 업로드될 예정입니다.");
                return;
            }
            
            // 모달 먼저 표시
            audioModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // 사용자 상호작용 후 YouTube 영상 로드 (자동재생 보장)
            setTimeout(() => {
                const audioUrl = `https://www.youtube.com/embed/${window.currentSermon.videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=${window.location.origin}`;
                audioFrame.src = audioUrl;
                
                // iframe 로드 후 자동재생 강제 실행
                audioFrame.onload = function() {
                    setTimeout(() => {
                        try {
                            audioFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                        } catch (e) {
                            console.log('음성 자동재생 시도 중...');
                        }
                    }, 1000);
                };
            }, 100);
        });
    }
    
    // 모달 닫기 버튼들
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            videoModal.style.display = 'none';
            audioModal.style.display = 'none';
            videoFrame.src = '';
            audioFrame.src = '';
            document.body.style.overflow = 'auto'; // 스크롤 복원
        });
    });
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        }
        if (e.target === audioModal) {
            audioModal.style.display = 'none';
            audioFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
         // ESC 키로 모달 닫기
     document.addEventListener('keydown', function(e) {
         if (e.key === 'Escape') {
             videoModal.style.display = 'none';
             audioModal.style.display = 'none';
             videoFrame.src = '';
             audioFrame.src = '';
             document.body.style.overflow = 'auto';
         }
     });
 }
 
 // 우상단 큰글씨 모드 컨트롤 생성
function createLargeFontControl() {
    // 기존 컨트롤이 있다면 제거
    const existingControl = document.querySelector('.large-font-control');
    if (existingControl) {
        existingControl.remove();
    }
    
    // 새로운 컨트롤 생성
    const control = document.createElement('div');
    control.className = 'large-font-control';
    control.innerHTML = `
        <span class="large-font-text">큰글씨</span>
        <div class="large-font-toggle"></div>
    `;
    
    // 페이지에 추가
    document.body.appendChild(control);
    
    // 토글 버튼 이벤트 리스너
    const toggle = control.querySelector('.large-font-toggle');
    toggle.addEventListener('click', function() {
        const isCurrentlyLarge = document.body.classList.contains('large-font-mode');
        
        if (isCurrentlyLarge) {
            // 큰글씨 모드 비활성화
            document.body.classList.remove('large-font-mode');
            localStorage.setItem('largeFontMode', 'false');
            toggle.classList.remove('active');
        } else {
            // 큰글씨 모드 활성화
            document.body.classList.add('large-font-mode');
            localStorage.setItem('largeFontMode', 'true');
            toggle.classList.add('active');
        }
    });
    
    // 초기 상태 설정
    const isLargeFontMode = localStorage.getItem('largeFontMode') === 'true';
    if (isLargeFontMode) {
        toggle.classList.add('active');
    }
}

// 큰글씨 모드 초기화 함수
function initLargeFontMode() {
    // 로컬 스토리지에서 큰글씨 모드 상태 확인
    const isLargeFontMode = localStorage.getItem('largeFontMode') === 'true';
    
    // 페이지 로드 시 저장된 상태 적용
    if (isLargeFontMode) {
        document.body.classList.add('large-font-mode');
    }
}
 
 
