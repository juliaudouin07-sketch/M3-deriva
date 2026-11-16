
// DERIVA - FUNCIONES DE LA APLICACION

// 1. BUSCADOR DE EXPERIENCIAS

const buscar = document.getElementById("buscar");

const experiencias = document.querySelectorAll(
  ".experience-item"
);

let filtroActual = "todas";

function filtrarExperiencias() {
  const texto = buscar ? buscar.value.toLowerCase() : "";

  experiencias.forEach(experiencia => {
    const nombre = experiencia.textContent.toLowerCase();
    const categoria = experiencia.dataset.category;

    const coincideTexto = nombre.includes(texto);
    const coincideCategoria =
      filtroActual === "todas" ||
      categoria === filtroActual;

    experiencia.hidden = !(
      coincideTexto && coincideCategoria
    );
  });
}

if (buscar) {
  buscar.addEventListener("input", filtrarExperiencias);
}

// 2. BOTONES DE FILTROS

const filtros = document.querySelectorAll(
  "[data-filter]"
);

filtros.forEach(boton => {
  boton.addEventListener("click", () => {
    filtros.forEach(b => b.classList.remove("selected"));

    boton.classList.add("selected");

    filtroActual = boton.dataset.filter;

    filtrarExperiencias();
  });
});

// 3. PESTAÑAS DE RESERVAS

const reservationTabs = document.querySelectorAll(
  "[data-reservation-tab]"
);

reservationTabs.forEach(boton => {
  boton.addEventListener("click", () => {
    reservationTabs.forEach(b => {
      b.classList.remove("active");
    });

    boton.classList.add("active");

    const proximas = document.getElementById(
      "upcoming-reservations"
    );

    const anteriores = document.getElementById(
      "previous-reservations"
    );

    if (proximas && anteriores) {
      proximas.hidden =
        boton.dataset.reservationTab !== "upcoming";

      anteriores.hidden =
        boton.dataset.reservationTab !== "previous";
    }
  });
});

// 4. FORMULARIO DE RESERVA DE PRUEBA

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  const parametros = new URLSearchParams(
    window.location.search
  );

  const experienciaElegida = parametros.get("experiencia");

  const selector = document.getElementById("experience");

  if (
    experienciaElegida &&
    ["montanas", "olivos", "vinedos", "fuego"]
      .includes(experienciaElegida)
  ) {
    selector.value = experienciaElegida;
  }

  const fecha = document.getElementById("date");

  if (fecha) {
    const hoy = new Date();
    const local = new Date(
      hoy.getTime() - hoy.getTimezoneOffset() * 60000
    );

    fecha.min = local.toISOString().slice(0, 10);
  }

  bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const datos = new FormData(bookingForm);

    const reserva = {
      experiencia: datos.get("experience"),
      fecha: datos.get("date"),
      personas: datos.get("people"),
      nombre: datos.get("guest")
    };

    // Solo demostracion, guardada en este navegador.
    const reservas = JSON.parse(
      localStorage.getItem("derivaReservas") || "[]"
    );

    reservas.push(reserva);

    localStorage.setItem(
      "derivaReservas",
      JSON.stringify(reservas)
    );

    document.getElementById("bookingMessage").textContent =
      "¡Reserva de prueba guardada! No es una confirmación real.";

    bookingForm.reset();
  });
}


 // 5. BOTON DE VIDEO

const playVideo = document.getElementById("playVideo");

if (playVideo) {
  playVideo.addEventListener("click", () => {
    window.open(
      "https://www.youtube.com/shorts/L79lvMn45eU",
      "_blank"
    );
  });
}
