---
title: Versiones y comparación
summary: El historial, el YAML de cada versión, la comparación y el camino de vuelta.
order: 50
---

Cada vez que cambia la definición de un esquema, el plugin conserva la versión. **Historial de versiones**, desde el reloj del panel o de la página del esquema, las lista.

![El historial, con sus partes numeradas](asset:history-marked.webp)

| # | Parte |
|---|---|
| 1 | Búsqueda, por versión, usuario, fecha o motivo. |
| 2 | Filtros: fechas y tamaño de la página, con el recuento de los activos. |
| 3 | Una versión: márquela para compararla. |
| 4 | Lo que puede hacer con una versión. |

## La lista

Cada versión es una fila: su número, **Actual** si es la que tiene ahora el esquema, quién la hizo y cuándo, y por qué. La búsqueda y los filtros funcionan como en el panel. Aquí no hay botón de editar: para cambiar el esquema, edítelo desde el [panel](page:guides/dashboard) o su [página](page:guides/schema-page). Al final de cada fila hay tres botones redondos, siempre en el mismo sitio: el que una fila no tiene (a la versión actual no se puede volver) deja su lugar vacío, de modo que los botones del mismo tipo quedan alineados de una fila a otra.

- el icono de código abre su YAML bajo la fila, cargado cuando lo pide, con un botón **Copiar**;
- el ojo abre la página del esquema tal como era en esa versión;
- la flecha que vuelve atrás (**Deshacer hasta aquí**) devuelve el esquema a esa versión; no se ofrece para la actual. Abre una ventana que pide confirmación, y el historial cambia donde está: la versión actual se desplaza, el estado que se deja se conserva como copia de seguridad si no estaba ya en el historial, y un mensaje lo dice. La página no se recarga.

![La ventana que pregunta antes de deshacer](asset:history-rollback.webp)

## Comparar dos versiones

Marque dos versiones («Elegir versión …»). No flota nada en la pantalla hasta que marca una; entonces aparece una barra en la parte inferior con cuántas hay elegidas, una cruz para borrar la selección y el botón **Comparar versiones**, que está disponible solo cuando hay dos elegidas. Marcar una tercera muestra un aviso.

![Dos versiones elegidas](asset:history-compare.webp)

La comparación tiene tres partes:

![La comparación, con sus partes numeradas](asset:compare-marked.webp)

| # | Parte | Para qué sirve |
|---|---|---|
| 1 | **Qué cambió** | Los cambios dichos en términos del esquema y no de líneas. Es una tarjeta que se pliega: pulse su título para ocultarla o mostrarla. Cada cambio es una etiqueta pequeña con el color de lo que hizo: verde para lo añadido, rojo para lo quitado y amarillo para lo cambiado, con el valor antiguo tachado y el nuevo al lado. Están agrupados por área: campos, funciones, capacidades, usuarios, plugins, acceso a archivos y rol. |
| 2 | Las herramientas | **Lado a lado** o **Unificada** cambia cómo se disponen las líneas. **Solo los cambios** (activado por defecto) pliega las líneas que no cambiaron, dejando dos alrededor de cada diferencia; pulse un pliegue para abrirlo. |
| 3 | Las líneas | Las dos versiones, con un tinte bajo lo que cambió. |
| 4 | La barra de cambios | Una barra en la parte inferior de la pantalla recorre los cambios. |

## Recorrer los cambios

La barra de la parte inferior de la pantalla tiene dos flechas, arriba y abajo, y entre ellas en qué cambio está (*Cambio 3 de 12*) y dónde está (*Línea 14 · Añadida*). La flecha hacia abajo va al siguiente cambio y la flecha hacia arriba al anterior; después del último vuelve a empezar desde el primero. Antes de pulsar ninguna, dice cuántos hay. Solo aparece cuando las dos versiones difieren.

![La barra que recorre los cambios](asset:compare-next.webp)

## De dónde sale el número de versión

No tiene que escribir ninguno. El plugin mantiene los números subiendo para que un cambio nunca se rechace por no subir la versión:

| Lo que hizo | La versión que se guarda |
|---|---|
| Creó un esquema y dejó la versión vacía | **1.0.0**, siempre. |
| Cambió la definición y dejó la versión vacía | La más alta que ha tenido el esquema, con **1 sumado al último número** (1.0.3 pasa a 1.0.4). |
| Cambió la definición y escribió una versión que ya se usó, o una más baja | Lo mismo: la más alta, más 1 en el último número. La página le dice cuál usó. |
| Escribió una versión más alta que todas | La que escribió. |
| Cambió solo el nombre, el responsable o la descripción | La versión se queda. |

## Deshacer

**Deshacer hasta aquí** devuelve el esquema a una versión anterior: el usuario, el rol, el servicio y las funciones se ponen al día con ella. Si el estado que deja no está aún en el historial, se conserva allí antes con el motivo *Copia de seguridad antes de deshacer*, de modo que no se pierde nada; el propio retroceso no añade una fila. Es la única forma en que un esquema puede volver a un número de versión más bajo.
