<script>
  let { data, form } = $props();
</script>

<main class="auth">
  <section class="auth-story">
    <a class="brand" href="/">f<span>FreelanceHub</span></a><span
      class="eyebrow">A SHARED HOME FOR GOOD WORK</span
    >
    <h1>Build the next<br />chapter together.</h1>
    <p>Clients, projects, and conversations in one calm workspace.</p>
  </section>
  <section class="auth-form">
    <span class="eyebrow">TEAM DEVELOPMENT PREVIEW</span>
    <h2>Accounts are coming next.</h2>
    <p>{data.message}</p>
    {#if form?.error}<p role="alert" class="alert">{form.error}</p>{/if}
    <p>
      This preview contains fictional information. It does not create accounts
      or save changes.
    </p>
    <a class="button" href="/">Preview freelancer workspace</a>
    <p><a href="/?role=client">Preview client workspace</a></p>
  </section>
</main>
