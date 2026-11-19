/** Integration targets only: no provider or persistence implementation exists. */
export type Role = "freelancer" | "client";
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
export interface AuthProvider {
  getUser(request: Request): Promise<User | null>;
  register(input: {
    name: string;
    email: string;
    password: string;
    invitation?: string;
  }): Promise<void>;
  signIn(input: { email: string; password: string }): Promise<void>;
  signOut(request: Request): Promise<void>;
}
export interface WorkspaceRepository {
  listClients(ownerId: string): Promise<unknown[]>;
  listProjects(user: User): Promise<unknown[]>;
  getProject(user: User, projectId: string): Promise<unknown | null>;
  listVisibleWork(user: User, projectId: string): Promise<unknown[]>;
  listMessages(user: User, projectId: string): Promise<unknown[]>;
}
// Agree on schema/IDs, then replace unknown results with shared domain types
// and add explicit mutation methods. Keep authorization in the server layer.
