<script>
  import Action from "./Action.svelte";
  import Field from "./Field.svelte";
  let { clients, p = {} } = $props();
  const statuses = ["Planning", "In progress", "In review", "Completed"];
</script>

<Action kind={p.id ? "project-edit" : "project"} id={p.id}>
  <div class="form-grid">
    <Field label="Project name" name="name" value={p.name} required />
    <label
      >Client<select
        name="client_id"
        value={p.client_id || clients.find((c) => !c.archived)?.id}
        >{#each clients.filter((c) => !c.archived) as c}<option value={c.id}
            >{c.name}</option
          >{/each}</select
      ></label
    >
    <Field label="Deadline" name="deadline" type="date" value={p.deadline} />
    <label
      >Status<select name="status" value={p.status || "Planning"}
        >{#each statuses as status}<option>{status}</option>{/each}</select
      ></label
    >
    <label
      >Progress (%)<input
        name="progress"
        type="number"
        min="0"
        max="100"
        value={p.progress || 0}
        required
      /></label
    >
  </div>
  <label
    >Description<textarea
      name="description"
      value={p.description || ""}
      maxlength="2000"
    ></textarea></label
  >
  <button>Save project ↗</button>
</Action>
