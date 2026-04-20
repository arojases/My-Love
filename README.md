# My Love

Aplicacion web privada para dos personas, hecha con Angular, TypeScript, Firebase y animaciones suaves. Permite iniciar sesion con nombre de usuario y codigo compartido, enviar mensajes romanticos en tiempo real y ver el historial en una vista tipo chat.

## Publicar en GitHub sin exponer config

Los archivos rastreados del repo ahora quedaron con placeholders para que puedas hacer `commit` y `push` sin subir:

- Firebase `apiKey`
- `projectId`
- `authDomain`
- `appId`
- codigo compartido
- nombres reales

La app en GitHub Pages se construye con `GitHub Actions` usando `Repository Secrets`.

## Secrets que debes crear en GitHub

En tu repo ve a `Settings > Secrets and variables > Actions` y crea estos secrets:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `MYLOVE_SHARED_ACCESS_CODE`
- `MYLOVE_USER_NAME`
- `MYLOVE_USER_AVATAR`
- `MYLOVE_PARTNER_NAME`
- `MYLOVE_PARTNER_AVATAR`

Ejemplo:

- `MYLOVE_USER_NAME` = `Ariel`
- `MYLOVE_USER_AVATAR` = `A`
- `MYLOVE_PARTNER_NAME` = `Roxana`
- `MYLOVE_PARTNER_AVATAR` = `R`

## Activar GitHub Pages

1. Sube el repo a GitHub.
2. Ve a `Settings > Pages`.
3. En `Source`, elige `GitHub Actions`.
4. Haz push a `main` o `master`.
5. El workflow `.github/workflows/deploy-pages.yml` va a construir y publicar la app.

GitHub recomienda usar GitHub Actions para este tipo de despliegues:
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Importante para Angular en GitHub Pages

La app ahora usa `hash routing`, para evitar problemas al refrescar rutas como `dashboard` en GitHub Pages.

## Configuracion local

Antes de correr localmente, reemplaza los placeholders en [src/environments/environment.ts](/c:/Users/aroja/OneDrive/Escritorio/My-Love/src/environments/environment.ts:1) por tus valores reales.

Luego:

```bash
npm install
npm start
```

## Deploy local de reglas Firebase

Si cambias reglas, vuelve a publicarlas:

```bash
firebase deploy --only firestore:rules
```
