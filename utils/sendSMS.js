const AfricasTalking = require("africastalking");

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: process.env.AFRICA_KEY,
  username: "sandbox",
});

exports.smsSender = async (object, phoneNumber) => {
  let messageBody = "";
  object.forEach((item) => {
    let tempBody = item.name + "\n" + item.address + "\n \n";
    messageBody += tempBody;
  });

  try {
    const result = await africastalking.SMS.send({
      to: phoneNumber,
      message: messageBody,
      from: "IGEFS",
    });
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }
};
