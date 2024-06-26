const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];


const galleryItemsList = document.querySelector("ul.js-gallery");

const galleryItemMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
    </a>
  </li>`;
  })
  .join("");




galleryItemsList.insertAdjacentHTML("afterbegin", galleryItemMarkup);

const modalWindow = document.querySelector("div.lightbox");
const modalImage = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector(".lightbox__overlay");

const openModal = (src, alt) => {
  modalWindow.classList.add("is-open");
  modalImage.src = src;
  modalImage.alt = alt;
};

const closeModal = () => {
  modalWindow.classList.remove("is-open");
  modalImage.setAttribute("src", "");
};

closeModalBtn.addEventListener("click", (event) => {
  closeModal();
});




const allGalleryItems = document.querySelectorAll("li.gallery__item");

allGalleryItems.forEach((elem) => {
  const source = elem
    .querySelector("img.gallery__image")
    .getAttribute("data-source");
  const alt = elem.querySelector("img.gallery__image").getAttribute("alt");

  elem.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();

    openModal(source, alt);
  });
});




// extra

overlay.addEventListener("click", (event) => {
  closeModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }



  const itemIndex = galleryItems.findIndex((item) => {
    return item.original === modalImage.src;
  });

  if (event.key === "ArrowRight") {
    const nextItemIndex =
      galleryItems.length - 1 === itemIndex ? 0 : itemIndex + 1;
    const nextItem = galleryItems[nextItemIndex];
    modalImage.src = nextItem.original;
  }

  if (event.key === "ArrowLeft") {
    const prevItemIndex = 0 === itemIndex ? galleryItems.length - 1 : itemIndex - 1;
    const prevItem = galleryItems[prevItemIndex];
    modalImage.src = prevItem.original;
  }
});
