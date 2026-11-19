import { headers } from "next/headers";
import { auth } from "./auth";

export const getServerToken = async () => {
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    });

    if (!jwtToken) {
        console.error("Error getting token:");
        return;
    }


    return jwtToken;
}