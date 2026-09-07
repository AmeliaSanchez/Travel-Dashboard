const STORAGE_KEY = 'travel-dashboard-real-data-v1';
const state = { data: null, trips: [], editor: null };

// Respaldo integrado para aperturas file://, donde el navegador bloquea fetch() de archivos locales.
// La versión servida por http:// continúa leyendo data/viajes.json.
const EMBEDDED_DATA = JSON.parse(decodeURIComponent('%7B%0A%20%20%22aplicacion%22%3A%20%7B%0A%20%20%20%20%22titulo%22%3A%20%22Travel%20Dashboard%22%2C%0A%20%20%20%20%22propietario%22%3A%20%22Ame%20Sanchez%22%2C%0A%20%20%20%20%22versionModelo%22%3A%20%223.0-ready%22%2C%0A%20%20%20%20%22capacidadesFuturas%22%3A%20%7B%0A%20%20%20%20%20%20%22checklists%22%3A%20false%2C%0A%20%20%20%20%20%20%22visas%22%3A%20false%2C%0A%20%20%20%20%20%20%22pasaportes%22%3A%20false%2C%0A%20%20%20%20%20%20%22vacunas%22%3A%20false%2C%0A%20%20%20%20%20%20%22notas%22%3A%20false%2C%0A%20%20%20%20%20%20%22gastos%22%3A%20false%2C%0A%20%20%20%20%20%20%22mapasOffline%22%3A%20false%2C%0A%20%20%20%20%20%20%22clima%22%3A%20false%2C%0A%20%20%20%20%20%20%22appleWallet%22%3A%20false%2C%0A%20%20%20%20%20%20%22googleDrive%22%3A%20false%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20%22viajes%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22id%22%3A%20%22rio-de-janeiro-2026%22%2C%0A%20%20%20%20%20%20%22destino%22%3A%20%22R%C3%ADo%20de%20Janeiro%22%2C%0A%20%20%20%20%20%20%22ciudad%22%3A%20%22R%C3%ADo%20de%20Janeiro%22%2C%0A%20%20%20%20%20%20%22pais%22%3A%20%22Brasil%22%2C%0A%20%20%20%20%20%20%22bandera%22%3A%20%22%F0%9F%87%A7%F0%9F%87%B7%22%2C%0A%20%20%20%20%20%20%22fechaInicio%22%3A%20%222026-10-07%22%2C%0A%20%20%20%20%20%20%22fechaFin%22%3A%20%222026-10-11%22%2C%0A%20%20%20%20%20%20%22estado%22%3A%20%22Confirmado%22%2C%0A%20%20%20%20%20%20%22vuelos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22JetSMART%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22JA3814%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22AEP%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeroparque%20Jorge%20Newbery%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22GIG%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20de%20Gale%C3%A3o%20-%20Ant%C3%B4nio%20Carlos%20Jobim%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-10-07%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2215%3A55%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2218%3A50%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%222%20h%2055%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Carry-on%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22F6JJVC%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Frio-expedia.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22JetSMART%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22JA3780%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22GIG%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20de%20Gale%C3%A3o%20-%20Ant%C3%B4nio%20Carlos%20Jobim%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22AEP%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeroparque%20Jorge%20Newbery%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-10-11%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2211%3A55%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2215%3A20%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%223%20h%2025%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Carry-on%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22F6JJVC%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Frio-expedia.pdf%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22hoteles%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22JW%20Marriott%20Hotel%20Rio%20de%20Janeiro%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22direccion%22%3A%20%22Avenida%20Atl%C3%A2ntica%2C%202600%20-%20Copacabana%2C%20Rio%20de%20Janeiro%2C%20RJ%2C%2022041-001%20Brasil%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkIn%22%3A%20%222026-10-07%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkInHora%22%3A%20%2215%3A00%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkOut%22%3A%20%222026-10-11%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkOutHora%22%3A%20%2212%3A00%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%2273421905951618%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Frio-expedia.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22foto%22%3A%20%22https%3A%2F%2Fcache.marriott.com%2Fis%2Fimage%2Fmarriotts7prod%2Fjw-riomc-dji-20250920094648-0121-32202%253AWide-Ver%3Ffit%3Dconstrain%26wid%3D750%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22documentos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22tipo%22%3A%20%22Reserva%20Expedia%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22Reserva%20Expedia%20R%C3%ADo%20de%20Janeiro.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ruta%22%3A%20%22docs%2Freservas%2Frio-expedia.pdf%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22pasajeros%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%22Vladimir%20Aguzin%22%2C%0A%20%20%20%20%20%20%20%20%22Ame%20Sanchez%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22codigoReserva%22%3A%20%22F6JJVC%22%2C%0A%20%20%20%20%20%20%22asientos%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%22Carry-on%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Frio-expedia.pdf%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22id%22%3A%20%22nueva-york-boston-2026%22%2C%0A%20%20%20%20%20%20%22destino%22%3A%20%22Nueva%20York%20%2B%20Boston%22%2C%0A%20%20%20%20%20%20%22ciudad%22%3A%20%22Nueva%20York%20y%20Boston%22%2C%0A%20%20%20%20%20%20%22pais%22%3A%20%22Estados%20Unidos%22%2C%0A%20%20%20%20%20%20%22bandera%22%3A%20%22%F0%9F%87%BA%F0%9F%87%B8%22%2C%0A%20%20%20%20%20%20%22fechaInicio%22%3A%20%222026-11-19%22%2C%0A%20%20%20%20%20%20%22fechaFin%22%3A%20%222026-11-30%22%2C%0A%20%20%20%20%20%20%22estado%22%3A%20%22Confirmado%22%2C%0A%20%20%20%20%20%20%22vuelos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA954%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22EZE%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20Ministro%20Pistarini%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22JFK%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20John%20F.%20Kennedy%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-11-19%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2221%3A10%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2206%3A00%20%2B1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%2210%20h%2050%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2226J%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%2226K%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Carry-on%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%221%20pieza%20de%20equipaje%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22HCQYBO%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnew-york-boston-vuelos.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA4371%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22JFK%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20John%20F.%20Kennedy%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22BOS%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20Logan%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-11-23%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2214%3A02%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2215%3A22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%221%20h%2020%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2215C%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%2215A%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Carry-on%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%221%20pieza%20de%20equipaje%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22HCQYBO%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnew-york-boston-vuelos.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA4367%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22BOS%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20Logan%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22JFK%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20John%20F.%20Kennedy%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-11-29%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2215%3A52%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2217%3A18%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%221%20h%2026%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2215D%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%2215F%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Carry-on%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%221%20pieza%20de%20equipaje%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22HCQYBO%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnew-york-boston-vuelos.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA953%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22JFK%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20John%20F.%20Kennedy%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22EZE%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20Ministro%20Pistarini%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-11-29%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2222%3A00%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2210%3A45%20%2B1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%2210%20h%2045%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2225J%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%2225K%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Carry-on%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%221%20pieza%20de%20equipaje%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22HCQYBO%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnew-york-boston-vuelos.pdf%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22hoteles%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22The%20Lombardy%20Hotel%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22direccion%22%3A%20%22111%20E%2056th%20St%2C%20New%20York%2C%20NY%2010022%2C%20Estados%20Unidos%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkIn%22%3A%20%222026-11-20%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkInHora%22%3A%20%2215%3A00%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkOut%22%3A%20%222026-11-23%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkOutHora%22%3A%20%2212%3A00%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%2272073214352158%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnew-york-lombardy.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22foto%22%3A%20%22https%3A%2F%2Flombardyhotel.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fnicos-salon.png%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22documentos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22tipo%22%3A%20%22Vuelo%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22American%20Airlines%20-%20Nueva%20York%20y%20Boston.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ruta%22%3A%20%22docs%2Freservas%2Fnew-york-boston-vuelos.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22tipo%22%3A%20%22Reserva%20Hotel%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22The%20Lombardy%20Hotel.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ruta%22%3A%20%22docs%2Freservas%2Fnew-york-lombardy.pdf%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22pasajeros%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%22Vladimir%20Aguzin%22%2C%0A%20%20%20%20%20%20%20%20%22Ame%20Sanchez%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22codigoReserva%22%3A%20%22HCQYBO%22%2C%0A%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%2226J%22%2C%0A%20%20%20%20%20%20%20%20%2226K%22%2C%0A%20%20%20%20%20%20%20%20%2215C%22%2C%0A%20%20%20%20%20%20%20%20%2215A%22%2C%0A%20%20%20%20%20%20%20%20%2215D%22%2C%0A%20%20%20%20%20%20%20%20%2215F%22%2C%0A%20%20%20%20%20%20%20%20%2225J%22%2C%0A%20%20%20%20%20%20%20%20%2225K%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%22Carry-on%22%2C%0A%20%20%20%20%20%20%20%20%221%20pieza%20de%20equipaje%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnew-york-boston-vuelos.pdf%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22id%22%3A%20%22nikita-charlottesville-buenos-aires-2026%22%2C%0A%20%20%20%20%20%20%22destino%22%3A%20%22Charlottesville%20%E2%86%92%20Buenos%20Aires%22%2C%0A%20%20%20%20%20%20%22ciudad%22%3A%20%22Buenos%20Aires%22%2C%0A%20%20%20%20%20%20%22pais%22%3A%20%22Argentina%22%2C%0A%20%20%20%20%20%20%22bandera%22%3A%20%22%F0%9F%87%A6%F0%9F%87%B7%22%2C%0A%20%20%20%20%20%20%22titular%22%3A%20%22Nikita%22%2C%0A%20%20%20%20%20%20%22fechaInicio%22%3A%20%222026-12-10%22%2C%0A%20%20%20%20%20%20%22fechaFin%22%3A%20%222027-01-12%22%2C%0A%20%20%20%20%20%20%22estado%22%3A%20%22Confirmado%22%2C%0A%20%20%20%20%20%20%22vuelos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA5803%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22CHO%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20de%20Charlottesville-Albemarle%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22CLT%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20Charlotte%20Douglas%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-12-10%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2213%3A12%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2214%3A42%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%221%20h%2030%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22clase%22%3A%20%22Economy%20(G)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22operador%22%3A%20%22Piedmont%20Airlines%20%2F%20American%20Eagle%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%227A%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22LJXUGG%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-1.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA574%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22CLT%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20Charlotte%20Douglas%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22MIA%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20de%20Miami%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-12-10%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2216%3A35%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2218%3A45%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%222%20h%2010%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22clase%22%3A%20%22Economy%20(G)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22operador%22%3A%20%22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2224C%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22LJXUGG%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-1.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA931%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22MIA%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20de%20Miami%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22EZE%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20Ministro%20Pistarini%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-12-10%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2220%3A15%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2207%3A25%20%2B1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%229%20h%2010%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22clase%22%3A%20%22Economy%20(G)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22operador%22%3A%20%22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22comidas%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Cena%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Desayuno%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2237J%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22LJXUGG%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-2.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA908%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22EZE%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20Ministro%20Pistarini%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22MIA%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20de%20Miami%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222027-01-11%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2223%3A35%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2206%3A55%20%2B1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%229%20h%2020%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22clase%22%3A%20%22Economy%20(G)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22operador%22%3A%20%22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22comidas%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Cena%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Desayuno%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2236J%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22LJXUGG%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-2.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA2065%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22MIA%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20de%20Miami%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22CLT%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20Charlotte%20Douglas%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222027-01-12%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2209%3A45%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2212%3A00%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%222%20h%2015%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22clase%22%3A%20%22Economy%20(G)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22operador%22%3A%20%22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2212A%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22LJXUGG%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-3.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22American%20Airlines%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AA5821%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22CLT%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20Charlotte%20Douglas%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22CHO%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20de%20Charlottesville-Albemarle%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222027-01-12%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2215%3A25%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2216%3A46%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%221%20h%2021%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22clase%22%3A%20%22Economy%20(G)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22operador%22%3A%20%22Piedmont%20Airlines%20%2F%20American%20Eagle%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%227A%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22LJXUGG%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-3.pdf%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22hoteles%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%22documentos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22tipo%22%3A%20%22Vuelo%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22American%20Airlines%20%E2%80%94%20itinerario%201.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ruta%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-1.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22tipo%22%3A%20%22Vuelo%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22American%20Airlines%20%E2%80%94%20itinerario%202.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ruta%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-2.pdf%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22tipo%22%3A%20%22Vuelo%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22American%20Airlines%20%E2%80%94%20itinerario%203.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ruta%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-3.pdf%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22pasajeros%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%22Nikita%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22codigoReserva%22%3A%20%22LJXUGG%22%2C%0A%20%20%20%20%20%20%22asientos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%227A%22%2C%0A%20%20%20%20%20%20%20%20%2224C%22%2C%0A%20%20%20%20%20%20%20%20%2237J%22%2C%0A%20%20%20%20%20%20%20%20%2236J%22%2C%0A%20%20%20%20%20%20%20%20%2212A%22%2C%0A%20%20%20%20%20%20%20%20%227A%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22equipaje%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fnikita-american-airlines-1.pdf%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22id%22%3A%20%22neuquen-2026%22%2C%0A%20%20%20%20%20%20%22destino%22%3A%20%22Neuqu%C3%A9n%22%2C%0A%20%20%20%20%20%20%22ciudad%22%3A%20%22Neuqu%C3%A9n%22%2C%0A%20%20%20%20%20%20%22pais%22%3A%20%22Argentina%22%2C%0A%20%20%20%20%20%20%22bandera%22%3A%20%22%F0%9F%87%A6%F0%9F%87%B7%22%2C%0A%20%20%20%20%20%20%22fechaInicio%22%3A%20%222026-12-24%22%2C%0A%20%20%20%20%20%20%22fechaFin%22%3A%20%222026-12-27%22%2C%0A%20%20%20%20%20%20%22estado%22%3A%20%22Confirmado%22%2C%0A%20%20%20%20%20%20%22vuelos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22Aerol%C3%ADneas%20Argentinas%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AR1640%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22AEP%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeroparque%20Jorge%20Newbery%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22NQN%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeropuerto%20Internacional%20Presidente%20Per%C3%B3n%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-12-24%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2208%3A40%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2210%3A40%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%222%20h%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22Boeing%20737-800%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Tarifa%20Flex%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22aerolinea%22%3A%20%22Aerol%C3%ADneas%20Argentinas%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22numero%22%3A%20%22AR1645%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origen%22%3A%20%22NQN%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22origenNombre%22%3A%20%22Aeropuerto%20Internacional%20Presidente%20Per%C3%B3n%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destino%22%3A%20%22AEP%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22destinoNombre%22%3A%20%22Aeroparque%20Jorge%20Newbery%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22fecha%22%3A%20%222026-12-27%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaSalida%22%3A%20%2216%3A55%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22horaLlegada%22%3A%20%2218%3A35%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22duracion%22%3A%20%221%20h%2040%20min%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avion%22%3A%20%22Boeing%20737-800%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22asientos%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Tarifa%20Flex%22%0A%20%20%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22hoteles%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22Pendiente%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22direccion%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkIn%22%3A%20%22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkOut%22%3A%20%22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%22No%20informado%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22foto%22%3A%20%22%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22documentos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22tipo%22%3A%20%22Otros%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22Itinerario%20Neuqu%C3%A9n.jpeg%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ruta%22%3A%20%22docs%2Freservas%2Fneuquen-itinerario.jpeg%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22pasajeros%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%22codigoReserva%22%3A%20%22NO%20INFORMADO%22%2C%0A%20%20%20%20%20%20%22asientos%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%22equipaje%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%22Tarifa%20Flex%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22pdf%22%3A%20%22%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22id%22%3A%20%22charlottesville-2027%22%2C%0A%20%20%20%20%20%20%22destino%22%3A%20%22Charlottesville%22%2C%0A%20%20%20%20%20%20%22ciudad%22%3A%20%22Charlottesville%22%2C%0A%20%20%20%20%20%20%22pais%22%3A%20%22Estados%20Unidos%22%2C%0A%20%20%20%20%20%20%22bandera%22%3A%20%22%F0%9F%87%BA%F0%9F%87%B8%22%2C%0A%20%20%20%20%20%20%22fechaInicio%22%3A%20%222027-05-20%22%2C%0A%20%20%20%20%20%20%22fechaFin%22%3A%20%222027-05-24%22%2C%0A%20%20%20%20%20%20%22estado%22%3A%20%22Confirmado%22%2C%0A%20%20%20%20%20%20%22vuelos%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%22hoteles%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22Omni%20Charlottesville%20Hotel%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22direccion%22%3A%20%22212%20Ridge%20McIntire%20Rd%2C%20Charlottesville%2C%20VA%2022903%2C%20Estados%20Unidos%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkIn%22%3A%20%222027-05-20%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkInHora%22%3A%20%2216%3A00%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkOut%22%3A%20%222027-05-24%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22checkOutHora%22%3A%20%2211%3A00%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22noches%22%3A%204%2C%0A%20%20%20%20%20%20%20%20%20%20%22codigoReserva%22%3A%20%2240064677157%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fcharlottesville-omni.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22foto%22%3A%20%22https%3A%2F%2Fwww.omnihotels.com%2F-%2Fmedia%2Fimages%2Fhotels%2Fchochv%2Fphotos%2Fhotel%2Fchochv-omni-charlottesville-hotel-exterior.jpg%3Fhash%3DB7FE87E79BAFE64980A0C09C3FF8BAEAD9154AE1%26mw%3D1536%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22documentos%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22tipo%22%3A%20%22Reserva%20Hotel%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22nombre%22%3A%20%22Omni%20Charlottesville%20Hotel.pdf%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22ruta%22%3A%20%22docs%2Freservas%2Fcharlottesville-omni.pdf%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22pasajeros%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%22Vladimir%20Aguzin%22%2C%0A%20%20%20%20%20%20%20%20%22Adulto%202%20-%20no%20informado%22%2C%0A%20%20%20%20%20%20%20%20%22Adulto%203%20-%20no%20informado%22%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22codigoReserva%22%3A%20%2240064677157%22%2C%0A%20%20%20%20%20%20%22asientos%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%22equipaje%22%3A%20%5B%5D%2C%0A%20%20%20%20%20%20%22pdf%22%3A%20%22docs%2Freservas%2Fcharlottesville-omni.pdf%22%0A%20%20%20%20%7D%0A%20%20%5D%0A%7D%0A'));

const els = {
  title: document.querySelector('#app-title'), owner: document.querySelector('#owner-name'),
  nextTrip: document.querySelector('#next-trip'), list: document.querySelector('#trips-list'),
  search: document.querySelector('#search-input'), count: document.querySelector('#results-count'),
  toast: document.querySelector('#toast'), historySection: document.querySelector('#history-section'),
  historyList: document.querySelector('#history-list'), modal: document.querySelector('#editor-modal'),
  form: document.querySelector('#editor-form'), fields: document.querySelector('#form-fields'),
  formMessage: document.querySelector('#form-message'), modalTitle: document.querySelector('#modal-title'),
  modalEyebrow: document.querySelector('#modal-eyebrow'), importFile: document.querySelector('#import-file')
};

const formatDate = date => {
  if (!date) return 'No informado';
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return 'No informado';
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
  }).format(parsed).replace('.', '');
};

const formatRange = (start, end) => `${formatDate(start)} — ${formatDate(end)}`;
const informed = value => value || 'No informado';

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
}

function flagFor(trip) {
  const flags = { AR: '🇦🇷', BR: '🇧🇷', US: '🇺🇸', ES: '🇪🇸', PY: '🇵🇾', UY: '🇺🇾', CL: '🇨🇱', PE: '🇵🇪', MX: '🇲🇽', FR: '🇫🇷', IT: '🇮🇹', GB: '🇬🇧' };
  const raw = trip.bandera || trip.codigoPais || '';
  return flags[String(raw).toUpperCase()] || raw || '🌎';
}

function hotelsFor(trip) {
  if (Array.isArray(trip.hoteles)) return trip.hoteles;
  return trip.hotel ? [trip.hotel] : [];
}

function documentsFor(trip) {
  return Array.isArray(trip.documentos) ? trip.documentos : [];
}

function documentPath(trip, type, index = 0, fallback = '') {
  const matches = documentsFor(trip).filter(document => String(document.tipo).toLocaleLowerCase('es') === type.toLocaleLowerCase('es'));
  return matches[index]?.ruta || fallback || '';
}

function normalizeTrip(trip) {
  const normalized = { ...trip, hoteles: hotelsFor(trip).map(hotel => ({ ...hotel })), documentos: documentsFor(trip).map(document => ({ ...document })) };
  delete normalized.hotel;
  return normalized;
}

function getTripStatus(trip) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(`${trip.fechaInicio}T00:00:00`);
  const end = new Date(`${trip.fechaFin}T23:59:59`);
  const raw = String(trip.estado || '').toLowerCase();
  if (end < today) return { label: 'Finalizado', icon: '⚪', className: 'status--finished' };
  if (start <= today && end >= today) return { label: 'En curso', icon: '🔵', className: 'status--active' };
  if (raw === 'confirmado') return { label: 'Confirmado', icon: '🟢', className: 'status--confirmed' };
  return { label: trip.estado || 'Pendiente', icon: '🟡', className: 'status--pending' };
}

function daysUntil(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${date}T00:00:00`);
  return Math.max(0, Math.ceil((target - today) / 86400000));
}

function tripCountdown(trip) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = new Date(`${trip.fechaInicio}T00:00:00`);
  const end = new Date(`${trip.fechaFin}T23:59:59`);
  if (end < today) return 'Finalizado';
  if (start <= today) return 'En curso';
  const days = daysUntil(trip.fechaInicio);
  return `Faltan ${days} ${days === 1 ? 'día' : 'días'}`;
}

function airlineLogo(airline = '') {
  const normalized = airline.toLocaleLowerCase('es');
  if (normalized.includes('american')) return '<span class="airline-logo airline-logo--aa" aria-label="American Airlines">AA</span>';
  if (normalized.includes('jetsmart')) return '<span class="airline-logo airline-logo--jetsmart" aria-label="JetSMART">JS</span>';
  if (normalized.includes('aerolíneas')) return '<span class="airline-logo airline-logo--ar" aria-label="Aerolíneas Argentinas">AR</span>';
  return '<span class="airline-logo" aria-hidden="true">✈</span>';
}

function luggageItems(value) {
  if (!value) return [{ icon: '🧳', label: 'No informado' }];
  if (Array.isArray(value)) return value.map(item => {
    const label = item.tipo || item;
    const icon = item.icono || (/personal/i.test(label) ? '🎒' : '🧳');
    return { icon, label };
  });
  const text = String(value);
  const items = [];
  if (/personal/i.test(text)) items.push({ icon: '🎒', label: 'Artículo personal' });
  if (/carry.?on|cabina/i.test(text)) items.push({ icon: '🧳', label: 'Carry-on' });
  if (/facturad|despachad|bodega/i.test(text)) items.push({ icon: '🧳', label: 'Equipaje despachado' });
  return items.length ? items : [{ icon: '🧳', label: text }];
}

function renderLuggage(value, compact = false) {
  return `<span class="luggage-list ${compact ? 'luggage-list--compact' : ''}">${luggageItems(value).map(item =>
    `<span><span aria-hidden="true">${item.icon}</span> ${escapeHtml(item.label)}</span>`).join('')}</span>`;
}

function renderNextTrip() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const next = state.trips.find(trip => new Date(`${trip.fechaFin}T23:59:59`) >= now && String(trip.estado).toLowerCase() !== 'cancelado');
  if (!next) {
    els.nextTrip.innerHTML = '<div class="hero-content"><p class="eyebrow">Próximo viaje</p><h1>Sin planes todavía</h1><p class="hero-date">Tu próxima aventura aparecerá aquí.</p></div>';
    return;
  }
  const firstFlight = next.vuelos?.[0];
  const days = daysUntil(next.fechaInicio);
  els.nextTrip.innerHTML = `<div class="hero-content">
    <div class="hero-topline"><p id="next-trip-label" class="eyebrow">Próximo viaje · ${escapeHtml(flagFor(next))}</p><span class="countdown">${days === 0 ? 'Es hoy' : `Faltan ${days} días`}</span></div>
    <h1>${escapeHtml(next.destino)}</h1>
    <p class="hero-date">${escapeHtml(formatRange(next.fechaInicio, next.fechaFin))}</p>
    <div class="hero-meta">
      ${firstFlight ? `<span class="hero-pill">✈️ ${escapeHtml(firstFlight.numero)} · ${escapeHtml(firstFlight.origen)} → ${escapeHtml(firstFlight.destino)}</span>` : ''}
      ${hotelsFor(next)[0] ? `<span class="hero-pill">🏨 ${escapeHtml(hotelsFor(next)[0].nombre)}</span>` : ''}
      <span class="hero-pill">${next.pasajeros.length} ${next.pasajeros.length === 1 ? 'pasajero' : 'pasajeros'}</span>
    </div>
  </div>`;
}

function renderFlight(flight, trip, index) {
  const seats = flight.asientos?.length ? flight.asientos.join(', ') : (trip.asientos?.[index] || 'No informado');
  const luggage = flight.equipaje || trip.equipaje;
  const booking = flight.codigoReserva || trip.codigoReserva;
  const pdf = documentPath(trip, 'Vuelo', index, flight.pdf);
  return `<article class="boarding-card">
    <div class="boarding-head">${airlineLogo(flight.aerolinea)}<div><span class="micro-label">${escapeHtml(informed(flight.aerolinea))}</span><strong>${escapeHtml(informed(flight.numero))}</strong></div><span class="leg-number">Tramo ${index + 1}</span></div>
    <div class="route"><strong>${escapeHtml(informed(flight.origen))}</strong><span><i></i>✈<i></i></span><strong>${escapeHtml(informed(flight.destino))}</strong></div>
    <div class="airport-names"><span>${escapeHtml(informed(flight.origenNombre))}</span><span>${escapeHtml(informed(flight.destinoNombre))}</span></div>
    <div class="boarding-grid">
      <div><span class="micro-label">Fecha</span><b>${escapeHtml(formatDate(flight.fecha || trip.fechaInicio))}</b></div>
      <div><span class="micro-label">Horario</span><b>${escapeHtml(informed(flight.horaSalida))} → ${escapeHtml(informed(flight.horaLlegada))}</b></div>
      <div><span class="micro-label">Duración</span><b>${escapeHtml(informed(flight.duracion))}</b></div>
      <div><span class="micro-label">Avión</span><b>${escapeHtml(informed(flight.avion))}</b></div>
      <div><span class="micro-label">Asientos</span><b>💺 ${escapeHtml(seats)}</b></div>
      <div><span class="micro-label">Reserva</span><b>${escapeHtml(informed(booking))}</b></div>
      ${flight.clase ? `<div><span class="micro-label">Clase</span><b>${escapeHtml(flight.clase)}</b></div>` : ''}
      ${flight.operador ? `<div><span class="micro-label">Operado por</span><b>${escapeHtml(flight.operador)}</b></div>` : ''}
      ${flight.comidas?.length ? `<div><span class="micro-label">Comidas</span><b>${escapeHtml(flight.comidas.join(', '))}</b></div>` : ''}
    </div>
    <div class="boarding-luggage"><span class="micro-label">Equipaje</span>${renderLuggage(luggage, true)}</div>
    <div class="item-actions">
      <button class="btn edit-flight" type="button" data-trip="${escapeHtml(trip.id)}" data-index="${index}">✏ Editar</button>
      <button class="btn btn--danger delete-flight" type="button" data-trip="${escapeHtml(trip.id)}" data-index="${index}">Eliminar</button>
      ${pdf ? `<button class="btn open-pdf" type="button" data-pdf="${escapeHtml(pdf)}">📄 PDF</button>` : ''}
    </div>
  </article>`;
}

function renderHotel(hotel, trip, index = 0) {
  if (!hotel) return '<article class="hotel-card"><span class="micro-label">Hotel</span><strong>No informado</strong></article>';
  const pdf = documentPath(trip, 'Hotel', index, hotel.pdf);
  return `<article class="hotel-card">
    ${hotel.foto ? `<img class="hotel-photo" src="${escapeHtml(hotel.foto)}" alt="${escapeHtml(hotel.nombre)}" loading="lazy">` : ''}
    <div class="hotel-heading"><span class="transport-icon" aria-hidden="true">🏨</span><div><span class="micro-label">Hotel</span><h4>${escapeHtml(informed(hotel.nombre))}</h4></div></div>
    <p class="hotel-address">${escapeHtml(informed(hotel.direccion))}</p>
    <div class="hotel-grid">
      <div><span class="micro-label">Check-in</span><b>${escapeHtml(formatDate(hotel.checkIn || trip.fechaInicio))}</b></div>
      <div><span class="micro-label">Check-out</span><b>${escapeHtml(formatDate(hotel.checkOut || trip.fechaFin))}</b></div>
      <div><span class="micro-label">Reserva</span><b>${escapeHtml(informed(hotel.codigoReserva))}</b></div>
      ${hotel.noches ? `<div><span class="micro-label">Estadía</span><b>${hotel.noches} noches</b></div>` : ''}
    </div>
    <div class="item-actions">
      <button class="btn edit-hotel" type="button" data-trip="${escapeHtml(trip.id)}" data-index="${index}">✏ Editar</button>
      <button class="btn btn--danger delete-hotel" type="button" data-trip="${escapeHtml(trip.id)}" data-index="${index}">Eliminar</button>
      ${pdf ? `<button class="btn open-pdf" type="button" data-pdf="${escapeHtml(pdf)}">📄 PDF</button>` : ''}
    </div>
  </article>`;
}

function renderDocuments(trip) {
  const documents = documentsFor(trip);
  if (!documents.length) return '';
  const labels = { 'reserva expedia': 'Reserva Expedia', 'reserva hotel': 'Reserva Hotel', 'vuelo': 'Reserva de vuelo', 'boarding pass': 'Boarding Pass', 'otros': 'Otros' };
  return `<details class="documents-panel content-section">
    <summary>📄 Documentos <span>${documents.length}</span></summary>
    <div class="documents-list">${documents.map(document => {
      const type = labels[String(document.tipo).toLocaleLowerCase('es')] || document.tipo || 'Otros';
      return `<button class="document-link open-pdf" type="button" data-pdf="${escapeHtml(document.ruta)}"><span><small>${escapeHtml(type)}</small><strong>${escapeHtml(document.nombre)}</strong></span><span aria-hidden="true">↗</span></button>`;
    }).join('')}</div>
  </details>`;
}

function createTripCard(trip) {
  const status = getTripStatus(trip);
  const flightSeats = trip.vuelos?.flatMap(flight => flight.asientos || []) || [];
  const seats = flightSeats.length ? flightSeats.join(', ') : (trip.asientos?.length ? trip.asientos.join(', ') : 'No informado');
  const tripLuggage = trip.vuelos?.flatMap(flight => flight.equipaje || []) || [];
  const hotels = hotelsFor(trip);
  const tripPdf = documentPath(trip, 'Viaje', 0, trip.pdf) || documentsFor(trip)[0]?.ruta || '';
  const hasPdf = Boolean(tripPdf);
  return `<details class="trip-card">
    <summary class="trip-summary">
      <span class="destination"><span class="flag" aria-hidden="true">${escapeHtml(flagFor(trip))}</span><span><span class="destination-name">${escapeHtml(trip.destino)}</span><span class="destination-country">${escapeHtml(trip.titular ? `${trip.pais} · ${trip.titular}` : trip.pais)}</span></span></span>
      <span class="trip-dates">${escapeHtml(formatRange(trip.fechaInicio, trip.fechaFin))}<small class="trip-countdown">${escapeHtml(tripCountdown(trip))}</small></span>
      <span class="status ${status.className}"><span aria-hidden="true">${status.icon}</span> ${escapeHtml(status.label)}</span>
      <span class="chevron" aria-hidden="true"></span>
    </summary>
    <div class="trip-reveal"><div class="trip-details">
      <div class="trip-admin-actions"><button class="btn btn--small edit-trip" type="button" data-trip="${escapeHtml(trip.id)}">✏ Editar viaje</button></div>
      <section class="booking-block" aria-label="Código de reserva">
        <div><span class="booking-label">🔑 Código de reserva</span><strong>${escapeHtml(trip.codigoReserva)}</strong></div>
        <button class="btn btn--booking copy-code" type="button" data-code="${escapeHtml(trip.codigoReserva)}">📋 Copiar</button>
      </section>
      <section class="trip-overview" aria-label="Resumen del viaje">
        <span class="overview-title">Resumen</span>
        <span>✈️ ${trip.vuelos?.length || 0} ${(trip.vuelos?.length || 0) === 1 ? 'vuelo' : 'vuelos'}</span>
        <span>🏨 ${hotels.length ? (hotels.length === 1 ? 'Hotel' : `${hotels.length} hoteles`) : 'No informado'}</span>
        <span>💺 ${escapeHtml(seats)}</span>
        <span>${renderLuggage(tripLuggage.length ? tripLuggage : trip.equipaje, true)}</span>
        <span>${status.icon} ${escapeHtml(status.label)}</span>
      </section>
      <div class="content-section"><div class="section-inline-heading"><h3>Vuelos</h3><button class="btn btn--small add-flight" type="button" data-trip="${escapeHtml(trip.id)}">➕ Agregar vuelo</button></div><div class="flight-list">${trip.vuelos?.length ? trip.vuelos.map((flight, index) => renderFlight(flight, trip, index)).join('') : '<p>No informado</p>'}</div></div>
      <div class="content-section"><div class="section-inline-heading"><h3>Alojamiento</h3>${hotels.length ? '' : `<button class="btn btn--small add-hotel" type="button" data-trip="${escapeHtml(trip.id)}">➕ Agregar hotel</button>`}</div>${hotels.length ? hotels.map((hotel, index) => renderHotel(hotel, trip, index)).join('') : renderHotel(null, trip)}</div>
      ${renderDocuments(trip)}
      <div class="passengers"><span class="micro-label">Pasajeros</span><strong>👤 ${escapeHtml(trip.pasajeros?.join(', ') || 'No informado')}</strong></div>
    </div>
    <div class="card-actions">
      <button class="btn copy-code" type="button" data-code="${escapeHtml(trip.codigoReserva)}">📋 Copiar código</button>
      <button class="btn btn--primary open-pdf" type="button" data-pdf="${escapeHtml(tripPdf)}" ${hasPdf ? '' : 'disabled'}>📄 ${hasPdf ? 'Abrir PDF' : 'PDF no disponible'}</button>
    </div></div>
  </details>`;
}

function renderTrips(trips) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const current = trips.filter(trip => new Date(`${trip.fechaFin}T23:59:59`) >= today);
  const history = trips.filter(trip => new Date(`${trip.fechaFin}T23:59:59`) < today);
  els.count.textContent = `${trips.length} ${trips.length === 1 ? 'viaje' : 'viajes'}`;
  els.list.innerHTML = current.length ? current.map(createTripCard).join('') : '<div class="empty-state">No hay próximos viajes con esta búsqueda.</div>';
  els.historySection.hidden = history.length === 0;
  els.historyList.innerHTML = history.map(createTripCard).join('');
}

function showToast(message) {
  els.toast.textContent = message; els.toast.classList.add('show'); clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove('show'), 2200);
}

async function copyCode(code) {
  try { await navigator.clipboard.writeText(code); }
  catch { const input = document.createElement('textarea'); input.value = code; document.body.append(input); input.select(); document.execCommand('copy'); input.remove(); }
  showToast(`Código ${code} copiado`);
}

function filterTrips(query) {
  const normalized = query.trim().toLocaleLowerCase('es');
  return normalized ? state.trips.filter(trip => JSON.stringify(trip).toLocaleLowerCase('es').includes(normalized)) : state.trips;
}

const fieldSets = {
  trip: [
    ['destino', 'Destino', 'text', true], ['pais', 'País', 'text', true],
    ['ciudad', 'Ciudad', 'text', true], ['fechaInicio', 'Fecha de salida', 'date', true],
    ['fechaFin', 'Fecha de regreso', 'date', true], ['pasajerosCantidad', 'Cantidad de pasajeros', 'number', true, '1'],
    ['estado', 'Estado', 'select', true]
  ],
  flight: [
    ['aerolinea', 'Aerolínea', 'text', true], ['numero', 'Número', 'text', true],
    ['origen', 'Origen', 'text', true], ['destino', 'Destino', 'text', true],
    ['fecha', 'Fecha', 'date', true], ['horaSalida', 'Hora salida', 'text', true],
    ['horaLlegada', 'Hora llegada', 'text', true], ['codigoReserva', 'Código reserva', 'text', false],
    ['asientos', 'Asientos (separados por coma)', 'text', false], ['equipaje', 'Equipaje (separado por coma)', 'text', false],
    ['pdf', 'PDF (ruta o enlace)', 'text', false]
  ],
  hotel: [
    ['nombre', 'Nombre', 'text', true], ['direccion', 'Dirección', 'text', true],
    ['checkIn', 'Check-in', 'date', true], ['checkOut', 'Check-out', 'date', true],
    ['codigoReserva', 'Código reserva', 'text', false], ['pdf', 'PDF (ruta o enlace)', 'text', false]
  ]
};

function inputMarkup(field, values) {
  const [name, label, type, required, min] = field;
  const raw = values[name] ?? '';
  const value = Array.isArray(raw) ? raw.join(', ') : raw;
  if (type === 'select') return `<div class="form-field"><label for="field-${name}">${label}${required ? ' *' : ''}</label><select id="field-${name}" name="${name}" ${required ? 'required' : ''}><option value="Confirmado" ${value === 'Confirmado' ? 'selected' : ''}>Confirmado</option><option value="Pendiente" ${value === 'Pendiente' || value === 'Planificado' ? 'selected' : ''}>Pendiente</option><option value="En viaje" ${value === 'En viaje' ? 'selected' : ''}>En viaje</option></select></div>`;
  return `<div class="form-field ${name === 'pdf' || name === 'equipaje' ? 'form-field--wide' : ''}"><label for="field-${name}">${label}${required ? ' *' : ''}</label><input id="field-${name}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${required ? 'required' : ''} ${min ? `min="${min}"` : ''}></div>`;
}

function findTrip(id) { return state.trips.find(trip => trip.id === id); }

function openEditor(type, tripId = null, itemIndex = null) {
  const trip = tripId ? findTrip(tripId) : null;
  let values = {};
  if (type === 'trip' && trip) values = { ...trip, pasajerosCantidad: trip.pasajeros?.length || 1 };
  if (type === 'flight' && itemIndex !== null) values = trip.vuelos[itemIndex];
  if (type === 'hotel' && itemIndex !== null) values = hotelsFor(trip)[itemIndex];
  if (type === 'flight' && itemIndex === null && trip) values = { fecha: trip.fechaInicio };
  if (type === 'hotel' && itemIndex === null && trip) values = { checkIn: trip.fechaInicio, checkOut: trip.fechaFin };
  const editing = type === 'trip' ? Boolean(trip) : itemIndex !== null;
  const nouns = { trip: 'viaje', flight: 'vuelo', hotel: 'hotel' };
  state.editor = { type, tripId, itemIndex };
  els.modalEyebrow.textContent = type === 'trip' ? 'Viaje' : trip?.destino || 'Viaje';
  els.modalTitle.textContent = `${editing ? 'Editar' : 'Agregar'} ${nouns[type]}`;
  els.fields.innerHTML = fieldSets[type].map(field => inputMarkup(field, values)).join('');
  els.formMessage.textContent = '';
  els.modal.showModal();
  setTimeout(() => els.fields.querySelector('input, select')?.focus(), 50);
}

function closeEditor() { els.modal.close(); state.editor = null; }

function persistAndRender(message) {
  state.trips.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
  state.data.viajes = state.trips;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data)); }
  catch (error) { console.warn('El navegador no permitió guardar datos locales:', error); }
  renderNextTrip(); renderTrips(filterTrips(els.search.value)); showToast(message);
}

function valuesFromForm() {
  const values = Object.fromEntries(new FormData(els.form).entries());
  Object.keys(values).forEach(key => { if (typeof values[key] === 'string') values[key] = values[key].trim(); });
  return values;
}

function validateEditor(values) {
  const required = fieldSets[state.editor.type].filter(field => field[3]).map(field => field[0]);
  const missing = required.find(name => !values[name]);
  if (missing) return 'Completa todos los campos obligatorios.';
  if (state.editor.type === 'trip' && values.fechaFin < values.fechaInicio) return 'La fecha de regreso no puede ser anterior a la fecha de salida.';
  if (state.editor.type === 'hotel' && values.checkOut < values.checkIn) return 'El check-out no puede ser anterior al check-in.';
  if (state.editor.type === 'trip' && Number(values.pasajerosCantidad) < 1) return 'Debe haber al menos un pasajero.';
  return '';
}

function countryFlag(country) {
  const map = { argentina: '🇦🇷', brasil: '🇧🇷', 'estados unidos': '🇺🇸', españa: '🇪🇸', paraguay: '🇵🇾', uruguay: '🇺🇾', chile: '🇨🇱', perú: '🇵🇪', peru: '🇵🇪', méxico: '🇲🇽', mexico: '🇲🇽', francia: '🇫🇷', italia: '🇮🇹' };
  return map[String(country).toLocaleLowerCase('es')] || '🌎';
}

els.form.addEventListener('submit', event => {
  event.preventDefault();
  if (!els.form.checkValidity()) { els.formMessage.textContent = 'Completa todos los campos obligatorios.'; els.form.reportValidity(); return; }
  const values = valuesFromForm(); const error = validateEditor(values);
  if (error) { els.formMessage.textContent = error; return; }
  const { type, tripId, itemIndex } = state.editor;
  if (type === 'trip') {
    const existing = tripId ? findTrip(tripId) : null;
    const count = Number(values.pasajerosCantidad);
    const previous = existing?.pasajeros || [];
    const passengers = Array.from({ length: count }, (_, index) => previous[index] || (index === 0 ? state.data.aplicacion.propietario : `Pasajero ${index + 1}`));
    const updated = { ...(existing || {}), id: existing?.id || `viaje-${Date.now()}`, destino: values.destino, pais: values.pais, ciudad: values.ciudad, bandera: existing?.bandera || countryFlag(values.pais), fechaInicio: values.fechaInicio, fechaFin: values.fechaFin, estado: values.estado, pasajeros: passengers, vuelos: existing?.vuelos || [], hoteles: existing ? hotelsFor(existing) : [], documentos: existing ? documentsFor(existing) : [], codigoReserva: existing?.codigoReserva || 'NO INFORMADO', asientos: existing?.asientos || [], equipaje: existing?.equipaje || '', pdf: existing?.pdf || '' };
    delete updated.hotel;
    if (existing) state.trips[state.trips.indexOf(existing)] = updated; else state.trips.push(updated);
  } else if (type === 'flight') {
    const trip = findTrip(tripId); const flight = { ...values, asientos: values.asientos ? values.asientos.split(',').map(v => v.trim()).filter(Boolean) : [], equipaje: values.equipaje ? values.equipaje.split(',').map(v => v.trim()).filter(Boolean) : [] };
    if (itemIndex === null) trip.vuelos.push(flight); else trip.vuelos[itemIndex] = flight;
    if ((!trip.codigoReserva || trip.codigoReserva === 'NO INFORMADO') && flight.codigoReserva) trip.codigoReserva = flight.codigoReserva;
  } else {
    const trip = findTrip(tripId); trip.hoteles = hotelsFor(trip);
    if (itemIndex === null) trip.hoteles.push(values); else trip.hoteles[itemIndex] = values;
  }
  closeEditor(); persistAndRender('Cambios guardados');
});

document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeEditor));
els.modal.addEventListener('click', event => { if (event.target === els.modal) closeEditor(); });
document.querySelector('#new-trip').addEventListener('click', () => openEditor('trip'));

document.querySelector('#export-data').addEventListener('click', () => {
  state.data.viajes = state.trips;
  const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = 'viajes.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast('viajes.json exportado');
});

document.querySelector('#import-data').addEventListener('click', () => els.importFile.click());
els.importFile.addEventListener('change', async () => {
  const file = els.importFile.files?.[0]; if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!imported.aplicacion || !Array.isArray(imported.viajes)) throw new Error('Estructura inválida');
    state.data = imported; state.trips = imported.viajes.map(normalizeTrip); persistAndRender('Datos importados correctamente');
    els.title.textContent = state.data.aplicacion.titulo; els.owner.textContent = state.data.aplicacion.propietario; document.title = state.data.aplicacion.titulo;
  } catch { showToast('El archivo no es un viajes.json válido'); }
  els.importFile.value = '';
});

els.search.addEventListener('input', event => renderTrips(filterTrips(event.target.value)));
document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); els.search.focus(); } });
els.list.addEventListener('click', event => {
  const copyButton = event.target.closest('.copy-code'); const pdfButton = event.target.closest('.open-pdf');
  if (copyButton) copyCode(copyButton.dataset.code);
  if (pdfButton?.dataset.pdf) window.open(pdfButton.dataset.pdf, '_blank', 'noopener,noreferrer');
});

function handleTripAction(event) {
  const action = event.target.closest('button'); if (!action) return;
  const tripId = action.dataset.trip;
  if (action.classList.contains('edit-trip')) openEditor('trip', tripId);
  if (action.classList.contains('add-flight')) openEditor('flight', tripId);
  if (action.classList.contains('edit-flight')) openEditor('flight', tripId, Number(action.dataset.index));
  if (action.classList.contains('add-hotel')) openEditor('hotel', tripId);
  if (action.classList.contains('edit-hotel')) openEditor('hotel', tripId, Number(action.dataset.index));
  if (action.classList.contains('delete-flight') && confirm('¿Eliminar este vuelo? Esta acción no se puede deshacer.')) {
    findTrip(tripId).vuelos.splice(Number(action.dataset.index), 1); persistAndRender('Vuelo eliminado');
  }
  if (action.classList.contains('delete-hotel') && confirm('¿Eliminar este hotel? Esta acción no se puede deshacer.')) {
    const trip = findTrip(tripId); trip.hoteles = hotelsFor(trip); trip.hoteles.splice(Number(action.dataset.index), 1); persistAndRender('Hotel eliminado');
  }
}
els.list.addEventListener('click', handleTripAction);
els.historyList.addEventListener('click', event => {
  const copyButton = event.target.closest('.copy-code'); const pdfButton = event.target.closest('.open-pdf');
  if (copyButton) copyCode(copyButton.dataset.code);
  if (pdfButton?.dataset.pdf) window.open(pdfButton.dataset.pdf, '_blank', 'noopener,noreferrer');
  handleTripAction(event);
});

async function init() {
  try {
    let sourceData = EMBEDDED_DATA;
    if (window.location.protocol !== 'file:') {
      try {
        const response = await fetch('data/viajes.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        sourceData = await response.json();
      } catch (error) {
        console.warn('Se utilizaron los datos integrados:', error);
      }
    }
    try {
      state.data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || sourceData;
      const nikitaTrip = sourceData.viajes.find(trip => trip.id === 'nikita-charlottesville-buenos-aires-2026');
      if (nikitaTrip && !state.data.viajes.some(trip => trip.id === nikitaTrip.id)) {
        state.data.viajes.push(nikitaTrip);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
      }
    } catch { state.data = sourceData; }
    state.trips = state.data.viajes.map(normalizeTrip).sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
    els.title.textContent = state.data.aplicacion.titulo; els.owner.textContent = state.data.aplicacion.propietario;
    document.title = state.data.aplicacion.titulo; renderNextTrip(); renderTrips(state.trips);
  } catch (error) {
    console.error('No se pudieron cargar los viajes:', error);
    els.nextTrip.innerHTML = '<div class="error-state">No se pudo cargar el próximo viaje.</div>';
    els.list.innerHTML = '<div class="error-state">No se pudieron cargar los datos del dashboard.</div>'; els.count.textContent = '';
  }
}

init();
