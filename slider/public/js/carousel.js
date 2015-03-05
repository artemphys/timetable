$(document).ready(function() {

//dependence of the slider width on the number of items
$(function() {
    resizeSlider();
    $(window).resize(resizeSlider);
});
    function resizeSlider() {
        var shiftWidth = $('.shift').width(),
        btnsWidth = 2*($('.btn').outerWidth(true)),
        itemWidth = $('.item').outerWidth(true),
        coefficient=((shiftWidth-btnsWidth)/itemWidth);
        //console.log(coefficient);

        coefficient = Math.floor(coefficient);
        $('.slider').css({"width": coefficient * itemWidth + "px"});
    }

    var count = 1,
    position = 0,
    itemWidth = $('.item').outerWidth(true);//for slide;

    $('.js-slide-left').click(function() {
        //console.log(position);
        if(position>=0) return false;

        position = Math.min((position + (itemWidth)*count), 0);
        $('.slider ul').css({"margin-left":position + 'px'});
        return false;
    });


    $('.js-slide-right').click(function() {
        //add the items into the slider
            var sliderElems = $('.slider ul li');//Create an array of the elements of the slider
            var sliderArr = $.makeArray(sliderElems);

        if(sliderArr.length<30){
                $('.slider ul').append('<li class="item newItem"><span class="date">NoDate</span><span class="title">NoDate</span></li>');
                sliderArr[sliderArr.lenght] = $('.item .newItem');
                $(sliderArr).setRealDate();
            }
        //
        if (position<=-(sliderArr.length-7)*itemWidth) {
            return false;
        };
            //console.log(position);
            position = Math.max(position - itemWidth * count, -itemWidth * (sliderElems.length - count));
            $('.slider ul').css({"margin-left": position + 'px'});
            return false;
    });
});