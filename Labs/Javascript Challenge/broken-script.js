document.addEventListener('DOMContentLoaded', function() {
    // Typo in the variable name - 'popupad' instead of 'popup-ad'
    const popupAd = document.getElementById('popupad');
    
    // Missing querySelector method - using wrong method
    const closeBtn = document.getElementsByClassName('close-btn')[0];
    
    // Function to open popup - missing style property
    function openPopup() {
        popupAd.display = 'flex';  // Missing style. prefix
        popupAd.classList.add('fade-in');
    }
    
    // Function to close popup - incorrect property name
    function closePopup() {
        popupAd.style.visible = 'none';  // Should be display, not visible
    }
    
    // Wrong event name
    closeBtn.addEventListener('onClick', closePopup);  // Should be 'click', not 'onClick'
    
    // Show popup when user scrolls down the page
    let hasShown = false;
    
    // Incorrect property name for scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;  // Should be window.scrollY or window.pageYOffset
        // Missing pageHeight calculation
        const scrollPercentage = (scrollPosition / 1000) * 100;  // Hard-coded value instead of actual page height
        
        // Incorrect percentage (120 is impossible to reach)
        if (scrollPercentage > 120 && !hasShown) {
            openPopup();
            hasShown = true;
        }
    });
    
    // Missing event listener for clicking outside the popup
    
    // Incorrect query selector
    const adButton = document.querySelector('#ad-button');  // Missing # for ID or should use class selector .ad-button
    
    // This will cause an error because adButton is null
    adButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Ad clicked!');
    });
});
