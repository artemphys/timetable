$(document).ready(function() {

    var sliderElems = $('.slider ul li');//Create an array of the elements of the slider
    var sliderArr = $.makeArray(sliderElems);

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
        if(sliderArr.length<=30){
            $('.slider ul').append('<li class="item newItem"><span class="date">NoDate</span><span class="title">NoDate</span></li>');
            sliderArr[sliderArr.length] = $('.item .newItem');
            $(sliderArr).setRealDate();
        }
        //stop scroll
        if (position<=-(sliderArr.length-7)*itemWidth) {
            return false;
        };
        position = position-itemWidth;
        $('.slider ul').css({"margin-left": position + 'px'});
        return false;
    });

    //////////////////////////////

    //Plugin to open the table
    (function( $ ){
        $.fn.openTable = function() {


            //make a table using JSON//
            $(sliderArr).click(function () {

                $(sliderArr).css({"border-color": "transparent"});
                $((sliderArr[sliderElems], this)).css({"border-color": "#5cb85c"});//border of the active element

                var thisSlide = $((sliderArr[sliderElems], this)).index('li');//the number of the active element
                $('.tableFromJSON').remove();
                $('.container').append('<table class="table table-hover tableFromJSON"></table>');

                var tableInfo = {};
                tableInfo.getJson = function () {
                    $.getJSON('02172015.json', function (data) {
                        data.forEach(tableInfo.addObject(data));
                    });
                };
                tableInfo.getJson();

                //add the rows into the table
                tableInfo.addObject = function (data) {
                        var tableTemplate = _.template("<tr>" +
                        "<td><%= number %></td>" +
                        "<td><%= time %></td>" +
                        "<td><%= name %></td>" +
                        "<td><%= money %></td>" +
                        '<td>' + '<a href="#" class="btn btn-sm btn-danger" type="button">toDo</a>' + '</td>' +
                        "</tr>");
                    var data = data.arr[thisSlide].table;
                    _.each(data, function(num){$('.tableFromJSON').append(tableTemplate(num));});
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