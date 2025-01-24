// Función principal que agrega botones de descarga a videos e imágenes
function addDownloadButtons() {
  const videos = document.querySelectorAll("video"); // Selecciona todos los elementos de video en la página
  const images = document.querySelectorAll("img"); // Selecciona todos los elementos de imagen en la página

  // Itera sobre cada video encontrado
  videos.forEach(video => {
    // Verifica si ya existe un botón de descarga para evitar duplicados
    if (video.parentNode.querySelector(".download-button")) {
      return;
    }
    // Crea un botón de descarga para el video
    const downloadButton = createDownloadButton("Descargar Video", "download-video-button");
    // Agrega un evento de clic al botón para descargar el video
    downloadButton.addEventListener("click", function () {
      downloadMedia(video.src, "video.mp4");
    });
    // Inserta el botón de descarga antes del video
    video.parentNode.insertBefore(downloadButton, video);

    // Extrae la imagen de portada del video si existe
    const poster = video.getAttribute("poster");
    if (poster) {
      // Crea un botón de descarga para la imagen de portada
      const posterDownloadButton = createDownloadButton("Descargar Portada", "download-poster-button");
      // Agrega un evento de clic al botón para descargar la imagen de portada
      posterDownloadButton.addEventListener("click", function () {
        downloadMedia(poster, "portada.jpg");
      });
      // Inserta el botón de descarga después del video
      video.parentNode.insertBefore(posterDownloadButton, video.nextSibling);
    }
  });

  // Itera sobre cada imagen encontrada
  images.forEach(image => {
    // Filtra solo las imágenes grandes de los anuncios y verifica si ya existe un botón de descarga
    if (image.width > 300 && !image.parentNode.querySelector(".download-button")) {
      // Crea un botón de descarga para la imagen
      const downloadButton = createDownloadButton("Descargar Imagen", "download-image-button");
      // Agrega un evento de clic al botón para descargar la imagen
      downloadButton.addEventListener("click", function () {
        downloadMedia(image.src, "imagen.jpg");
      });
      // Inserta el botón de descarga antes de la imagen
      image.parentNode.insertBefore(downloadButton, image);
    }
  });
}

// Función que crea un botón de descarga con el texto y clase especificados
function createDownloadButton(text, className) {
  const button = document.createElement("button"); // Crea un nuevo elemento de botón
  button.innerHTML = text; // Establece el texto del botón
  button.className = `download-button ${className}`; // Establece las clases del botón
  button.style.position = "absolute"; // Posiciona el botón de forma absoluta
  button.style.zIndex = "1"; // Asegura que el botón esté por encima de otros elementos
  button.style.border = "none"; // Sin borde
  button.style.borderRadius = "5px"; // Bordes redondeados
  button.style.color = "white"; // Color del texto
  button.style.padding = "10px 12px"; // Padding del botón
  button.style.textAlign = "center"; // Texto centrado
  button.style.fontFamily = "Poppins"; // Fuente del texto
  button.style.fontWeight = "bold"; // Texto en negrita
  button.style.textDecoration = "none"; // Sin subrayado
  button.style.display = "inline-block"; // Mostrar como bloque en línea
  button.style.fontSize = "12px"; // Tamaño de la fuente
  button.style.margin = "2px 2px"; // Margen del botón
  button.style.cursor = "pointer"; // Cambia el cursor a puntero al pasar sobre el botón

  // Estilos específicos para los botones de descarga
  if (className === "download-image-button") {
    button.style.backgroundColor = "#4CAF50"; // Verde para el botón de imagen
    button.style.fontSize = "10px"; // Tamaño de la fuente
  } else if (className === "download-poster-button") {
    button.style.backgroundColor = "#2196F3"; // Azul para el botón de portada
    button.style.padding = "6px 9px"; // Padding del botón
    button.style.fontSize = "8px"; // Tamaño de la fuente
    button.style.margin = "2px 2px"; // Margen del botón
  } else if (className === "download-video-button") {
    button.style.backgroundColor = "#572364"; // Color original para el botón de video
  }

  return button; // Devuelve el botón creado
}

// Función que maneja la descarga de medios (videos o imágenes)
function downloadMedia(src, defaultFileName) {
  // Solicita al usuario que ingrese el nombre del archivo
  let fileName = prompt("Ingrese el nombre del archivo:", defaultFileName);
  if (fileName) {
    // Agrega la extensión adecuada si no está presente
    if (!fileName.includes(".")) {
      fileName += src.includes(".mp4") ? ".mp4" : ".jpg";
    }
    // Realiza una solicitud para obtener el archivo
    fetch(src)
      .then(response => response.blob()) // Convierte la respuesta en un blob
      .then(blob => {
        const a = document.createElement("a"); // Crea un enlace temporal
        a.href = URL.createObjectURL(blob); // Establece la URL del blob como href del enlace
        a.download = fileName; // Establece el nombre del archivo para la descarga
        a.click(); // Simula un clic en el enlace para iniciar la descarga
      })
      .catch(error => {
        console.error("Error al descargar el archivo", error); // Maneja cualquier error durante la descarga
      });
  }
}

// Ejecuta la función addDownloadButtons cada 400 milisegundos para asegurarse de que los botones se agreguen dinámicamente
setInterval(addDownloadButtons, 400);