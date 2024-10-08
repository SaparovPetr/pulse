$(document).ready(function(){

    /// Карусель Slic
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type=button class=slick-prev><img src=img/left_arrow.png></img></button>',
        nextArrow: '<button type=button class=slick-next><img src=img/right_arrow.png></img></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrow: false
                }
            }
        ]
    });

    /// Табы
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });

    /// Кнопки переключения содержимого карточек
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    /// Появление и скрытие модальных окон
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    /// Валидация форм плагином jqueryvalidation.org    
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: 'Пожалуйста, введите свое имя',
                phone: 'Пожалуйста, введите номер телефона',
                email: {
                  required: 'Пожалуйста, введите свою почту',
                  email: 'Неправильно введен адрес почты'
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

        // Маска телефонного номера плагином https://plugins.jquery.com/maskedinput

    $('input[name=phone]').mask('+7 (999) 999-9999');
    
    // Скрипт для отправки данных форм на сервер для дальнейшей пересылки на почту
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '../mailer/smart.php',
            data: $(this).serialize()
        }).done(function(){
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // иконка ВВЕРХ,  затем плавный скролл
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href='#up']").click(function(){
        const _href = $(this).attr('href');
         $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
         return false;
    });

    // включение анимации секции ОТЗЫВЫ при пролистывании к ней
    new WOW().init();

});






    
   

    
        