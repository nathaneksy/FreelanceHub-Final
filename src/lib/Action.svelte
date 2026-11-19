<script>
  import { page } from "$app/state";
  let {
    kind,
    id = "",
    project = "",
    children,
    class: className = "",
  } = $props();
  let query = $derived(
    new URLSearchParams(
      [...page.url.searchParams].filter(([key]) => !key.startsWith("/")),
    ),
  );
</script>

<form method="POST" action={"?/mutate&" + query} class={className}>
  <input type="hidden" name="kind" value={kind} /><input
    type="hidden"
    name="id"
    value={id}
  /><input type="hidden" name="project_id" value={project} />
  <fieldset disabled aria-label="Saving unavailable until backend integration">
    {@render children()}
  </fieldset>
</form>
