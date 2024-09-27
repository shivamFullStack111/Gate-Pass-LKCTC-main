const JWT_SECRET = "dehghdbhubchjdbuchgdcuy767t";

async function sendPushNotification(expoPushToken, title, body, data) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: data,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(message),
  });
}

module.exports = { JWT_SECRET, sendPushNotification };
