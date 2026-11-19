import { fail } from "@sveltejs/kit";
import {
  backendUnavailableMessage,
  unavailableAction,
} from "../../lib/server/backend.js";
export function load() {
  return { message: backendUnavailableMessage };
}
export const actions = {
  default: () => {
    const result = unavailableAction();
    return fail(result.status, result.data);
  },
};
