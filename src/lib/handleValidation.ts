const bcrypt = require("bcryptjs");

export async function handleValidation(userPassword: string, password: string) {
  try {
    const result = await bcrypt.compare(userPassword, password);
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
}
