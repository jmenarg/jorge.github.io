document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadCvBtn');

    downloadBtn.addEventListener('click', async () => {
        // Obtenemos el valor actual del selector de idioma
        const lang = document.getElementById('languageSelector').value;

        // Definimos el nombre del archivo según el idioma
        const fileName = (lang === 'es') ? 'CV_Jorge_Mendez.pdf' : 'RESUME_Jorge_Mendez.pdf';

        // Realizamos la descarga del archivo correspondiente
        const response = await fetch(`./assets/files/${fileName}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url); // Limpia el objeto URL
    });

    // Seleccionamos todos los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Seleccionamos todos los items (columnas) del portafolio
    const portfolioItems = document.querySelectorAll('.portfolio-container .col-md-6');

    // Recorremos cada botón de filtro
    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // 1. Actualizamos la clase 'active' en los botones
            filterButtons.forEach((button) => button.classList.remove('active'));
            btn.classList.add('active');

            // 2. Obtenemos el filtro a aplicar (e.g., all, logotipo, web, etc.)
            const filter = btn.getAttribute('data-filter');

            // 3. Iteramos sobre cada item del portafolio
            portfolioItems.forEach((item) => {
                const category = item.getAttribute('data-cat');
                // Buscamos el enlace que contiene la imagen
                let anchor = item.querySelector('a');

                // Si se selecciona 'all' o la categoría coincide:
                if (filter === 'all' || category === filter) {
                    item.style.display = ''; // mostramos el item
                    // Aseguramos que el enlace tenga el atributo para agrupar en lightbox
                    anchor.setAttribute('data-lightbox', 'portfolio');
                } else {
                    item.style.display = 'none'; // ocultamos el item
                    // Eliminamos el atributo para que no se incluya en el grupo de Lightbox
                    anchor.removeAttribute('data-lightbox');
                }
            });
        });
    });


    // 1. Selección de elementos para cambio de idioma
    const langSelector = document.getElementById('languageSelector');

    // Función para cargar el JSON del idioma seleccionado y actualizar los textos
    function loadLanguage(lang) {
        fetch(`./locales/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                // Recorremos todos los elementos con atributo data-i18n
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (translations[key]) {
                        el.innerHTML = translations[key];
                    }
                });
            })
            .catch(error => console.error('Error loading language file:', error));
    }

    // Cargar idioma inicial basado en el valor del selector
    loadLanguage(langSelector.value);

    // Actualizar idioma al cambiar el selector
    langSelector.addEventListener('change', function () {
        loadLanguage(this.value);
    });



});
