$(document).ready(function() {
    var sliderElems = $('.slider ul li');//Create an array of the elements of the slider
    var sliderArr = $.makeArray(sliderElems);

    //Plugin to open the table
    (function( $ ){
        $.fn.openTable = function() {


            //make a table using JSON//
            $(sliderArr).click(function () {

                $(sliderArr).css({"border-color": "transparent"});
                $((sliderArr[sliderElems], this)).css({"border-color": "#5cb85c"});//border of the active element

                var thisSlide = $((sliderArr[sliderElems], this)).index('li');//the number of the active element
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

                //add the rows into the table
                tableInfo.addObject = function (data) {
                    for (var i = 0; i <= 3; ++i) {
                        $('table').append('<tr id="' + i + '"></tr>');
                        $('.table #' + i).append('<td>' + data.arr[thisSlide].table[i].number + '</td>');
                        $('.table #' + i).append('<td>' + data.arr[thisSlide].table[i].time + '</td>');
                        $('.table #' + i).append('<td>' + data.arr[thisSlide].table[i].name + '</td>');
                        $('.table #' + i).append('<td>' + data.arr[thisSlide].table[i].money + '</td>');
                        $('.table #' + i).append('<td>' + '<a href="#" class="btn btn-sm btn-danger" type="button">toDo</a>' + '</td>');
                    }
                    ;
                };
            });
            $(sliderArr[0]).click();//fix default state
        };
        return this;
    })(jQuery);
    $(sliderArr).openTable();

//click on button in the table
    $('.container').on('click', '.btn-danger', function () {
        $(this).removeClass("btn-danger");
        $(this).addClass("btn-success");
        $(this).text('Done');
    });


    //Plagin to set the date
    (function( $ ) {
        $.fn.setRealDate = function() {
            for (var i = 0; i <= 30; ++i) {
                var thisDay = $('.slider ul li .date').eq(i);
                var thisWeek = $('.slider ul li .title').eq(i);

                var day = moment().add('days', i).format("MMM Do YY");
                var week = moment().add('days', i).format("ddd");

                $(thisDay).text(day, this);
                $(thisWeek).text(week, this);
            }
            return this;
        };
    })(jQuery);
    $(sliderArr).setRealDate();
});