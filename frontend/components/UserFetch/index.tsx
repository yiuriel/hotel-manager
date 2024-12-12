"use client";
import { fetchUsers } from "../../app/server";

export default function MyButton() {
  return (
    <button
      onClick={async () => {
        const users = await fetchUsers();
        console.log(users);
      }}
    >
      Fetch Users
    </button>
  );
}
