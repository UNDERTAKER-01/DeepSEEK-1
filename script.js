// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обновление даты и времени
    function updateDateTime() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('ru-RU');
        const timeStr = now.toLocaleTimeString('ru-RU');
        
        document.getElementById('current-date').textContent = dateStr;
        document.getElementById('current-time').textContent = timeStr;
    }
    
    // Обновляем время каждую секунду
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Переменные для управления новостями
    let currentNewsIndex = 0;
    const newsItems = document.querySelectorAll('.news-item');
    const totalNews = newsItems.length;
    const newsContainer = document.querySelector('.news-container');
    let isNewsExpanded = true;
    let speechEnabled = false;
    let speechSynthesis = window.speechSynthesis;
    
    // Устанавливаем общее количество новостей
    document.getElementById('total-news').textContent = totalNews;
    
    // Функция для обновления отображения текущей новости
    function updateNewsDisplay() {
        // Убираем активный класс у всех новостей
        newsItems.forEach(item => item.classList.remove('active'));
        
        // Добавляем активный класс текущей новости
        newsItems[currentNewsIndex].classList.add('active');
        
        // Обновляем счетчик
        document.getElementById('current-news').textContent = currentNewsIndex + 1;
        
        // Прокручиваем к активной новости
        if (isNewsExpanded) {
            newsItems[currentNewsIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Кнопка следующей новости
    document.getElementById('next-news').addEventListener('click', function() {
        currentNewsIndex = (currentNewsIndex + 1) % totalNews;
        updateNewsDisplay();
    });
    
    // Кнопка предыдущей новости
    document.getElementById('prev-news').addEventListener('click', function() {
        currentNewsIndex = (currentNewsIndex - 1 + totalNews) % totalNews;
        updateNewsDisplay();
    });
    
    // Кнопка свернуть/развернуть новости
    document.getElementById('toggle-news').addEventListener('click', function() {
        if (isNewsExpanded) {
            newsContainer.style.display = 'none';
            isNewsExpanded = false;
            this.innerHTML = '<i class="fas fa-expand-alt"></i>';
            this.title = 'Развернуть';
        } else {
            newsContainer.style.display = 'block';
            isNewsExpanded = true;
            this.innerHTML = '<i class="fas fa-compress-alt"></i>';
            this.title = 'Свернуть';
            updateNewsDisplay();
        }
    });
    
    // Кнопка включения/выключения озвучки
    document.getElementById('speech-toggle').addEventListener('click', function() {
        speechEnabled = !speechEnabled;
        
        if (speechEnabled) {
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.title = 'Выключить озвучку';
            // Останавливаем любое текущее воспроизведение
            speechSynthesis.cancel();
            // Озвучиваем текущую новость
            speakCurrentNews();
        } else {
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.title = 'Включить озвучку';
            // Останавливаем воспроизведение
            speechSynthesis.cancel();
        }
    });
    
    // Функция озвучки текущей новости
