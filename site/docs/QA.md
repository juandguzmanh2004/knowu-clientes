# QA · Landing de clientes

28 de octubre de 2026. Chrome local mediante Playwright sobre la vista de Vinext.

- TypeScript estricto sin errores.
- Build de producción de Vinext completado.
- 320, 390, 768 y 1440 px sin desbordamiento horizontal; un h1; anclas existentes.
- Ejemplos de video, diseño y 3D actualizan la vista y precargan la categoría.
- Correo y consentimiento requeridos; cliente particular o negocio opcional.
- Formulario probado contra D1 local con un correo ficticio reservado en `.example`.
- Confirmación sólo con respuesta 200; foco dirigido a la confirmación.
- Fallo 503 simulado: muestra error y conserva los datos; reintento real guarda.
- Consulta de base local: una fila de cliente, categoría gráfico, contexto personal. Duplicado no añade otra solicitud.
- Servidor rechaza email inválido, ausencia de consentimiento, honeypot no vacío y origen ajeno.
- FAQ y diálogo operables por teclado; Escape cierra el aviso de datos.
- Texto ampliado al 200% a 1440 px sin desbordamiento horizontal.
- Sin errores de JavaScript durante los recorridos probados.
- Capturas de móvil/escritorio revisadas. Mejorado el fondo del título de la ilustración de video para mantener legibilidad.

No equivale a auditoría WCAG completa ni a prueba de lector de pantalla. La persistencia se probó en el entorno local; no se introdujeron solicitudes ficticias en la base alojada.
