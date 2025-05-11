document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const savePrefsBtn = document.getElementById('savePrefs');
    const loadPrefsBtn = document.getElementById('loadPrefs');
    const animateBtn = document.getElementById('animateBtn');
    const animationTarget = document.getElementById('animationTarget');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    
    // Load preferences when page loads
    loadPreferences();
    
    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            username: usernameInput.value,
            theme: themeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved!');
        
        // Apply theme immediately
        applyTheme(preferences.theme);
    });
    
    // Load preferences from localStorage
    loadPrefsBtn.addEventListener('click', loadPreferences);
    
    // Toggle animation
    animateBtn.addEventListener('click', function() {
        animationTarget.classList.toggle('animate');
        
        if (animationTarget.classList.contains('animate')) {
            animateBtn.textContent = 'Stop Animation';
        } else {
            animateBtn.textContent = 'Trigger Animation';
        }
    });
    
    // Function to load preferences
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            
            usernameInput.value = preferences.username || '';
            themeSelect.value = preferences.theme || 'light';
            
            applyTheme(preferences.theme);
        }
    }
    
    // Function to apply theme
    function applyTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        document.body.classList.add(theme);
    }
    
    // Bonus: Save preferences when form fields change
    usernameInput.addEventListener('change', function() {
        const currentPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        currentPrefs.username = usernameInput.value;
        localStorage.setItem('userPreferences', JSON.stringify(currentPrefs));
    });
    
    themeSelect.addEventListener('change', function() {
        const currentPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        currentPrefs.theme = themeSelect.value;
        localStorage.setItem('userPreferences', JSON.stringify(currentPrefs));
        applyTheme(themeSelect.value);
    });
});