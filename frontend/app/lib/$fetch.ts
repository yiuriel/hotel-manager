export const $fetch = async (endpoint: string = "") => {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.API_URL // Server-side
      : process.env.NEXT_PUBLIC_API_URL; // Client-side
  return fetch(`${baseUrl}${endpoint}`);
};
