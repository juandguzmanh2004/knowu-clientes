# KnowU · Landing de clientes

KnowU conecta a personas y pequeños negocios con estudiantes de diseño para resolver encargos puntuales. La landing permite consultar trabajos de portafolio y proponer un encargo para el piloto. El formulario guarda la solicitud y puede enviar una confirmación por correo.

[Abrir la landing pública](https://knowu-vercel-proxy.vercel.app/)

## Código y despliegue

- [`site/`](site/) contiene la landing, el formulario, los eventos de analítica y los recursos visuales. Corresponde a la revisión publicada `04a7b51580c434718b60f8ae1accf19b819997f6`.
- [`deploy/vercel/vercel.json`](deploy/vercel/vercel.json) contiene la configuración de Vercel. Sus rutas apuntan a [la landing alojada en Sites](https://knowu-clientes.gerguz2012.chatgpt.site/), donde también funcionan el formulario y la analítica.

Sites ejecuta el servidor y usa Cloudflare D1 para guardar las solicitudes y los eventos. El correo transaccional requiere un remitente verificado y los valores `BREVO_API_KEY` y `MAIL_FROM` configurados en el servidor. Los secretos y los datos del piloto se mantienen en el entorno de despliegue.

Para actualizar la landing pública, publica los cambios de `site/` en Sites. El despliegue de Vercel usa la configuración de `deploy/vercel/` y muestra el contenido publicado en Sites.

## Desarrollo local

Usa Node.js 22.13.0 o posterior.

```sh
cd site
npm ci
npm run dev
```

Para probar el formulario con una base local, compila con `npm run build` y aplica las migraciones SQL de `site/drizzle/` con Wrangler sobre la base D1 local. El manifiesto `site/.openai/hosting.json` declara el binding `DB` para el despliegue en Sites.
