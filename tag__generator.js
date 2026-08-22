// Получаем элементы из HTML
const textInput = document.getElementById('text');
const urlInput = document.getElementById('url');
const generateBtn = document.getElementById('generate');

const imgUrlInput = document.getElementById('imgUrl');
const altTextInput = document.getElementById('altText');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const imgBtn = document.getElementById('IMG');

const resultDiv = document.getElementById('result');

// Функция генерации тега ссылки
function generateLinkTag() {
    const text = textInput.value;
    const url = urlInput.value;

    // Формируем HTML-код (добавляем target="_blank" для открытия в новой вкладке)
    const htmlTag = `<a href="${url}" target="_blank">${text}</a>`;

    // Выводим результат
    resultDiv.innerHTML = htmlTag;
}

// Функция генерации тега картинки
function generateImgTag() {
    const imgUrl = imgUrlInput.value;
    const altText = altTextInput.value;
    const width = widthInput.value;
    const height = heightInput.value;

    // Формируем HTML-код
    const imgTag = `<img src="${imgUrl}" alt="${altText}" width="${width}" height="${height}" />`;

    // Выводим результат
    resultDiv.innerHTML = imgTag;
}

// Привязываем функции к нажатию кнопок
generateBtn.addEventListener('click', generateLinkTag);
imgBtn.addEventListener('click', generateImgTag);

