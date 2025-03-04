"use strict";

const menu = document.querySelector(".menu__list");
const mediaQuery = window.matchMedia("(min-width: 767.98px)");

const mapElement = document.getElementById("map");

let bodyLockStatus = true;

// // появление меню при скроле
// window.addEventListener('scroll', (e) => {
//   const header = document.querySelector('.header').classList;
//   const sticky = document.querySelector('.sticky__block').classList;
//   let active_class = 'header_scrolled';

//   if (mediaQuery.matches) {
//     scrollY > 400 ? header.add(active_class) : header.remove(active_class);
//   } else {
//     scrollY > 200 ? sticky.remove('hidden') : sticky.add('hidden');
//   }
// });

// закрытие меню при нажатии на элемент
menu.addEventListener("click", (e) => {
  if (mediaQuery) {
    if (bodyLockStatus && e.target.classList.contains("menu__link"))
      menuClose();
  }
});

menuInit();

// === Burger ============================================
function menuInit() {
  if (document.querySelector(".icon-menu")) {
    document.addEventListener("click", function (e) {
      if (bodyLockStatus && e.target.closest(".icon-menu")) {
        bodyLockToggle();
        document.documentElement.classList.toggle("menu-open");
      }
    });
  }
}
function bodyLockToggle(delay = 500) {
  if (document.documentElement.classList.contains("lock")) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
}
function bodyUnlock(delay = 500) {
  let body = document.querySelector("body");
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll("[data-lp]");
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = "0px";
      }
      body.style.paddingRight = "0px";
      document.documentElement.classList.remove("lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}
function bodyLock(delay = 500) {
  let body = document.querySelector("body");
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll("[data-lp]");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight =
        window.innerWidth -
        document.querySelector(".wrapper").offsetWidth +
        "px";
    }
    body.style.paddingRight =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}
function menuClose() {
  bodyUnlock();

  document.documentElement.classList.remove("menu-open");
}

// MAP ======================================================

initMap();

async function initMap() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer } = ymaps3;

  // Иницилиазируем карту
  const map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    mapElement,

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: [28.303615, 54.097105],

        // Уровень масштабирования
        zoom: 17.5,
      },
    }
  );

  // Добавляем слой для отображения схематической карты
  map.addChild(new YMapDefaultSchemeLayer());
}

// marker

// const lineStringFeature = new YMapFeature({
//   id: "line",
//   source: "featureSource",
//   geometry: {
//     type: "LineString",
//     coordinates: [
//       [28.303615, 54.097105],
//       [28.303619, 54.097109],
//     ],
//   },
//   style: {
//     stroke: [{ width: 12, color: "rgb(14, 194, 219)" }],
//   },
// });

// mapElement.addChild(lineStringFeature);

// const markerElement = document.createElement("div");
// markerElement.className = "marker-class";
// markerElement.innerText = "I'm marker!";

// const marker = new YMapMarker(
//   {
//     source: "markerSource",
//     coordinates: [37.588144, 55.733842],
//     draggable: true,
//     mapFollowsOnDrag: true,
//   },
//   markerElement
// );

// map.addChild(marker);
