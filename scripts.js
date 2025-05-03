const videoUrls = [
    "https://www.youtube.com/embed/Sdj9iO8opuU",
    "https://www.youtube.com/embed/NXiGN_T-M9U",
    "https://www.youtube.com/embed/RdcoqVPYYug",
    "https://www.youtube.com/embed/TMls2lJvD68&list"
];

const videoDescriptions = [
    "Sistema de Aparcamiento ",
    "Descripción del video 2: Características del diseño exterior.",
    "Descripción del video 3: Tecnología y conectividad del vehículo.",
    "Climatización"
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

    // Cambiar la descripción del video
    const videoDescription = document.getElementById("video-description");
    videoDescription.textContent = videoDescriptions[currentVideoIndex];
}


function showInfo(number) {
    const infoBox = document.getElementById('info-box');
    let infoText = '';

    switch (number) {
        case 1:
            infoText = '1: Ajuste de los espejos retrovisores.';
            break;
        case 2:
            infoText = '2: Control de ventanillas.';
            break;
        case 3:
            infoText = '3: Palanca de luces e intermitentes.';
            break;
        // Añade más casos para cada número
        default:
            infoText = 'Elemento no definido.';
    }

    infoBox.textContent = infoText;

}