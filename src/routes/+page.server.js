import { error, fail, redirect } from "@sveltejs/kit";
import { previewWorkspace } from "../lib/server/preview.js";
import { unavailableAction } from "../lib/server/backend.js";
export function load({ url }) {
  const data = previewWorkspace(url.searchParams);
  if (url.searchParams.has("project") && !data.project)
    error(404, "Project unavailable");
  return data;
}
function backendUnavailable() {
  const result = unavailableAction();
  return fail(result.status, result.data);
}
export const actions = {
  mutate: backendUnavailable,
  logout: () => redirect(303, "/login"),
};
