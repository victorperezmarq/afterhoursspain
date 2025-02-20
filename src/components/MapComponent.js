import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  const [category, setCategory] = useState("discotecas");

  useEffect(() => {
    const map = L.map("map").setView([40.4168, -3.7038], 13); // Coordenadas de Madrid

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
    }).addTo(map);

    // Crear un icono personalizado usando SVG
    const createCustomIcon = (iconComponent) => {
      const div = document.createElement("div");
      div.innerHTML = iconComponent;
      return L.divIcon({
        html: div.innerHTML,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
    };

    const clubIcon = createCustomIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6"><path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /></svg>');

    const activityIcon = createCustomIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6"><path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" /></svg>');

    // Cargar datos desde el JSON
    fetch("/ubicaciones.json")
      .then((res) => res.json())
      .then((places) => {
        places.forEach((place) => {
          const icon = place.type === "discoteca" ? clubIcon : activityIcon;

          // Crear contenido del popup con HTML personalizado
          const popupContent = `
            <div class="card card-compact bg-base-100 w-96 shadow-xl">
              <figure>
                <img src="${place.image}" alt="${place.name}" />
              </figure>
              <div class="card-body">
                <h2 class="card-title">${place.name}</h2>
                <p>${place.description}</p>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary">Get Directions</button>
                </div>
              </div>
            </div>
          `;

          L.marker([place.lat, place.lng], { icon })
            .addTo(map)
            .bindPopup(popupContent);
        });
      });

    return () => {
      map.remove();
    };
  }, [category]);

  return (
    <div className="relative">
      <div id="map" className="w-full h-full flex-grow"></div>

      {/* Buscador flotante */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg w-64">
        <h3 className="text-lg font-semibold mb-2">Buscar lugares</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="discotecas">Discotecas</option>
          <option value="garitos">Garitos de moda</option>
          <option value="restaurantes">Restaurantes de moda</option>
          <option value="actividades">Actividades fuera de lo normal</option>
        </select>
      </div>
    </div>
  );
}