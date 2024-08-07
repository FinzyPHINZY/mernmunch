const { exec } = require("child_process");

const forwardTo =
  process.env.NODE_ENV === "production"
    ? "mernmunch.onrender.com/api/order/checkout/webhook"
    : "localhost:7000/api/order/checkout/webhook";

exec(`stripe listen --forward-to ${forwardTo}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing stripe listen: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stripe CLI stderr: ${stderr}`);
  }
  console.log(`Stripe CLI stdout: ${stdout}`);
});

// "stripe": "stripe listen --forward-to localhost:7000/api/order/checkout/webhook",
