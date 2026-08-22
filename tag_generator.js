// --- Переключатели (выпадающие секции) ---
const toggleLink = document.getElementById('toggle-link');
const sectionLink = document.getElementById('section-link');
const toggleImg = document.getElementById('toggle-img');
const sectionImg = document.getElementById('section-img');
const toggleList = document.getElementById('toggle-list');
const sectionList = document.getElementById('section-list');

function toggleSection(toggle, section) {
    section.classList.toggle('active');
    toggle.classList.toggle('open');
}
toggleLink.addEventListener('click', () => toggleSection(toggleLink, sectionLink));
toggleImg.addEventListener('click', () => toggleSection(toggleImg, sectionImg));
toggleList.addEventListener('click', () => toggleSection(toggleList, sectionList));

// --- Элементы форм ---
const textInput = document.getElementById('text');
const urlInput = document.getElementById('url');

const imgUrlInput = document.getElementById('imgUrl');
const altTextInput = document.getElementById('altText');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');

const listText = document.getElementById('listText');
const isOrdered = document.getElementById('isOrdered');

// --- Результат ---
const resultCodeDiv = document.getElementById('result-code');
const resultPreviewDiv = document.getElementById('result-preview');

// --- Главная кнопка: Сгенерировать ---
const generateBtn = document.getElementById('generate-all');
generateBtn.addEventListener('click', () => {
    let codeOutput = '';
    let previewOutput = '';

    // Флаг: был ли уже добавлен разделитель (чтобы не ставить его перед самым первым тегом)
    let hasContent = false;

    // 1. Ссылка
    if (sectionLink.classList.contains('active')) {
        const text = textInput.value.trim();
        const url = urlInput.value.trim();

        if (!text || !url) {
            alert('Для генерации ссылки заполните оба поля!');
            return;
        }

        // Проверка http/https
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (!confirm('В адресе нет http:// или https://. Добавить https:// автоматически?')) {
                return;
            }
            url = 'https://' + url;
        }

        const htmlTag = `<a href="${url}" target="_blank">${text}</a>`;
        if (hasContent) { codeOutput += '\n<!-- разделитель -->\n'; previewOutput += '<hr style="border:0; border-top:1px solid #ccc; margin:10px 0;">'; }
        codeOutput += htmlTag;
        previewOutput += htmlTag;
        hasContent = true;
    }

    // 2. Картинка
    if (sectionImg.classList.contains('active')) {
        const imgUrl = imgUrlInput.value.trim();
        const altText = altTextInput.value.trim();
        const width = widthInput.value;
        const height = heightInput.value;

        if (!imgUrl) {
            alert('Для генерации картинки нужен адрес картинки!');
            return;
        }

        const w = width ? ` width="${width}"` : '';
        const h = height ? ` height="${height}"` : '';

        const imgTag = `<img src="${imgUrl}" alt="${altText}"${w}${h} />`;
        if (hasContent) { codeOutput += '\n<!-- разделитель -->\n'; previewOutput += '<hr style="border:0; border-top:1px solid #ccc; margin:10px 0;">'; }
        codeOutput += imgTag;
        previewOutput += imgTag;
        hasContent = true;
    }

    // 3. Список
    if (sectionList.classList.contains('active')) {
        const itemsRaw = listText.value.trim();
        if (!itemsRaw) {
            alert('Введите элементы списка через запятую!');
            return;
        }

        const items = itemsRaw.split(',').map(item => item.trim()).filter(item => item !== '');
        if (items.length === 0) {
            alert('Не найдено ни одного элемента списка!');
            return;
        }

        const isOl = isOrdered.checked;
        const tagStart = isOl ? '<ol>' : '<ul>';
        const tagEnd = isOl ? '</ol>' : '</ul>';

        let listHtml = tagStart;
        items.forEach(item => {
            listHtml += `<li>${item}</li>`;
        });
        listHtml += tagEnd;

        if (hasContent) { codeOutput += '\n<!-- разделитель -->\n'; previewOutput += '<hr style="border:0; border-top:1px solid #ccc; margin:10px 0;">'; }
        codeOutput += listHtml;
        previewOutput += listHtml;
        hasContent = true;
    }

    if (!hasContent) {
        alert('Откройте хотя бы одну секцию и заполните поля!');
        return;
    }

    resultCodeDiv.textContent = codeOutput.trim();
    resultPreviewDiv.innerHTML = previewOutput.trim();
});

// --- Кнопка: Очистить всё ---
const clearBtn = document.getElementById('clear-all');
clearBtn.addEventListener('click', () => {
    // Очищаем поля
    textInput.value = '';
    urlInput.value = '';
    imgUrlInput.value = '';
    altTextInput.value = '';
    widthInput.value = '';
    heightInput.value = '';
    listText.value = '';
    isOrdered.checked = false;

    // Очищаем результаты
    resultCodeDiv.textContent = '';
    resultPreviewDiv.innerHTML = '';

    // Закрываем все секции
    sectionLink.classList.remove('active');
    sectionImg.classList.remove('active');
    sectionList.classList.remove('active');

    // Убираем класс open у переключателей
    toggleLink.classList.remove('open');
    toggleImg.classList.remove('open');
    toggleList.classList.remove('open');
});
