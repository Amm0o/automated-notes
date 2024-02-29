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
    folderHelper.updateNoteContent(noteName, content)
  }

  // Handle paste of images
  function handlePaste(event) {
  const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  for (let index in items) {
    const item = items[index];
    if (item.kind === 'file') {
      const blob = item.getAsFile();
      const reader = new FileReader();
      reader.onload = function(event) {
        // Create an img element with src as the Data URL
        const dataUrl = event.target.result;
        document.execCommand('insertHTML', false, `<img src="${dataUrl}" style="max-width: 95%;">`);
      };
      reader.readAsDataURL(blob);
      event.preventDefault(); // Prevent the default image paste behavior
    }
  }
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
  on:paste={handlePaste}
></div>

<style>

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

  
</style>
