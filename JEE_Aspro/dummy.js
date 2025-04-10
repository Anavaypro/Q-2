document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Tab functionality for solutions section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Quiz submission
    const submitQuizBtn = document.querySelector('.submit-quiz');
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
            const solution = document.querySelector('.quiz-solution');
            
            if (selectedOption) {
                // In a real app, you would check the answer and provide feedback
                solution.classList.remove('hidden');
                
                // Scroll to solution
                solution.scrollIntoView({ behavior: 'smooth' });
                
                // Disable all options
                document.querySelectorAll('input[name="quiz-option"]').forEach(option => {
                    option.disabled = true;
                });
                
                // Change button text
                this.textContent = 'Submitted';
                this.disabled = true;
            } else {
                alert('Please select an option before submitting.');
            }
        });
    }
    
    // Read more functionality for solutions
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const fullSolution = this.closest('.solution-item').querySelector('.full-solution');
            fullSolution.classList.toggle('hidden');
            
            if (fullSolution.classList.contains('hidden')) {
                this.textContent = 'Read Full Solution';
            } else {
                this.textContent = 'Hide Solution';
            }
        });
    });
    
    // Modal functionality
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const switchToSignup = document.querySelector('.switch-to-signup');
    const switchToLogin = document.querySelector('.switch-to-login');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal-overlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Countdown timer
    const countdown = () => {
        const countDate = new Date('June 30, 2023 00:00:00').getTime();
        const now = new Date().getTime();
        const gap = countDate - now;
        
        // Time calculations
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        // Calculate remaining time
        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);
        
        // Update HTML
        document.getElementById('days').innerText = textDay;
        document.getElementById('hours').innerText = textHour;
        document.getElementById('minutes').innerText = textMinute;
        document.getElementById('seconds').innerText = textSecond;
    };
    
    // Run countdown every second
    setInterval(countdown, 1000);
    
    // Form submission
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would send the form data to a server
            alert('Form submitted successfully!');
            this.reset();
            
            // If it's a modal form, close the modal
            const modal = this.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize MathJax for LaTeX rendering
    if (typeof MathJax !== 'undefined') {
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [ ['$','$'], ["\\(","\\)"] ],
                processEscapes: true
            }
        });
    }
});