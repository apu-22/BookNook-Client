import { authClient } from "./auth-client";

export const getClientToken = async () => {
  try {
    const { data: tokenData, error } = await authClient.token();
    if (error) {
      console.error("Error getting token:", error);
      return null;
    }
    return tokenData;
  } catch (error) {
    console.error("Exception getting client token:", error);
    return null;
  }
};
