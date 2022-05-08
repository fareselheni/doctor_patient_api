
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.createRoom =async () => {
  // var ts = Math.round(new Date().getTime() / 1000);
// var tsTmrw = ts + (24 * 3600);
// console.log("tsYesterday",tsYesterday)
      // we'll add 30 min expiry (exp) so rooms won't linger too long on your account
  // we'll also turn on chat (enable_chat)
  // see other available options at https://docs.daily.co/reference#create-room
  const exp = Math.round(Date.now() / 1000) + 60 * 30;
  const options = {
    properties: {
      exp,
      enable_chat: true,
    },
  };
  // This endpoint is using the proxy as outlined in netlify.toml
  const response = await fetch(`https://api.daily.co/v1/rooms/`, {
    method: "POST",
    body: JSON.stringify(options),
    // TODO: uncomment the headers below if you are using the "Create and join room" button locally. You will also need to remove the :disabled attribute from the button itself in Home.vue so it is clickable.
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 799ed646c059935da1dc4074f918f7536f71bbea7c0e96df01e5917bea303d43",
    },
  });
  const room = await response.json();
  return room;
       
};



