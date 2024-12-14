import { $fetch } from "@/app/lib/$fetch";
import { FetchClientTest } from "./FetchClientTest";

export default async function FetchTest() {
  try {
    // const resp = await fetch("https://api.vercel.app/blog", {
    const resp = await $fetch();

    console.log(await resp.json());
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Fetch Test</h1>
      <FetchClientTest />
    </div>
  );
}
