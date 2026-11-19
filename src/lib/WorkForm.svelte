<script>
  import Action from "./Action.svelte";
  import Field from "./Field.svelte";
  let { p, t = {} } = $props();
</script>

<Action kind={t.id ? "task-edit" : "task"} id={t.id} project={p.id}>
  <div class="form-grid">
    <Field label="Title" name="title" value={t.title} required />
    <label
      >Type<select name="type" value={t.type || "Task"}
        ><option>Task</option><option>Milestone</option></select
      ></label
    >
    <Field label="Due date" name="due" type="date" value={t.due} />
    <label class="check"
      ><input
        type="checkbox"
        name="visible"
        checked={t.visible ?? true}
      />Visible to client</label
    >
  </div>
  <button>Save work item</button>
</Action>
