// Preview identities are never authenticated users. No provider is connected.
export const backendStatus = Object.freeze({
  database: "not_configured",
  authentication: "not_configured",
  writesEnabled: false,
});
export const backendUnavailableMessage =
  "Accounts and saving are unavailable until the team connects its database and authentication provider.";
export function unavailableAction() {
  return { status: 503, data: { error: backendUnavailableMessage } };
}
