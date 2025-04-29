$(document).ready(function() {
    // Cache DOM elements
    var $password = $('#password');
    var $strengthBar = $('#strength-bar');
    var $strengthText = $('#strength-text');
    var $lengthReq = $('#length');
    var $uppercaseReq = $('#uppercase');
    var $lowercaseReq = $('#lowercase');
    var $numbersReq = $('#numbers');
    var $specialReq = $('#special');
    
    // Colors for strength levels
    var colors = {
        empty: '#e0e0e0',
        weak: '#ff4d4d',    // Red
        medium: '#ffaa00',  // Orange/Amber
        strong: '#8bc34a',  // Light Green
        veryStrong: '#006644' // Babson Green
    };
    
    // Listen for input in the password field
    $password.on('input', function() {
        var password = $password.val();
        checkPasswordStrength(password);
    });
    
    // Function to check password strength
    function checkPasswordStrength(password) {
        // Reset requirements
        $lengthReq.removeClass('met');
        $uppercaseReq.removeClass('met');
        $lowercaseReq.removeClass('met');
        $numbersReq.removeClass('met');
        $specialReq.removeClass('met');
        
        // If password is empty, reset the meter
        if (password.length === 0) {
            updateStrengthMeter(0, colors.empty, "Password strength: Enter a password");
            return;
        }
        
        // Check requirements
        var lengthValid = password.length >= 8;
        var uppercaseValid = /[A-Z]/.test(password);
        var lowercaseValid = /[a-z]/.test(password);
        var numbersValid = /[0-9]/.test(password);
        var specialValid = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        // Mark requirements as met
        if (lengthValid) $lengthReq.addClass('met');
        if (uppercaseValid) $uppercaseReq.addClass('met');
        if (lowercaseValid) $lowercaseReq.addClass('met');
        if (numbersValid) $numbersReq.addClass('met');
        if (specialValid) $specialReq.addClass('met');
        
        // Calculate strength score (0-4)
        var strength = 0;
        if (lengthValid) strength++;
        if (uppercaseValid) strength++;
        if (lowercaseValid) strength++;
        if (numbersValid) strength++;
        if (specialValid) strength++;
        
        // Determine strength level based on score
        if (strength === 0) {
            updateStrengthMeter(10, colors.weak, "Password strength: Very Weak");
        } else if (strength === 1) {
            updateStrengthMeter(25, colors.weak, "Password strength: Weak");
        } else if (strength === 2) {
            updateStrengthMeter(50, colors.medium, "Password strength: Medium");
        } else if (strength === 3) {
            updateStrengthMeter(75, colors.strong, "Password strength: Strong");
        } else if (strength >= 4) {
            updateStrengthMeter(100, colors.veryStrong, "Password strength: Very Strong");
        }
    }
    
    // Function to update the strength meter display
    function updateStrengthMeter(percentage, color, text) {
        $strengthBar.css({
            'width': percentage + '%',
            'background-color': color
        });
        $strengthText.text(text).css('color', color);
    }
    
    // Add CSS for met requirements
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .requirements .met {
                color: #006644;
                font-weight: bold;
            }
            .requirements .met:before {
                content: "✓ ";
            }
            .info-icon {
                display: inline-block;
                width: 18px;
                height: 18px;
                background-color: #006644;
                color: white;
                border-radius: 50%;
                text-align: center;
                line-height: 18px;
                font-size: 12px;
                font-weight: bold;
                cursor: help;
                margin-left: 5px;
                position: relative;
            }
            .password-tooltip {
                position: absolute;
                width: 250px;
                padding: 15px;
                background-color: white;
                border: 1px solid #ddd;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 100;
                display: none;
                text-align: left;
                color: #333;
                font-weight: normal;
                font-size: 13px;
                left: 25px;
                top: -5px;
            }
            .password-tooltip:before {
                content: "";
                position: absolute;
                left: -10px;
                top: 10px;
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 10px solid white;
            }
            .generate-button {
                background-color: #006644;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
                cursor: pointer;
                font-size: 12px;
                margin-top: 10px;
            }
            .generate-button:hover {
                background-color: #005538;
            }
            .suggested-password {
                background-color: #f5f5f5;
                padding: 5px;
                margin-top: 10px;
                border-radius: 3px;
                position: relative;
                display: none;
            }
            .copy-button {
                background-color: #444;
                color: white;
                border: none;
                padding: 2px 5px;
                border-radius: 3px;
                cursor: pointer;
                font-size: 10px;
                position: absolute;
                right: 5px;
                top: 5px;
            }
            .copy-button:hover {
                background-color: #333;
            }
        `)
        .appendTo('head');
    
    // Add info icon next to the password field
    $('<span class="info-icon">i</span>')
        .appendTo('label[for="password"]');
    
    // Add tooltip to the info icon
    $('<div class="password-tooltip">')
        .html(`
            <strong>Need a strong password?</strong>
            <p>A strong password should include uppercase and lowercase letters, numbers, and special characters.</p>
            <button class="generate-button">Generate Strong Password</button>
            <div class="suggested-password"></div>
        `)
        .appendTo('.info-icon');
    
    // Show tooltip on hover
    $('.info-icon').on('mouseenter', function() {
        $('.password-tooltip').show();
    }).on('mouseleave', function() {
        // Don't hide if user is interacting with the tooltip
        if (!$('.password-tooltip:hover').length) {
            $('.password-tooltip').hide();
        }
    });
    
    // Keep tooltip visible when hovering over it
    $('.password-tooltip').on('mouseenter', function() {
        $(this).show();
    }).on('mouseleave', function() {
        $(this).hide();
    });
    
    // Generate password function
    $(document).on('click', '.generate-button', function() {
        var suggestedPassword = generateStrongPassword();
        $('.suggested-password').html(suggestedPassword + 
            '<button class="copy-button">Copy</button>').show();
    });
    
    // Copy password function
    $(document).on('click', '.copy-button', function() {
        var password = $('.suggested-password').text().replace('Copy', '');
        
        // Create a temporary textarea element to copy from
        var $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(password).select();
        document.execCommand('copy');
        $temp.remove();
        
        // Visual feedback
        $(this).text('Copied!');
        setTimeout(function() {
            $('.copy-button').text('Copy');
        }, 2000);
    });
    
    // Function to generate a strong password
    function generateStrongPassword() {
        var length = 12;
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        var password = "";
        
        // Ensure we have at least one of each character type
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
        password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
        password += "0123456789"[Math.floor(Math.random() * 10)];
        password += "!@#$%^&*()_+"[Math.floor(Math.random() * 12)];
        
        // Fill the rest randomly
        for (var i = 4; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
        
        // Shuffle the password characters
        password = password.split('').sort(function() { 
            return 0.5 - Math.random() 
        }).join('');
        
        return password;
    }
});