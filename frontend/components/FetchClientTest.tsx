"use client";

import { $fetch } from "@/app/lib/$fetch";

export const FetchClientTest = () => {
  console.log(process.env.API_URL);

  return (
    <div
      onClick={async () => {
        const resp = await $fetch();

        console.log(await resp.json());
      }}
    >
      <h1>Fetch Test</h1>
    </div>
  );
};
