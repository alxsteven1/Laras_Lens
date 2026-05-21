

// --- THEME TOGGLE LOGIC ---
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

// Initialization prevents flash and is already handled in the HTML <head>
// This block allows toggling the text on the button based on current state.
if (themeToggleBtn) {
    function updateBtnText() {
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = '☀️ Toggle Light Mode';
        } else {
            themeToggleBtn.textContent = '🌙 Toggle Dark Mode';
        }
    }
    
    updateBtnText();

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        updateBtnText();
    });
}

// --- LOCAL GALLERY LOGIC ---
// Using your exact array to pull from the local folder (skipping 4)
const imageNumbers = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

const baseHeadings = [
    "Weddings", "Special Moments", "Birthdays", "Editorial",
    "Portraits", "Spring Beauty", "Surveillance", "Graduation",
    "Casual", "Events", "Studio", "Outdoor", "Lifestyle", "Couples"
];

let fullHeadings = [...baseHeadings, ...baseHeadings];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledImages = shuffleArray([...imageNumbers]);
fullHeadings = shuffleArray(fullHeadings);

const gallery = document.getElementById('gallery-container');

if (gallery) {
    shuffledImages.forEach(num => {
        const assignedHeading = fullHeadings.pop(); 

        const box = document.createElement('div');
        box.className = 'photo-box'; // The CSS handles the 3D animation styling

        const img = document.createElement('img');
        img.src = `pic${num}.jpg`;
        img.alt = assignedHeading;
        img.loading = "lazy"; 

        const label = document.createElement('div');
        label.className = 'photo-label';
        label.textContent = assignedHeading;

        box.appendChild(img);
        box.appendChild(label);
        gallery.appendChild(box);
    });

    // --- 3D SCROLL ANIMATION OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15 
    });

    // Slight delay to ensure the DOM is painted before observing, 
    // ensuring the initial page-load cascade effect looks smooth.
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('.photo-box');
        hiddenElements.forEach((el) => observer.observe(el));
    }, 100);
}
