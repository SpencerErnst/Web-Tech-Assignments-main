// Basic jQuery password strength meter
$(document).ready(function() {
    // Select DOM elements using jQuery
    var $passwordInput = $("#password");
    var $confirmPasswordInput = $("#confirm-password");
    var $strengthBar = $("#strength-bar");
    var $strengthText = $("#strength-text");
    var $submitButton = $(".submit-btn");
    
    // Event handler for when user types in password field
    $passwordInput.keyup(function() {
        // Get current password value
        var password = $passwordInput.val();
        
        // Check password strength
        checkPasswordStrength(password);
        
        // Check if passwords match (if confirm field has a value)
        if ($confirmPasswordInput.val().length > 0) {
            checkPasswordsMatch();
        }
    });
    
    // Event handler for confirm password field
    $confirmPasswordInput.keyup(function() {
        checkPasswordsMatch();
    });
    
    // Function to check password strength
    function checkPasswordStrength(password) {
        // Reset strength bar classes
        $strengthBar.removeClass("weak medium strong");
        
        // If password is empty, reset everything
        if (password.length === 0) {
            $strengthBar.css("width", "0%");
            $strengthText.text("Password strength: None");
            return;
        }
        
        // Simple strength rules
        var strength = 0;
        
        // Check length
        if (password.length > 6) {
            strength += 1;
        }
        
        // Check for numbers
        if (/\d/.test(password)) {
            strength += 1;
        }
        
        // Check for special characters
        if (/[!@#$%^&*]/.test(password)) {
            strength += 1;
        }
        
        // Update UI based on strength
        if (strength === 1) {
            $strengthBar.addClass("weak");
            $strengthText.text("Password strength: Weak").css("color", "#ff4d4d");
        } 
        else if (strength === 2) {
            $strengthBar.addClass("medium");
            $strengthText.text("Password strength: Medium").css("color", "#ffaa00");
        } 
        else if (strength === 3) {
            $strengthBar.addClass("strong");
            $strengthText.text("Password strength: Strong").css("color", "#006644");
        }
    }
    
    // Function to check if passwords match
    function checkPasswordsMatch() {
        var password = $passwordInput.val();
        var confirmPassword = $confirmPasswordInput.val();
        
        if (confirmPassword.length === 0) {
            return;
        }
        
        // Check if passwords match
        if (password === confirmPassword) {
            $confirmPasswordInput.css("border-color", "#006644");
        } else {
            $confirmPasswordInput.css("border-color", "#ff4d4d");
        }
    }
    
    // Handle form submission
    $submitButton.click(function(e) {
        e.preventDefault();
        alert("Account created successfully! Welcome to Babson College.");
    });
});
