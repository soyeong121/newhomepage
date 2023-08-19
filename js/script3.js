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

    // banner slide
    const list = document.querySelector('#banner-container > ul');
    const items = document.querySelectorAll('#banner-container > ul > li');
    const buttons = document.querySelector('.buttons');
    const paginations = document.querySelector('.paginations');
    const lastIndex = items.length - 1;
    let selected = 0;
    let interval;

    // Util Functions
    const setTransition = (value) => {
        list.style.transition = value;
    };

    const setTranslate = ({ index, reset }) => {
        if (reset) list.style.transform = `translate(-${list.clientWidth}px, 0)`;
        else list.style.transform = `translate(-${(index + 1) * list.clientWidth}px, 0)`;
    };

    const activePagination = (index) => {
        [...paginations.children].forEach((pagination) => {
            pagination.classList.remove('on');
        });
        paginations.children[index].classList.add('on');
    };

    // 이전 & 다음 버튼
    const handlePrev = () => {
        selected -= 1;
        setTransition('transform 0.3s linear');
        setTranslate({ index: selected });
        if (selected < 0) {
            selected = lastIndex;
            setTimeout(() => {
                setTransition('');
                setTranslate({ index: selected });
            }, 300);
        }
        if (selected >= 0) activePagination(selected);
    };

    const handleNext = () => {
        console.log(selected);
        selected += 1;
        setTransition('transform 0.3s linear');
        setTranslate({ index: selected });
        if (selected > lastIndex) {
            selected = 0;
            setTimeout(() => {
                setTransition('');
                setTranslate({ index: selected });
            }, 300);
        }
        if (selected <= lastIndex) activePagination(selected);
    };

    // 버튼을 동적으로 생성함과 동시에 이벤트도 연결하며,
    // 각 이벤트 핸들러 함수는 현재 슬라이드의 인덱스를 담고 있는
    // selected 변수의 값을 1씩 증감시키며 리스트의 Translate 값을 조정
    const makeButton = () => {
        if (items.length > 1) {
            const prevButton = document.createElement('button');
            prevButton.classList.add('prev');
            prevButton.addEventListener('click', handlePrev);

            const nextButton = document.createElement('button');
            nextButton.classList.add('next');
            nextButton.addEventListener('click', handleNext);

            buttons.appendChild(prevButton);
            buttons.appendChild(nextButton);
        }
    };

    // 페이지네이션 버튼 만들기
    // 페이지네이션 버튼은 하단에 위치, 인덱스에 맞는 슬라이드로 바로 이동할 수 있도록 함
    const handlePagination = (e) => {
        if (e.target.dataset.num) {
            selected = parseInt(e.target.dataset.num);
            setTransition('all 0.3s linear');
            setTranslate({ index: selected });
            activePagination(selected);
        }
    };

    // 슬라이드 개수에 맞춰 버튼을 동적으로 생성한 뒤,
    // 각 슬라이드의 인덱스를 버튼 요소의 data-num 속성에 할당
    const makePagination = () => {
        if (items.length > 1) {
            for (let i = 0; i < items.length; i++) {
                const button = document.createElement('button');
                button.dataset.num = i;
                button.classList.add('pagination');
                if (i === 0) {
                    button.classList.add('on');
                    // 웹사이트가 열리면 항상 첫 슬라이드부터 시작하기 때문에,
                    // 첫 번째 버튼 요소에는 추가적으로 'on' 클래스를 지정해 
                    // 현재 어떤 슬라이드가 사용자에게 보여지고 있는지 알려줌
                }
                paginations.appendChild(button);
                paginations.addEventListener('click', handlePagination);
            }
        }
    };

    // 슬라이드 맨 앞 & 맨 뒤 요소 복사
    // 슬라이드 양 끝의 요소를 복사하여,맨 앞에서 이전 슬라이드로 이동하거나 할 때 자연스럽게 넘김
    const cloneElement = () => {
        list.prepend(items[lastIndex].cloneNode(true));
        list.append(items[0].cloneNode(true));
        setTranslate({ reset: true });
    };

    // 슬라이드 자동 재생
    const autoplayIterator = () => {
        selected += 1;
        setTransition('all 0.3s linear');
        setTranslate({ index: selected });
        if (selected > lastIndex) {
            activePagination(0);
            clearInterval(interval);
            setTimeout(() => {
                selected = 0;
                setTransition('');
                setTranslate({ reset: true });
                autoplay({ duration: 4000 });
            }, 300);
        }
        if (selected <= lastIndex) activePagination(selected);
    };

    // 마우스가 올라가면 멈추고, 마우스가 벗어나면 다시 재생
    let duration = 4000;
    $('#banner-container > ul').parent().on({
        mouseenter: function () {
            window.clearInterval(interval);
        },

        mouseleave: function () {
            interval = setInterval(autoplayIterator, duration);
        }
    });

    const autoplay = ({ duration }) => {
        interval = setInterval(autoplayIterator, duration);
    };

    const render = () => {
        makeButton();
        makePagination();
        cloneElement();
        autoplay({ duration: 4000 });
    };
    render();

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