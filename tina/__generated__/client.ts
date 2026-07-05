import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '3fdf001b80381950641f65f4ccb7384466354842', queries,  });
export default client;
  