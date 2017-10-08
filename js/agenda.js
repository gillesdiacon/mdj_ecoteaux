$(function() {
    var agendaElem = $('#calendar');
    agendaElem.empty();
    
    var occupiedDays = [];
    var dayNames = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
    var monthNames = ["Janvier", "FÃ©vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "AoÃ»t", "Septembre", "Octobre", "Novembre", "DÃ©cembre"];
    
    var newDate = new Date();
    var day = newDate.getDate();
    var month = newDate.getMonth();
    var year = newDate.getFullYear();
    var today = new Date(newDate.getTime());
    today.setHours(0,0,0,0);
    
    var firstDate = new Date(year, month, 1);
    
    var currentDate = new Date(firstDate.getTime());
    var lastDate = new Date(year, month + 1, 0);
    
    // display agenda header
    var headerRow = $(document.createElement('div'));
    headerRow.addClass('row');
    for(var d = 0; d < 7; d++){
        var headerCell = $(document.createElement('div'));
        headerCell.addClass('col border border-left-0 border-right-0 border-top-0 border-dark');
        headerCell.text(dayNames[d]);
        headerRow.append(headerCell);
    }
    agendaElem.append(headerRow);

    while (currentDate.getDay() != 1) {
        currentDate.setDate(currentDate.getDate() - 1);
    }

    while (currentDate <= lastDate) {
        var row = $(document.createElement('div'));
        row.addClass('row');

        do {
            var cell = $(document.createElement('div'));
            cell.addClass('col border border-top-0 border-dark');
            if (currentDate.getDay() != 1) {cell.addClass('border-left-0');}
            cell.addClass('day');
            
            if (currentDate < firstDate) {
                cell.addClass('previous');
            } else if(currentDate > lastDate) {
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
                if(currentDate.getTime() == today.getTime()){
                    cell.addClass('bg-warning');
                }
                
                cell.text(currentDate.getDate());
            }
            
            row.append(cell);
            
            currentDate.setDate(currentDate.getDate() + 1);
        } while(currentDate.getDay() != 1)
    
        agendaElem.append(row);
    }
});
 