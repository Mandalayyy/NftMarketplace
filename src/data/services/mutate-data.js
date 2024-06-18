import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";

export async function mutateData(method, path, payload) {
  const baseUrl = getStrapiURL();
  const authToken = await getAuthToken();
  const url = new URL(path, baseUrl);

  console.log(path, 'path')
  console.log(JSON.stringify({ ...payload }), 'payload')
  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...payload }),
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}