// Download SS13 icons from TGStation GitHub
const https = require('https');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '..', 'icons', 'items');
const GITHUB_RAW = 'https://raw.githubusercontent.com/tgstation/Terminal/master/icons/items/';

// TGStation icon paths
const ICON_DOWNLOADS = {
  'taser.png': `${GITHUB_RAW}weapons/guns/taser.png`,
  'stun_baton.png': `${GITHUB_RAW}weapons/melee/stunbaton.png`,
  'energy_sword.png': `${GITHUB_RAW}weapons/melee/energysword.png`,
  'revolver.png': `${GITHUB_RAW}weapons/guns/revolver.png`,
  'toolbelt.png': `${GITHUB_RAW}storage/toolbelt.png`,
  'wrench.png': `${GITHUB_RAW}tools/wrench.png`,
  'multitool.png': `${GITHUB_RAW}tools/multitool.png`,
  'hypospray.png': `${GITHUB_RAW}medical/hypospray.png`,
  'health_analyzer.png': `${GITHUB_RAW}medical/healthanalyzer.png`,
  'medical_kit.png': `${GITHUB_RAW}medical/medkit.png`,
  'oxygen_tank.png': `${GITHUB_RAW}storage/oxygen.png`,
  'backpack.png': `${GITHUB_RAW}storage/backpack.png`,
  'pda.png': `${GITHUB_RAW}electronics/pda.png`,
  'id_card.png': `${GITHUB_RAW}cards/id.png`,
  'flash.png': `${GITHUB_RAW}weapons/grenades/flash.png`,
  'handcuffs.png': `${GITHUB_RAW}restraints/handcuffs.png`,
  'emag.png': `${GITHUB_RAW}electronics/emag.png`
};

function download(url, filepath) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`OK: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        console.log(`SKIP: ${path.basename(filepath)} (${res.statusCode})`);
        resolve();
      }
    }).on('error', () => resolve());
  });
}

async function downloadAll() {
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }
  
  console.log('Downloading from TGStation GitHub...');
  for (const [filename, url] of Object.entries(ICON_DOWNLOADS)) {
    const filepath = path.join(ICONS_DIR, filename);
    await download(url, filepath);
  }
  console.log('Done!');
}

downloadAll();