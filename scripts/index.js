const itemTemplate = document.getElementById('item__template').content;
const openPlace = document.getElementById('popup_place');
const openForm = document.getElementById('popup_form');
const openPicture = document.getElementById('popup_picture');
const editbutton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const profileForm = document.querySelector('.popup__form');
const nameInputContent = document.querySelector('.profile__title')
const jobInputContent = document.querySelector('.profile__subtitle')
const nameValue = document.getElementById('name')
const jobValue = document.getElementById('job')
const cardsAdd = document.querySelector('.elements__list');
const openPlacePopup = document.querySelector('.profile__button');
const imgPicturePopup = document.querySelector('.popup__image-picture');
const titlePicturePopup = document.querySelector('.popup__title-picture');
const elementTitle = document.querySelector('.element__title');
const titleplaceValue = document.getElementById('place')
const linkPlaceValue = document.getElementById('url')
const placeForm = document.getElementById('place__form')

generateCards()
editbutton.addEventListener('click', openPopupForm)
openPlacePopup.addEventListener('click', openPopupPlace)
openPlace.addEventListener('click', openPopupPlace)
profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);


function closePopupHandle(event) {
    if (event.target.classList.contains('popup_opened') || event.target.closest('.popup__close')) {
        closePopup(event.target.closest('.popup'));
    }
}
popups.forEach(function (popup) {
    popup.addEventListener('click', closePopupHandle);
})
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};
// попап формы для открытия 
function openPopupForm() {
    openPopup(openForm)
    nameValue.value = nameInputContent.textContent;
    jobValue.value = jobInputContent.textContent;
};
// попап формы для изменений 
function handleProfileFormSubmit(event) {
    event.preventDefault()
    nameInputContent.textContent = nameValue.value;
    jobInputContent.textContent = jobValue.value;
    closePopup(openForm)
};
// открываю попап с местами(добавление карточек)
function openPopupPlace() {
    openPopup(openPlace)
};
// добавление карточек 
function handlePlaceFormSubmit(evt) {
    evt.preventDefault();  
    const card = createCard({
        name: titleplaceValue.value, 
        link: linkPlaceValue.value
    })
    cardsAdd.prepend(card); // add content in html
    closePopup(openPlace);
    titleplaceValue.value="";
    linkPlaceValue.value="";
};
function generateCards() {
    initialCards.forEach((item, index) => {
        const card = createCard(item)
        cardsAdd.append(card)
    })
};
function createCard(cardData) {
    //клонирую карточку 
    const template = itemTemplate.cloneNode(true);
    const elementImg = template.querySelector('.element__img');
    //заполняю контентом
    elementImg.setAttribute("src", cardData.link);
    elementImg.setAttribute("alt", cardData.name);
    template.querySelector(".element__title").textContent = cardData.name;
    template.querySelector('.element__trash').addEventListener('click', handleCardRemove);
    template.querySelector('.element__like').addEventListener('click', handleLikeAdd);
    template.querySelector('.element__img').addEventListener('click', openPlacePicturuPopup);
    return template
};

function handleLikeAdd(event) {
    event.target.classList.toggle('element__like_active');
};

function handleCardRemove(event) {
    event.target.closest('.element').remove();
};

function openPlacePicturuPopup(event) {
    imgPicturePopup.src = event.target.src;
    imgPicturePopup.alt = event.target.alt;
    titlePicturePopup.textContent = event.target.alt;
    openPopup(openPicture);
};
