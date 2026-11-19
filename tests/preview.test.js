import { test } from "node:test";
import assert from "node:assert/strict";
import { previewWorkspace } from "../src/lib/server/preview.js";
import { backendStatus, unavailableAction } from "../src/lib/server/backend.js";
test("client preview omits internal work and contact records", () => {
  const data = previewWorkspace(
    new URLSearchParams({ role: "client", project: "1", view: "clients" }),
  );
  assert.equal(data.owner, false);
  assert.equal(data.view, "overview");
  assert.deepEqual(data.clients, []);
  assert.equal(data.tasks.length, 1);
  assert.equal(data.tasks[0].visible, 1);
  assert.equal(data.canWrite, false);
});
test("preview requests cannot mutate the shared fixture", () => {
  const first = previewWorkspace(new URLSearchParams({ project: "1" }));
  first.projects[0].name = "Changed";
  first.tasks.length = 0;
  const next = previewWorkspace(new URLSearchParams({ project: "1" }));
  assert.equal(next.projects[0].name, "Brand refresh");
  assert.equal(next.tasks.length, 2);
});
test("invalid projects stay unavailable and backend actions never fake success", () => {
  assert.equal(
    previewWorkspace(new URLSearchParams({ project: "999" })).project,
    undefined,
  );
  assert.equal(backendStatus.authentication, "not_configured");
  assert.equal(backendStatus.database, "not_configured");
  assert.equal(backendStatus.writesEnabled, false);
  assert.equal(unavailableAction().status, 503);
});
