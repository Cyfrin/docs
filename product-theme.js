// Product colors
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
  profiles: {
    primary: '#155EEF',
    rgb: '21, 94, 239',
    class: 'product-profiles'
  }
};

// Detect product section and apply theming
function applyProductTheme() {
  console.log('[Cyfrin Theme] Running applyProductTheme');
  const path = window.location.pathname;
  console.log('[Cyfrin Theme] Current path:', path);
  const body = document.body;

  // Remove any existing product classes
  Object.values(PRODUCT_COLORS).forEach(p => body.classList.remove(p.class));

  // Determine current product
  let currentProduct = null;
  if (path.includes('/codehawks')) currentProduct = PRODUCT_COLORS.codehawks;
  else if (path.includes('/updraft')) currentProduct = PRODUCT_COLORS.updraft;
  else if (path.includes('/solodit')) currentProduct = PRODUCT_COLORS.solodit;
  else if (path.includes('/profiles')) currentProduct = PRODUCT_COLORS.profiles;

  console.log('[Cyfrin Theme] Current product:', currentProduct ? currentProduct.class : 'none');

  if (currentProduct) {
    // Add class to body
    body.classList.add(currentProduct.class);

    // Style active navigation items directly
    const styleActiveNav = () => {
      console.log('[Cyfrin Theme] Styling active nav items');

      // DEBUG: Find ALL links on the page, then filter for sidebar
      const allLinks = document.querySelectorAll('a');
      console.log(`[Cyfrin Theme DEBUG] Found ${allLinks.length} total links on page`);

      // Filter for links that are likely in sidebar (contain current path or have text-shadow)
      const sidebarLinks = Array.from(allLinks).filter(link => {
        const hasTextShadow = link.style.textShadow || (link.classList && link.classList.toString().includes('text-shadow'));
        const matchesPath = link.href && (link.href.includes('/codehawks') || link.href.includes('/updraft') || link.href.includes('/solodit') || link.href.includes('/profiles'));
        return hasTextShadow || (matchesPath && link.textContent.length < 100);
      });

      console.log(`[Cyfrin Theme DEBUG] Found ${sidebarLinks.length} potential sidebar links`);

      // Log first 10 sidebar links with their attributes
      sidebarLinks.slice(0, 10).forEach((link, i) => {
        const attrs = {};
        for (let attr of link.attributes) {
          attrs[attr.name] = attr.value;
        }
        const parentClasses = link.parentElement ? link.parentElement.className : '';
        console.log(`[Cyfrin Theme DEBUG] Sidebar link ${i}:`, link.textContent.trim().substring(0, 40),
          `\nClasses:`, attrs.class,
          `\nParent:`, parentClasses,
          `\nHref:`, link.href);
      });

      // First, CLEAR all previous inline styling from sidebar links
      const allSidebarLinks = Array.from(allLinks).filter(link => {
        const parent = link.parentElement;
        return parent && parent.className.includes('scroll-m-4');
      });

      allSidebarLinks.forEach(link => {
        link.style.borderLeft = '';
        link.style.background = '';
        link.style.boxShadow = '';
        link.style.fontWeight = '';
      });

      // Find sidebar links that match current URL
      const sidebarLinksToStyle = allSidebarLinks.filter(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        return linkPath === path;
      });

      console.log(`[Cyfrin Theme] Found ${sidebarLinksToStyle.length} active sidebar links matching current path`);

      // Style the matching links (keep text color dark, only change border/glow)
      sidebarLinksToStyle.forEach(link => {
        link.style.borderLeft = `3px solid ${currentProduct.primary}`;
        link.style.background = `linear-gradient(90deg, rgba(${currentProduct.rgb}, 0.15), transparent)`;
        link.style.boxShadow = `0 0 15px rgba(${currentProduct.rgb}, 0.3)`;
        // Keep text the default dark color (override any blue active state)
        const isDark = document.documentElement.classList.contains('dark');
        link.style.color = isDark ? '#d1d5db' : '#374151';
        console.log(`[Cyfrin Theme] Styled link:`, link.textContent.trim());
      });
    };

    // Apply immediately
    styleActiveNav();

    // Also apply after a short delay (for dynamic content)
    setTimeout(styleActiveNav, 100);
    setTimeout(styleActiveNav, 500);
  }
}

// Clear any persisted navigation state from localStorage
try {
  // Look for Mintlify's navigation state keys and clear them
  Object.keys(localStorage).forEach(key => {
    if (key.includes('navigation') || key.includes('sidebar') || key.includes('expanded')) {
      console.log('[Cyfrin Theme] Clearing stored state:', key);
      localStorage.removeItem(key);
    }
  });
} catch (e) {
  console.log('[Cyfrin Theme] Could not clear localStorage:', e);
}

// Product logos mapping
const PRODUCT_LOGOS = {
  'CodeHawks': '/images/product-logos/codehawks.svg',
  'Updraft': '/images/product-logos/updraft.svg',
  'Solodit': '/images/product-logos/solodit.svg',
  'Profiles': '/images/product-logos/cyfrin.svg'
};

// Replace Font Awesome icons with custom logos (only for collapsible groups, not anchor links)
function replaceProductLogos() {
  console.log('[Cyfrin Theme] Replacing product logos');

  // Find all BUTTONS (collapsible groups) - exclude links (anchor links)
  const allButtons = document.querySelectorAll('button');

  allButtons.forEach(element => {
    const textContent = element.textContent.trim();

    // Check if this element contains a product name
    Object.keys(PRODUCT_LOGOS).forEach(productName => {
      if (textContent === productName || textContent.startsWith(productName)) {
        // Skip if this is an external link anchor (check parent)
        const isAnchorLink = element.closest('.nav-anchor') ||
                            element.querySelector('.nav-anchor') ||
                            (element.href && element.href.includes('cyfrin.io'));

        if (isAnchorLink) {
          return; // Skip anchor links, keep Font Awesome icons
        }

        // Find the SVG icon (Font Awesome)
        const svgIcon = element.querySelector('svg');

        if (svgIcon && !element.dataset.logoReplaced) {
          console.log(`[Cyfrin Theme] Replacing icon for ${productName}`);

          // Hide the Font Awesome icon
          svgIcon.style.display = 'none';

          // Create custom logo image
          const logoImg = document.createElement('img');
          logoImg.src = PRODUCT_LOGOS[productName];
          logoImg.alt = productName;
          logoImg.style.width = '20px';
          logoImg.style.height = '20px';
          logoImg.style.marginRight = '8px';
          logoImg.style.flexShrink = '0';

          // Insert logo before the SVG
          svgIcon.parentNode.insertBefore(logoImg, svgIcon);

          // Mark as replaced to avoid duplicates
          element.dataset.logoReplaced = 'true';
        }
      }
    });
  });
}

// Run on load
console.log('[Cyfrin Theme] Script loaded!');
applyProductTheme();
replaceProductLogos();

// Replace logos after short delays to catch dynamic content
setTimeout(replaceProductLogos, 100);
setTimeout(replaceProductLogos, 500);

// Re-run on navigation changes (for SPA routing)
if (window.navigation) {
  window.navigation.addEventListener('navigate', () => {
    setTimeout(() => {
      applyProductTheme();
      replaceProductLogos();
    }, 100);
  });
}

// Use MutationObserver as fallback for dynamic content (debounced)
let observerTimeout;
const observer = new MutationObserver(() => {
  // Debounce to avoid firing too frequently during dropdown toggles
  clearTimeout(observerTimeout);
  observerTimeout = setTimeout(() => {
    applyProductTheme();
  }, 300);
});

// Start observing after DOM is ready, but only watch for major changes
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: false  // Don't watch deep nested changes to avoid dropdown interference
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: false
    });
  });
}
