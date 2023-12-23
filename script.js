
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

// scroll detection
    window.addEventListener('scroll', function() {
// current scroll pos
        const scrollPosition = window.scrollY;
        const currentSection = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 0 && rect.bottom > 0;
        });

        if (currentSection !== -1 && currentSection !== currentSectionIndex) {
            currentSectionIndex = currentSection;
            console.log(`scroll down: ${currentSectionIndex + 1}`);
            
        } //?????????????????????????????


        switch (currentSectionIndex + 1) {
          case 1:
            setActiveButton('topButt');
            break;
          case 2:
            setActiveButton('abtButt');
            break;
          case 3:
            setActiveButton('botButt');
            break;
        }
        
        function setActiveButton(buttonId) {
          const buttons = ['topButt', 'abtButt', 'botButt'];
          
          buttons.forEach((button) => {
            const element = document.getElementById(button);
            if (element) {
              element.classList.toggle('aButt', button === buttonId);
            }
          });
        }
    });

// Scroll next or previous section based on scroll direction
    window.addEventListener('wheel', function(event) {
        const scrollDirection = event.deltaY > 0 ? 'down' : 'up';

        if (scrollDirection === 'down' && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (scrollDirection === 'up' && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    });



/*----------------------------------------------------------------  */

let startTouchY = 0;
let endTouchY = 0;
let lastScrollTime = 0;
const scrollCooldown = 500; //cooldown period
const swipeThreshold = 50; //swipe length

// Detect when user starts touching the screen
window.addEventListener('touchstart', function (event) {
    startTouchY = event.touches[0].clientY;
});

// Detect when user moves their finger
window.addEventListener('touchmove', function (event) {
    endTouchY = event.touches[0].clientY;
});

// Detect when user releases their finger
window.addEventListener('touchend', function (event) {
    const deltaY = endTouchY - startTouchY;

    if (Math.abs(deltaY) > swipeThreshold) {
        const currentTime = new Date().getTime();

        // Cooldown
        if (currentTime - lastScrollTime > scrollCooldown) {
            const scrollDirection = deltaY > 0 ? 'up' : 'down';

            if (scrollDirection === 'down' && currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
            } else if (scrollDirection === 'up' && currentSectionIndex > 0) {
                currentSectionIndex--;
            }

            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

            // Update last scroll time
            lastScrollTime = currentTime;
        }
    }


/*----------------------------------------------------------------  */
});

});

// top section
document.querySelector('#topButt').addEventListener('click', function() {
    const aboutSection = document.querySelector('.home');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// abt section
document.querySelector('#abtButt').addEventListener('click', function() {
    const aboutSection = document.querySelector('.about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

//contact section
document.querySelector('#botButt').addEventListener('click', function() {
    const aboutSection = document.querySelector('.contact');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

