const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 3000;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

let autoSlide = setInterval(nextSlide, slideInterval);

document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, slideInterval);
});

// 부드러운 스크롤
document.querySelectorAll('nav a[data-scroll]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-scroll');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (targetId === 'home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// 자동 스크롤
let autoScrollTimeout = null;
let isAutoScrolling = false;

function startAutoScroll() {
    if (isAutoScrolling) return; // 중복 실행 방지
    isAutoScrolling = true;
    alert('자동 스크롤을 시작합니다!'); // 알림

    const sections = ['home', 'about', 'portfolio', 'team', 'contact', 'home'];
    let currentSectionIndex = 0;

    function scrollToNextSection() {
        if (!isAutoScrolling) return; // 스크롤 중단 시 종료

        const sectionId = sections[currentSectionIndex];
        const sectionElement = document.getElementById(sectionId);

        if (sectionElement) {
            sectionElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (sectionId === 'home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        currentSectionIndex++;

        if (currentSectionIndex < sections.length) {
            autoScrollTimeout = setTimeout(scrollToNextSection, 5000); // 5초 대기
        } else {
            isAutoScrolling = false; // 스크롤 종료
            clearTimeout(autoScrollTimeout);
        }
    }

    // 클릭 이벤트 리스너 (Auto Scroll 버튼 제외)
    const stopAutoScroll = (event) => {
        if (isAutoScrolling && event.target.id !== 'auto-scroll-btn') {
            clearTimeout(autoScrollTimeout);
            isAutoScrolling = false;
            document.body.removeEventListener('click', stopAutoScroll);
        }
    };

    document.body.addEventListener('click', stopAutoScroll);

    scrollToNextSection(); // 자동 스크롤 시작
}