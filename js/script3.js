$(function () {
    // top button
    var btn = $('#top');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

    /* 하루특가 반복 카운트다운 */
    function remaindTime() {
        // 현재 시간 구하기
        var now = new Date();
        var end = new Date(
            now.getFullYear(), now.getMonth(), now.getDate(),
            24, 0, 0);
        // 종료 시간 기준
        var open = new Date(
            now.getFullYear(), now.getMonth(), now.getDate(),
            0, 0, 0);
        // 오픈시간 기준
        // 현재시간만 가져옴
        var nt = now.getTime();
        // 오픈시간만 가져옴
        var ot = open.getTime();
        // 종료시간만 가져옴
        var et = end.getTime();

        // 현재시간이 오픈시간 보다 이르면 오픈시간까지의 남은 시간 구하기
        if (nt < ot) {
            $('#countdown-container').fadeIn();
            sec = parseInt(ot - nt) / 1000;
            day = parseInt(sec / 60 / 60 / 24);
            sec = (sec - (day * 60 * 60 * 24));
            hour = parseInt(sec / 60 / 60);
            sec = (sec - (hour * 60 * 60));
            min = parseInt(sec / 60);
            sec = parseInt(sec - (min * 60));
            if (hour < 10) { hour = '0' + hour; }
            if (min < 10) { min = '0' + min; }
            if (sec < 10) { sec = '0' + sec; }
            $('.hours').html(hour);
            $('.minutes').html(min);
            $('.seconds').html(sec);
        } else if (nt > et) {    // 현재 시간이 종료시간 보다 크면
            $('#countdown-container').fadeOut();
        } else {     // 현재시간이 오픈시간 보다 늦고 마감시간 보다 이르면 마감시간까지 남은 시간 구함
            $('#countdown-container').fadeIn();
            sec = parseInt(et - nt) / 1000;
            day = parseInt(sec / 60 / 60 / 24);
            sec = (sec - (day * 60 * 60 * 24));
            hour = parseInt(sec / 60 / 60);
            sec = (sec - (hour * 60 * 60));
            min = parseInt(sec / 60);
            sec = parseInt(sec - (min * 60));
            if (hour < 10) { hour = '0' + hour; }
            if (min < 10) { min = '0' + min; }
            if (sec < 10) { sec = '0' + sec; }
            $('.hours').html(hour);
            $('.minutes').html(min);
            $('.seconds').html(sec);
        }
    }
    // 1초 마다 검사를 해주면 실시간으로 시간을 알 수 있음
    setInterval(remaindTime, 1000);


    /* special-content slide */
    // 버튼 클릭 시 슬라이드
    var specialSlides = document.querySelector('#content-container > li'),
        specialSlide = document.querySelector('#content-container'),
        specialCount = specialSlides.length,
        specialDuration = 400,
        photoIndex = 0;

    // 슬라이드 버튼 클릭 이벤트
    document.querySelector("#special-next").addEventListener("click", specialNextSlideImage);
    document.querySelector("#special-prev").addEventListener("click", specialPrevSlideImage);

    // 다음 사진으로 슬라이드
    function specialNextSlideImage() {
        photoIndex++;
        photoIndex %= specialCount;
        specialSlide.style.left = "-100%";
        specialSlide.style.transition = specialDuration + "ms";
        window.setTimeout(() => {
            specialSlide.appendChild(specialSlide.firstElementChild);
            specialSlide.removeAttribute("style");
        }, specialDuration);
    }
    // 이전 사진으로 슬라이드
    function specialPrevSlideImage() {
        photoIndex--;
        photoIndex %= specialCount;
        specialSlide.insertBefore(specialSlide.lastElementChild, specialSlide.firstChild);
        specialSlide.style.left = "-100%";
        specialSlide.style.transition = "0ms";
        window.setTimeout(() => {
            specialSlide.style.left = 0;
            specialSlide.style.transition = specialDuration + "ms";
        });
    }

    // 배너 자동 슬라이드
    var $imageList = $('#content-container'),
        photoLength = $imageList.children().length,
        photoIndex = 0,
        defaultInterval = 500;

    var timerId = window.setInterval(slideImage, 4000);
    $('#content-container').hover(
        function () {
            window.clearInterval(timerId);
        },
        function () {
            timerId = window.setInterval(slideImage, 4000);
        }
    );

    // 타이머에 의해 실행될 함수 미리 선언
    function slideImage(interval) {
        if (typeof interval == 'undefined') interval = defaultInterval;

        photoIndex++;
        photoIndex %= photoLength;

        $imageList.animate({ 'margin-left': '-100%' }, interval, function () {
            $(this).removeAttr('style').children(':first').appendTo(this);
        });
    };
});