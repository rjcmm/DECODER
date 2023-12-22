document.querySelector('.topButt').addEventListener('click', function() {
    const aboutSection = document.querySelector('.home');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.abtButt').addEventListener('click', function() {
    const aboutSection = document.querySelector('.about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.botButt').addEventListener('click', function() {
    const aboutSection = document.querySelector('.contact');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});