$(function() {
    var agendaElem = $('#calendar');
    
    var occupiedDays = [];
    
    var today = new Date();
    var month = today.getMonth();
    var year = today.getFullYear();
    
    var firstDate = new Date(year, month, 1);
    //for(var d = 1; d < 8; d++) {

    // thead.append(headerRow);
    // table.append(thead);

    /* Days */
    var currentDate = new Date(firstDate.getTime());
    var lastDate = new Date(year, month + 1, 0);

    while (currentDate.getDay() != 1) {
        currentDate.setDate(currentDate.getDate() - 1);
    }

    while (currentDate <= lastDate) {
        var row = $(document.createElement('div')).addClass('row');

        do {
            var cell = $(document.createElement('div')).addClass('col');
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
            
                var cellContent = $(document.createElement('div'));
                cellContent.addClass('day-content');
                cellContent.text(currentDate.getDate());
                cell.append(cellContent);
            }
            
            row.append(cell);
            
            currentDate.setDate(currentDate.getDate() + 1);
        } while(currentDate.getDay() != 1)
    
        agendaElem.append(row);
    }
});
 