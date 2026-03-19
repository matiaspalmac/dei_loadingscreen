# dei_loadingscreen

Pantalla de carga personalizada con musica, tips y fondo dinamico.

## Requisitos

- FiveM Server

## Instalacion

1. Descarga el recurso
2. Coloca la carpeta `dei_loadingscreen` en tu directorio `resources`
3. Agrega `ensure dei_loadingscreen` a tu `server.cfg`
4. Configura `config.js` a tu gusto

## Configuracion

Edita `config.js` para ajustar la musica, tips, imagenes de fondo y nombre del servidor.

## Ecosistema Dei

Este recurso forma parte del ecosistema Dei. Funciona de forma independiente, pero al usarlo junto a otros recursos Dei comparte:

- Sistema de temas (dark, midnight, neon, minimal)
- Modo claro/oscuro
- Preferencias sincronizadas via KVP

## Estructura

```
dei_loadingscreen/
├── html/
│   ├── index.html
│   └── assets/
│       ├── css/
│       │   ├── styles.css
│       │   └── themes.css
│       ├── js/
│       │   └── app.js
│       └── fonts/
│           ├── Gilroy-Light.otf
│           └── Gilroy-ExtraBold.otf
├── config.js
└── fxmanifest.lua
```

## Licencia

MIT License - Dei
