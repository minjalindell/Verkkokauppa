
function updateDateTimeDisplay() {
    
    const now = new Date();

    
    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    
    const dateArray = [
        now.toLocaleDateString('fi-FI', dateOptions)
    ];

    
    const timeArray = [
        now.toLocaleTimeString('fi-FI', timeOptions)
    ];

    
    document.getElementById('dateTimeDisplay').innerText = ` ${dateArray[0]} |  ${timeArray[0]}`;
}


updateDateTimeDisplay();


setInterval(updateDateTimeDisplay, 1000);




const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');


const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = 'Light mode'; 
}


themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
 
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.textContent = 'Light mode'; 
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = 'Dark mode'; 
        localStorage.setItem('theme', 'light');
    }
});