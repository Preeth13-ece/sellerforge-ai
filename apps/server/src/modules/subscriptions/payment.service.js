import Razorpay from "razorpay";

import { env } from "../../config/env.js";
import { ApiError } from "../../utils/ApiError.js";

import { User } from "../users/user.model.js";
import { Subscription } from "./subscription.model.js";


let razorpayClient = null;



function getRazorpay(){


  console.log("Razorpay Config:",{

    keyId:
      env.razorpay.keyId,

    secret:
      env.razorpay.keySecret
        ? "FOUND"
        : "MISSING",

    planPro:
      env.razorpay.planPro,

    planBusiness:
      env.razorpay.planBusiness

  });



  if(
    !env.razorpay.keyId ||
    !env.razorpay.keySecret
  ){

    throw ApiError.internal(
      "Razorpay credentials missing"
    );

  }



  if(!razorpayClient){

    razorpayClient =
      new Razorpay({

        key_id:
          env.razorpay.keyId,

        key_secret:
          env.razorpay.keySecret

      });

  }



  return razorpayClient;

}





export const PLANS=[


{
 id:"free",
 name:"Free",
 priceMonthly:0,
 credits:env.credits.free
},


{
 id:"pro",
 name:"Pro",
 priceMonthly:19,
 credits:env.credits.pro,
 razorpayPlanId:
   env.razorpay.planPro
},


{
 id:"business",
 name:"Business",
 priceMonthly:49,
 credits:env.credits.business,
 razorpayPlanId:
   env.razorpay.planBusiness
}


];






export async function createCheckoutSession(
 user,
 planId
){


 console.log(
   "Creating checkout for:",
   user?._id,
   planId
 );


 if(!user){

   throw ApiError.unauthorized(
     "Login required"
   );

 }



 const plan =
   PLANS.find(
    p=>p.id===planId
   );



 if(!plan){

   throw ApiError.badRequest(
     "Invalid plan selected"
   );

 }



 if(!plan.razorpayPlanId){

   throw ApiError.badRequest(
     "Razorpay plan ID missing"
   );

 }



 const razorpay =
   getRazorpay();




 try{


 const subscription =
 await razorpay.subscriptions.create({


   plan_id:
     plan.razorpayPlanId,


   customer_notify:1,


   total_count:1200,


   notes:{


    userId:
      user._id.toString(),


    planId,


    userName:
      user.name || ""

   }


 });



 return subscription;



 }catch(error){


 console.error(
   "Razorpay Error:",
   error
 );


 throw ApiError.internal(
   error.message
 );


 }



}







export async function handleWebhookEvent(event){


 console.log(
   "Webhook event:",
   event.event
 );



 switch(event.event){


 case "subscription.charged":{


 const subscription =
 event.payload.subscription.entity;



 const userId =
 subscription.notes?.userId;



 const planId =
 subscription.notes?.planId;



 if(userId && planId){


 await User.findByIdAndUpdate(

 userId,

 {

 plan:planId,

 "credits.limit":
 env.credits[planId] ??
 env.credits.free

 }

 );



 await Subscription.findOneAndUpdate(

 {
 userId
 },

 {

 plan:planId,

 providerSubscriptionId:
 subscription.id,

 status:"active"

 },

 {
 upsert:true
 }

 );


 }


 break;

 }




 case "subscription.cancelled":{


 const subscription =
 event.payload.subscription.entity;



 const record =
 await Subscription.findOne({

 providerSubscriptionId:
 subscription.id

 });



 if(record){


 record.status="canceled";

 record.plan="free";


 await record.save();


 await User.findByIdAndUpdate(

 record.userId,

 {

 plan:"free",

 "credits.limit":
 env.credits.free

 }

 );


 }



 break;

 }



 default:
 break;


 }



 return {
 received:true
 };


}







export async function cancelSubscription(user){


const record =
await Subscription.findOne({

userId:user._id

});



if(!record){

 throw ApiError.badRequest(
 "No subscription found"
 );

}



const razorpay =
getRazorpay();



await razorpay.subscriptions.cancel(

record.providerSubscriptionId

);



record.status="canceled";

record.plan="free";


await record.save();



await User.findByIdAndUpdate(

user._id,

{

plan:"free",

"credits.limit":
env.credits.free

}

);


}
