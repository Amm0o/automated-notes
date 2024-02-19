<script>
  import { FolderHelper } from "../inc/folderHelper";
  export let content = '';
  export let noteName = ''

  const folderHelper = new FolderHelper();

  function handleInput(event) {
    content = event.target.innerHTML;
    folderHelper.updateNoteContent(noteName, content)
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
    height: 90%;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10rem;
  }
  
</style>
