// Получаем элементы из HTML
const textInput = document.getElementById('text');
const urlInput = document.getElementById('url');
const generateBtn = document.getElementById('generate');
const resultDiv = document.getElementById('result');

// Функция генерации тега
function generateTag() {
    const text = textInput.value;
    const url = urlInput.value;

    // Формируем HTML-код (добавляем target="_blank" для открытия в новой вкладке)
    const htmlTag = `<a href="${url}" target="_blank">${text}</a>`;

    // Выводим результат
    resultDiv.innerHTML = htmlTag;
}

// Привязываем функцию к нажатию кнопки
generateBtn.addEventListener('click', generateTag);
