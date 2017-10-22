 (function($) {
	var Calendar = function(element, options) {
		this.agendaElem = element;
        
        var newDate = new Date();
        var day = newDate.getDate();
        var month = newDate.getMonth();
        var year = newDate.getFullYear();
        
        this.today = new Date(newDate.getTime());
        this.today.setHours(0,0,0,0);
        
        this.firstDate = new Date(year, month, 1);
        this.lastDate = new Date(year, month + 1, 0);
        
        this.occupiedDays = [];
        
        this.dayNames = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
        this.monthNames = ["Janvier", "FÃ©vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "AoÃ»t", "Septembre", "Octobre", "Novembre", "DÃ©cembre"];
		
		this.getEventsAndRender();
	};
 
	Calendar.prototype = {
		constructor: Calendar,
		getEventsAndRender: function() {
			var events = [];
            var that = this;
			
            $.ajax({
                url: "https://content.googleapis.com/calendar/v3/calendars/m6t1df6s0fbnuhulearfu44cmo%40group.calendar.google.com/events?key=AIzaSyAuYs5D3rOhEiOI8LWPJpFBoCJNJbvWJpY",
                data: {
                    "timeMin": this.firstDate.toISOString(),
                    "timeMax": this.lastDate.toISOString()
                }
            }).then(function(data) {
                console.log(data);
                if (data.items.length > 0) {
                    for (var e in data.items) {
                        var eventStartDate = new Date(data.items[e].start.date);
                        eventStartDate.setHours(0,0,0,0);
                        events.push(eventStartDate);
                    }
                }
                
                that.render(events);
            });
		},
        previousDate: function() {
            console.log(this.firstDate.setMonth(this.firstDate.getMonth()-1);
        },
        render: function(occupiedDays) {
            this.agendaElem.empty();

            // display agenda header
            var headerRow = $(document.createElement('div'));
            headerRow.addClass('row');
            this.agendaElem.append(headerRow);
            
            // previous month
            var prevElem = $(document.createElement('div'));
            prevElem.addClass('btn');
			prevElem.text(this.today.getFullYear() + ' - ' + this.monthNames[this.today.getMonth() - 1] + " <");
            prevElem.onclick = function(this.previousDate());
            headerRow.append(prevElem);

            // today
            var todayElem = $(document.createElement('span'));
            todayElem.addClass('btn');
			todayElem.text(this.today.getFullYear() + ' - ' + this.monthNames[this.today.getMonth()]);
            todayElem.onclick = function(this.previousDate());
			headerRow.append(todayElem);

            // next month
            var nextElem = $(document.createElement('div'));
            nextElem.addClass('btn');
			nextElem.text("> " + this.today.getFullYear() + ' - ' + this.monthNames[this.today.getMonth() + 1]);
            nextElem.onclick = function(this.previousDate());
            headerRow.append(nextElem);
            
            // display name of the day
            var dayNameRow = $(document.createElement('div'));
            dayNameRow.addClass('row');
            for(var d = 0; d < 7; d++){
                var headerCell = $(document.createElement('div'));
                headerCell.addClass('col border border-left-0 border-right-0 border-top-0 border-dark');
                headerCell.text(this.dayNames[d]);
                dayNameRow.append(headerCell);
            }
            this.agendaElem.append(dayNameRow);

            var currentDate = new Date(this.firstDate.getTime());
            while (currentDate.getDay() != 1) {
                currentDate.setDate(currentDate.getDate() - 1);
            }

            while (currentDate <= this.lastDate) {
                var row = $(document.createElement('div'));
                row.addClass('row');

                do {
                    var cell = $(document.createElement('div'));
                    cell.addClass('col border border-top-0 border-dark');
                    if (currentDate.getDay() != 1) {cell.addClass('border-left-0');}
                    cell.addClass('day');
                    
                    if (currentDate < this.firstDate) {
                        cell.addClass('previous');
                    } else if(currentDate > this.lastDate) {
                        cell.addClass('futur');
                    } else {
                        if(occupiedDays.length > 0) {
                            for(var o in occupiedDays){
                                if(currentDate.getTime() == occupiedDays[o].getTime()) {
                                    cell.addClass('occupied');
                                    break;
                                }
                            }
                        }
                        
                        // today
                        if(currentDate.getTime() == this.today.getTime()){
                            cell.addClass('bg-warning');
                        }
                        
                        cell.text(currentDate.getDate());
                    }
                    
                    row.append(cell);
                    
                    currentDate.setDate(currentDate.getDate() + 1);
                } while(currentDate.getDay() != 1)
            
                this.agendaElem.append(row);
            }
        }
    }
    
    $.fn.calendar = function (options) {
		var calendar = new Calendar($(this) ,options);
		$(this).data('calendar', calendar);
		return calendar;
	}
 }(window.jQuery));