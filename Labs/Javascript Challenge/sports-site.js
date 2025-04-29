// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get the popup ad element
    const popupAd = document.getElementById('popup-ad');
    
    // Get the close button
    const closeBtn = document.querySelector('.close-btn');
    
    // Function to open popup
    function openPopup() {
        popupAd.style.display = 'flex';
        popupAd.classList.add('fade-in');
    }
    
    // Function to close popup
    function closePopup() {
        popupAd.style.display = 'none';
    }
    
    // Close popup when clicking the close button
    closeBtn.addEventListener('click', closePopup);
    
    // Close popup when clicking outside the popup content
    window.addEventListener('click', function(event) {
        if (event.target === popupAd) {
            closePopup();
        }
    });
    
    // Set a cookie to remember if the user has closed the ad
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    
    // Get cookie value
    function getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }
    
    // Show popup when user scrolls down 60% of the page and hasn't seen it yet
    let hasShown = false;  // Flag to ensure popup only shows once per session
    
    // Remove cookie check temporarily for testing
    // const adShownBefore = getCookie('adShown');
    
    window.addEventListener('scroll', function() {
        // Calculate how far the user has scrolled (as a percentage of page height)
        const scrollPosition = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / pageHeight) * 100;
        
        console.log('Scroll percentage:', scrollPercentage.toFixed(1) + '%');  // Add logging
        
        // Show popup when user has scrolled 60% down the page
        // Only show if the user hasn't seen it in this session
        if (scrollPercentage > 60 && !hasShown) {
            console.log('Showing popup!');  // Log when popup should appear
            openPopup();
            hasShown = true;  // Set flag so popup won't show again in this session
            // setCookie('adShown', 'true', 1);  // Commented out for testing
        }
    });
    
    // Handle form submission (prevent default behavior for demo)
    const adButton = document.querySelector('.ad-button');
    adButton.addEventListener('click', function(event) {
        event.preventDefault();
        // In a real implementation, this would redirect to the advertiser's site
        console.log('Ad clicked!');
    });
});