# satellite-tracker
Satellite tracker allows you to track the internatonal space station on a world map. 
This was built as a mini-project and based on the challenge set [Challenge Overview](https://gist.github.com/DeepNeuralAI/f1feb391544492012cd0705fadd85ec5 "here").

This project grabs data from the [Where the ISS at API](https://wheretheiss.at/w/developer ""Where the ISS at?"") API and is written in javascript.

[Leaflet](https://leafletjs.com "Leaflet.js") was used to create the map, and it was filled with tiles from [Open Source Street Map](https://www.openstreetmap.org "Open source street map").

It then renders the current latitude and logitude of the ISS onto a map, and re-connects to the API every 5 seconds to update the position of the icon on the map. 

It tracks the path the ISS has taken since you loaded the page, and draws a red path across the map.