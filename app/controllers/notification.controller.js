const webpush = require("web-push");
exports.pushNot =async (req, res) => {
  try {
    const publicVapidKey =
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
    const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

    webpush.setVapidDetails(
      "mailto:test@test.com",
      publicVapidKey,
      privateVapidKey
    );

    const subscription = req.body.body;
    const bodyNotification = req.body.bodyNotification;
    // console.log("subsciptttttt",JSON.parse(subscription))

    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Notification" , bodyNotification:bodyNotification });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(JSON.parse(subscription), payload)
      .catch(err => console.error(err));
        
            // 
  } catch (error) {
      console.log(error)
  }
    
};