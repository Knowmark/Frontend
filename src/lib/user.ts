import { writable } from "svelte/store";
import { type UserResponse } from "./api";
import { API_V1 } from "./const";
import { push } from "svelte-spa-router";

export interface User extends UserResponse {}

const stored_user = localStorage.getItem("user");
export const user = writable<User | null>(
  stored_user ? JSON.parse(stored_user) : null
);
user.subscribe((u) => {
  if (u) {
    localStorage.setItem("user", JSON.stringify(u));
  } else {
    localStorage.removeItem("user");
  }
});

export function logout() {
  push("/");
  user.set(null);
  API_V1.userLogout({
    withCredentials: true,
  });
}
