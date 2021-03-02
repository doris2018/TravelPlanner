function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 },
    });
    directionsRenderer.setMap(map);
    document.getElementById("submit").addEventListener("click", () => {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
   /* const waypts = []; */
    var first=new google.maps.LatLng(34.052235, -118.243683);
    var second=new google.maps.LatLng(42.496403,-124.413128);
    var third=new google.maps.LatLng(47.608013, -122.335167); 
  /*   const checkboxArray = document.getElementById("waypoints");  */
  /*   var checkboxArray = [first]; */
   
  
  /*   for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypts.push({
          location: checkboxArray[i].value,
          stopover: true,
        });
      }
    }
    */
    directionsService.route(
      {
        /* origin: document.getElementById("start").value,  */
        origin: new google.maps.LatLng(41.881832,  -87.623177), 
        destination: new google.maps.LatLng(49.246292, -123.116226), 
  /*       waypoints: waypts, */
       
        waypoints: [{location: first, stopover: true},
                    {location: second, stopover: true},
                    {location: third, stopover: true}], 
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK" && response) {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          const summaryPanel = document.getElementById("directions-panel");
          summaryPanel.innerHTML = "";
  
          // For each route, display summary information.
          for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;
            summaryPanel.innerHTML +=
              "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
          }
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  