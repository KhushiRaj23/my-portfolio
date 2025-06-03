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
    const urlParams = new URLSearchParams(window.location.search);
    const project = urlParams.get('project'); // This is the project ID from the URL

    console.log("Project ID from URL:", project);

    const projectData = {
        "optimai": {
            title: "OptimAI: AI-Powered Business Optimization Platform",
            description: "OptimAI is a comprehensive platform designed to help businesses optimize their operations, marketing strategies, and customer interactions using advanced AI and machine learning techniques.",
            liveDemo: "https://optimal-ai-demo.netlify.app/", // Replace with actual demo link
            sourceCode: "https://github.com/yourusername/OptimAI", // Replace with actual GitHub link
            mainImage: "images/optimai-main.jpg", // Replace with actual image path
            features: [
                "Predictive Analytics for sales forecasting",
                "Customer Segmentation using machine learning",
                "Automated Marketing Campaign Optimization",
                "Supply Chain and Inventory Management",
                "Interactive Dashboards and Reporting"
            ],
            technologies: [
                "Python",
                "TensorFlow",
                "Scikit-learn",
                "React",
                "Node.js",
                "MongoDB",
                "AWS"
            ],
            challenges: [
                { title: "Data Integration", description: "Integrating data from various disparate sources (CRM, ERP, sales platforms) was a significant challenge." },
                { title: "Model Explainability", description: "Ensuring the AI models were explainable to business users who are not data scientists required careful model selection and visualization." },
                { title: "Scalability", description: "Designing the platform to handle large volumes of data and a growing number of users efficiently." }
            ],
            learningOutcomes: [
                { title: "Advanced ML Applications", description: "Gained deep experience in applying various machine learning algorithms to real-world business problems." },
                { title: "Full-Stack Development", description: "Enhanced skills in building and deploying a complex full-stack application." },
                { title: "Cloud Computing", description: "Improved knowledge of cloud services (AWS) for hosting and managing applications." }
            ]
        },
        "blogify": {
            title: "Blogify: Modern Blogging Platform",
            description: "Blogify is a sleek and user-friendly blogging platform built with modern web technologies, allowing users to easily create, publish, and manage their blog content.",
            liveDemo: "https://blogify-demo.netlify.app/", // Replace with actual demo link
            sourceCode: "https://github.com/yourusername/Blogify", // Replace with actual GitHub link
            mainImage: "images/blogify-main.jpg", // Replace with actual image path
            features: [
                "Rich Text Editor for content creation",
                "User Authentication and Authorization",
                "Tagging and Categorization",
                "Comment Section with moderation",
                "Responsive Design"
            ],
            technologies: [
                "JavaScript",
                "React",
                "Express.js",
                "PostgreSQL",
                "RESTful API"
            ],
            challenges: [
                { title: "Real-time Editor Implementation", description: "Building a robust and intuitive rich text editor that handles various formatting options." },
                { title: "Secure Authentication", description: "Implementing secure user sign-up and login with proper token management." },
                { title: "Database Schema Design", description: "Designing a flexible database schema to handle different types of blog content and relationships." }
            ],
            learningOutcomes: [
                { title: "Frontend Framework Proficiency", description: "Solidified skills in using React for building dynamic user interfaces." },
                { title: "Backend API Development", description: "Gained experience in building a secure and scalable backend API with Express.js." },
                { title: "Database Management", description: "Improved understanding of relational databases and SQL." }
            ]
        },
        "explore-india": {
            title: "Explore India: Travel Discovery Web App",
            description: "Explore India is a web application designed to help users discover and plan trips to various destinations across India, featuring detailed information about places, attractions, and activities.",
            liveDemo: "https://explore-india-demo.netlify.app/", // Replace with actual demo link
            sourceCode: "https://github.com/yourusername/ExploreIndia", // Replace with actual GitHub link
            mainImage: "images/explore-india-main.jpg", // Replace with actual image path
            features: [
                "Search and Filter Destinations",
                "Detailed Place Information (description, photos, map)",
                "User Reviews and Ratings",
                "Interactive Maps",
                "Curated Travel Itineraries"
            ],
            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Leaflet.js (for maps)",
                "Serverless Functions (for data fetching)"
            ],
            challenges: [
                { title: "Data Scraping and Curation", description: "Gathering and organizing comprehensive data about various locations across India." },
                { title: "Map Integration", description: "Integrating interactive maps and displaying relevant information dynamically." },
                { title: "Handling User Generated Content", description: "Implementing a system for user reviews and ensuring data validation and sanitization." }
            ],
            learningOutcomes: [
                { title: "Frontend Development", description: "Enhanced skills in building interactive frontend applications with vanilla JavaScript and libraries." },
                { title: "API Integration", description: "Gained experience in fetching and displaying data from external sources and APIs." },
                { title: "Working with Geospatial Data", description: "Learned how to work with map libraries and display geographical information." }
            ]
        },
        "tic-tac-toe": {
            title: "Tic Tac Toe Game",
            description: "A simple and classic Tic Tac Toe game implemented using vanilla JavaScript, HTML, and CSS, playable against another person.",
            liveDemo: "https://tic-tac-toe-game-demo.netlify.app/", // Replace with actual demo link
            sourceCode: "https://github.com/yourusername/TicTacToeGame", // Replace with actual GitHub link
            mainImage: "images/tic-tac-toe-main.jpg", // Replace with actual image path
            features: [
                "Two-player mode",
                "Win detection logic",
                "Draw detection",
                "Game reset functionality",
                "Simple and intuitive UI"
            ],
            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ],
            challenges: [
                { title: "Game Logic Implementation", description: "Developing the core logic for winning conditions and turn management." },
                { title: "UI Updates", description: "Dynamically updating the game board and status messages based on player moves." },
                { title: "Handling User Input", description: "Implementing click event listeners and processing user input correctly." }
            ],
            learningOutcomes: [
                { title: "Vanilla JavaScript Proficiency", description: "Strengthened understanding of fundamental JavaScript concepts by building a complete application without frameworks." },
                { title: "DOM Manipulation", description: "Gained hands-on experience in manipulating the Document Object Model to update the user interface." },
                { title: "Algorithmic Thinking", description: "Improved problem-solving skills by designing and implementing the game's logic." }
            ]
        }
    };

    console.log("Project Data for ID:", projectData[project]);

    if (project && projectData[project]) {
        const currentProject = projectData[project];

        // Update the page title
        document.title = `${currentProject.title} | Your Name`; // Replace 'Your Name' with your name

        // Update Project Header
        const projectTitleElement = document.querySelector('.project-title');
        if (projectTitleElement) projectTitleElement.textContent = currentProject.title;

        const liveDemoLink = document.querySelector('.project-header .btn-primary');
        if (liveDemoLink) liveDemoLink.href = currentProject.liveDemo;

        const sourceCodeLink = document.querySelector('.project-header .btn-secondary');
        if (sourceCodeLink) sourceCodeLink.href = currentProject.sourceCode;

        // Update Project Gallery
        const mainProjectImage = document.querySelector('.project-gallery .main-image');
        if (mainProjectImage) mainProjectImage.src = currentProject.mainImage;

        // Update Project Overview
        const projectDescriptionElement = document.querySelector('.project-description');
        if (projectDescriptionElement) projectDescriptionElement.textContent = currentProject.description;

        // Update Features
        const featuresList = document.querySelector('.feature-list');
        if (featuresList) {
            featuresList.innerHTML = ''; // Clear existing features
            currentProject.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
        }

        // Update Technologies
        const techStackDiv = document.querySelector('.tech-stack');
        if (techStackDiv) {
            techStackDiv.innerHTML = ''; // Clear existing technologies
            currentProject.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techStackDiv.appendChild(span);
            });
        }

        // Update Challenges
        const challengesDiv = document.querySelector('.challenges');
        if (challengesDiv) {
            challengesDiv.innerHTML = ''; // Clear existing challenges
            currentProject.challenges.forEach(challenge => {
                const challengeItem = document.createElement('div');
                challengeItem.classList.add('challenge-item');
                challengeItem.innerHTML = `<h3>${challenge.title}</h3><p>${challenge.description}</p>`;
                challengesDiv.appendChild(challengeItem);
            });
        }

        // Update Learning Outcomes
        const learningOutcomesDiv = document.querySelector('.learning-outcomes');
        if (learningOutcomesDiv) {
            learningOutcomesDiv.innerHTML = ''; // Clear existing outcomes
            currentProject.learningOutcomes.forEach(outcome => {
                const outcomeItem = document.createElement('div');
                outcomeItem.classList.add('learning-outcome-item');
                outcomeItem.innerHTML = `<h3>${outcome.title}</h3><p>${outcome.description}</p>`;
                learningOutcomesDiv.appendChild(outcomeItem);
            });
        }

    } else {
        // Redirect to projects section or show an error
        console.error("Project data not found for ID:", project);
        // Optional: Redirect to home or projects page
        // window.location.href = 'index.html#projects';
    }
});