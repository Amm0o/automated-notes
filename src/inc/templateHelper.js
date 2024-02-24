import {
    readTextFile,
  } from '@tauri-apps/api/fs';
  import {resolveResource} from '@tauri-apps/api/path';
import { get } from 'svelte/store';


export function getNextBusinessDay() {
    let date = new Date(); // Get current date
    let day = date.getDay(); // Get day

    if (day === 5) { // if Friday 
        date.setDate(date.getDate() + 3); // Set to monday
    } else if (day === 6) { // If Saturday
        date.setDate(date.getDate() + 2) // Set to monday
    } else {
        date.setDate(date.getDate() + 1);
    }

    return date.toLocaleDateString();
}

export class TemplateHelper {
    async applyTemplate () {
        try {
            // Read the template file
            const path = await resolveResource('resources/template.txt');
            let templateContent = await readTextFile(path);

            // Fill the template with the current date
            let currentDate = new Date().toLocaleDateString();
            templateContent = templateContent.replace(/CurrentDate/g, currentDate);

            // Fill the template with the next business day
            let nextBusinessDay = getNextBusinessDay();
            templateContent = templateContent.replace(/NextBusinessDay/g, nextBusinessDay)

            console.log('Template content:', templateContent);

            return templateContent;
        } catch (error) {
            console.error('There was an error reading the template file', error);
        }
        
    }

    addNewEntry(noteContent) {

        // Find the last entry in the notes
        const delimiterIndex = noteContent.lastIndexOf('------------------------------');

        // If the delimiter is not found return the original content
        if (delimiterIndex === -1) {
            return noteContent;
        }

        // Create new entry with the current date
        const currentDate = new Date().toLocaleDateString();
        let newEntry = `
        <div>-------------------------------<br></div>
        <div>&lt;CurrentDate&gt;</div>
    `.replace(/&lt;CurrentDate&gt;/, currentDate); 

        // Add the new entry to the notes
        let updatedNote = noteContent.slice(0, delimiterIndex) + newEntry + noteContent.slice(delimiterIndex).trim();

        // Check and update the next contact date
        const nextContactRegex = /NEXT CONTACT &lt;([\d\/]+)&gt;/i; // Create a regex pattern
        const match = noteContent.match(nextContactRegex); // Match the pattern

        console.log('Match:', match);
        console.log("nextContactRegex:", nextContactRegex);

        if (match) {
            const existingNextContactDate = match[1]

            console.log('Existing next contact date:', existingNextContactDate);
            
            // Convert to date for comparison
            const existingDate = new Date(existingNextContactDate).toLocaleDateString();
            const calculatedNextBusinessDate = getNextBusinessDay();
            console.log('existingDate:', calculatedNextBusinessDate);
            console.log('calculatedNextBusinessDate:', calculatedNextBusinessDate);

            if (existingDate !== calculatedNextBusinessDate) {

                console.log("We are here!")
                updatedNote = updatedNote.replace(/NEXT CONTACT &lt;[\d\/]+&gt;/, `NEXT CONTACT &lt;${calculatedNextBusinessDate}&gt;`);
            }
        }

        return updatedNote;

    }
}