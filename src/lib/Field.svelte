<script>
  let { label, name, value = "", type = "text", required = false } = $props();
</script>

<label>{label}<input {name} {type} value={value ?? ""} {required} /></label>
