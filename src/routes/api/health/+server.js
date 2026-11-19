import { backendStatus } from "../../../lib/server/backend.js";
export function GET() {
  return Response.json({
    status: "ok",
    mode: "read-only-preview",
    backend: backendStatus,
  });
}
