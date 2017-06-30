/* 
  # Mohamed Elshorbagy
  # 30 / 6 / 2017
  # EarthQuakes Visualization 
  # API Used : Mapbox.js


*/

// Global Variables 

var mapImage;

var earthquakes;

var clat = 0;
var clon = 0;
var zoom = 1;
var mapWidth = 1024;
var mapHeight = 512;

//   lat       ,     long
// 31.267401 N , 121.522179 E 

// Just for Test
var lat = 31.267401;
var lon = 121.522179;


function preload() {

mapImage =   mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    clat + ',' + clon + ',' + zoom + '/' +
    mapWidth + 'x' + mapHeight +
    '?access_token=pk.eyJ1Ijoic2hvcmJhZ3kiLCJhIjoiY2o0ang4eDVuMHFmNDMzcDJ1dGE3ZGxtbSJ9.C1dOjUPhWScpWRq6FliMDQ');

earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');


}


function mercX(lon) {
  lon = radians(lon);

  var a = (256 / PI) * pow(2 , zoom) ;
  var b = (lon + PI);

  return a * b;



}


function mercY(lat) {
  lat = radians(lat);

var a = (256 / PI) * pow(2 , zoom);
var b = tan(PI/4 + lat/2);
var c = PI - log(b);

return a * c;




}






function setup() {

  createCanvas(1024,512);
  translate(width / 2 , height /2);
  imageMode(CENTER);
  image(mapImage , 0 , 0);






  for (var i = 0 ; i < earthquakes.length ;i++) {
    var data = earthquakes[i].split(/,/);
    // console.log(data);
    var cx = mercX(clon);
    var cy = mercY(clat);


    var x = mercX(data[2]) - cx;
    var y = mercY(data[1]) - cy;
    var mag = data[4];


    var d = map(mag , 0 , 10 , 0 , 15)
    stroke(255 , 0 , 255);
    fill(255 , 0 , 255 , 200);
    ellipse(x , y , d , d);



  }







} 

