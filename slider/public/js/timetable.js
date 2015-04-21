+function ($) {
    'use strict';

    // TIMETABLE PUBLIC CLASS DEFINITION
    // ==============================

    var Timetable = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, Timetable.DEFAULTS, options)
        this.isLoading = false
        this.init(element, options)
    }

    Timetable.VERSION  = '1.0.0'

    Timetable.DEFAULTS = {
        template: '<div class="slide-container">\
            <div class="shift">\
                <a href="#" class="btn js-slide-left"><span class="glyphicon glyphicon-chevron-left"></span></a>\
                <div class="slider">\
                    <ul>\
                        <li class="item"><span class="date">NoDate</span><span class="title">NoDate</span></li>\
                        <li class="item"><span class="date">NoDate</span><span class="title">NoDate</span></li>\
                        <li class="item"><span class="date">NoDate</span><span class="title">NoDate</span></li>\
                        <li class="item"><span class="date">NoDate</span><span class="title">NoDate</span></li>\
                        <li class="item"><span class="date">NoDate</span><span class="title">NoDate</span></li>\
                        <li class="item"><span class="date">NoDate</span><span class="title">NoDate</span></li>\
                    </ul>\
                </div>\
                <a href="#" class="btn js-slide-right"><span class="glyphicon glyphicon-chevron-right"></span></a>\
            </div>\
        </div>'

    }

    Timetable.prototype.init = function (element, options) {
        var that = this;
        that.options = that.getOptions(options);
        that.$element.html(that.options.template);

        ///NAMESPACE
        var timetableRightButton = $('.js-slide-right', element);
        var timetableleftButton = $('.js-slide-left', element);
        var timetableSlider = $('.slider', element);
        var sliderList = timetableSlider.find('ul');
        var sliderElement = timetableSlider.find('ul li');
        var sliderArr = $.makeArray(sliderElement);//Create an array of the elements of the slider
        var sliderListDate = sliderElement.find('.date');
        var sliderListTitle = sliderElement.find('.title');
        var timetableContainer = $('.slide-container', element);
        var shift = $('.shift', element);
        var itemWidth = sliderElement.outerWidth(true);
        var count = 1,
            position = 0;

//dependence of the slider width on the number of items
        $(window).on('resize', function () {
            var shiftWidth = shift.width(),
                btnsWidth = 2*(timetableRightButton.outerWidth(true)),
                coefficient=((shiftWidth-btnsWidth)/itemWidth);
            coefficient = Math.floor(coefficient);
            console.log(coefficient);
            timetableSlider.css({"width": coefficient * itemWidth + "px"});
        });
        $(window).trigger("resize");

        //LEFT-CLICK
        timetableleftButton.click(function() {
            if(position>=0) return false;

            position = Math.min((position + (itemWidth)*count), 0);
            sliderList.css({"margin-left":position + 'px'});
            return false;
        });

        //RIGHT-CLICK
        timetableRightButton.click(function() {
            //add the items into the slider
            if(sliderArr.length<=30){
                sliderList.append('<li class="item newItem"><span class="date">NoDate</span><span class="title">NoDate</span></li>');
                sliderArr[sliderArr.length] = $('.item .newItem');
                sliderElement = timetableSlider.find('ul li');
                sliderListDate = sliderElement.find('.date');
                sliderListTitle = sliderElement.find('.title');
                sliderElement.each(function(){setRealDate();});
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
            $((sliderArr[sliderElement], this)).css({"border-color": "#5cb85c"});//border of the active element
            var thisSlide = $((sliderArr[sliderElement], this)).index('li');//the number of the active element
            var timetableAddTable;
            timetableAddTable= timetableContainer.find('.tableFromJSON');
            $(timetableAddTable).remove();
            timetableContainer.append('<table class="table table-hover tableFromJSON"></table>');

            var tableInfo = {};
            tableInfo.getJson = function () {
                $.getJSON('02172015.json', function (data) {
                    //console.log(data.arr);
                    tableInfo.addObject(data);
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

        //Plagin to set the date (used http://moment.js)

        function setRealDate() {
            for (var i = 0; i <= 30; ++i) {
                //console.log(sliderListDate.eq(i));
                var thisDay = sliderListDate.eq(i);
                var thisWeek = sliderListTitle.eq(i);
                var day = moment().add(i, 'days').format("MMM Do YY");
                var week = moment().add(i, 'days').format("ddd");

                $(thisDay).text(day, this);
                $(thisWeek).text(week, this);
            }
        };
        setRealDate();

    }
    ///END

    //// Attach events handlers





    Timetable.prototype.getDefaults = function () {
        return Timetable.DEFAULTS
    }

    Timetable.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)
        return options
    }

// TIMETABLE PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('timetable')
            var options = typeof option == 'object' && option

            if (!data && option == 'destroy') return
            if (!data) $this.data('timetable', (data = new Timetable(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.timetable

    $.fn.timetable             = Plugin
    $.fn.timetable.Constructor = Timetable


    // TIMETABLE NO CONFLICT
    // ==================

    $.fn.timetable.noConflict = function () {
        $.fn.timetable = old
        return this
    };
}(jQuery);

