// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
});

// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#6c63ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav ul');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && nav) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('active', window.scrollY > 500);
        });
    }

    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        function animateSkills() {
            skillItems.forEach(item => {
                const percent = item.getAttribute('data-percent');
                const progress = item.querySelector('.skill-progress');
                if (progress && isInViewport(item)) {
                    progress.style.width = percent + '%';
                }
            });
        }

        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        window.addEventListener('scroll', animateSkills);
        animateSkills(); // Run once on page load
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString(),
            });
            
            if (response.ok) {
                const formStatus = document.getElementById('formStatus');
                if (formStatus) {
                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    formStatus.classList.add('success');
                }
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            const formStatus = document.getElementById('formStatus');
            if (formStatus) {
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again later.';
                formStatus.classList.add('error');
            }
            console.error('Error:', error);
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            const formStatus = document.getElementById('formStatus');
            if (formStatus) {
                setTimeout(() => {
                    formStatus.classList.remove('success', 'error');
                    formStatus.textContent = '';
                    formStatus.style.display = 'none';
                }, 5000);
            }
        }
    });
}

// Update copyright year automatically
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Project Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('project-detail.html')) {
        const projectData = {
            'optimai': {
                title: 'OptimAI',
                description: 'This project is an all-in-one career development platform built with Next.js and Prisma. It offers users a comprehensive environment to practice and improve their skills through quizzes and a performance dashboard that provides real-time AI-powered suggestions. Beyond practice, the platform enables users to create, enhance, and download professional resumes and cover letters with the assistance of AI. Additionally, it features an industrial insights dashboard to keep users informed about current trends and opportunities, helping them prepare effectively for their careers.',
                liveDemo: 'https://optima-aii.vercel.app/',
                sourceCode: 'https://github.com/KhushiRaj23/OptimaAII',
                mainImage: 'image/OptimAI.png',
                features: [
                    'AI-powered resume and cover letter enhancement',
                    'Interactive skill practice through quizzes',
                    'Real-time performance tracking and suggestions',
                    'Industrial insights dashboard',
                    'Secure user authentication',
                    'Responsive design for all devices'
                ],
                technologies: ['Next.js', 'Prisma', 'Clerk', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
                challenges: [
                    {
                        title: 'AI Integration',
                        description: 'Implementing AI services for resume enhancement and performance suggestions required careful consideration of API integration and error handling.'
                    },
                    {
                        title: 'Database Management',
                        description: 'Setting up and managing PostgreSQL with Prisma ORM required proper schema design and optimization for performance.'
                    }
                ],
                learningOutcomes: [
                    {
                        title: 'Full-Stack Development',
                        description: 'Gained practical experience in building scalable applications with Next.js and Prisma.'
                    },
                    {
                        title: 'AI Integration',
                        description: 'Learned how to effectively integrate AI services to enhance user experience.'
                    },
                    {
                        title: 'Deployment',
                        description: 'Mastered the process of deploying applications on Vercel and managing environment variables.'
                    }
                ]
            },
            'blogify': {
                title: 'Blogify',
                description: 'A Full-stack blogging platform that allows users to create, read, and comment on articles with secure user authentication. The platform features a modern UI, real-time updates, and a robust backend system.',
                liveDemo: 'https://khushi-blogging-app.netlify.app/',
                sourceCode: 'https://github.com/KhushiRaj23/blogging-app-frontend',
                mainImage: 'image/image.png',
                features: [
                    'User authentication and authorization',
                    'Create, read, update, and delete blog posts',
                    'Comment system with real-time updates',
                    'Responsive design',
                    'Rich text editor for blog posts',
                    'User profiles and settings'
                ],
                technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
                challenges: [
                    {
                        title: 'Real-time Updates',
                        description: 'Implementing real-time updates for comments and posts required careful consideration of WebSocket integration.'
                    },
                    {
                        title: 'State Management',
                        description: 'Managing complex state across components while maintaining performance was a significant challenge.'
                    }
                ],
                learningOutcomes: [
                    {
                        title: 'Full-Stack Development',
                        description: 'Gained practical experience in building dynamic web applications with the MERN stack.'
                    },
                    {
                        title: 'Real-time Features',
                        description: 'Learned how to implement real-time features using WebSocket technology.'
                    }
                ]
            },
            'explore-india': {
                title: 'Explore India',
                description: 'A responsive frontend travel guide showcasing India\'s destinations, built with a focus on interactive design and user-friendly navigation. The platform helps users discover and plan their travel across India.',
                liveDemo: '#',
                sourceCode: '#',
                mainImage: 'image/explore_india.jpg',
                features: [
                    'Interactive destination map',
                    'Detailed city guides',
                    'Travel tips and recommendations',
                    'Photo gallery',
                    'Responsive design',
                    'Search and filter functionality'
                ],
                technologies: ['HTML', 'CSS', 'JavaScript', 'Google Maps API'],
                challenges: [
                    {
                        title: 'Responsive Design',
                        description: 'Creating a seamless experience across all devices required careful planning and testing.'
                    },
                    {
                        title: 'Performance Optimization',
                        description: 'Optimizing image loading and map rendering for better performance was crucial.'
                    }
                ],
                learningOutcomes: [
                    {
                        title: 'Frontend Development',
                        description: 'Improved skills in responsive design and interactive UI development.'
                    },
                    {
                        title: 'API Integration',
                        description: 'Learned how to effectively integrate and use third-party APIs.'
                    }
                ]
            },
            'tic-tac-toe': {
                title: 'Tic Tac Toe Game',
                description: 'A classic Tic Tac Toe game built using React. The game features a clean, modern interface with smooth animations and responsive design. Players can enjoy the game on any device.',
                liveDemo: 'https://khushi-tic-tac-toe-game.netlify.app/',
                sourceCode: 'https://github.com/KhushiRaj23/tic-tac-toe-game',
                mainImage: 'image/tic-tac-toe.jpg',
                features: [
                    'Two-player gameplay',
                    'Winning combination highlighting',
                    'Game reset functionality',
                    'Responsive design',
                    'Smooth animations',
                    'Score tracking'
                ],
                technologies: ['React', 'CSS', 'JavaScript'],
                challenges: [
                    {
                        title: 'Game Logic',
                        description: 'Implementing the game logic and win conditions required careful state management.'
                    },
                    {
                        title: 'UI/UX',
                        description: 'Creating an engaging and intuitive user interface was a key focus.'
                    }
                ],
                learningOutcomes: [
                    {
                        title: 'React Development',
                        description: 'Gained hands-on experience in building interactive UIs with React.'
                    },
                    {
                        title: 'State Management',
                        description: 'Learned how to effectively manage state and props in React applications.'
                    }
                ]
            }
        };

        // Get project ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project');

        // Load project data
        if (projectId && projectData[projectId]) {
            const project = projectData[projectId];
            
            // Update page title
            document.title = `${project.title} - Project Details`;

            // Update project header
            const projectTitle = document.querySelector('.project-title');
            const projectLinks = document.querySelector('.project-header .project-links');
            const mainImage = document.querySelector('.main-image');
            const projectDescription = document.querySelector('.project-description');
            const featureList = document.querySelector('.feature-list');
            const techStack = document.querySelector('.tech-stack');
            const challenges = document.querySelector('.challenges');
            const learningOutcomes = document.querySelector('.learning-outcomes');

            if (projectTitle) projectTitle.textContent = project.title;
            
            if (projectLinks) {
                const links = projectLinks.querySelectorAll('a');
                if (links[0]) links[0].href = project.liveDemo;
                if (links[1]) links[1].href = project.sourceCode;
            }

            if (mainImage) {
                mainImage.src = project.mainImage;
                mainImage.alt = project.title;
            }

            if (projectDescription) projectDescription.textContent = project.description;

            if (featureList) {
                featureList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
            }

            if (techStack) {
                techStack.innerHTML = project.technologies.map(tech => `<span>${tech}</span>`).join('');
            }

            if (challenges) {
                challenges.innerHTML = project.challenges.map(challenge => `
                    <div class="challenge-item">
                        <h3>${challenge.title}</h3>
                        <p>${challenge.description}</p>
                    </div>
                `).join('');
            }

            if (learningOutcomes) {
                learningOutcomes.innerHTML = project.learningOutcomes.map(outcome => `
                    <div class="learning-outcome-item">
                        <h3>${outcome.title}</h3>
                        <p>${outcome.description}</p>
                    </div>
                `).join('');
            }
        } else {
            // Redirect to projects section if project not found
            window.location.href = 'index.html#projects';
        }
    }
});