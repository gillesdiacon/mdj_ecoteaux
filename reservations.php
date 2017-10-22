<?php
    date_default_timezone_set('Europe/Zurich');
    $oneDayInterval = new DateInterval('P1D');
    
    $monthNames = array("Janvier", "FÃ©vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "AoÃ»t", "Septembre", "Octobre", "Novembre", "DÃ©cembre");

    $firstDay = new DateTime('first day of this month');
    $firstDay->setTime(0,0,0);
    
    $lastDay = new DateTime('last day of this month');
    $lastDay->setTime(0,0,0);
    
    // var_dump($firstDate);
    // var_dump($lastDate);
    
    $reservations = array();

    $URL = "https://content.googleapis.com/calendar/v3/calendars/95spt10gpm94rldcija038leo4@group.calendar.google.com/events?key=AIzaSyAuYs5D3rOhEiOI8LWPJpFBoCJNJbvWJpY";
    $dataStr = file_get_contents($URL);
    if (!empty($dataStr)) {
        $data = json_decode($dataStr);
        
        if(!empty($data->items)){
            foreach($data->items as $event){
                // var_dump($event); 
                
                $start = new DateTime($event->start->date);
                $end = new DateTime($event->end->date);
                //var_dump($start);
                //var_dump($end);
                
                $period = new DatePeriod($start, $oneDayInterval, $end);
                //var_dump($period);

                foreach($period as $dt){
                    array_push($reservations, $dt);
                }
                array_push($reservations, $end);
                
                // var_dump($reservations);
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" type="image/png" href="mdj.png" />
    
        <title>Maison des Jeunes d'Ecoteaux - Réservations</title>
    
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
        <link href="css/mdj.css" rel="stylesheet">
    </head>
    <body>
        <div class="container text-center">
    
            <div class="masthead bg-dark mb-3">
                <h3 class="text-light text-center pt-3">
                    <img src="img/logo_neg.png" width="30" height="33" class="d-inline-block align-top mr-3" alt="Maison des jeunes">
                    Maison des Jeunes d'Ecoteaux
                </h3>
                <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-3">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav text-md-center nav-justified w-100">
                            <li class="nav-item">
                                <a class="nav-link" href="index.html">Accueil <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="contacts.html">Contacts</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="gallery.html">Gallerie Photos</a>
                            </li>
                            <li class="nav-item active">
                                <a class="nav-link" href="reservations.html">Réservations</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            
            <div class="my-4">
                <span class="text-uppercase font-weight-bold h5 border border-dark p-2">Réservations</span>
            </div>
            
            <div class="container agenda">
                <div id="calendar">
                    <div class="row">
                        <div class="col border border-left-0 border-right-0 border-top-0 border-dark">Lun</div>
                        <div class="col border border-left-0 border-right-0 border-top-0 border-dark">Mar</div>
                        <div class="col border border-left-0 border-right-0 border-top-0 border-dark">Mer</div>
                        <div class="col border border-left-0 border-right-0 border-top-0 border-dark">Jeu</div>
                        <div class="col border border-left-0 border-right-0 border-top-0 border-dark">Ven</div>
                        <div class="col border border-left-0 border-right-0 border-top-0 border-dark">Sam</div>
                        <div class="col border border-left-0 border-right-0 border-top-0 border-dark">Dim</div>
                    </div>
                    <?php
                        $today = new DateTime();
                        $today->setTime(0,0,0);
                    
                        $firstMonday = clone $firstDay;
                        $firstMonday->modify('last Monday');

                        $lastMonday = clone $lastDay;
                        $lastMonday->modify('first Monday');
                        
                        $currentPeriod = new DatePeriod($firstMonday, $oneDayInterval, $lastMonday);
                        foreach($currentPeriod as $currentDate){
                            if($currentDate->format('w') == '1') {
                                echo "<div class='row'>";
                            }
                            
                            $class = "col border border-top-0 border-dark";
                            if($currentDate->format('w') != '1') {
                                $class .= "  border-left-0";
                            }
                            
                            // today
                            if($currentDate == $today){
                                $class .= "  bg-warning";
                            }
                            
                            if($currentDate < $firstDay){
                                echo "<div class='$class previous'>&nbsp;</div>";
                            }else if($currentDate > $lastDay){
                                echo "<div class='$class future'>&nbsp;</div>";
                            }else{
                                //reservations
                                if(in_array($currentDate, $reservations)){
                                    $class .= " occupied";
                                }
                                
                                echo "<div class='$class'>";
                                    echo $currentDate->format('j');
                                echo "</div>";
                            }
                            
                            if($currentDate->format('w') == '0') {
                                echo "</div>";
                            }
                        }
                    ?>
                </div>
            </div>
        
            <footer class="bg-dark px-3 mt-5">
                <p class="text-muted p-3">&copy; 2017 - Maison des Jeunes</p>
            </footer>
    
        </div>
    
        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
        <!-- Just to make our placeholder images work. Don't actually copy the next line! -->
        <!-- <script src="../../../../assets/js/vendor/holder.min.js"></script> -->
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script src="js/ie10-viewport-bug-workaround.js"></script>
        <script src="js/agenda.js"></script>
        
        <script type="text/javascript">
            $(document).ready(function() {
                $('#calendar').calendar();
            });
        </script>
        
        <!-- <script src='https://apis.google.com/js/client.js?onload=getEventList'></script> -->
        
        <!--
        <script async defer src="https://apis.google.com/js/api.js"
            onload="this.onload=function(){};getEventList()"
            onreadystatechange="if (this.readyState === 'complete') this.onload()">
        </script>
        -->
    </body>
</html>
