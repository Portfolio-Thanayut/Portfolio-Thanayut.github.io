const typingTarget = document.querySelector(".typing-text");
const navLinks = document.querySelectorAll(".nav-link");
const burger = document.querySelector(".burger");
const navMenu = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const backToTop = document.querySelector(".back-to-top");
const downloadPortfolio = document.getElementById("downloadPortfolio");
const currentYear = document.getElementById("currentYear");

const typingTexts = [
    "มหาวิทยาลัยราชภัฏนครสวรรค์",
    "สาขาคอมพิวเตอร์และเทคโนโลยีการศึกษา",
    "ครูคอมพิวเตอร์และสื่อการสอนดิจิทัล"
];

let typingTextIndex = 0;
let typingCharIndex = 0;

function typeLoop() {
    if (!typingTarget) return;

    const currentText = typingTexts[typingTextIndex];
    typingCharIndex += 1;
    typingTarget.textContent = currentText.slice(0, typingCharIndex);

    if (typingCharIndex < currentText.length) {
        setTimeout(typeLoop, 82);
        return;
    }

    setTimeout(() => {
        typingTextIndex = (typingTextIndex + 1) % typingTexts.length;
        typingCharIndex = 0;
        typeLoop();
    }, 1800);
}

function closeMobileMenu() {
    navMenu?.classList.remove("open");
    burger?.classList.remove("active");
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "เปิดเมนู");
}

function toggleMobileMenu() {
    const isOpen = navMenu?.classList.toggle("open");
    burger?.classList.toggle("active", Boolean(isOpen));
    burger?.setAttribute("aria-expanded", String(Boolean(isOpen)));
    burger?.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
}

function setThemeIcon() {
    const icon = themeToggle?.querySelector("i");
    if (!icon) return;

    icon.className = document.body.classList.contains("dark") ? "fas fa-sun" : "fas fa-moon";
}

function loadTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    setThemeIcon();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("dark") ? "dark" : "light");
    setThemeIcon();
}

function updateBackToTop() {
    backToTop?.classList.toggle("show", window.scrollY > 520);
}

function initActiveNav() {
    const sections = document.querySelectorAll(".section-anchor");
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
}

function initRevealAnimations() {
    const revealItems = document.querySelectorAll(".reveal");
    if (!revealItems.length) return;

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16
    });

    revealItems.forEach((item) => observer.observe(item));
}

function animateCounter(counter) {
    const targetValue = Number(counter.dataset.count || 0);
    const formatter = new Intl.NumberFormat("th-TH");
    const duration = 1000;
    const startTime = performance.now();

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = formatter.format(Math.round(targetValue * eased));

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {
        counters.forEach(animateCounter);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach((counter) => observer.observe(counter));
}

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("img01");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.querySelector(".modal-close");
const modalPrev = document.querySelector(".modal-prev");
const modalNext = document.querySelector(".modal-next");
const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
let activeGalleryIndex = 0;

function visibleGalleryCards() {
    return galleryCards.filter((card) => !card.classList.contains("hidden"));
}

function showModalCard(card) {
    const image = card.querySelector("img");
    const title = card.querySelector("h3")?.textContent || image?.alt || "";

    if (!modal || !modalImg || !image) return;

    modalImg.src = image.src;
    modalImg.alt = image.alt;
    if (modalCaption) modalCaption.textContent = title;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function openGalleryModal(card) {
    const visibleCards = visibleGalleryCards();
    activeGalleryIndex = Math.max(0, visibleCards.indexOf(card));
    showModalCard(card);
}

function closeGalleryModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function moveGallery(direction) {
    const visibleCards = visibleGalleryCards();
    if (!visibleCards.length) return;

    activeGalleryIndex = (activeGalleryIndex + direction + visibleCards.length) % visibleCards.length;
    showModalCard(visibleCards[activeGalleryIndex]);
}

function initGalleryFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
            galleryCards.forEach((card) => {
                const shouldShow = filter === "all" || card.dataset.category === filter;
                card.classList.toggle("hidden", !shouldShow);
            });
        });
    });

    galleryCards.forEach((card) => {
        card.addEventListener("click", () => openGalleryModal(card));
    });
}

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const status = form.querySelector(".form-status");

        if (!name || !email || !message) {
            if (status) status.textContent = "กรุณากรอกข้อมูลให้ครบก่อนส่งข้อความ";
            return;
        }

        const subject = encodeURIComponent(`ติดต่อจากเว็บไซต์ Portfolio - ${name}`);
        const body = encodeURIComponent(`ชื่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}`);
        window.location.href = `mailto:thanayuts6778@gmail.com?subject=${subject}&body=${body}`;

        if (status) status.textContent = "ระบบกำลังเปิดอีเมลพร้อมข้อความที่กรอกไว้";
    });
}

function initEvents() {
    burger?.addEventListener("click", toggleMobileMenu);
    themeToggle?.addEventListener("click", toggleTheme);
    backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    downloadPortfolio?.addEventListener("click", () => window.print());

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("scroll", updateBackToTop, { passive: true });

    modalClose?.addEventListener("click", closeGalleryModal);
    modalPrev?.addEventListener("click", () => moveGallery(-1));
    modalNext?.addEventListener("click", () => moveGallery(1));

    modal?.addEventListener("click", (event) => {
        if (event.target === modal) closeGalleryModal();
    });

    document.addEventListener("keydown", (event) => {
        if (!modal?.classList.contains("open")) return;

        if (event.key === "Escape") closeGalleryModal();
        if (event.key === "ArrowLeft") moveGallery(-1);
        if (event.key === "ArrowRight") moveGallery(1);
    });
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

loadTheme();
typeLoop();
initEvents();
initActiveNav();
initRevealAnimations();
initCounters();
initGalleryFilter();
initContactForm();
updateBackToTop();
