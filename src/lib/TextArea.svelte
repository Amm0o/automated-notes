<script>
  export let content = '';

  function handleInput(event) {
    content = event.target.innerHTML;
  }
</script>

<div
  class="editable text-area-style"
  id="text-area"
  contenteditable="true"
  bind:innerHTML={content}
  on:input={handleInput}
></div>

<style>
  .editable img {
    max-width: 100%;
  }

  .text-area-style {
    height: 80%;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
</style>
