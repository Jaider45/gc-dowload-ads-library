// Función principal que agrega botones de descarga a los anuncios en el feed de Instagram
function addDownloadButtonsToInstagramAds() {
  // Selecciona todos los artículos en el feed
  const articles = document.querySelectorAll("article");

  // Itera sobre cada artículo encontrado
  articles.forEach(article => {
    // Verifica si el artículo es un anuncio (por ejemplo, si contiene un botón de "Comprar" o una etiqueta de "Patrocinado")
    const isAd = article.querySelector("span:contains('Comprar')") || article.querySelector("span:contains('Patrocinado')");
    if (isAd && !article.querySelector(".download-button")) {
      // Selecciona la imagen o video del anuncio
      const media = article.querySelector("img, video");

      if (media) {
        // Crea un botón de descarga para el anuncio
        const downloadButton = createDownloadButton("Descargar Anuncio", "download-ad-button");
        // Agrega un evento de clic al botón para descargar el anuncio
        downloadButton.addEventListener("click", function () {
          downloadMedia(media.src, "anuncio.jpg");
        });
        // Inserta el botón de descarga antes del medio
        media.parentNode.insertBefore(downloadButton, media);
      }
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
  button.style.padding = "12px 15px"; // Padding del botón
  button.style.textAlign = "center"; // Texto centrado
  button.style.fontFamily = "Poppins"; // Fuente del texto
  button.style.fontWeight = "bold"; // Texto en negrita
  button.style.textDecoration = "none"; // Sin subrayado
  button.style.display = "inline-block"; // Mostrar como bloque en línea
  button.style.fontSize = "14px"; // Tamaño de la fuente
  button.style.margin = "2px 2px"; // Margen del botón
  button.style.cursor = "pointer"; // Cambia el cursor a puntero al pasar sobre el botón
  button.style.backgroundColor = "#FF5722"; // Color de fondo del botón

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

// Ejecuta la función addDownloadButtonsToInstagramAds cada 400 milisegundos para asegurarse de que los botones se agreguen dinámicamente
setInterval(addDownloadButtonsToInstagramAds, 400);