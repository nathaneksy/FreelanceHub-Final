<script>
  import ProjectDetails from "../lib/views/ProjectDetails.svelte";
  import ClientsView from "../lib/views/ClientsView.svelte";
  import ProfileView from "../lib/views/ProfileView.svelte";
  import DashboardView from "../lib/views/DashboardView.svelte";
  let { data, form } = $props();
  let u = $derived(data.user),
    owner = $derived(data.owner),
    view = $derived(data.view),
    p = $derived(data.project);
  let active = $derived(
    data.projects.filter((p) => !p.archived && !p.client_archived),
  );
  let links = $derived([
    ["overview", "Overview"],
    ["projects", "Projects"],
    ...(owner ? [["clients", "Clients"]] : []),
    ["settings", "Settings"],
  ]);
</script>

<div class="workspace">
  <aside>
    <a href="/" class="brand"
      >f<span>FreelanceHub<small>ROOM TO DO YOUR BEST WORK</small></span></a
    ><span class="nav-label">WORKSPACE</span>
    <nav>
      {#each links as [key, label]}<a
          class:active={!p && view === key}
          href={"/?view=" + key + (owner ? "" : "&role=client")}
          >{label}{#if key === "projects"}<b>{active.length}</b>{/if}</a
        >{/each}
    </nav>
    <div class="sidebar-note">
      <span>✳</span><strong>Good things take focus.</strong>
      <p>Keep your work moving, one small step at a time.</p>
    </div>
    <div class="account">
      <span class="avatar">{u.name[0].toUpperCase()}</span>
      <div>
        <strong>{u.name}</strong><small
          >{owner ? "Freelancer workspace" : "Client workspace"}</small
        >
      </div>
    </div>
    <form method="GET" action="/login">
      <button class="text-button">Accounts ↗</button>
    </form>
  </aside>
  <div class="main">
    <header>
      <span
        >Workspace <span class="muted"
          >/ {p ? "Projects" : view[0].toUpperCase() + view.slice(1)}</span
        ></span
      ><span class="header-right"
        ><i class="dot"></i>{owner
          ? "Independent, together"
          : "Your client portal"}<span class="avatar small"
          >{u.name[0].toUpperCase()}</span
        ></span
      >
    </header>
    <main class="content">
      <section class="preview-notice" aria-label="Read-only preview">
        <strong>Read-only team preview</strong>
        <p>
          Fictional sample data. Accounts and saving are unavailable until the
          backend is connected.
        </p>
        <a href={owner ? "/?role=client" : "/"}
          >{owner ? "Preview as client" : "Preview as freelancer"}</a
        >
      </section>
      {#if form?.error}<p role="alert" class="alert">{form.error}</p>{/if}
      {#if p}<ProjectDetails
          {data}
        />{:else if view === "clients" && owner}<ClientsView
          {data}
        />{:else if view === "settings"}<ProfileView
          {data}
        />{:else}<DashboardView {data} />{/if}

      <footer>
        FreelanceHub<span>A little more organized. A lot more possible.</span
        ><small>TEAM PREVIEW</small>
      </footer>
    </main>
  </div>
</div>
