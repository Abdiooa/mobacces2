const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const port = 3000;

const accountSid = "AC5f89515f802f77c84650fd0e8e91ebcf";
const authToken = "52b70552d2728788407370c413a600ba";
const twiliPhone = "+17753105975";

const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

const emergencyMessage = {
  Accident: "Ce message est un test pour le cas accident",
  Fire: "Ce message est un test pour le cas feu",
  Flood: "Ce message est un test pour le cas inondation",
  Medical: "Ce message est un test pour le cas urgence",
};

app.post("/send-sms", async (req, res) => {
  const { type, location } = req.body;

  // Validate type
  if (!type || !emergencyMessage[type]) {
    return res.status(400).json({ error: "Invalid emergency type." });
  }

  // Validate location
  if (!location || !location.latitude || !location.longitude) {
    return res.status(400).json({ error: "Invalid location data." });
  }

  const { latitude, longitude } = location;

  // Append coordinates to the emergency message
  const messageBody = `${emergencyMessage[type]}. Localisation : https://www.google.com/maps?q=${latitude},${longitude}`;

  try {
    const message = await client.messages.create({
      from: twiliPhone,
      to: "+25377726902", // Replace with the recipient's phone number
      body: messageBody,
    });
    console.log(`Message sent: ${message.sid}`);
    res.status(200).json({ message: "SMS sent successfully!" });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ error: "Failed to send SMS." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://192.168.177.157:${port}`);
});
