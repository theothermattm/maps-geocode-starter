const CENTER_OF_US = { lat: 39.616632, lng: -97.289999 };

/**
 * Geocode an address.
 *
 * @param {string} address
 * @returns
 */
async function getLatLong(address) {
  const geocoder = new google.maps.Geocoder();
  const latLong = await geocodeAddress(geocoder, address);
  return { latLong, address };
}

async function getLatLongs() {
  const addresses = ADDRESS_DATA;
  return Promise.mapSeries(addresses, async function (address) {
    return Promise.delay(1000).then(async function (value) {
      const geocodedAddress = await getLatLong(address);
      console.log(
        `{ address: ${
          geocodedAddress.address
        }, lat: ${geocodedAddress.latLong.lat()}, lng: ${geocodedAddress.latLong.lng()}`
      );
      return geocodedAddress;
    });
  });
}

async function getPoints() {
  let results = [];
  // first check localstorage to avoid re-geocoding
  // points
  if (!localStorage.getItem("latlongs")) {
    // if they're not there, see if you loaded them in via data.json
    const results = await Promise.all(getLatLongs());
    localStorage.setItem("latlongs", JSON.stringify(results));
  } else {
    results = JSON.parse(localStorage.getItem("latlongs"));
  }
  if (GEOCODED_ADDRESSES) {
    results = results.concat(GEOCODED_ADDRESSES);
  }

  return results;
}

async function loadMarkers(map) {
  const points = await getPoints();
  points.forEach((point) => {
    new google.maps.Marker({
      position: point.latLong,
      title: point.address,
      map,
      /* can change the image if you want
      icon : {
        url: "https://yoururl.here",
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16),
        scaledSize = new google.maps.Size(15,15),
      }
      */
      opacity: 0.8,
      optimized: true,
    });
  });
}

/**
 * Called by google maps script asyncronously to load up map
 * on page load
 */
function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: CENTER_OF_US,
    mapTypeId: "satellite",
  });

  loadMarkers(map);
}

async function geocodeAddress(geocoder, address) {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const latlng = new google.maps.LatLng(
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng()
        );
        return resolve(latlng);
      } else {
        return reject(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  });
}
