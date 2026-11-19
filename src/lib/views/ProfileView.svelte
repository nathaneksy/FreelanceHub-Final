<script>
  import Action from "../Action.svelte";
  import Field from "../Field.svelte";
  let { data } = $props();
  let u = $derived(data.user),
    owner = $derived(data.owner),
    view = $derived(data.view),
    clients = $derived(data.clients),
    projects = $derived(data.projects),
    p = $derived(data.project),
    tasks = $derived(data.tasks),
    messages = $derived(data.messages);
  let active = $derived(
    projects.filter((p) => !p.archived && !p.client_archived),
  );
  let avg = $derived(
    active.length
      ? Math.round(active.reduce((s, p) => s + p.progress, 0) / active.length)
      : 0,
  );
</script>

<span class="eyebrow">MAKE YOURSELF AT HOME</span>
<h1>Your profile.</h1>
<section class="panel narrow">
  <Action kind="profile"
    ><Field label="Your name" name="name" value={u.name} required />
    <p>{u.email} · {u.role}</p>
    <button>Save profile</button></Action
  >
</section>
