import { authClient } from "./auth-client";

export const getClientToken = async () => {
    const { data: tokenData, error } = await authClient.token();
    if (error) {
        console.error("Error getting token:", error);
        return;
    }
    return tokenData;
}