<script lang="ts">
  // Import TextArea component
  import TextArea from './lib/TextArea.svelte';
  import NoteLister from './lib/NoteLister.svelte';
  import { FolderHelper } from './inc/folderHelper.js';
  import {TemplateHelper} from './inc/templateHelper.js';
  import { onMount } from 'svelte';

  let noteName = '';
  let textAreaContent = '';

  // Template helper initialization
  const templateHelper = new TemplateHelper();

  // Folder helper initialization
  const folderHelper = new FolderHelper();
  let notes = [];

  async function refreshNotesList() {
    notes = await folderHelper.noteLister();
  }

  // Save a new note
  const saveNote = async () => {
    const checker = await folderHelper.NoteChecker(noteName + '.html', notes);
    if (checker) {
      console.log('Note already exists');
    } else {
      await folderHelper.createNewNote(noteName, textAreaContent);
      await refreshNotesList();

      noteName = ''; // Clear note textbox
    }
  };

  // Search for note
  let searchTerm = '';
  $: filteredNotes = notes
    .filter(note => note.includes(searchTerm))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/g), 10);
      const numB = parseInt(b.match(/\d+/g), 10);
      return numA - numB;
    });



  // Load all notes on load of the app
  onMount(async () => {
    await refreshNotesList();
  });


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
      <input type="text" id="search" bind:value={searchTerm} placeholder="Search Notes...">
      <NoteLister {filteredNotes} bind:textAreaContent bind:noteName/>
    </div>
    <div class="text-area">
      <TextArea bind:content={textAreaContent} bind:noteName/>
    </div>
  </div>

  <div class="functions">
    <button class="new-template" on:click={async () => {textAreaContent = await templateHelper.applyTemplate()}}>Add Template</button>
  </div>

</main>

<style>
  .notes-container {
    display: flex;
    width: 95vw;
    height: 70vh;
  }
  .note-lister {
    flex: 20%;
  }
  .text-area {
    flex: 80%;
  }

  #search {
    margin: 0px 15px;
  }

  .functions {
    width: 95vw;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>
