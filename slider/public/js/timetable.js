(function( $ ){
    $.fn.timetable = function() {

        ///NAMESPACE
        var timetableRightButton = $('.slide-container .shift .js-slide-right', this);
        var timetableleftButton = $('.slide-container .shift .js-slide-left', this);
        var timetableSlider = $('.slider', this);
        var sliderElems = timetableSlider.find('ul li');
        var sliderArr = $.makeArray(sliderElems);//Create an array of the elements of the slider
        var sliderList = timetableSlider.find('ul');
        var sliderListDate = sliderElems.find('.date');
        var sliderListTitle = sliderElems.find('.title');
        var timetableContainer = $('.slide-container', this);

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
            coefficient = Math.floor(coefficient);
            $('.slider').css({"width": coefficient * itemWidth + "px"});
        }

        var count = 1,
            position = 0,
            itemWidth = $('.item').outerWidth(true);//for slide;

        //LEFT-CLICK
        timetableleftButton.click(function() {
            if(position>=0) return false;

            position = Math.min((position + (itemWidth)*count), 0);
            sliderList.css({"margin-left":position + 'px'});
            return false;
        });

        //RIGHT-CLICK
        timetableRightButton.click(function() {
            //$(sliderArr[sliderElems]).setRealDate();
            //add the items into the slider
            if(sliderArr.length<=30){
                sliderList.append('<li class="item newItem"><span class="date">NoDate</span><span class="title">NoDate</span></li>');
                sliderArr[sliderArr.length] = $('.item .newItem');
                $('.item .newItem').setRealDate();
        }
            //stop scroll
            if (position<=-(sliderArr.length-7)*itemWidth) {
                return false;
            };
            position = position-itemWidth;
            sliderList.css({"margin-left": position + 'px'});
            return false;
        });

        //////////////////////////////

        //make a table using JSON//

        $(sliderArr).click(function () {
             $(sliderArr).css({"border-color": "transparent"});
             $((sliderArr[sliderElems], this)).css({"border-color": "#5cb85c"});//border of the active element
             var thisSlide = $((sliderArr[sliderElems], this)).index('li');//the number of the active element
             var timetableAddTable;
             timetableAddTable= timetableContainer.find('.tableFromJSON');
             $(timetableAddTable).remove();
             timetableContainer.append('<table class="table table-hover tableFromJSON"></table>');

             var tableInfo = {};
             tableInfo.getJson = function () {
                 $.getJSON('02172015.json', function (data) {
                 data.forEach(tableInfo.addObject(data));
                 });
             };
             tableInfo.getJson();

             //add the rows into the table TEMPLATE
             tableInfo.addObject = function (data) {
                 var tableTemplate = _.template("<tr>" +
                 "<td><%= number %></td>" +
                 "<td><%= time %></td>" +
                 "<td><%= name %></td>" +
                 "<td><%= money %></td>" +
                 '<td>' + '<a href="#" class="btn btn-sm btn-danger" type="button">toDo</a>' + '</td>' + "</tr>"
                 );
                 var tableData = data.arr[thisSlide].table;
                 _.each(tableData, function(num){timetableContainer.find('.tableFromJSON').append(tableTemplate(num));});
             };
        });
        $(sliderArr[0]).click();//fix default state

//click on button in the table
        $('.slide-container').on('click', '.btn-danger', function () {
            $(this).removeClass("btn-danger");
            $(this).addClass("btn-success");
            $(this).text('Done');
        });

        //Plagin to set the date (use http://moment.js)

        (function( $ ) {
            $.fn.setRealDate = function() {
                for (var i = 0; i <= 30; ++i) {
                    var thisDay = sliderListDate.eq(i);
                    var thisWeek = sliderListTitle.eq(i);
                    var day = moment().add('days', i).format("MMM Do YY");
                    var week = moment().add('days', i).format("ddd");

                    $(thisDay).text(day, this);
                    $(thisWeek).text(week, this);
                }
                //return this;
            };
            return this;
        })(jQuery);
        $('.item .newItem').setRealDate();
    };
    return this;
})(jQuery);

