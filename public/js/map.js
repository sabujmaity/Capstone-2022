mapboxgl.accessToken = 'pk.eyJ1IjoibmlraGlsLXNpbmdoIiwiYSI6ImNsMGkwMTczMzBiamozam5taXlvMGJsbXoifQ.byMk7J01ZcOpEvZxkdKApA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v11',
  zoom: 2,
  center: [60, 15]
});
map.addControl(new mapboxgl.NavigationControl());

var pointer_on_map = [];
var full_data;
var index_num = 0;

// ################################################################################################
// below data fetching

fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json")
  .then(res => res.json())
  .then(point_data => {
    console.log(point_data);
    full_data = point_data;
    indexing(point_data, index_num , 'first');
  });

// ###############################################################################################
// below plotting the marker.

function indexing(point_data, index , class_name) {
  for (let i = 0; i < point_data.length; i++) {

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

        const popup = [];
        popup[0] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].total_vaccinations == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].total_vaccinations ) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        popup[1] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].total_boosters == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].total_boosters) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        popup[2] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].daily_vaccinations == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].daily_vaccinations) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        popup[3] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].people_vaccinated == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].people_vaccinated) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        popup[4] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].people_fully_vaccinated == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].people_fully_vaccinated) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        popup[5] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].total_vaccinations_per_hundred == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].total_vaccinations_per_hundred) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        popup[6] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].people_vaccinated_per_hundred == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].people_vaccinated_per_hundred) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        popup[7] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].people_fully_vaccinated_per_hundred == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].people_fully_vaccinated_per_hundred) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        popup[8] = new mapboxgl.Popup().setHTML("<h4 style='text-align:center; margin-bottom:10px;'>"
        + point_data[i].country
        + ": " 
        + (point_data[i].data[point_data[i].data.length - 1].total_boosters_per_hundred == undefined ? "Sorry no data" : point_data[i].data[point_data[i].data.length - 1].total_boosters_per_hundred) 
        + "</h4><hr><h5 style='text-align:center;'>Date: " 
        + point_data[i].data[point_data[i].data.length - 1].date
        + "</h5>");

        //element for the marker
        const el = document.createElement('p');
        el.className = class_name;

        //marker adding to the map.
        pointer_on_map[i] = new mapboxgl.Marker(el).setLngLat(feature.center).setPopup(popup[index]).addTo(map);
      });
      
      
    }
}

// ################################################################################################
  // removing marker
function removing_marker(pointer_on_map , full_data){
  for(let i=0 ; i < full_data.length; i++ )
    pointer_on_map[i].remove();
}

// ################################################################################################
function total_vac() {
  index_num = 0;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'first');
  
  document.getElementById("T_vac").style.background="#23297a";
  document.getElementById("T_vac").style.color="white";
  
  document.getElementById("T_boo").style.background="white";
  document.getElementById("T_boo").style.color="#23297a";
  document.getElementById("D_vac").style.background="white";
  document.getElementById("D_vac").style.color="#23297a";
  document.getElementById("P_vac").style.background="white";
  document.getElementById("P_vac").style.color="#23297a";
  document.getElementById("P_f_vac").style.background="white";
  document.getElementById("P_f_vac").style.color="#23297a";
}

function total_boo() {
  index_num = 1;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'second');
  
  document.getElementById("T_boo").style.background="#23297a";
  document.getElementById("T_boo").style.color="white";

  document.getElementById("T_vac").style.background="white";
  document.getElementById("T_vac").style.color="#23297a";
  document.getElementById("D_vac").style.background="white";
  document.getElementById("D_vac").style.color="#23297a";
  document.getElementById("P_vac").style.background="white";
  document.getElementById("P_vac").style.color="#23297a";
  document.getElementById("P_f_vac").style.background="white";
  document.getElementById("P_f_vac").style.color="#23297a";
}

function daily_vac() {
  index_num = 2;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'third');
  
  document.getElementById("D_vac").style.background="#23297a";
  document.getElementById("D_vac").style.color="white";
  
  document.getElementById("T_vac").style.background="white";
  document.getElementById("T_vac").style.color="#23297a";
  document.getElementById("T_boo").style.background="white";
  document.getElementById("T_boo").style.color="#23297a";
  document.getElementById("P_vac").style.background="white";
  document.getElementById("P_vac").style.color="#23297a";
  document.getElementById("P_f_vac").style.background="white";
  document.getElementById("P_f_vac").style.color="#23297a";
}

function people_vac() {
  index_num = 3;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'fourth');
  document.getElementById("P_vac").style.background="#23297a";
  document.getElementById("P_vac").style.color="white";
  
  document.getElementById("T_vac").style.background="white";
  document.getElementById("T_vac").style.color="#23297a";
  document.getElementById("D_vac").style.background="white";
  document.getElementById("D_vac").style.color="#23297a";
  document.getElementById("T_boo").style.background="white";
  document.getElementById("T_boo").style.color="#23297a";
  document.getElementById("P_f_vac").style.background="white";
  document.getElementById("P_f_vac").style.color="#23297a";
}

function people_fully_vac() {
  index_num = 4;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'fifth');
  document.getElementById("P_f_vac").style.background="#23297a";
  document.getElementById("P_f_vac").style.color="white";
  
  document.getElementById("P_vac").style.background="white";
  document.getElementById("P_vac").style.color="#23297a";
  document.getElementById("T_vac").style.background="white";
  document.getElementById("T_vac").style.color="#23297a";
  document.getElementById("D_vac").style.background="white";
  document.getElementById("D_vac").style.color="#23297a";
  document.getElementById("T_boo").style.background="white";
  document.getElementById("T_boo").style.color="#23297a";
}

function analysis_1_func() {
  index_num = 5;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'sixth');
}

function analysis_2_func() {
  index_num = 6;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'seventh');
}

function analysis_3_func() {
  index_num = 7;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'eight');
}

function analysis_4_func() {
  index_num = 8;
  removing_marker(pointer_on_map,full_data);
  indexing(full_data, index_num , 'nine');
}

document.getElementById("T_vac").addEventListener("click", total_vac);
document.getElementById("T_boo").addEventListener("click", total_boo);
document.getElementById("D_vac").addEventListener("click", daily_vac);
document.getElementById("P_vac").addEventListener("click", people_vac);
document.getElementById("P_f_vac").addEventListener("click", people_fully_vac);
document.getElementById("analysis_1").addEventListener("click", analysis_1_func);
document.getElementById("analysis_2").addEventListener("click", analysis_2_func);
document.getElementById("analysis_3").addEventListener("click", analysis_3_func);
document.getElementById("analysis_4").addEventListener("click", analysis_4_func);