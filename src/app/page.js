"use client";

import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import FloatingSearch from "../components/FloatingSearch";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState({
    discotecas: true,
    bares: true,
    afterHours: true,
    eventos: true,
    actividades: true,
    cafeterias: true,
  });

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
          if (selectedCategories[place.type]) {
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
          }
        });
      });

    return () => {
      map.remove();
    };
  }, [selectedCategories]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col flex-grow items-center justify-center">
        <h1 className="text-5xl font-extrabold text-center">Afterhours Spain</h1>
        <h2 className="text-2xl text-center">Descubre los mejores eventos nocturnos en Madrid</h2>
        <div id="map" className="w-full h-full flex-grow"></div>

        <FloatingSearch
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
        />
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center p-4">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
