// ================================
// CONFIGURATION
// ================================

const CONFIG = {
    email: 'hello@mishahazy.com',
    social: {
        instagram: 'https://instagram.com/hazymay_',
        tiktok: 'https://tiktok.com/@hazymay_',
        linkedin: 'https://linkedin.com/in/mishahazy'
    },
    videos: [
        {
            id: 1,
            title: 'Beauty UGC | Pop of Beauty',
            caption: 'A natural, in-the-moment style video showing the product in use, with a clear before and after to highlight real results.',
            videoFile: 'assets/video1.mp4',
            thumbnail: 'assets/thumb1.jpg'
        },
        {
            id: 2,
            title: 'Hospitality UGC | House of Koko',
            caption: 'A relaxed, social-first video capturing the atmosphere, food, and experience, designed to feel natural, inviting, and easy to engage with.',
            videoFile: 'assets/video2.mp4',
            thumbnail: 'assets/thumb2.jpg'
        },
        {
            id: 3,
            title: 'Wellness UGC | Rudding Park',
            caption: 'A lifestyle-led video capturing the overall experience, combining movement, setting, and atmosphere to create content that feels organic and brand-aligned.',
            videoFile: 'assets/video3.mp4',
            thumbnail: 'assets/thumb3.jpg'
        },
        {
            id: 4,
            title: 'Event UGC | The Glee Club',
            caption: 'An engaging, social-first video capturing the energy and atmosphere of a live event, created to feel immersive and shareable.',
            videoFile: 'assets/video4.mp4',
            thumbnail: 'assets/thumb4.jpg'
        },
        {
            id: 5,
            title: 'Educational UGC | Wonder of Wellness',
            caption: 'A clear, informative video talking through a treatment in a simple and relatable way, designed to build trust and make complex topics feel accessible.',
            videoFile: 'assets/video5.mp4',
            thumbnail: 'assets/thumb5.jpg'
        }
    ]
};

// ================================
// UTILITY FUNCTIONS
// ================================

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ================================
// EMAIL & SOCIAL LINK SETUP
// ================================

function setupLinks() {
    const emailButtons = document.querySelectorAll('#ratesButton, #aboutEmailButton');
    emailButtons.forEach(button => {
        if (button) {
            button.href = `mailto:${CONFIG.email}`;
        }
    });

    const instagramLinks = document.querySelectorAll('#instagramLink, #aboutInstagramLink');
    instagramLinks.forEach(link => {
        if (link) {
            link.href = CONFIG.social.instagram;
        }
    });

    const tiktokLinks = document.querySelectorAll('#tiktokLink, #aboutTiktokLink');
    tiktokLinks.forEach(link => {
        if (link) {
            link.href = CONFIG.social.tiktok;
        }
    });

    const linkedinLinks = document.querySelectorAll('#aboutLinkedinLink');
    linkedinLinks.forEach(link => {
        if (link) {
            link.href = CONFIG.social.linkedin;
        }
    });
}

// ================================
// VIDEO GRID SETUP
// ================================

function setupVideoGrid() {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;

    videoGrid.innerHTML = '<h2 class="visually-hidden">Recent Work</h2>';

    CONFIG.videos.slice(0, 5).forEach(video => {
        const tile = document.createElement('button');
        tile.className = 'video-tile';
        tile.type = 'button';
        tile.setAttribute('aria-label', `Play ${video.title}`);

        tile.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" loading="lazy">
            <div class="video-overlay">
                <div class="video-title">${video.title}</div>
                <div class="video-caption">${video.caption}</div>
            </div>
        `;

        tile.addEventListener('click', () => openVideoModal(video));
        videoGrid.appendChild(tile);
    });
}

// ================================
// VIDEO MODAL
// ================================

let currentModal = null;
let previousFocus = null;

function openVideoModal(video) {
    const modal = document.getElementById('videoModal');
    if (!modal) return;

    previousFocus = document.activeElement;

    const videoEmbed = document.getElementById('videoEmbed');
    const modalTitle = document.getElementById('modalTitle');
    const modalCaption = document.getElementById('modalCaption');

    videoEmbed.innerHTML = `
        <div class="video-modal-inner">
            <video controls autoplay playsinline>
                <source src="${video.videoFile}" type="video/mp4">
            </video>
        </div>
    `;

    modalTitle.textContent = video.title;
    modalCaption.textContent = video.caption;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    currentModal = modal;

    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.focus();
    }

    trapFocus(modal);
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (!modal) return;

    const videoEmbed = document.getElementById('videoEmbed');
    videoEmbed.innerHTML = '';

    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    currentModal = null;

    if (previousFocus) {
        previousFocus.focus();
        previousFocus = null;
    }
}

function setupVideoModal() {
    const modal = document.getElementById('videoModal');
    if (!modal) return;

    const closeButtons = modal.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeVideoModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentModal) {
            closeVideoModal();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            closeVideoModal();
        }
    });
}

// ================================
// SMOOTH SCROLLING
// ================================

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// LANDING PAGE INTERACTIONS
// ================================

function setupLandingPageInteractions() {
    const interactiveItems = document.querySelectorAll('.envelope, .polaroid');

    interactiveItems.forEach(item => {
        item.addEventListener('touchstart', () => {
            item.style.transform = item.classList.contains('polaroid')
                ? 'rotate(-3deg) translateY(-8px)'
                : 'translateY(-12px)';
        }, { passive: true });

        item.addEventListener('touchend', () => {
            item.style.transform = '';
        }, { passive: true });

        item.addEventListener('touchcancel', () => {
            item.style.transform = '';
        }, { passive: true });
    });
}

// ================================
// FORM HANDLING
// ================================

function setupFormHandling() {
    const forms = document.querySelectorAll('form[data-netlify="true"]');

    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const button = form.querySelector('button[type="submit"]');
            if (button) {
                button.disabled = true;
                button.textContent = 'Sending...';
            }
        });
    });
}

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

function setupAccessibility() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
        pageTitle.setAttribute('role', 'heading');
        pageTitle.setAttribute('aria-level', '1');
    }
}

// ================================
// LOADING STATES
// ================================

function setupLoadingStates() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}

// ================================
// INITIALIZE
// ================================

function init() {
    setupLinks();
    setupVideoGrid();
    setupVideoModal();
    setupSmoothScrolling();
    setupLandingPageInteractions();
    setupFormHandling();
    setupAccessibility();
    setupLoadingStates();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
