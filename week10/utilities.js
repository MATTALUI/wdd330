const fetchData = async url => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const getLocation = options => new Promise(function(resolve, reject) {
  navigator.geolocation.getCurrentPosition(resolve, reject, options);
});

const buildEarthquakeURL = ({
  latitude = '43.814540699999995',
  longitude = '-111.78491029999999',
  maxradius = '100',
  starttime = '2019-01-01',
  endtime = '2019-03-02',
}={}) => {
  const baseUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson`;

  return `${baseUrl}&starttime=${starttime}&endtime=${endtime}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxradius}`;
};

const getDataForInputs = async () => {
  const starttime = document.querySelector('input[name="starttime"]').value;
  const endtime = document.querySelector('input[name="endtime"]').value;
  const maxradius = document.querySelector('input[name="maxradius"]').value;
  if (!starttime || !endtime || !maxradius) { return; }
  console.log({ starttime, endtime, maxradius });
  const { coords } = await getLocation();
  const url = buildEarthquakeURL({
    ...coords,
     starttime,
     endtime,
     maxradius,
  });

  const earthquakeData = await fetchData(url);
  console.log(earthquakeData);

  let newHTML = ``;
  earthquakeData.features.forEach(feature => {
    newHTML += `
      <li>${feature.properties.place}</li>
    `;
  });
  document.querySelector('#quakeList').innerHTML = newHTML;
};
