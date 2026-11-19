import { headers } from "next/headers";
import { auth } from "./auth";

export const getServerToken = async () => {
  try {
    const jwtToken = await auth.api.getToken({
      headers: await headers(),
    });

    if (!jwtToken) {
      console.error("Error getting server token");
      return null;
    }

    return jwtToken;
  } catch (error) {
    console.error("Exception getting server token:", error);
    return null;
  }
};
