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
            title: 'Summer Skincare Routine',
            caption: 'Authentic morning routine showcasing brand partnership',
            videoFile: 'assets/video1.mp4',
            thumbnail: 'assets/thumb1.jpg'
        },
        {
            id: 2,
            title: 'Coffee Shop Aesthetic',
            caption: 'Lifestyle content with natural product integration',
            videoFile: 'assets/video2.mp4',
            thumbnail: 'assets/thumb2.jpg'
        },
        {
            id: 3,
            title: 'Getting Ready GRWM',
            caption: 'High-energy beauty routine with seamless product placement',
            videoFile: 'assets/video3.mp4',
            thumbnail: 'assets/thumb3.jpg'
        },
        {
            id: 4,
            title: 'Day in the Life',
            caption: 'Vlog-style content featuring brand storytelling',
            videoFile: 'assets/video4.mp4',
            thumbnail: 'assets/thumb4.jpg'
        },
        {
            id: 5,
            title: 'Product Unboxing',
            caption: 'Authentic first impressions and testing',
            videoFile: 'assets/video5.mp4',
            thumbnail: 'assets/thumb5.jpg'
        }
    ]
};

// ================================
// UTILITY FUNCTIONS
// ================================

function getVideoSource(video) {
    return video.videoFile || '';
}

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

    CONFIG.videos.slice(0, 5).forEach(video => {
        const tile = document.createElement('button');
        tile.className = 'video-tile';
        tile.setAttribute('aria-label', `Play ${video.title}`);
        tile.dataset.title = video.title;
        tile.dataset.caption = video.caption;

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
               
