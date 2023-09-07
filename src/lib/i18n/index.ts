import {
  addMessages,
  getLocaleFromNavigator,
  init,
  register,
} from "svelte-i18n";

import en from "./en.json";

addMessages("en", en as any);
//register("en", () => import("./en.json"));

console.log("Initializing i18n...");
init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});

export { _ } from "svelte-i18n";
