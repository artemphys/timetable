$(document).ready(function() {
    //формируем таблицу из JSON//
    $('.list-inline li').click(function(){
        var order = $('ul').sortable("toArray");
        console.log(order[0]);
        if (($('table').length > 0)) {
        $('table').remove();}
        else {
        $('.container').append('<table class="container-fluid table table-hover"></table>');}
    var tableInfo = {};
        tableInfo.getJson = function() {
        $.getJSON('02172015.json', function(data){
            data.forEach(tableInfo.addObject(data));
        });
    };
        tableInfo.getJson();
        tableInfo.addObject = function(data) {
            for(var i=0; i<=3; ++i) { //добавляем строки в таблицу
                $('table').append('<tr id="'+i+'"></tr>');
                for (j=0; j<=3; j++) {
                $('.table #'+i).append('<td>' + data.table1[i][j] + '</td>');};
                $('.table #'+i).append('<td>' + '<a href="#" class="btn btn-sm btn-danger" type="button">toDo</a>' + '</td>');
            };
        };
});
//действие по нажатию кнопки в таблице
        $('.container').on('click', '.btn-danger', function(){
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-success");
            $(this).text('Done');
        });
});