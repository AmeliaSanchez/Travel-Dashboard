TRAVEL DASHBOARD v1.0
=====================

Panel personal responsive para administrar viajes, reservas, vuelos y hoteles.

USO
---

Puedes abrir index.html directamente con doble clic. La aplicación detecta el
protocolo file:// y utiliza automáticamente una copia inicial integrada.

También puedes iniciar un servidor local, por ejemplo:

  python -m http.server 8000

Luego abre http://localhost:8000 en el navegador.

DATOS
-----

Toda la información visible se administra desde data/viajes.json.
Las fechas usan el formato AAAA-MM-DD. Los documentos PDF se guardan en
docs/reservas/ y su ruta se indica en el campo "pdf" de cada viaje.

No se muestran ni se almacenan precios.

EDICIÓN Y RESPALDOS
-------------------

Los cambios realizados desde la interfaz se guardan automáticamente en el
almacenamiento local del navegador. Por seguridad, una aplicación web estática
no puede sobrescribir archivos del equipo directamente.

Usa "Exportar" para descargar la versión actualizada de viajes.json. Puedes
reemplazar data/viajes.json con ese archivo para convertirlo en la fuente base.
"Importar" reemplaza los datos de la aplicación y los guarda en el dispositivo.

MODELO COMPATIBLE
-----------------

Cada viaje admite varios alojamientos mediante el arreglo "hoteles" y varios
archivos mediante "documentos". La aplicación continúa aceptando archivos
anteriores que utilicen el objeto singular "hotel" o campos "pdf" individuales.

ESTRUCTURA
----------

index.html              Interfaz principal
assets/css/styles.css   Estilos responsive
assets/js/app.js        Carga de datos e interacciones
data/viajes.json        Contenido de la aplicación
docs/reservas/          Comprobantes PDF
