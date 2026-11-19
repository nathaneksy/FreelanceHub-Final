<script>
  import { page } from "$app/state";
</script>

<main class="content">
  <span class="eyebrow">FREELANCEHUB</span>
  <h1>
    {page.status === 404
      ? "Project unavailable"
      : "Something interrupted your work."}
  </h1>
  <p>
    {page.status === 404
      ? "This page does not exist or you do not have access."
      : "Your last change may not have been saved. Please try again."}
  </p>
  <a href="/" class="button">Back to workspace ↗</a>
</main>
