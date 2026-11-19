<script>
  import ProjectForm from "../ProjectForm.svelte";
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
    <span class="eyebrow"
      >{view === "projects"
        ? "A HOME FOR EVERY PROJECT"
        : "YOUR WORK, A LITTLE MORE IN SYNC"}</span
    >
    <h1>
      {view === "projects"
        ? "The work ahead."
        : `Welcome back, ${u.name.split(" ")[0]}.`}
    </h1>
    <p>
      {owner
        ? "Here’s where things stand. Let’s keep the good work going."
        : "Your projects, progress, and conversations, together."}
    </p>
  </div>
  {#if owner}<a class="button" href="/?view=projects#new-project"
      >＋ New project</a
    >{/if}
</div>
{#if view === "overview"}<div class="stats">
    <section>
      <span>Active projects <b>↗</b></span><strong
        >{active.length.toString().padStart(2, "0")}</strong
      ><small>Ideas turning into something real</small>
    </section>
    <section>
      <span
        >{owner ? "Active clients" : "Completed projects"}
        <b>♧</b></span
      ><strong
        >{(owner
          ? clients.filter((c) => !c.archived).length
          : active.filter((p) => p.status === "Completed").length
        )
          .toString()
          .padStart(2, "0")}</strong
      ><small
        >{owner
          ? "Relationships worth building"
          : "A little celebration is in order"}</small
      >
    </section>
    <section>
      <span>Overall progress <b>◴</b></span><strong>{avg}<em>%</em></strong
      ><small>One step closer, every day</small>
    </section>
  </div>
  <div class="focus-banner">
    <span class="focus-icon">✳</span>
    <div>
      <span class="eyebrow">A LITTLE SPACE TO FOCUS</span>
      <h2>Big projects. Clear next steps.</h2>
      <p>Keep the details here, so you can give the work your attention.</p>
    </div>
    <span class="banner-art">↗</span>
  </div>{/if}
<section class="panel">
  <div class="section-title">
    <div>
      <h2>{view === "projects" ? "All projects" : "On your radar"}</h2>
      <p class="muted">
        {view === "projects"
          ? "Your active work and project history."
          : "A shared view of what’s moving forward."}
      </p>
    </div>
    {#if view === "overview"}<a
        href={"/?view=projects" + (owner ? "" : "&role=client")}
        >View all projects ↗</a
      >{/if}
  </div>
  <div class="project-list">
    {#each view === "projects" ? projects : active.slice(0, 5) as p, i}<a
        class="project-row"
        href={"/?project=" + p.id + (owner ? "" : "&role=client")}
        ><span class={"project-icon color-" + (i % 3)}>{p.name[0]}</span>
        <div class="project-name">
          <strong>{p.name}</strong><small>{p.client_name}</small>
        </div>
        <span class="badge"
          >{p.archived || p.client_archived ? "Archived" : p.status}</span
        ><span class="row-progress"
          ><span>{p.progress}%</span><progress
            aria-label="Project progress"
            max="100"
            value={p.progress}
          ></progress></span
        ><span class="deadline">{p.deadline || "No deadline"}</span><span
          >↗</span
        ></a
      >{/each}
  </div>
  {#if !(view === "projects" ? projects : active).length}<div class="empty">
      <h3>A fresh start looks good on you.</h3>
      <p>
        {owner
          ? "Add a client, then create your first project."
          : "Your freelancer’s projects will appear here once assigned."}
      </p>
      {#if owner}<a href="/?view=clients">Add your first client ↗</a>{/if}
    </div>{/if}
</section>
{#if owner && view === "projects"}<section class="panel" id="new-project">
    <span class="eyebrow">SOMETHING NEW STARTS HERE</span>
    <h2>Create a project</h2>
    {#if clients.some((c) => !c.archived)}<ProjectForm {clients} />{:else}<p>
        <a href="/?view=clients">Add a client</a> before creating a project.
      </p>{/if}
  </section>{/if}
