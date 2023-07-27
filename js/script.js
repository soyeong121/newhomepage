$(function () {
    // banner-slide
    $('#banner > #banner-container > #banner-number > .page-btn').click(function () {
        var $clicked = $(this);
        var $slider = $(this).closest('#banner-container');

        var index = $(this).index();
        var isLeft = index == 0;
        // console.log(index);

        var $current = $slider.find(' > #banner-content > ul > .bn.active');
        var $post;

        if (isLeft) {
            $post = $current.prev();
        } else {
            $post = $current.next();
        }
        // console.log('$post.length = ' + $post.length);

        if ($post.length == 0) {
            if (isLeft) {
                $post = $slider.find(' > #banner-content > ul > .bn:last-child');
            } else {
                $post = $slider.find(' > #banner-content > ul > .bn:first-child');
            }
        }
        $current.removeClass('active');
        $post.addClass('active');

        updateCurrentPageNumber();
    });

    // setInterval(function(){
    //     $('#banner > #banner-container > #banner-number > .next-btn').click();
    // }, 4000);

    var timer;
    
    timer = setInterval(function(){
        $('#banner > #banner-container > #banner-number > .next-btn').click();
    }, 4000);
    $('#banner-container').mouseover(function(){
        clearInterval(timer);
    });
    $('#banner-content').mouseout(function(){
        timer = setInterval(function(){
            $('#banner > #banner-container > #banner-number > .next-btn').click();
        }, 4000);
    });
    
    // 슬라이더 페이지 번호 지정
    function pageNumber__Init(){
        // 전채 배너 페이지 갯수 세팅해서 .slider 에 'data-slide-total' 넣기
        var totalSlideNo = $('#banner > #banner-container > #banner-content > ul > .bn').length;
        console.log('totalSlideNo' + totalSlideNo);
        
        $('#banner > #banner-container').attr('data-slide-total', totalSlideNo);
        
        // 각 배너 페이지 번호 매기기
        $('#banner > #banner-container > #banner-content > ul > .bn').each(function(index, node){
            $(node).attr('data-slide-no', index + 1);
        });
    };
    
    pageNumber__Init();
    
    // 슬라이더 이동시 페이지 번호 변경
    function updateCurrentPageNumber(){
        var totalSlideNo = $('#banner > #banner-container').attr('data-slide-total');
        var currentSlideNo = $('#banner > #banner-container > #banner-content > ul > .bn.active').attr('data-slide-no');
        
        $('#banner > #banner-container > #banner-number > #number-no > #total-slide-no').html(totalSlideNo);
        $('#banner > #banner-container > #banner-number > #number-no > #current-slide-no').html(currentSlideNo);
    };
    
    updateCurrentPageNumber();

    // today book image 밑에 텍스트 나오게
    var $todayBookImage1 = $('#todayBook-image > li:nth-child(1) > a'),
        $todayBookImage2 = $('#todayBook-image > li:nth-child(2) > a'),
        $todayBookImage3 = $('#todayBook-image > li:nth-child(3) > a'),
        $todayBookImage4 = $('#todayBook-image > li:nth-child(4) > a'),
        $todayBookImage5 = $('#todayBook-image > li:nth-child(5) > a');
    var $todayBookText1 = $('#to-text1'),
        $todayBookText2 = $('#to-text2'),
        $todayBookText3 = $('#to-text3'),
        $todayBookText4 = $('#to-text4'),
        $todayBookText5 = $('#to-text5');

    $todayBookImage1.mouseover(function () {
        $todayBookText1.css('display', 'block');
    });
    $todayBookImage1.mouseout(function () {
        $todayBookText1.css('display', 'none');
    });
    $todayBookImage2.mouseover(function () {
        $todayBookText2.css('display', 'block');
    });
    $todayBookImage2.mouseout(function () {
        $todayBookText2.css('display', 'none');
    });
    $todayBookImage3.mouseover(function () {
        $todayBookText3.css('display', 'block');
    });
    $todayBookImage3.mouseout(function () {
        $todayBookText3.css('display', 'none');
    });
    $todayBookImage4.mouseover(function () {
        $todayBookText4.css('display', 'block');
    });
    $todayBookImage4.mouseout(function () {
        $todayBookText4.css('display', 'none');
    });
    $todayBookImage5.mouseover(function () {
        $todayBookText5.css('display', 'block');
    });
    $todayBookImage5.mouseout(function () {
        $todayBookText5.css('display', 'none');
    });

    // next book slide
    // next 배너 클릭 시 슬라이드
    var newSlides = document.querySelector('#newBook-contents > li'),
        newSlide = document.querySelector('#newBook-contents'),
        newBannerCount = newSlides.length,
        newDuration = 400,
        photoIndex = 0;

    // 슬라이드 버튼 클릭 이벤트
    document.querySelector("#new-next").addEventListener("click", newNextSlideImage);
    document.querySelector("#new-prev").addEventListener("click", newPrevSlideImage);

    // 다음 사진으로 슬라이드
    function newNextSlideImage() {
        photoIndex++;
        photoIndex %= newBannerCount;
        newSlide.style.left = "-100%";
        newSlide.style.transition = newDuration + "ms";
        window.setTimeout(() => {
            newSlide.appendChild(newSlide.firstElementChild);
            newSlide.removeAttribute("style");
        }, newDuration);
    }
    // 이전 사진으로 슬라이드
    function newPrevSlideImage() {
        photoIndex--;
        photoIndex %= newBannerCount;
        newSlide.insertBefore(newSlide.lastElementChild, newSlide.firstChild);
        newSlide.style.left = "-100%";
        newSlide.style.transition = "0ms";
        window.setTimeout(() => {
            newSlide.style.left = 0;
            newSlide.style.transition = newDuration + "ms";
        });
    }

    // sub Banner 자동 슬라이드
    var $subImageList = $('#sub-banner-container'),
        subphotoLength = $subImageList.children().length,
        photoIndex = 0,
        defaultInterval = 500;

    var timerId = window.setInterval(subslideImage, 3000);
    $('#sub-banner-container').hover(
        function () {
            window.clearInterval(timerId);
        },
        function () {
            timerId = window.setInterval(subslideImage, 3000);
        }
    );
    // 타이머에 의해 실행될 함수 미리 선언
    function subslideImage(interval) {
        if (typeof interval == 'undefined') interval = defaultInterval;

        photoIndex++;
        photoIndex %= subphotoLength;

        $subImageList.animate({ 'margin-left': '-100%' }, interval, function () {
            $(this).removeAttr('style').children(':first').appendTo(this);
        });
    };

    // goods slide
    // 버튼 클릭 시 슬라이드
    var goodsSlides = document.querySelector('#goods-contents > li'),
        goodsSlide = document.querySelector('#goods-contents'),
        goodsCount = goodsSlides.length,
        goodsDuration = 400,
        goddsIndex = 0;

    // 슬라이드 버튼 클릭 이벤트
    document.querySelector("#goods-next").addEventListener("click", goodsNextSlideImage);
    document.querySelector("#goods-prev").addEventListener("click", goodsPrevSlideImage);

    // 다음 사진으로 슬라이드
    function goodsNextSlideImage() {
        goddsIndex++;
        goddsIndex %= goodsCount;
        goodsSlide.style.left = "-320px";
        goodsSlide.style.transition = goodsDuration + "ms";
        window.setTimeout(() => {
            goodsSlide.appendChild(goodsSlide.firstElementChild);
            goodsSlide.removeAttribute("style");
        }, goodsDuration);
    }
    // 이전 사진으로 슬라이드
    function goodsPrevSlideImage() {
        goddsIndex--;
        goddsIndex %= goodsCount;
        goodsSlide.insertBefore(goodsSlide.lastElementChild, goodsSlide.firstChild);
        goodsSlide.style.left = "-320px";
        goodsSlide.style.transition = "0ms";
        window.setTimeout(() => {
            goodsSlide.style.left = 0;
            goodsSlide.style.transition = goodsDuration + "ms";
        });
    }
});