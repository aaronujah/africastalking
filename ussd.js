const Session = require("../models/Session");
const Session = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const fetchLocation = require("../utils/fetchLocation");
const smsSender = require("./utils/sendSMS");
const AppError = require("../utils/appError");
const User = require("./models/User");

let locationResponse = `END We'll send an SMS with Green Energy Retailer close to you`;
let locations = [];

exports.ussd = catchAsync(async (res, req, next) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";

  let user = await User.findOne({ phoneNumber: phoneNumber });

  if (!user) {
    user = await User.create(req.body);
  }

  if (text == "") {
    response = `CON Welcome to Inclusive Green Energy Portal
    1. Find Green Energy Retailers
    2. Check Your Profile`;
  } else if (text == "1") {
    // Business logic for first level response
    response = `CON Select the Location  
    1.	Barnawa
    2.	Makera
    3.	Television
    4.	Unguwan Sanusi
    5.	Narayi
    6.	Nassarawa
    7.	Sabon Tasha
    8.	Kabala
    9.	Kawo
    10.	Unguwan Dosa
    11.	Unguwar Rimi`;
  } else if (text == "2") {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    let details = `You haven't made any purchase yet`;

    if (user.purchases) details = `${JSON.stringify(user.purchase)}`;

    response = `END Here are Your details ${phoneNumber}
     ${details}`;
  } else if (text == "1*1") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("barnawa")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*2") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("makera")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*3") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("television")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*4") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("ungwan sanusi")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*5") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("narayi")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*6") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("nasarawa")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*7") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("sabon tasha")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*8") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("kabala")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*9") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("kawo")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*10") {
    const locations = await fetchLocation.fetchNameAddress(
      fetchLocation.getCloseLocations("ungwan dosa")
    );
    await smsSender(locations, phoneNumber);
    response = locationResponse;
  } else if (text == "1*11") {
    // This is a second level response where the user selected 1 in the first instance
    const location = await fetchLocation;
    // This is a terminal request. Note how we start the response with END
    response = locationResponse;
  }

  req.body.user = user._id;
  const session = await Session.create(req.body);
});
