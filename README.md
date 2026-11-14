# Multiverse Explorer

Explorador de personajes de Rick y Morty. Permite combinar la búsqueda por nombre con un filtro de estado, recorrer el catálogo, consultar una ficha y guardar favoritos en el navegador.

## Ejecutar en local

Requiere Node.js 24.13.1 y npm 11.10.1.

```sh
npm ci
npm start
```

Abre [localhost:4200](http://localhost:4200/). Se necesita conexión a Internet para consultar la API y cargar sus imágenes. Para generar la compilación de producción, ejecuta `npm run build`. El resultado queda en `dist/multiverse-explorer/browser/`.

## Tecnologías y arquitectura

Angular 21 con componentes standalone, TypeScript estricto, Angular HttpClient, RxJS, CSS nativo y `localStorage`.

Bajo `src/app/` hay cuatro capas:

- **Domain** (`domain/`) define el personaje, la consulta paginada y los contratos de los repositorios.
- **Application** (`application/`) ejecuta la búsqueda, la consulta de detalles y la lógica de favoritos mediante esos contratos.
- **Infrastructure** (`infrastructure/`) integra la API REST, convierte sus respuestas a modelos de dominio y guarda los favoritos en `localStorage`.
- **Presentation** (`presentation/`) contiene el catálogo, las tarjetas y el modal. `app.ts` organiza el catálogo y los favoritos. Los componentes gestionan los estados visibles y cancelan las consultas obsoletas mediante RxJS.

`app.config.ts` conecta los casos de uso y los repositorios mediante la inyección de dependencias de Angular. La API resuelve el filtrado y la paginación.

[Documentación de la API de Rick y Morty](https://rickandmortyapi.com/documentation)
