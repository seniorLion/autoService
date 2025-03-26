//Nav
let sections = $('section'), 
nav = $('nav'), 
nav_height = nav.outerHeight();
$(window).on('scroll', function () {
    $('nav a').removeClass('active');
    let cur_pos = $(this).scrollTop(); 
    sections.each(function() {
        let top = $(this).offset().top - nav_height - 180,
        bottom = top + $(this).outerHeight();       
        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');    
            $(this).addClass('active');
            nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
    });
});
nav.find('a').on('click', function () {
    let $el = $(this), 
    id = $el.attr('href'); 
    $('html, body').animate({
        scrollTop: $(id).offset().top - nav_height
    }, 600);
    return false;
});

//Slider
function init() {
    const slider = document.querySelector(".slider");
    const nextBtn = slider.querySelector(".slider .nav .next");
    const prevBtn = slider.querySelector(".slider .nav .prev");
    const items = slider.querySelectorAll(".slider .item");
    let current = 0;
    items.forEach((item) => {
        const textWrapper1 = item.querySelector(".item-title");
        textWrapper1.innerHTML = textWrapper1.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
        );
        const textWrapper2 = item.querySelector(".item-text");
        textWrapper2.innerHTML = textWrapper2.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
        );        
    });
    function anim(current, next, callback) {
        const currentImgs = current.querySelectorAll(".img");
        const currentText = current.querySelectorAll(".content .letter");
        const nextImgs = next.querySelectorAll(".img");
        const nextText = next.querySelectorAll(".content .letter");
        const duration = 400;
        const offset = "-=" + 300;
        const imgOffset = duration*.8;
        const tl = anime.timeline({
            easing: "easeInOutQuint",
            duration: duration,
            complete: callback
        });
        // Add children
        tl.add({
            targets: currentText,
            translateY: [0, '-150px'],
            opacity: [1, 0],
            easing: "easeInQuint",
            duration: 600,
            delay: 0
        })
        .add({
            targets: currentImgs[0],
            translateY: -600,
            rotate: [0, '-15deg'],
            opacity: [1, 0],
            easing: "easeInCubic"
        }, offset )
        .add({
            targets: currentImgs[1],
            translateY: -600,
            rotate: [0, '15deg'],
            opacity: [1, 0],
            easing: "easeInCubic"
        }, "-=" + imgOffset )
        .add({
            targets: currentImgs[2],
            translateY: -600,
            rotate: [0, '-15deg'],
            opacity: [1, 0],
            easing: "easeInCubic"
        }, "-=" + imgOffset )
        .add({
            targets: currentImgs[3],
            translateY: -600,
            rotate: [0, '15deg'],
            opacity: [1, 0],
            easing: "easeInCubic"
        }, "-=" + imgOffset )
        .add({
            targets: current,
            opacity: 0,
            duration: 10,
            easing: "easeInCubic"
        })
        .add({
            targets: next,
            opacity: 1,
            duration: 10
        }, offset )
        .add({
            targets: nextImgs[0],
            translateY: [600, 0],
            rotate: ['15deg', 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
        }, offset )
        .add({
            targets: nextImgs[1],
            translateY: [600, 0],
            rotate: ['-15deg', 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
        }, "-=" + imgOffset )
        .add({
            targets: nextImgs[2],
            translateY: [600, 0],
            rotate: ['15deg', 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
        }, "-=" + imgOffset )
        .add({
            targets: nextImgs[3],
            translateY: [600, 0],
            rotate: ['-15deg', 0],
            opacity: [0, 1],
            easing: "easeOutCubic"
        }, "-=" + imgOffset )
        .add({
            targets: nextText,
            translateY: ['150px', 0],
            opacity: [0, 1],
            easing: "easeOutCubic",
            duration: 600,
            delay: (el, i) => 10 * (i + 1)
        }, offset );
    }
    let isPlaying = false;
    function updateSlider(newIndex) {
        const currentItem = items[current];
        const newItem = items[newIndex];
        function callback() {
            currentItem.classList.remove("is-active");
            newItem.classList.add("is-active");
            current = newIndex;
            isPlaying = false;
        }
        anim(currentItem, newItem, callback);
    }
    function next() {
        if (isPlaying) return;
        isPlaying = true;
        const newIndex = current === items.length - 1 ? 0 : current + 1;
        updateSlider(newIndex);
    }
    function prev() {
        if (isPlaying) return;
        isPlaying = true;
        const newIndex = current === 0 ? items.length - 1 : current - 1;
        updateSlider(newIndex);
    }
    nextBtn.onclick = next;
    prevBtn.onclick = prev;

    const intervalTime = 4000; 
    let autoSlide = setInterval(next, intervalTime);
}
document.addEventListener("DOMContentLoaded", init);

//Animate h1 section1
let animAOS = document.querySelectorAll('.animimate-heading-aos');
for (let a = 0; a < animAOS.length; a++){
    let arr = animAOS[a].innerHTML.split(/\s+/);
    let str = '';
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i]){
            arr[i] = '<div>'+arr[i]+'</div>';
        }
    }
    animAOS[a].innerHTML = arr.join(' ');
}
let animHeadingAOS = document.querySelectorAll('.animimate-heading-aos div');
for (let a = 0; a < animHeadingAOS.length; a++){
    let letters = animHeadingAOS[a].textContent.split('');
    let effects = ['fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'fade-up-right', 'fade-up-left', 'fade-down-right', 'fade-down-left', 'zoom-in'];
    let content = letters.map((val, i) => {
        let delay = Math.floor((Math.random() * 600) + 1);
        let dur = Math.floor((Math.random() * 1500) + 500);
        let rand = Math.floor(Math.random() * effects.length);
        if (val != " ") {
            return ('<span data-aos="'+ effects[rand] + '" data-aos-delay="'+ delay + '" data-aos-duration="'+ dur + '">'+ val +'</span>');
            } else {
            return (' &nbsp;');
        }
    });
    animHeadingAOS[a].innerHTML = "";
    for (let i = 0; i < content.length; i++) {
        animHeadingAOS[a].innerHTML += content[i];
    }
}
AOS.init();