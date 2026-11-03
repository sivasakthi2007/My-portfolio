/**
 * SAKTHI. - Premium Developer Portfolio
 * ApnoAI Internship Task 1: "Ship Your First Web Page"
 * Author: Siva Sakthi (B.E. CSE, Paavai Engineering College)
 * Tech: Vanilla JavaScript (ES6+)
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------------------------------------------------------
       1. Project Data Store (Accurate, Verified Data Only)
       ------------------------------------------------------------------------- */
    const projectsData = {
        uzhavan360: {
            title: 'Uzhavan360',
            category: 'Agritech / Farmer Technology',
            domain: 'Agriculture & Supply Chain Coordination',
            status: 'Working Prototype',
            statusClass: 'status-working',
            description: 'Uzhavan360 is a farmer-focused digital platform designed to improve coordination between farmers, Farmer Producer Organizations (FPOs) and buyers.',
            problem: 'The market price does not always represent the amount a farmer finally receives after transport, loading, commissions, wastage and other intermediate deductions.',
            features: [
                'Crop details and expected harvest timeline logging',
                'Buyer requirements tracking and real-time buyer offers',
                'Harvest aggregation and pre-booking coordination',
                'Order coordination with transparent logistics tracking',
                'Payment tracking and settlement history visibility',
                'Market price references and true net-return visibility'
            ],
            tech: ['Web Platform', 'Vercel Deployment', 'Interactive Dashboard Architecture'],
            liveUrl: 'https://uzhavan360.vercel.app/dashboard',
            note: 'Verified working prototype dashboard.'
        },
        nearkart: {
            title: 'NearKart',
            category: 'Retail Tech / Hyperlocal Commerce',
            domain: 'Local Retail & Demand Intelligence',
            status: 'In Development',
            statusClass: 'status-dev',
            description: 'NearKart is a hyperlocal commerce and demand-intelligence platform designed for small neighbourhood retailers.',
            problem: 'Small shops need practical ways to understand stock movement and make better inventory decisions without complicated daily stock management.',
            features: [
                'Structured inventory workflows tailored for small retailers',
                'Manual stock-in entry and real-time stock ledger tracking',
                'Inventory visibility with low-stock movement indicators',
                'Reorder decision support based on seasonal and weekly movement',
                'Local retail coordination and neighbourhood customer demand insights'
            ],
            tech: ['Flutter Web', 'Supabase', 'Inventory & Ledger Logic'],
            liveUrl: null,
            note: 'Currently in active development.'
        },
        campusflow: {
            title: 'CampusFlow',
            category: 'EdTech / Adaptive Connectivity',
            domain: 'Campus Network & Learning Material Distribution',
            status: 'Project Concept / Development',
            statusClass: 'status-concept',
            description: 'CampusFlow is an adaptive connectivity system designed to improve access to college learning materials in low-connectivity environments.',
            problem: 'Students frequently encounter weak, intermittent, or limited campus network coverage when trying to access vital digital learning resources and coursework.',
            features: [
                'Campus-local content delivery to minimize external bandwidth reliance',
                'Intelligent local caching for coursework, notes, and study guides',
                'Store-and-forward synchronization for uninterrupted study',
                'NOW / LOCAL / LATER prioritization queue for high-priority academic files',
                'Offline access to supported learning materials with deferred background sync'
            ],
            tech: ['Campus-Local Delivery Architecture', 'Client Caching', 'Deferred Sync System'],
            liveUrl: null,
            note: 'System concept and architecture under active development.'
        },
        securitycard: {
            title: 'Security Card',
            category: 'Retail Technology / Transaction Verification',
            domain: 'Loss Prevention & POS Reconciliation',
            status: 'Concept / Exploration',
            statusClass: 'status-concept',
            description: 'A reusable card-based retail transaction reconciliation concept exploring how shopping, billing and exit verification can be connected.',
            problem: 'In retail environments, there is often friction and disconnection between physical basket items, checkout point-of-sale billing records, and loss prevention exit checks.',
            features: [
                'Reusable card identification token tracking the shopper basket cycle',
                'Direct linkage between in-store shopping events and POS billing records',
                'Automated transaction reconciliation logic for complete transparency',
                'Item verification workflow minimizing manual checkout friction',
                'Seamless exit verification concept eliminating intrusive customer stops'
            ],
            tech: ['System Concept Architecture', 'Transaction Reconciliation Logic', 'Digital Concept Model'],
            liveUrl: null,
            note: 'Conceptual architecture and research exploration.'
        }
    };

    /* -------------------------------------------------------------------------
       2. Theme Management (Dark / Light Mode)
       ------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;

    // Retrieve saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        rootElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);

        if (themeToggleBtn) {
            const isDark = theme === 'dark';
            themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    /* -------------------------------------------------------------------------
       3. Mobile Navigation & Hamburger Menu
       ------------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksList = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function toggleMobileMenu(forceClose = false) {
        if (!mobileToggle || !navLinksList) return;
        const isOpen = forceClose ? false : mobileToggle.getAttribute('aria-expanded') === 'false';
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navLinksList.classList.toggle('active', isOpen);
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close menu when clicking any nav link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu(true);
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinksList && navLinksList.classList.contains('active')) {
            if (!navLinksList.contains(e.target) && !mobileToggle.contains(e.target)) {
                toggleMobileMenu(true);
            }
        }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksList && navLinksList.classList.contains('active')) {
            toggleMobileMenu(true);
        }
    });

    /* -------------------------------------------------------------------------
       4. Active Navigation Highlighting on Scroll (IntersectionObserver)
       ------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id], header[id]');

    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -65% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinkItems.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${currentId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    }

    /* -------------------------------------------------------------------------
       5. Scroll Reveal Animations (IntersectionObserver)
       ------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for environments without observer
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    /* -------------------------------------------------------------------------
       6. Back to Top Button
       ------------------------------------------------------------------------- */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* -------------------------------------------------------------------------
       7. Project Detail Modal (Accessible & Interactive)
       ------------------------------------------------------------------------- */
    const modalBackdrop = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCategory = document.getElementById('modal-project-category');
    const modalTitle = document.getElementById('modal-project-title');
    const modalStatus = document.getElementById('modal-project-status');
    const modalDomain = document.getElementById('modal-project-domain');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalProblem = document.getElementById('modal-project-problem');
    const modalFeatures = document.getElementById('modal-project-features');
    const modalTech = document.getElementById('modal-project-tech');
    const modalFooterActions = document.getElementById('modal-footer-actions');

    let previousActiveElement = null;

    function openProjectModal(projectId, triggerElement) {
        const project = projectsData[projectId];
        if (!project || !modalBackdrop) return;

        previousActiveElement = triggerElement || document.activeElement;

        // Populate modal data
        modalCategory.textContent = project.category;
        modalTitle.textContent = project.title;
        modalStatus.textContent = project.status;
        modalStatus.className = `status-badge ${project.statusClass}`;
        modalDomain.textContent = project.domain;
        modalDesc.textContent = project.description;
        modalProblem.textContent = project.problem;

        // Populate features list
        modalFeatures.innerHTML = '';
        project.features.forEach(feat => {
            const li = document.createElement('li');
            li.textContent = feat;
            modalFeatures.appendChild(li);
        });

        // Populate tech pills
        modalTech.innerHTML = '';
        project.tech.forEach(t => {
            const span = document.createElement('span');
            span.className = 'tech-pill';
            span.textContent = t;
            modalTech.appendChild(span);
        });

        // Populate footer actions
        modalFooterActions.innerHTML = '';

        if (project.liveUrl) {
            const liveLink = document.createElement('a');
            liveLink.href = project.liveUrl;
            liveLink.target = '_blank';
            liveLink.rel = 'noopener noreferrer';
            liveLink.className = 'btn btn-primary btn-sm';
            liveLink.innerHTML = `
                <span>Open Live Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            `;
            modalFooterActions.appendChild(liveLink);
        }

        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-secondary btn-sm';
        closeBtn.textContent = 'Close';
        closeBtn.addEventListener('click', closeProjectModal);
        modalFooterActions.appendChild(closeBtn);

        // Show modal
        modalBackdrop.classList.add('active');
        modalBackdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Focus close button for accessibility
        if (modalCloseBtn) {
            setTimeout(() => modalCloseBtn.focus(), 50);
        }
    }

    function closeProjectModal() {
        if (!modalBackdrop || !modalBackdrop.classList.contains('active')) return;

        modalBackdrop.classList.remove('active');
        modalBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Restore focus
        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
            previousActiveElement.focus();
        }
    }

    // Attach click listeners to all "View Details" buttons
    const detailButtons = document.querySelectorAll('.view-details-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = btn.getAttribute('data-project');
            openProjectModal(projectId, btn);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    // Close when clicking modal backdrop
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                closeProjectModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
            closeProjectModal();
        }
    });

    /* -------------------------------------------------------------------------
       8. Contact Form Handling (Validation & Mailto Launcher)
       ------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Name validation
            if (!nameInput.value.trim()) {
                nameError.classList.add('visible');
                isValid = false;
            } else {
                nameError.classList.remove('visible');
            }

            // Email validation
            if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
                emailError.classList.add('visible');
                isValid = false;
            } else {
                emailError.classList.remove('visible');
            }

            // Subject validation
            if (!subjectInput.value.trim()) {
                subjectError.classList.add('visible');
                isValid = false;
            } else {
                subjectError.classList.remove('visible');
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageError.classList.add('visible');
                isValid = false;
            } else {
                messageError.classList.remove('visible');
            }

            if (!isValid) return;

            // Generate mailto link
            const targetEmail = 'YOUR_EMAIL@gmail.com';
            const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectInput.value.trim()}`);
            const body = encodeURIComponent(
                `Hello Siva Sakthi,\n\n${messageInput.value.trim()}\n\nBest regards,\n${nameInput.value.trim()}\n(${emailInput.value.trim()})`
            );

            // Show feedback
            if (formFeedback) {
                formFeedback.textContent = 'Opening your email client with your pre-filled message...';
                formFeedback.className = 'form-feedback success';
            }

            // Trigger mailto link
            window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

            // Reset form
            setTimeout(() => {
                contactForm.reset();
                if (formFeedback) {
                    formFeedback.textContent = 'Message drafted successfully! Feel free to reach out directly anytime.';
                }
            }, 1200);
        });

        // Clear error as user types
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                const errorSpan = document.getElementById(`${input.name}-error`);
                if (errorSpan) {
                    errorSpan.classList.remove('visible');
                }
            });
        });
    }
});

