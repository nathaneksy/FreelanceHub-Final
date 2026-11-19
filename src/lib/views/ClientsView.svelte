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

<div class="page-heading">
  <div>
    <span class="eyebrow">PEOPLE BEHIND THE PROJECTS</span>
    <h1>Your clients.</h1>
    <p>Good relationships, all in one place.</p>
  </div>
</div>
<details class="panel">
  <summary>＋ Add a client</summary><Action kind="client"
    ><div class="form-grid">
      <Field label="Client or company name" name="name" required /><Field
        label="Contact email"
        name="email"
        type="email"
        required
      />
    </div>
    <button>Add client</button></Action
  >
</details>
<div class="client-grid">
  {#each clients as c}<section class="panel">
      <span class="client-icon">{c.name[0]}</span>
      <h2>{c.name}</h2>
      <p>{c.email}</p>
      <span class="badge"
        >{c.archived
          ? "Archived"
          : c.user_id
            ? "Account linked"
            : "Awaiting invitation"}</span
      >
      {#if !c.archived}<details>
          <summary>Edit contact</summary><Action kind="client-edit" id={c.id}
            ><Field label="Name" name="name" value={c.name} required /><Field
              label="Email"
              name="email"
              type="email"
              value={c.email}
              required
            /><button>Save client</button></Action
          >
        </details>
        {#if !c.user_id}<details>
            <summary>Client invitation</summary>
            <p>
              Share this code privately with {c.email}. They must register using
              that email.
            </p>
            <code class="invite">{c.invite}</code><a
              href={"/login?invite=" + c.invite}>Open registration link ↗</a
            >
          </details>{/if}
        <Action kind="client-archive" id={c.id}
          ><button class="text-button danger">Archive client</button></Action
        >{/if}
    </section>{/each}
</div>
{#if !clients.length}<section class="panel empty">
    Add your first client to start a project.
  </section>{/if}
