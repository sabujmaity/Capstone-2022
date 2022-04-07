mapboxgl.accessToken = 'abc';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 2,
  center: [60, 15]
});

// ################################################################################################
// below data fetching

fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json")
  .then(res => res.json())
  .then(point_data => {
    // console.log(point_data);
    indexing(point_data);
  });

  // ###############################################################################################
  // below plotting the marker.

function indexing(point_data) {
  for (let i = 0; i < point_data.length; i++) {
    // console.log(haha[i].data[last_element].daily_vaccinations);

    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding
      .forwardGeocode({
        query: point_data[i].country,
        autocomplete: false,
        limit: 1
      })
      .send()
      .then((response) => {
        if (
          !response ||
          !response.body ||
          !response.body.features ||
          !response.body.features.length
        ) {
          console.error('Invalid response:');
          console.error(response);
          return;
        }
        const feature = response.body.features[0];
        // console.log(feature.center[0]);


        // popup data 
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          point_data[i].country + '\'s Daily Vaccinations : '+ point_data[i].data[point_data[i].data.length-1].daily_vaccinations
      );
      
      //element for the marker
      const el = document.createElement('p');
          
        //marker adding to the map.
        new mapboxgl.Marker(el).setLngLat(feature.center).setPopup(popup).addTo(map);
      });


  }
}
