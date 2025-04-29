// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'dark');
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme === 'dark');
    });
    
    // Update icon based on theme
    function updateThemeIcon(isDark) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
});

// Music player functionality
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('meow-music');
    const playButton = document.getElementById('play-button');
    const playIcon = playButton.querySelector('i');
    const musicInfo = document.querySelector('.music-info');
    
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.className = 'fas fa-pause';
            playButton.classList.add('playing');
        } else {
            audio.pause();
            playIcon.className = 'fas fa-play';
            playButton.classList.remove('playing');
        }
    });
    
    // Update music visualizer
    const bars = document.querySelectorAll('.bar');
    audio.addEventListener('play', () => {
        bars.forEach(bar => bar.style.animationPlayState = 'running');
    });
    
    audio.addEventListener('pause', () => {
        bars.forEach(bar => bar.style.animationPlayState = 'paused');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const playIcon = musicToggle.querySelector('.fa-play');
    const pauseIcon = musicToggle.querySelector('.fa-pause');
    const audio = document.getElementById('meow-music');
    const visualizer = document.querySelector('.music-visualizer');
    const bars = visualizer.querySelectorAll('.bar');
    const playButton = document.getElementById('play-button');
    const playText = playButton.querySelector('span');

    let isPlaying = false;

    // Try to play automatically when page loads
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay started successfully
            musicToggle.classList.add('playing');
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            bars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
            playButton.classList.add('playing');
            playText.textContent = 'Pause Music';
        }).catch(error => {
            // Autoplay was prevented
            console.log("Autoplay prevented:", error);
            // Keep the button in its initial state
        });
    }

    // Handle play button clicks
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                musicToggle.classList.add('playing');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                bars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
                playButton.classList.add('playing');
                playText.textContent = 'Pause Music';
            }).catch(error => {
                console.log("Playback prevented:", error);
            });
        } else {
            audio.pause();
            musicToggle.classList.remove('playing');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            bars.forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
            playButton.classList.remove('playing');
            playText.textContent = 'Play Music';
        }
    });

    // Update button state when audio ends
    audio.addEventListener('ended', function() {
        musicToggle.classList.remove('playing');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        bars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
        playButton.classList.remove('playing');
        playText.textContent = 'Play Music';
    });

    // Pause music when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isPlaying) {
            musicToggle.click();
        }
    });

    // Initialize visualizer bars in paused state
    bars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });

    // Add hover effect to meme cards
    const memeCards = document.querySelectorAll('.meme-card');
    memeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
}); 