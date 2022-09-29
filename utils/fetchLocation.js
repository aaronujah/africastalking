const axios = require("axios");
const YOUR_API_KEY = process.env.GOOGLE_API_KEY;

module.exports.getCloseLocations = (queryString) => {
  const formattedString = queryString.replaceAll(" ", "%20");
  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=solar%20${formattedString}%20kaduna&key=${YOUR_API_KEY}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return [];
    });
};

module.exports.fetchNameAddress = (object) => {
  let formattedObject = [];
  let miniObject = object.results;
  miniObject.forEach((item) => {
    if (item.name) {
      formattedObject.push({
        name: item.name,
        address: item.formatted_address,
      });
    }
  });

  return formattedObject;
};
