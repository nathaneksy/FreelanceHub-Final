<script>
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head
  ><title>FreelanceHub | Team Workspace</title><meta
    name="description"
    content="A shared home for your clients, project plans, and progress. Built with SvelteKit."
  /></svelte:head
>
{@render children()}
