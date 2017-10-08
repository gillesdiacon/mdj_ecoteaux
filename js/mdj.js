function mapCallback() {
    var mdj = {lat: 46.544757, lng: 6.856971};
    var map = new google.maps.Map(
        document.getElementById('map'), 
        {
            zoom: 15,
            center: mdj
        }
    );
    var marker = new google.maps.Marker({
        position: mdj,
        map: map
    });
}