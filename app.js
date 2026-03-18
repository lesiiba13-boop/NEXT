// =====================
// Mobile Nav Toggle
// =====================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.navbar__menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on nav link click
    document.querySelectorAll('.navbar__links').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// =====================
// Billing Toggle (products page)
// =====================
function setBilling(type) {
    const monthly = document.getElementById('toggle-monthly');
    const annual = document.getElementById('toggle-annual');
    if (!monthly) return;

    if (type === 'monthly') {
        monthly.classList.add('active');
        annual.classList.remove('active');
    } else {
        annual.classList.add('active');
        monthly.classList.remove('active');
    }

    document.querySelectorAll('.price-amount[data-monthly]').forEach(el => {
        const val = el.getAttribute('data-' + type);
        if (val === '0') {
            el.textContent = '$0';
        } else if (val) {
            el.textContent = '$' + val;
        }
    });
}

// =====================
// Sign Up Form — API Integration
// =====================
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        const msg = document.getElementById('form-message');

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const plan = document.getElementById('plan').value;

        // Basic validation
        if (!name || !email || !password) {
            showMessage(msg, 'Please fill in all fields.', 'error');
            return;
        }
        if (password.length < 8) {
            showMessage(msg, 'Password must be at least 8 characters.', 'error');
            return;
        }

        btn.textContent = 'Creating account...';
        btn.disabled = true;

        try {
            // Replace with your actual API endpoint
            const response = await fetch('https://api.next.io/v1/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, plan })
            });

            if (response.ok) {
                const data = await response.json();
                showMessage(msg, '🎉 Account created! Check your email to get started.', 'success');
                signupForm.reset();
            } else {
                const err = await response.json().catch(() => ({}));
                showMessage(msg, err.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            // For demo / local dev — simulate success when no backend is connected
            console.warn('API not reachable — running demo mode:', error.message);
            showMessage(msg, '🎉 Account created! (Demo mode — connect your backend API to go live.)', 'success');
            signupForm.reset();
        } finally {
            btn.textContent = 'Create account';
            btn.disabled = false;
        }
    });
}

function showMessage(el, text, type) {
    el.textContent = text;
    el.className = 'form-message ' + type;
}

// =====================
// Scroll-in animations
// =====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .pricing-card, .tech-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
