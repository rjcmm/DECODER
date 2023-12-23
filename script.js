document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                if (sectionIndex !== currentSectionIndex) {
                    currentSectionIndex = sectionIndex;
                    console.log(`Scroll: Section ${currentSectionIndex + 1} in view`);
                    updateActiveButton();
                }
            }
        });
    }, { threshold: 0.5 }); // Adjust the threshold as needed

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll to the next or previous section based on scroll direction
    window.addEventListener('wheel', function (event) {
        const scrollDirection = event.deltaY > 0 ? 'down' : 'up';

        if (scrollDirection === 'down' && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (scrollDirection === 'up' && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

        // Update the active button after a short delay
        setTimeout(updateActiveButton, 100);
    });

    // Touch events
    let startTouchY = 0;
    let endTouchY = 0;
    let lastScrollTime = 0;
    const scrollCooldown = 500; // Cooldown period
    const swipeThreshold = 50; // Swipe length

    window.addEventListener('touchstart', function (event) {
        startTouchY = event.touches[0].clientY;
    });

    window.addEventListener('touchmove', function (event) {
        endTouchY = event.touches[0].clientY;
    });

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

                // Update the active button after a short delay
                setTimeout(updateActiveButton, 100);
            }
        }
    });

    // Click events for buttons
    document.querySelector('#topButt').addEventListener('click', function () {
        scrollToSection('.home');
    });

    document.querySelector('#abtButt').addEventListener('click', function () {
        scrollToSection('.about');
    });

    document.querySelector('#botButt').addEventListener('click', function () {
        scrollToSection('.contact');
    });

    // Helper function to scroll to a specific section
    function scrollToSection(sectionSelector) {
        const section = document.querySelector(sectionSelector);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Helper function to set the active button based on the current section
    function updateActiveButton() {
        const buttonIds = ['topButt', 'abtButt', 'botButt'];

        buttonIds.forEach((buttonId, index) => {
            const element = document.getElementById(buttonId);
            if (element) {
                element.classList.toggle('aButt', index === currentSectionIndex);
            }
        });
    }
});
