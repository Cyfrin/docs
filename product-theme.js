// Product colors configuration
const PRODUCT_COLORS = {
  codehawks: {
    primary: '#FF4405',
    rgb: '255, 68, 5',
    class: 'product-codehawks'
  },
  updraft: {
    primary: '#66C61C',
    rgb: '102, 198, 28',
    class: 'product-updraft'
  },
  solodit: {
    primary: '#9E77ED',
    rgb: '158, 119, 237',
    class: 'product-solodit'
  },
  battlechain: {
    primary: '#155EEF',
    rgb: '21, 94, 239',
    class: 'product-battlechain'
  },
  profiles: {
    primary: '#155EEF',
    rgb: '21, 94, 239',
    class: 'product-profiles'
  }
};

// 1. Detect product section and apply coloring/theming
function applyProductTheme() {
  // console.log('[Cyfrin Theme] Running applyProductTheme');
  const path = window.location.pathname;
  const body = document.body;

  // Remove any existing product classes so colors don't clash
  Object.values(PRODUCT_COLORS).forEach(p => body.classList.remove(p.class));

  // Determine current product based on URL
  let currentProduct = null;
  if (path.includes('/codehawks')) currentProduct = PRODUCT_COLORS.codehawks;
  else if (path.includes('/updraft')) currentProduct = PRODUCT_COLORS.updraft;
  else if (path.includes('/solodit')) currentProduct = PRODUCT_COLORS.solodit;
  else if (path.includes('/battlechain')) currentProduct = PRODUCT_COLORS.battlechain;
  else if (path.includes('/profiles')) currentProduct = PRODUCT_COLORS.profiles;

  if (currentProduct) {
    // Add class to body (triggers the CSS colors in product-themes.css)
    body.classList.add(currentProduct.class);

    // Style active navigation items directly (The Glowing Effect)
    const styleActiveNav = () => {
      // Find sidebar links
      const allLinks = document.querySelectorAll('a');
      const sidebarLinks = Array.from(allLinks).filter(link => {
        // Mintlify sidebar links usually live in a container with scrolling classes
        const parent = link.parentElement;
        return parent && (parent.className.includes('scroll-m-4') || parent.closest('aside'));
      });

      // Clear all previous inline styling
      sidebarLinks.forEach(link => {
        link.style.borderLeft = '';
        link.style.background = '';
        link.style.boxShadow = '';
      });

      // Find links that match the current page
      const sidebarLinksToStyle = sidebarLinks.filter(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        return linkPath === path;
      });

      // Apply the specific product color glow
      sidebarLinksToStyle.forEach(link => {
        link.style.borderLeft = `3px solid ${currentProduct.primary}`;
        link.style.background = `linear-gradient(90deg, rgba(${currentProduct.rgb}, 0.15), transparent)`;
        link.style.boxShadow = `0 0 15px rgba(${currentProduct.rgb}, 0.3)`;
        
        // Ensure text stays readable
        const isDark = document.documentElement.classList.contains('dark');
        link.style.color = isDark ? '#d1d5db' : '#374151';
      });
    };

    // Apply styles immediately and retry shortly after (for SPA rendering)
    styleActiveNav();
    setTimeout(styleActiveNav, 100);
    setTimeout(styleActiveNav, 500);
  }
}

// 2. Clear any persisted Mintlify navigation state that might be stuck
try {
  Object.keys(localStorage).forEach(key => {
    if (key.includes('navigation') || key.includes('sidebar') || key.includes('expanded')) {
      localStorage.removeItem(key);
    }
  });
} catch (e) {
  // console.log('[Cyfrin Theme] Could not clear localStorage:', e);
}

// 3. Replace icons on Landing Page Cards ONLY 
// (We kept this because your Welcome page cards might still use FontAwesome icons that you want swapped)
function replaceLandingPageCardLogos() {
  // console.log('[Cyfrin Theme] Replacing landing page card icons');

  const allLinks = document.querySelectorAll('a');

  allLinks.forEach(link => {
    if (link.dataset.cardIconReplaced) return;

    // Check link text to identify the card
    const linkText = link.textContent;
    const svgs = link.querySelectorAll('svg');

    if (svgs.length === 0) return;

    let logoToUse = null;
    let productName = null;

    // Logic to identify Cards on the Welcome page
    if (linkText.includes('CodeHawks') && linkText.includes('Competitive Security Audits')) {
      logoToUse = '/images/product-logos/codehawks.svg';
      productName = 'CodeHawks';
    } else if (linkText.includes('Updraft') && linkText.includes('Web3 Education')) {
      logoToUse = '/images/product-logos/updraft.svg';
      productName = 'Updraft';
    } else if (linkText.includes('Solodit') && linkText.includes('Vulnerability Research')) {
      logoToUse = '/images/product-logos/solodit.svg';
      productName = 'Solodit';
    } else if (linkText.includes('Cyfrin Profiles') && linkText.includes('Unified Accounts')) {
      logoToUse = '/images/product-logos/cyfrin.svg';
      productName = 'Cyfrin Profiles';
    }

    if (logoToUse && svgs[0]) {
      // Create logo image
      const logoImg = document.createElement('img');
      logoImg.src = logoToUse;
      logoImg.alt = productName;
      logoImg.style.width = '48px';
      logoImg.style.height = '48px';
      logoImg.style.objectFit = 'contain';

      // Replace the SVG with the Image
      svgs[0].parentNode.replaceChild(logoImg, svgs[0]);
      link.dataset.cardIconReplaced = 'true';
    }
  });
}

// 4. Execution & Event Listeners

// Run on initial load
applyProductTheme();
replaceLandingPageCardLogos();

// Retry logic to catch React hydration/SPA changes
setTimeout(applyProductTheme, 100);
setTimeout(applyProductTheme, 500);
setTimeout(replaceLandingPageCardLogos, 100);
setTimeout(replaceLandingPageCardLogos, 500);

// Re-run on navigation changes (clicking links without full reload)
if (window.navigation) {
  window.navigation.addEventListener('navigate', () => {
    setTimeout(() => {
      applyProductTheme();
      replaceLandingPageCardLogos();
    }, 100);
  });
}

// Observer to watch for DOM changes (switching tabs, opening menus)
let observerTimeout;
const observer = new MutationObserver(() => {
  clearTimeout(observerTimeout);
  observerTimeout = setTimeout(() => {
    applyProductTheme();
    // We do NOT run replaceProductLogos here anymore because docs.json handles it.
  }, 300);
});

if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: false // Shallow watch to avoid performance hits
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: false
    });
  });
}