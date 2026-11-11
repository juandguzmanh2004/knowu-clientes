# KnowU · Landing de clientes

Iteración del 28 de octubre de 2026. Clientes son personas y negocios. El foco inicial es talento estudiantil de diseño, con apertura a encargos digitales de estudiantes de sistemas.

La segunda landing, para estudiantes, será una entrega independiente. El brief aceptado está en `docs/BRIEF-CLIENTES.md`.

## Experiencia

- Propuesta directa: «Dale forma a tu idea con talento de diseño».
- Ejemplos ilustrativos propios: video, invitación gráfica y soporte 3D. No son testimonios ni portafolios reales.
- Una conversión: solicitud guardada para el piloto. CTA: «Quiero resolver un encargo».
- Personas y negocios pueden participar sin crear una cuenta.
- Datos: correo, tipo de encargo, contexto opcional, consentimiento y atribución de campaña.
- Confirmación después de guardar; validación en cliente y servidor, estado de carga y error que conserva los datos.
- 3D se ofrece como interés a explorar: materiales, impresión y entrega deben revisarse antes de coordinar una prueba.
- Mantiene el aviso de pagos simulados del MVP. No promete contratación ni disponibilidad.

## Tecnología

Vinext + React + Cloudflare Worker, con D1 y Drizzle para las solicitudes y los eventos. Manifest de Sites: `.openai/hosting.json`. No se ha modificado el backend Expo/Hono del arnés original.

```powershell
npm run dev -- --port 5173 --hostname 127.0.0.1
```

`app/page.tsx` contiene la landing; `app/globals.css` el sistema visual de esta versión; `lib/pilot.ts` la validación; `app/api/pilot` y `app/api/events` los endpoints.

La marca conserva marino/cobalto, radios de 10/12 px y tipografía de sistema con preferencia por Inter. Los tonos cálidos sólo se usan dentro de ilustraciones. Inter no está empaquetada.

## Datos y medición

- `pilot_requests`: una solicitud por correo; duplicados reciben la misma respuesta para no exponer si un correo ya está registrado. La primera categoría registrada se conserva.
- `landing_events`: visitas de sesión, clics de CTA, selección de ejemplos y solicitudes nuevas guardadas. No contiene el correo.
- `sessionStorage`: UUID aleatorio de pestaña para deduplicar visitas. No identifica personas únicas entre dispositivos ni utiliza fingerprinting.
- UTM admitidas: source, medium y campaign, con longitud limitada.
- Una visita de sesión se cuenta una vez; la fuente de verdad de conversiones son las solicitudes guardadas. Si falla un evento, no se pierde la solicitud.
- Métrica a interpretar: solicitudes nuevas / sesiones de llegada. No llamarla «usuarios únicos».
- El sitio permanece privado para revisión. Antes de captación pública, completar el canal de contacto del responsable de datos y revisar el aviso del piloto.
- No se envían correos automáticos ni se conecta un sistema de contratación.

## Desarrollo y publicación

El helper de Sites gobierna build, sincronización y paquete. Para D1 local, generar migraciones con `npm run db:generate`, construir y aplicar sólo SQL pendiente mediante Wrangler usando `dist/server/wrangler.json` y `.wrangler/state`.

La migración `drizzle/0000_sweet_ultimo.sql` crea las tablas iniciales. El despliegue aplica las migraciones de producción; los datos locales de QA no se incluyen.

Revisión realizada: tipos TypeScript, build, responsive a 320/390/768/1440 px, teclado, texto al 200%, envío real a D1 local y pruebas negativas del formulario. Detalles en `docs/QA.md`.
