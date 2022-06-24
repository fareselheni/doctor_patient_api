const axios = require("axios")
const db = require("../models");
const Paiement = db.paiement;

module.exports = {
    Add: async (req, res)=>{
        const url = "https://developers.flouci.com/api/generate_payment"

        const payload = {
        
            "app_token": process.env.PUBLIC_KEY, 
            "app_secret": process.env.SECRET_Key   ,
            "amount": req.body.amount,
            "accept_card": "true",
            "session_timeout_secs": 1200,
            "success_link": "http://localhost:8080/paiementSuccess",
            "fail_link": "http://localhost:8080/paiementFail",
            "developer_tracking_id": process.env.DEV_TRACKING_ID

        }
      await axios
      .post(url ,payload )
      .then(result =>{
        console.log(result.data.result.link)
          res.send(result.data)
          //saving to DB
          const paiement = new Paiement({
            amount: req.body.amount,
            doctor_id: req.body.doctor_id,
            user_id: req.body.user_id,
            accept_card: true,
            payment_id:result.data.result.payment_id,
            link:result.data.result.link
          });
          paiement.save((err, notification) => {
            if (err) {
              res.status(500).send({ message: err });
              return ;
              
            }
            console.log("Paiement was added successfully!")
            // res.send({ message: "Paiement was added successfully!" });
          });
          //close saving to DB
      })
      .catch(err => console.log(err) )
    },


    verify: async (req, res)=>{
        const payment_id = req.params.id;
       
      await  axios.get(`https://developers.flouci.com/api/verify_payment/${payment_id}`,
        
     {   headers : {
             'Content-Type' : 'application/json',
            'apppublic' : process.env.PUBLIC_KEY,
            'appsecret' : process.env.SECRET_KEY
        }
    }
        )
        .then(result=>{
            res.send({ allevents: result.data })
        })
        .catch(err=> {
            console.log(err.message)
        } )
    },

    getPaiementbyPaymentId: async (req, res)=>{
      const payment_id =req.params.id
      try {
            await Paiement.find(
              {
              },
              (err, paiement) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                  res.send(paiement);
                }).where('payment_id').equals(payment_id).clone();
      } catch (error) {
          console.log(error)
      }
  },

  updatePaiementByPaiementId : async (req, res) => {
    paiement_id=req.body.paiement_id
    console.log("id",req.body)
    Paiement.findOneAndUpdate({"payment_id":paiement_id}
    ,{
    "status": req.body.status,
    }
    , function(err, result){
  
      if(err){
          res.send(err)
      }
      else{
          res.send(result)
      }
  
  });

  }
}