// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isVisible = navList.style.display === 'flex';
        navList.style.display = isVisible ? 'none' : 'flex';
        
        // Add minimal styling for mobile menu via JS for simplicity, or toggle class
        if (!isVisible) {
            navList.style.flexDirection = 'column';
            navList.style.position = 'absolute';
            navList.style.top = '80px';
            navList.style.left = '0';
            navList.style.width = '100%';
            navList.style.background = 'white';
            navList.style.padding = '20px';
            navList.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav__list a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navList.style.display = 'none';
        }
    });
});

// Simple Price Calculator
function calculatePrice() {
    const area = parseFloat(document.getElementById('area').value);
    const typeModifier = parseFloat(document.getElementById('house-type').value);
    const resultDiv = document.getElementById('calc-result');
    const priceValue = document.getElementById('price-value');
    
    if (!area || area < 0) {
        alert('Prosím zadejte platnou plochu domu v m².');
        return;
    }
    
    // Base price per m2 (estimation logic - strictly indicative)
    // Assuming purely rough construction labor estimation logic as a placeholder
    // Real logic needs to be calibrated by Tomáš
    const baseRate = 3500; // Example base rate for labor per m2
    
    // Calculate
    let estimatedPrice = area * baseRate * typeModifier;
    
    // Format currency
    const formatter = new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
        maximumFractionDigits: 0
    });
    
    priceValue.textContent = formatter.format(estimatedPrice);
    resultDiv.style.display = 'block';
    
    // Smooth scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    }
});
