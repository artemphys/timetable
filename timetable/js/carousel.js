$(document).ready(function() {
    var width = 222;
    var count = 8;
    var items = $('.slider ul li');
    var position = 0;
    $('.left').click(function() {
        console.log(Math.min(position + width*count, 0));
        if(position>=0) return false;
        position = Math.min(position + width*count, 0);
        $('.slider ul').css({"margin-left":position + 'px'});
        return false;
    });
    $('.right').click(function() {
        console.log(Math.max(position - width*count, -width*(items.length-count)));
        if(position <= -width*(items.length-count))
        return false;
        position = Math.max(position - width*count, -width*(items.length-count));
        $('.slider ul').css({"margin-left":position + 'px'});
        return false;
    });
});