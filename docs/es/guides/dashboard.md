---
title: El panel
summary: El estado de los servicios web, la salud de los esquemas, la búsqueda, los filtros y las acciones de la lista.
order: 10
---

El panel es la página de inicio del plugin. Le dice, de un vistazo, si los servicios web del sitio funcionan y qué salud tienen sus esquemas, y lista los esquemas para que pueda abrirlos, cambiarlos, exportarlos o quitarlos. Se llega desde **Administración del sitio > Servidor > Web Service Manager > Panel**.

![El panel, con sus partes numeradas](asset:dashboard-marked.webp)

| # | Parte | Para qué sirve |
|---|---|---|
| 1 | [Las acciones de la página](#1-las-acciones-de-la-página) | Leer la documentación, exportar todos los esquemas, importar esquemas y crear uno. |
| 2 | [El resumen](#2-el-resumen) | Qué salud tienen los esquemas, y si los servicios web y sus protocolos están activados. |
| 3 | [Búsqueda y filtros](#3-búsqueda-y-filtros) | Acotar la lista por nombre, estado y fecha. |
| 4 | [La lista](#4-la-lista) | Los esquemas, con las acciones de cada uno y las páginas de la lista. |

## 1. Las acciones de la página

A la derecha de la cabecera de la página:

| Botón | Qué hace |
|---|---|
| **Documentación** | Un menú con la [referencia YAML](page:reference/yaml), este manual y la documentación de Moodle. |
| **Exportar todo** | Todos los esquemas en un ZIP. |
| **Importar esquemas** | [Archivos y paquetes](page:guides/import-and-export). |
| **Nuevo esquema** | El [formulario guiado](page:guides/create-a-schema). |

En una pantalla estrecha, como la de un teléfono, los botones pasan debajo de la descripción de la página.

![El menú de documentación](asset:dashboard-documentation-menu.webp)

## 2. El resumen

La primera línea muestra cuántos esquemas hay y cómo se reparten entre **Correcto**, **Advertencia** y **Crítico**, como una barra y como el número de cada estado. Un esquema se comprueba según un calendario (véase [permisos, ajustes y comprobación de salud](page:reference/settings)) y su estado es lo peor que encontró la comprobación.

La segunda línea muestra si los servicios web del sitio están **Operativos**, **Desactivados** o con **Ningún protocolo activado**, y un botón para cada protocolo (REST, SOAP), marcado cuando está activado. Una persona que puede cambiar la configuración del sitio los activa o desactiva desde aquí, sin abrir la administración de Moodle y sin recargar la página; un mensaje confirma cada cambio:

- **Activar los servicios web** activa los servicios web del sitio. **Desactivar los servicios web** los desactiva, tras una confirmación, ya que todos los servicios web del sitio dejan de responder.
- El botón de un protocolo activa o desactiva ese protocolo.

Cada cambio se guarda como lo guarda la administración de Moodle, de modo que queda en el registro de la configuración del sitio con su valor anterior. **Gestionar** abre los ajustes de los protocolos. La [página de un esquema](page:guides/schema-page) muestra el mismo estado de los servicios web en su parte superior.

## 3. Búsqueda y filtros

Sobre la lista:

- **Buscar nombre...** acota la lista a medida que escribe. Las palabras se buscan en el nombre, el identificador del esquema y la versión, y todas deben estar; **Esc** borra la búsqueda.
- **Estado** enumera los estados con el número de esquemas de cada uno, contados dentro de la búsqueda y de la fecha; marque uno o varios para ver solo esos esquemas.
- **Última modificación** limita la lista a un periodo: hoy, los últimos siete días, el mes en curso, los últimos treinta días o dos fechas a su elección. La primera fecha nunca es posterior a la última: una fecha que pasa a la otra mueve la otra hasta ella.

Un menú que acota la lista aparece resaltado y muestra solo a qué está acotada, por ejemplo **Correcto**, o **Estado: 2** cuando hay dos estados marcados; la cruz que sustituye a su flecha quita ese filtro. El botón con el icono de recargar, al final de la fila, quita a la vez la búsqueda y todos los filtros. Cuando los menús no caben junto a la búsqueda, por ejemplo en un teléfono, se reúnen en un único menú, **Filtros**, con el icono del embudo.

![El menú Estado, con los esquemas de cada estado](asset:dashboard-filters.webp)

Lo que pide se guarda en la dirección, de modo que al recargar, o con un enlace que comparta, se ve la misma lista.

## 4. La lista

La lista conserva una sola altura contenga lo que contenga, el espacio que le deja la ventana, de modo que en un ordenador los filtros, la lista y su paginador caben en la pantalla; cuando tiene más esquemas de los que caben, se desplaza dentro de su caja con los encabezados a la vista. Sus columnas conservan el ancho cuando un filtro cambia las filas. Bajo ella, **Filas por página** ofrece los tamaños menores que la lista, y **Todos**: una lista de hasta 12 esquemas los muestra todos; una de 13 a 24 ofrece 12 o todos; y así sucesivamente hasta 12, 24, 48 y 96. Las flechas llevan a la página anterior y a la siguiente. El historial de un esquema y sus comprobaciones de salud tienen el mismo paginador.

Cada fila termina con botones redondos: el ojo (**Ver**), el lápiz (**Editar**, que abre el [formulario que crea un esquema, ya relleno](page:guides/edit-a-schema)), el reloj (**Historial de versiones**) y los tres puntos, que abren **Exportar**, **Desactivar** o **Activar** y **Eliminar**. Desactivar y activar cambian la fila donde está y lo indican en un mensaje; eliminar pide confirmación antes.

### Elegir varios esquemas

Marque los esquemas, o **Seleccionar todo** en la cabecera, y una barra flota en la parte inferior de la pantalla con cuántos hay elegidos y lo que puede hacer con ellos: **Activar**, **Desactivar**, **Exportar** y **Eliminar** (que pide confirmación). **Activar** solo aparece cuando alguno está desactivado, y **Desactivar** solo cuando alguno está activado. La cruz de su final quita la elección, y la barra desaparece cuando no hay nada elegido.

![Elegir varios esquemas](asset:dashboard-selection.webp)

## Modos de color

En Moodle 5.3 el panel sigue el modo de color del sitio y los cambios que el tema hace en los colores. En las versiones anteriores toma los colores del tema.

![El panel en el modo oscuro](asset:dashboard-dark.webp)
