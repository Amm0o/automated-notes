<script>
  import { FolderHelper } from '../inc/folderHelper';
  export let filteredNotes = [];
  export let textAreaContent = '';
  export let noteName = '';

  const folderHelper = new FolderHelper();



  const deleteNote = note => {
    filteredNotes = filteredNotes.filter(file => file !== note);
    folderHelper.deleteNote(note);
    console.log(note + ' has been delete');
  };

  const loadNote = async note => {
    textAreaContent = await folderHelper.readNote(note);
    noteName = note;
  };
</script>

<aside>
  <ul>
    {#each filteredNotes as note (note)}
      <li class="note-item">
        <div on:click={() => loadNote(note)}>
          {note.split('.').slice(0, -1).join('.')}
        </div>
        <button
          class="delete-button"
          on:click={() => {
            deleteNote(note);
          }}>x</button
        >
      </li>
    {/each}
  </ul>
</aside>

<style>
  aside {
    width: 200px;
    height: 50vh;
    overflow-y: auto;
    padding: 1em;
  }
  ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
  }


  .note-item div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
  }

  .note-item {
    margin-bottom: 9px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px;
    transition: transform 0.3s ease;
    display: flex;
    width: calc(100% - 30px); /* Example: Adjust '30px' based on desired spacing */
  }


  .note-item:hover {
    transform: scale(1.05);
  }

  .delete-button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    float: right;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
