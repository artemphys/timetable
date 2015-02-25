$(document).ready(function() {
    var sliderElems = $('.slider ul li');//Создаем массив из элементов слайдера
    var sliderArr = $.makeArray(sliderElems);

        //формируем таблицу из JSON//
        $(sliderArr).click(function () {
            var thisSlide = $((sliderArr[sliderElems], this)).index('li');//Номер элемента, на котором был клик
            //console.log(thisSlide);
                $('table').remove();
                $('.container').append('<table class="table table-hover"></table>');

            var tableInfo = {};
            tableInfo.getJson = function () {
                $.getJSON('02172015.json', function (data) {
                    data.forEach(tableInfo.addObject(data));
                });
            };
            tableInfo.getJson();

            tableInfo.addObject = function (data){
                for (var i = 0; i <= 3; ++i) { //добавляем строки в таблицу
                    $('table').append('<tr id="' + i + '"></tr>');
                        $('.table #' + i).append('<td>' + data.arr[thisSlide].table[i].number + '</td>');
                        $('.table #' + i).append('<td>' + data.arr[thisSlide].table[i].time + '</td>');
                        $('.table #' + i).append('<td>' + data.arr[thisSlide].table[i].name + '</td>');
                        $('.table #' + i).append('<td>' + data.arr[thisSlide].table[i].money + '</td>');
                        $('.table #' + i).append('<td>' + '<a href="#" class="btn btn-sm btn-danger" type="button">toDo</a>' + '</td>');
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