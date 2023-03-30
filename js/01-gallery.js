// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні. 
// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на ul.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// Розмітка елемента галереї
// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.
//<li class="gallery__item">
//  <a class="gallery__link" href="large-image.jpg">
//    <img
//      class="gallery__image"
//      src="small-image.jpg"
//      data-source="large-image.jpg"
//      alt="Image description"
//    />
//  </a>
//</li>
// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from './gallery-items.js';
// Change code below this line

//console.log(galleryItems);

const containerGallery=document.querySelector('.gallery');

const galleryMarkup=createGalleryMarkup(galleryItems);

containerGallery.insertAdjacentHTML("beforeend", galleryMarkup);

containerGallery.addEventListener('click', onGalleryItemClick);

let instance;

function createGalleryMarkup(gallery){
 return gallery.map(({preview, original, description})=>{
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}" download>
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
  })
  .join("");
}

function onGalleryItemClick (event){
    event.preventDefault();

    const isImageGalleryEl=event.target.classList.contains('gallery__image');
    if(!isImageGalleryEl){
        return;
    }
    
    openGalleryItemInModal(event.target.dataset.source);
}

function openGalleryItemInModal(src){
  instance = basicLightbox.create(`
    <img src="${src}" width="800" height="600">
`,{
  onShow: (instance) => {
    window.addEventListener('keydown', onEscKeyPress)
  },
  onClose: (instance) => {
    window.removeEventListener('keydown', onEscKeyPress)}
  });

  instance.show();
 // window.addEventListener('keydown', onEscKeyPress);
  
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;
  
  if (isEscKey) {
    //window.removeEventListener('keydown', onEscKeyPress);
    instance.close();
  }
}

