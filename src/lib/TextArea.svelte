<script>
  import { FolderHelper } from "../inc/folderHelper";
  import { TemplateHelper } from "../inc/templateHelper";
  export let content = '';
  export let noteName = ''

  const folderHelper = new FolderHelper();
  const templateHelper = new TemplateHelper();

  // Handle update to content
  function handleInput(event) {
    content = event.target.innerHTML;
    console.log("noteNAME: "  + noteName)
    folderHelper.updateNoteContent(noteName, content)
  }

  // Handle new entry
  function addNewEntry(event) {
    if((event.ctrlKey || event.metaKey) && event.key === 'n') {
      event.preventDefault();
      content = templateHelper.addNewEntry(content);
    }
  }
  
</script>

<div
  class="editable text-area-style"
  id="text-area"
  contenteditable="true"
  bind:innerHTML={content}
  on:input={handleInput}
  on:keydown={addNewEntry}
></div>

<style>

  img {
    max-width: 95%;
    height: auto; /* maintain aspect ratio */
    display: block; /* prevent inline gaps */
  }

  .text-area-style {
    height: 90%;
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
    overflow: auto;
    font-size: 14px;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10rem;
  }
  
</style>
