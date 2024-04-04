import {
  readDir,
  createDir,
  writeFile,
  removeFile,
  readTextFile,
} from '@tauri-apps/api/fs';
import { documentDir, join } from '@tauri-apps/api/path';

export class FolderHelper {
  // List all notes
  async noteLister() {
    const documentDirPath = await documentDir(); // Get documents directory PATH
    const casesDirPath = await join(documentDirPath, 'cases');

    let folders = [];
    const entries = await readDir(casesDirPath);

    for (const entry of entries) {
      if (entry.name && entry.name.trim() !== ''){
        folders.push(entry.name);
      }
    }

    return folders;
  }

  // Check if note exists
  async NoteChecker(noteName, notes) {
    console.log('NoteChecker: ' + noteName);
    if (notes.includes(noteName)) {
      return true;
    } else {
      return false;
    }
  }

  // Create a new note
  async createNewNote(noteName, textAreaContent) {
    noteName += '.html';
    try {
      const documentDirPath = await documentDir(); // Get documents directory PATH
      const casesDirPath = await join(documentDirPath, 'cases'); // Create a directory PATH
      await createDir(casesDirPath, { recursive: true }); // Ensure directory exists and creae it if it doesn't

      const notePath = await join(casesDirPath, noteName); // Create the note PATH
      await writeFile(notePath, textAreaContent); // Write the file
      console.log('Document was saved to: ' + notePath);
    } catch (error) {
      console.error('There was an error saving the note', error);
    }
  }

  // update notes content
  async updateNoteContent(noteName, noteContent) {
    try {
      const documentDirPath = await documentDir(); // Get documents directory PATH
      const casesPath = await join(documentDirPath, 'cases'); // Create a directory PATH
      const notePath = await join(casesPath, noteName);
      
      console.log("Updated note: " + notePath + " note name:" + noteName);
      await writeFile(notePath, noteContent)

    } catch(error) {
      console.log("Could not update the notes content: " + error);
    }

  }

  // Delete a note
  async deleteNote(noteName) {
    try {
      const documentDirPath = await documentDir(); // Get documents directory PATH
      const casesDirPath = await join(documentDirPath, 'cases'); // Create a directory PATH
      const notePath = await join(casesDirPath, noteName); // Create the note PATH
      await removeFile(notePath); // Remove the file
    } catch (error) {
      console.error('There was an error deleting the note', error);
    }
  }

  // Read note

  async readNote(noteName) {
    try {
      const documentDirPath = await documentDir(); // Get documents directory PATH
      const casesDirPath = await join(documentDirPath, 'cases'); // Create a directory PATH
      const notePath = await join(casesDirPath, noteName); // Create the note PATH
      const noteContent = await readTextFile(notePath); // Read the file

      return noteContent;
    } catch (error) {
      console.error('There was an error reading the note', error);
    }
  }
}
