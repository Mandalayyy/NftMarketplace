import { cookies } from "next/headers";

export function getAuthTokenData() {
  const authToken = cookies().get("jwt")?.value;
  return authToken;
}