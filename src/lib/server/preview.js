const sample = {
  clients: [
    {
      id: 1,
      owner_id: 1,
      name: "Acorn Studio",
      email: "jordan@example.com",
      archived: 0,
      user_id: 2,
      invite: null,
    },
  ],
  projects: [
    {
      id: 1,
      owner_id: 1,
      client_id: 1,
      name: "Brand refresh",
      description: "A thoughtful identity for a growing studio.",
      deadline: "2026-12-15",
      status: "In progress",
      progress: 40,
      archived: 0,
      client_archived: 0,
      client_name: "Acorn Studio",
    },
  ],
  tasks: [
    {
      id: 1,
      project_id: 1,
      title: "Share initial concepts",
      type: "Milestone",
      due: "2026-12-01",
      visible: 1,
      done: 0,
    },
    {
      id: 2,
      project_id: 1,
      title: "Prepare internal review notes",
      type: "Task",
      due: "2026-11-30",
      visible: 0,
      done: 0,
    },
  ],
  messages: [
    {
      id: 1,
      project_id: 1,
      sender_id: 1,
      sender: "Alex Morgan",
      content: "Sample project update: initial concepts are underway.",
      created: "2026-11-19 12:00:00",
    },
  ],
};
export function previewWorkspace(searchParams) {
  const role = searchParams.get("role") === "client" ? "client" : "freelancer",
    owner = role === "freelancer",
    data = structuredClone(sample);
  const projectId = searchParams.get("project"),
    project = projectId
      ? data.projects.find((p) => p.id === Number(projectId))
      : null;
  const view = searchParams.get("view") || "overview",
    allowed = owner
      ? ["overview", "clients", "projects", "settings"]
      : ["overview", "projects", "settings"];
  return {
    isPreview: true,
    canWrite: false,
    user: owner
      ? { id: 1, name: "Alex Morgan", email: "alex@example.com", role }
      : { id: 2, name: "Jordan Taylor", email: "jordan@example.com", role },
    owner,
    view: allowed.includes(view) ? view : "overview",
    clients: owner ? data.clients : [],
    projects: data.projects,
    project,
    tasks: project ? data.tasks.filter((t) => owner || t.visible) : [],
    messages: project ? data.messages : [],
  };
}
