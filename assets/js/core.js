const downloadLink = "https://play.google.com/store/apps/details?id=com.classic.cube.puzzle.v88";

const headerHTML = `
<div class="container nav-wrapper">
    <a href="/" class="logo">BLOCK PUZZLE</a>
    <nav class="nav-links">
        <a href="/"><span class="lang-en">Terms of Use</span><span class="lang-ar">شروط الاستخدام</span></a>
        <a href="/about"><span class="lang-en">About</span><span class="lang-ar">حول اللعبة</span></a>
        <a href="/contact"><span class="lang-en">Contact</span><span class="lang-ar">تواصل معنا</span></a>
        <a href="/privacy-policy"><span class="lang-en">Privacy Policy</span><span class="lang-ar">سياسة الخصوصية</span></a>
        <button class="btn-lang lang-toggle-btn">العربية</button>
        <a href="${downloadLink}" target="_blank" rel="noopener noreferrer" class="btn-nav-download"><span class="lang-en">Download</span><span class="lang-ar">تحميل</span></a>
    </nav>
    <div style="display: flex; gap: 16px; align-items: center;">
        <button class="btn-lang lang-toggle-btn mobile-lang-btn" style="display: none;">العربية</button>
        <button class="mobile-menu-btn" id="menuBtn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
    </div>
</div>

<div class="sidebar" id="sidebar">
    <button class="close-btn" id="closeBtn">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <nav class="sidebar-links">
        <a href="/"><span class="lang-en">Terms of Use</span><span class="lang-ar">شروط الاستخدام</span></a>
        <a href="/about"><span class="lang-en">About</span><span class="lang-ar">حول اللعبة</span></a>
        <a href="/contact"><span class="lang-en">Contact</span><span class="lang-ar">تواصل معنا</span></a>
        <a href="/privacy-policy"><span class="lang-en">Privacy Policy</span><span class="lang-ar">سياسة الخصوصية</span></a>
        <button class="btn-lang lang-toggle-btn" style="margin-top: 16px;">العربية</button>
        <div style="margin-top: 32px; width: 100%; max-width: 250px;">
            <a href="${downloadLink}" target="_blank" rel="noopener noreferrer" class="btn-premium" style="display: block; width: 100%; text-align: center; padding: 16px 0;"><span class="lang-en">Download Game</span><span class="lang-ar">تحميل اللعبة</span></a>
        </div>
    </nav>
</div>
`;

const footerHTML = `
<div class="container">
    <p>&copy; ${new Date().getFullYear()} BLOCK PUZZLE</p>
</div>
`;

document.addEventListener("DOMContentLoaded", () => {
    const headerElement = document.querySelector(".header");
    if (headerElement) headerElement.innerHTML = headerHTML;

    const footerElement = document.querySelector(".footer");
    if (footerElement) footerElement.innerHTML = footerHTML;

    if (window.innerWidth <= 768) {
        const mobileLangBtn = document.querySelector('.mobile-lang-btn');
        if(mobileLangBtn) mobileLangBtn.style.display = 'block';
    }

    const setLanguage = (lang) => {
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
            localStorage.setItem('siteLang', 'ar');
            document.querySelectorAll('.lang-toggle-btn').forEach(btn => btn.textContent = 'English');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
            localStorage.setItem('siteLang', 'en');
            document.querySelectorAll('.lang-toggle-btn').forEach(btn => btn.textContent = 'العربية');
        }
    };

    const savedLang = localStorage.getItem('siteLang') || 'en';
    setLanguage(savedLang);

    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentLang = document.documentElement.getAttribute('lang');
            setLanguage(currentLang === 'en' ? 'ar' : 'en');
        });
    });

    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");

    function openMenu() {
        sidebar.classList.add("active");
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        sidebar.classList.remove("active");
        document.body.style.overflow = '';
    }

    if (menuBtn) menuBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    let currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll('.nav-links a, .sidebar-links a');
    
    allLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || (currentPath === '/' && linkPath === '/')) {
            if(!link.classList.contains('btn-nav-download') && !link.classList.contains('btn-premium')) {
                link.classList.add('active-link');
            }
        }
    });

    let path = window.location.pathname;
    const validPages = ['/privacy-policy', '/about', '/contact', '/'];
    if (path.includes('404')) {
        for (let page of validPages) {
            if (path.includes(page) && path !== page) {
                window.location.replace(page + window.location.search);
                return;
            }
        }
    }
});
