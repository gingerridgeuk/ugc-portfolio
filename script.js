// ================================
// CONFIGURATION
// ================================

const CONFIG = {
    email: 'hello@mishahazy.com',
    social: {
        instagram: 'https://instagram.com/hazymay',
        tiktok: 'https://tiktok.com/@hazymay',
        linkedin: 'https://linkedin.com/in/mishahazy'
    },
    videos: [
        {
            id: 1,
            title: 'Summer Skincare Routine',
            caption: 'Authentic morning routine showcasing brand partnership',
            platform: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        },
        {
            id: 2,
            title: 'Coffee Shop Aesthetic',
            caption: 'Lifestyle content with natural product integration',
            platform: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        },
        {
            id: 3,
            title: 'Getting Ready GRWM',
            caption: 'High-energy beauty routine with seamless product placement',
            platform: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        },
        {
            id: 4,
            title: 'Day in the Life',
            caption: 'Vlog-style content featuring brand storytelling',
            platform: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        },
        {
            id: 5,
            title: 'Product Unboxing',
            caption: 'Authentic first impressions and testing',
            platform: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        },
        {
            id: 6,
            title: 'Trending Sound Hook',
            caption: 'Viral audio integration with brand message',
            platform: 'youtube',
            videoId: 'dQw4w9WgXcQ',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        }
    ]
};

// ================================
// UTILITY FUNCTIONS
// ================================

function getEmbedUrl(platform, videoId) {
    if (platform === 'youtube') {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (platform === 'vimeo') {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return '';
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
    // Set email links
    const emailButtons = document.querySelectorAll('#ratesButton, #aboutEmailButton');
    emailButtons.forEach(button => {
        if (button) {
            button.href = `mailto:${CONFIG.email}`;
        }
    });

    // Set social links
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

    CONFIG.videos.forEach(video => {
        const tile = document.createElement('button');
        tile.className = 'video-tile';
        tile.setAttribute('aria-label', `Play ${video.title}`);
        tile.dataset.videoId = video.videoId;
        tile.dataset.platform = video.platform;
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

    const embedUrl = getEmbedUrl(video.platform, video.videoId);
    
    videoEmbed.innerHTML = `
        <iframe 
            src="${embedUrl}" 
            title="${video.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;

    modalTitle.textContent = video.title;
    modalCaption.textContent = video.caption;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    currentModal = modal;

    // Focus the close button
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

    // Return focus to the element that opened the modal
    if (previousFocus) {
        previousFocus.focus();
        previousFocus = null;
    }
}

function setupVideoModal() {
    const modal = document.getElementById('videoModal');
    if (!modal) return;

    // Close button
    const closeButtons = modal.querySelectorAll('[data-close-modal]');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeVideoModal);
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentModal) {
            closeVideoModal();
        }
    });

    // Click outside (on overlay only)
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
    // Add touch support for mobile envelope/polaroid interactions
    const interactiveItems = document.querySelectorAll('.envelope, .polaroid');
    
    interactiveItems.forEach(item => {
        // Prevent default touch behavior to enable our custom interactions
        item.addEventListener('touchstart', (e) => {
            // Don't prevent default - we want the link to work
            // Just add visual feedback
            item.style.transform = item.classList.contains('polaroid') 
                ? 'rotate(-3deg) translateY(-8px)' 
                : 'translateY(-12px)';
        }, { passive: true });

        item.addEventListener('touchend', () => {
            // Remove visual feedback
            item.style.transform = '';
        }, { passive: true });

        item.addEventListener('touchcancel', () => {
            // Remove visual feedback if touch is cancelled
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
        form.addEventListener('submit', function(e) {
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
    // Add focus visible class for better keyboard navigation visibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Announce page changes for screen readers
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
    // Add loaded class to body once everything is ready
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle image loading states
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
    // Set up links with config
    setupLinks();

    // Setup video grid if on UGC page
    setupVideoGrid();

    // Setup video modal
    setupVideoModal();

    // Setup smooth scrolling
    setupSmoothScrolling();

    // Setup landing page interactions
    setupLandingPageInteractions();

    // Setup form handling
    setupFormHandling();

    // Setup accessibility features
    setupAccessibility();

    // Setup loading states
    setupLoadingStates();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ================================
// EXPORT FOR TESTING (optional)
// ================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        openVideoModal,
        closeVideoModal,
        getEmbedUrl
    };
}
