const videoUrls = [
    "https://www.youtube.com/embed/Sdj9iO8opuU",
    "https://www.youtube.com/embed/NXiGN_T-M9U",
    "https://www.youtube.com/embed/RdcoqVPYYug",
    "https://www.youtube.com/embed/XubUlnIh1I"
];

let currentVideoIndex = 0;

function moveCarousel(direction) {
    // Actualizar el índice del video actual
    currentVideoIndex += direction;

    // Asegurarse de que el índice esté dentro de los límites
    if (currentVideoIndex < 0) {
        currentVideoIndex = videoUrls.length - 1;
    } else if (currentVideoIndex >= videoUrls.length) {
        currentVideoIndex = 0;
    }

    // Cambiar el video mostrado
    const videoFrame = document.getElementById("current-video");
    videoFrame.src = videoUrls[currentVideoIndex];
}