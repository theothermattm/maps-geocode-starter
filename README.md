# Sample Geocoder and Point Plotter for Google Maps Javascript API

Intended to get you going fast when you need to plot points on a map based on address. I found Google Maps' samples
didn't quite nail this, especially since if you have a long list of points you quickly hit usage limits with
Google's Geocoding API's

This sample is based on samples from:
https://github.com/googlemaps/js-samples.

It will take in a set of US addresses in `data.js`, geocode them,
then plot them on a map of the US.

The project is intelligent enough to avoid Geocoding if you already have points in the `data.js`
file and will store the geocoded information in localstorage to avoid many calls to the Google Geocoding
API which has some pretty strict API usage limits.

## To get started

[Register an API key for Google Maps](https://developers.google.com/maps/documentation/maps-static/get-api-key).  
Your ID will need permissions for the `Maps Javascript API` and `Geocoding API`

Put your API at the bottom of `index.html` in the `<script>` tag which pulls in the Google Maps API.

Then `cp data/data.js.template data/data.js` populate your data in `data/data.js`.

Then load it up in your browser.
