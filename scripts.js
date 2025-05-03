let currentIndex = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel-videos');
    const videos = document.querySelectorAll('.carousel-videos video');
    const totalVideos = videos.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalVideos - 1;
    } else if (currentIndex >= totalVideos) {
        currentIndex = 0;
    }

    const offset = -currentIndex * (videos[0].offsetWidth + 20); // 20px es el margen
    carousel.style.transform = `translateX(${offset}px)`;
}