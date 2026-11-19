<script>
  import Action from "../Action.svelte";
  import ProjectForm from "../ProjectForm.svelte";
  import WorkForm from "../WorkForm.svelte";
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

<a class="back" href={"/?view=projects" + (owner ? "" : "&role=client")}
  >← All projects</a
>
<div class="page-heading">
  <div>
    <span class="eyebrow">PROJECT WORKSPACE</span>
    <h1>{p.name}</h1>
    <p>{p.description || "A shared space for the work ahead."}</p>
  </div>
  <span class="badge">{p.archived ? "Archived" : p.status}</span>
</div>
<div class="panel project-summary">
  <span>Deadline<strong>{p.deadline || "Not set"}</strong></span><span
    >Progress<strong>{p.progress}%</strong></span
  ><progress aria-label="Project progress" value={p.progress} max="100"
  ></progress>
</div>
{#if owner}<details class="panel">
    <summary>Edit project details</summary><ProjectForm {clients} {p} /><Action
      kind="project-archive"
      project={p.id}
      ><button class="text-button danger">Archive project</button></Action
    >
  </details>{/if}
<div class="detail-grid">
  <section class="panel">
    <div class="section-title">
      <h2>Tasks &amp; milestones</h2>
      <span class="muted"
        >{tasks.filter((t) => t.done).length} / {tasks.length} done</span
      >
    </div>
    {#if !tasks.length}<p class="empty">
        No work items yet. A clear next step makes all the difference.
      </p>{/if}
    {#each tasks as t}<div class="work-item">
        <div class="item-heading">
          {#if owner}<Action kind="task-toggle" id={t.id} project={p.id}
              ><button
                class="toggle"
                class:done={t.done}
                aria-label={t.done ? "Mark incomplete" : "Mark complete"}
                >{t.done ? "✓" : "○"}</button
              ></Action
            >{:else}<span>{t.done ? "✓" : "○"}</span>{/if}<strong
            class:strike={t.done}>{t.title}</strong
          >
        </div>
        <small
          >{t.type} · {t.due || "No deadline"} · {t.visible
            ? "Client visible"
            : "Internal"}</small
        >
        {#if owner}<details>
            <summary>Edit work item</summary><WorkForm {p} {t} /><Action
              kind="task-delete"
              id={t.id}
              project={p.id}
              ><label class="check"
                ><input
                  type="checkbox"
                  name="confirm"
                  value="yes"
                  required
                />Permanently delete this item</label
              ><button class="text-button danger">Delete item</button></Action
            >
          </details>{/if}
      </div>{/each}
    {#if owner}<details class="add-details">
        <summary>＋ Add a task or milestone</summary><WorkForm {p} />
      </details>{/if}
  </section>
  <section class="panel">
    <h2>Project conversation</h2>
    <p class="muted">A little context keeps everyone in sync.</p>
    {#if !messages.length}<p class="empty">
        Start the conversation with a project update.
      </p>{/if}
    {#each messages as m}<article class="message">
        <strong>{m.sender}</strong><time>{m.created} UTC</time>
        <p>{m.content}</p>
        {#if owner || m.sender_id === u.id}<details>
            <summary>Edit message</summary><Action
              kind="message-edit"
              id={m.id}
              project={p.id}
              ><label
                >Message content<textarea
                  name="content"
                  value={m.content}
                  required
                  maxlength="2000"
                ></textarea></label
              ><button>Save message</button></Action
            ><Action kind="message-delete" id={m.id} project={p.id}
              ><button class="text-button danger">Delete message</button
              ></Action
            >
          </details>{/if}
      </article>{/each}
    <Action kind="message" project={p.id}
      ><label
        >Your update<textarea
          placeholder="Share an update or ask a question…"
          name="content"
          required
          maxlength="2000"
        ></textarea></label
      ><button>Post message ↗</button></Action
    >
  </section>
</div>
