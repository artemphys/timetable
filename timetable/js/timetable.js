$(document).ready(function() {
    $('.btn-danger').click(function(){
        $(this).removeClass("btn-danger");
        $(this).addClass("btn-success");
        $(this).text('Done');
    });
});