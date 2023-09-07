import { readable } from "svelte/store";
import { Configuration, V1Api } from "./api";

const HOST_PROTOCOL = "http";
export const HOST_NAME = "localhost";
export const HOST_PORT = "8000";

const api_config = new Configuration();
export const API_V1 = new V1Api(
  api_config,
  `${HOST_PROTOCOL}://${HOST_NAME}:${HOST_PORT}`
);
