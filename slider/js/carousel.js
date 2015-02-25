$(document).ready(function() {
    //console.log($('.shift').innerWidth());
    var width = 222;
    var count = 8;
    var items = $('.slider ul li');
    var position = 0;
    $('.js-slide-left').click(function() {
        console.log(position);
        if(position>=0) return false;

        position = Math.min(position + width*count, 0);
        $('.slider ul').css({"margin-left":position + 'px'});
        return false;
    });
    $('.js-slide-right').click(function() {
        if(position <= -width*(items.length-count))
            return false;

            position = Math.max(position - width * count, -width * (items.length - count));
            $('.slider ul').css({"margin-left": position + 'px'});
            return false;
    });
});