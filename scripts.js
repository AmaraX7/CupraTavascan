const videoUrls = [
    "https://www.youtube.com/embed/Sdj9iO8opuU",
    "https://www.youtube.com/embed/NXiGN_T-M9U",
    "https://www.youtube.com/embed/RdcoqVPYYug",
    "https://www.youtube.com/embed/TMls2lJvD68",
    "https://www.youtube.com/embed/cLeqpI9bcII",
    "https://www.youtube.com/embed/mMrQCWabyO4",
];

const videoDescriptions = [
    "Sistema de Aparcamiento en Linea",
    "Sistema de Aparcamiento en Bateria",
    "Control de Crucero",
    "Climatización",
    "Sistema de Navegación",
    "Aviso de Salida de Carril",
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
    if (videoFrame) {
        videoFrame.src = videoUrls[currentVideoIndex];
    } else {
        console.error("Elemento con ID 'current-video' no encontrado.");
    }

    // Cambiar la descripción del video
    const videoDescription = document.getElementById("video-description");
    if (videoDescription) {
        videoDescription.textContent = videoDescriptions[currentVideoIndex];
        console.log(`Descripción actualizada: ${videoDescriptions[currentVideoIndex]}`);
    } else {
        console.error("Elemento con ID 'video-description' no encontrado.");
    }
}

function showInfo(number) {
    const infoBox = document.getElementById('info-box');
    if (!infoBox) {
        console.error("Elemento con ID 'info-box' no encontrado.");
        return;
    }
    
    let infoText = '';

    switch (number) {
        case 1:
            infoText = '1: Door handle.';
            break;
        case 2:
            infoText = '2: Central locking -> Exterior mirror adjustment and power windows.';
            break;
        case 3:
            infoText = '3: Lightning control';
            break;
        case 4:
            infoText = '4: Turn signal and main beam lever';
            break;
        case 5:
            infoText = '5: Multifunction steering wheel control panels';
            break;
        case 6:
            infoText = '6: Digital Cockpit and control lamps';
            break;
        case 7:
            infoText = '7: Gear selector and Electronic parking brake';
            break;
        case 8:
            infoText = '8: Infotainment system';
            break;
        case 9:
            infoText = '9: Open bonnet lever';
            break;
        case 10:
            infoText = '10: Fuses';
            break;
        case 11:
            infoText = '11: Steering wheel adjustment';
            break;
        case 12:
            infoText = '12: Steering wheel with horn and driver front airbag';
            break;
        case 13:
            infoText = '13: Hazard warning lights';
            break;
        default:
            infoText = 'Undefined element.';
    }

    infoBox.textContent = infoText;
}

function cambiarPestaña(id) {
    // Obtener todas las pestañas
    const pestañas = document.querySelectorAll('.pestaña');
    const tabTitle = document.getElementById('tab-title');

    // Ocultar todas las pestañas
    pestañas.forEach(pestaña => {
        pestaña.style.display = 'none';
    });

    // Mostrar solo la pestaña seleccionada
    const pestañaActiva = document.getElementById(`pestaña-${id}`);
    if (pestañaActiva) {
        pestañaActiva.style.display = 'block';
    } else {
        console.error(`No se encontró la pestaña con ID: pestaña-${id}`);
    }

    // Para mostrar el título de la pestaña "Inicio"
    if (id === 'inicio') {
        if (tabTitle) {
            tabTitle.style.display = 'block';
        } else {
            console.error("Elemento con ID 'tab-title' no encontrado.");
        }
    } else {
        if (tabTitle) {
            tabTitle.style.display = 'none';
        }
    }
}

function startCountdown(targetDate) {
    const timerElement = document.getElementById("timer");
    if (!timerElement) {
        console.error("Elemento con ID 'timer' no encontrado.");
        return;
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            timerElement.textContent = "¡Tu coche ha llegado!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.textContent = `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Llama inmediatamente para evitar el retraso inicial
    console.log("El script de la cuenta atrás se está ejecutando.");
}

// Esperar a que el DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado completamente");
    
    // Configurar listeners para los botones del carrusel
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            moveCarousel(-1);
        });
        console.log("Botón 'prev-button' configurado");
    } else {
        console.error("Botón con ID 'prev-button' no encontrado");
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            moveCarousel(1);
        });
        console.log("Botón 'next-button' configurado");
    } else {
        console.error("Botón con ID 'next-button' no encontrado");
    }
    
    // Configurar listeners para los botones de información
    for (let i = 1; i <= 13; i++) {
        const infoButton = document.getElementById(`info-button-${i}`);
        if (infoButton) {
            infoButton.addEventListener('click', function() {
                showInfo(i);
            });
            console.log(`Botón 'info-button-${i}' configurado`);
        }
    }
    
    // Configurar listeners para los botones de pestañas
    const tabButtons = document.querySelectorAll('[id^="tab-button-"]');
    tabButtons.forEach(button => {
        const id = button.id.replace('tab-button-', '');
        button.addEventListener('click', function() {
            cambiarPestaña(id);
        });
        console.log(`Botón 'tab-button-${id}' configurado`);
    });
    
    // Iniciar la cuenta regresiva
    const targetDate = new Date("2025-06-01T00:00:00").getTime();
    startCountdown(targetDate);
});