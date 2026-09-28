import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET",
});


async function test() {
  try {
    const result = await razorpay.plans.all();

    console.log("CONNECTED");
    console.log(result);

  } catch (err) {
    console.log(err.error);
  }
}

test();

