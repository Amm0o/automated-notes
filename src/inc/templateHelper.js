import {
    readTextFile,
  } from '@tauri-apps/api/fs';
  import {resolveResource} from '@tauri-apps/api/path';


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
    }
}