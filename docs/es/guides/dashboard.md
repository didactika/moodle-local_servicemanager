---
title: El panel
summary: El estado de los servicios web, la salud de los esquemas, la búsqueda, los filtros y las acciones de la lista.
order: 10
---

El panel es la página de inicio del plugin. Le dice, de un vistazo, si los servicios web del sitio funcionan y qué salud tienen sus esquemas, y lista los esquemas para que pueda abrirlos, cambiarlos, exportarlos o quitarlos. Se llega desde **Administración del sitio > Servidor > Web Service Manager > Panel**.

![El panel, con sus partes numeradas](asset:dashboard-marked.webp)

| # | Parte | Para qué sirve |
|---|---|---|
| 1 | [Estado de los servicios web](#1-el-estado-de-los-servicios) | Si el sitio puede servir servicios web y con qué protocolos; el botón para activar lo que está apagado. |
| 2 | [Resumen de salud](#2-el-resumen-de-salud) | Cuántos esquemas están correctos, con avisos o críticos; también es el filtro de estado. |
| 3 | [Búsqueda](#3-búsqueda) | Acota la lista mientras escribe. |
| 4 | [Filtros](#4-filtros) | Fechas y tamaño de la página; una insignia cuenta los filtros activos. |
| 5 | [Las acciones](#5-las-acciones) | Crear, importar, exportar y leer la documentación. |
| 6 | [Las acciones de un esquema](#6-las-acciones-de-un-esquema) | Ver, editar, historial y el resto, en cada fila. |

## 1. El estado de los servicios

Junto al título hay una línea: si los servicios web del sitio están **Operativos**, **Deshabilitados** o con **Aviso** (activos, pero sin ningún protocolo), y cada protocolo (REST, SOAP, XML-RPC) con una marca si está activo y un icono gris si no lo está. La misma línea se muestra, en el mismo lugar, en la parte superior de la [página de un esquema](page:guides/schema-page), así que puede verla dondequiera que trabaje.

Cuando los servicios web están apagados, o encendidos sin protocolo, un botón dice **Activar servicios web** o **Activar un protocolo** y lleva directamente al ajuste en la administración de Moodle, para que no tenga que buscarlo. **Gestionar** lleva a los ajustes de los protocolos.

## 2. El resumen de salud

La barra muestra cuántos esquemas hay y cómo se reparten entre **Correctos**, **Con avisos** y **Críticos**. Un esquema se comprueba según un calendario (véase [permisos, ajustes y comprobación de salud](page:reference/settings)) y su estado es lo peor que encontró la comprobación.

Los tres botones de su derecha son también el filtro de estado: pulse uno para ver solo esos esquemas, púlselo de nuevo para verlos todos. Un estado que ningún esquema tiene aparece atenuado y no se puede elegir. Los números siguen a la búsqueda y a las fechas, de modo que cada botón le dice lo que dejaría.

## 3. Búsqueda

Escriba en **Buscar nombre...** y la lista se acota mientras escribe. No hay ningún botón que pulsar. Las palabras se buscan en el nombre, el ID del esquema y la versión, y todas deben estar presentes; **Esc** borra la búsqueda, y también la cruz de su derecha (solo hay una cruz, la del propio cuadro). El cuadro es una píldora con la lupa dentro; mientras tiene texto toma el color del tema.

## 4. Filtros

**Filtros**, junto a la búsqueda, abre un panel con las fechas (desde y hasta). Lo que elija se aplica al instante, así que no hay nada que confirmar. Una insignia redonda en la esquina del botón cuenta los filtros activos, y el botón toma el color del cuadro de búsqueda mientras lo están. El icono de recarga, arriba a la derecha del panel, restablece todos los filtros. El embudo y el icono de recarga son iconos de Moodle, así que un sitio puede cambiar su estilo con Icon Restyle.

![El panel de filtros](asset:dashboard-filters.webp)

La lista conserva la misma altura sea cual sea su contenido y se desplaza dentro de su caja, con los encabezados a la vista. Debajo, **Filas por página** ofrece los tamaños menores que la lista, y **Todos**: una lista de hasta 12 esquemas los muestra todos; una de 13 a 24 ofrece 12 o todos; y así sucesivamente hasta 12, 24, 48 y 96. Las flechas llevan a la página anterior y a la siguiente. El historial de un esquema y sus comprobaciones de estado tienen el mismo paginador.

Lo que pida se guarda en la dirección, de modo que al recargar, o con un enlace que comparta, se ve la misma lista.

## 5. Las acciones

A la derecha de la búsqueda hay cuatro botones:

| Botón | Qué hace |
|---|---|
| **+** azul | **Nuevo esquema**: el [formulario guiado](page:guides/create-a-schema). |
| Flecha verde | **Importar esquemas**: [archivos y paquetes comprimidos](page:guides/import-and-export). |
| Archivo azul | **Exportar todo**: todos los esquemas en un ZIP. |
| Libro con una flecha pequeña | **Documentación**: un menú con la [referencia YAML](page:reference/yaml), este manual y la documentación de Moodle. |

![El menú de documentación](asset:dashboard-documentation-menu.webp)

## 6. Las acciones de un esquema

Cada fila tiene cuatro botones redondos: el ojo (**Ver**), el lápiz (**Editar**, que abre el [formulario que crea un esquema, ya relleno](page:guides/edit-a-schema)), el reloj (**Historial de versiones**) y los tres puntos, que abren **Exportar**, **Deshabilitar** o **Habilitar** y **Eliminar**. Deshabilitar y habilitar cambian la fila donde está y lo dicen con un mensaje; eliminar pide antes confirmación en una ventana.

## Elegir varios esquemas

Marque los esquemas, o **Seleccionar todo** en la cabecera, y aparece una barra flotante en la parte inferior de la pantalla con cuántos hay elegidos y qué puede hacer con ellos: **Habilitar**, **Deshabilitar**, **Exportar** y **Eliminar** (que pide confirmación). **Habilitar** aparece solo cuando alguno está deshabilitado, y **Deshabilitar** solo cuando alguno está habilitado. La cruz de su izquierda borra la selección, y la barra desaparece cuando no hay nada elegido.

![Elegir varios esquemas](asset:dashboard-selection.webp)

## Modos de color

En Moodle 5.3 el panel sigue el modo de color del sitio y los cambios que el tema hace a los colores. En las versiones anteriores toma los colores del tema.

![El panel en modo oscuro](asset:dashboard-dark.webp)
