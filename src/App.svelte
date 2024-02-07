<script lang="ts">
  // Import TextArea component
  import TextArea from './lib/TextArea.svelte';
  import NoteLister from './lib/NoteLister.svelte';
  import { FolderHelper } from './inc/folderHelper.js';

  let noteName = '';
  let textAreaContent = '';

  $: refreshNotesList(), noteName;

  const folderHelper = new FolderHelper();
  let notes = [];
  async function refreshNotesList() {
    notes = await folderHelper.noteLister();
  }

  const saveNote = async () => {
    refreshNotesList();
    const checker = await folderHelper.NoteChecker(noteName + '.html', notes);
    if (checker) {
      console.log('Note already exists');
    } else {
      await folderHelper.createNewNote(noteName, textAreaContent);
      refreshNotesList();
    }
  };
</script>

<main class="container">
  <div id="NoteNamer">
    <label for="noteName">Note Name:</label>
    <input
      id="noteName"
      type="text"
      bind:value={noteName}
      on:keydown={e => e.key === 'Enter' && saveNote()}
    />
  </div>

  <div class="notes-container">
    <div class="note-lister">
      <NoteLister bind:notes bind:textAreaContent />
    </div>
    <div class="text-area">
      <TextArea bind:content={textAreaContent} />
    </div>
    <!-- <button on:click={saveNote}>Save Note</button> -->
  </div>
</main>

<style>
  .notes-container {
    display: flex;
    width: 80vw;
    height: 80vh;
  }
  .note-lister {
    flex: 20%;
  }
  .text-area {
    flex: 80%;
  }
</style>
