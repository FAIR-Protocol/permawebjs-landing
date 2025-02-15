const fs = require('fs');
const path = require('path');

const JSON_FILE_PATH = path.join(__dirname, '../../src/components/plugIn/plugins.json');
const TEMPLATE_PATH = path.join(__dirname, '../../src/components/plugIn/plugInTemplate.tsx');
const OUTPUT_DIR = path.join(__dirname, '../../src/pages/plugins/');
const PREVIOUS_STATE_PATH = path.join(__dirname, '../../src/components/plugIn/pluginState.json');

const currentData = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));
const previousData = JSON.parse(fs.readFileSync(PREVIOUS_STATE_PATH, 'utf8'));
const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const newEntries = currentData.filter(entry => 
    !previousData.some(prevEntry => prevEntry.name === entry.name)
);

newEntries.forEach(newEntry => {
    let content = templateContent.replace('%%PACKAGENAME%%', newEntry.name).replace('%%NPMNAME%%', newEntry.name);
    fs.writeFileSync(path.join(OUTPUT_DIR, `${newEntry.name}.tsx`), content, 'utf8');
    console.log(`Created new file for ${newEntry.name}`);
});


fs.writeFileSync(PREVIOUS_STATE_PATH, JSON.stringify(currentData, null, 2), 'utf8');
