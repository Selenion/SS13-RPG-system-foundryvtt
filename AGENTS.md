# ss13-system Contributor Guide

## Overview

`ss13-system` is a Foundry VTT game system for Space Station 13-inspired tabletop play, using Mothership-style d100 checks. It is a pure Foundry system: no build step, no package manager, and no generated bundle. Edit JSON, HTML, CSS, and ES modules directly, then reload Foundry.

## Project Structure

- `system.json` - Foundry system manifest. Currently loads `module.js` and `styles/ss13.css`.
- `module.js` - system initialization, sheet registration, actor/item defaults, and global d100 roll handler.
- `template.json` - actor and item data schemas.
- `items.json` - source data for 94 base items. Import in Foundry with `game.ss13.importBaseItems()`.
- `scripts/actor.js` - actor document class, character sheet, professions, skill ranks, and equipment slot display.
- `scripts/item.js` - item sheet setup, type flags, slot options, skill options, and extra field discovery.
- `scripts/ss13.js` - damage helper imported by `module.js`.
- `scripts/validate-data.mjs` - local data consistency check for JSON, skills, items, and profession references.
- `templates/` - Handlebars actor and item sheets.
- `styles/ss13.css` - SS13-themed sheet styling.
- `lang/ru.json`, `lang/en.json` - localization strings. Templates currently contain mostly hardcoded English text.
- `icons/slots/` - equipment slot icons used by the actor sheet.

## Reference Documents

Design notes live one level up in `SS13module/`: `диздок.md`, `система_персонажей.md`, `профессии.md`, and `предметы_mvp.md`. Treat them as product/design references, not guaranteed implementation truth. When behavior differs, update either the code or the docs explicitly.

`SS13module/BandaStation/` is the reference implementation and asset source for the original Space Station 13 server. Use it to verify job names, item behavior, icon/audio resources, terminology, and gameplay expectations before inventing new SS13-specific content. Do not copy large chunks blindly; adapt mechanics and assets to this Foundry system's simpler tabletop model.

## Development Workflow

Install by copying this folder to Foundry `Data/systems/ss13/`, then create or reload a world using system id `ss13`. After edits, reload Foundry or the world. Import base items from the browser console as a GM with `await game.ss13.importBaseItems()`. Validate JSON and skill references before testing:

```powershell
node scripts/validate-data.mjs
```

## Coding Rules

Use two-space indentation in JSON and JavaScript, matching the existing files. Keep Foundry-facing code as browser-compatible ES modules. Do not use Node-only APIs in loaded system scripts. Keep visible text localizable when touching templates, and update both language files.

## Testing Checklist

Before handoff, verify the system loads in Foundry without console errors, actor and item sheets open, profession selection updates skill ranks, skill/save buttons produce chat rolls, and equipment slot icons render. For item work, confirm imported weapons, tools, equipment, ID cards, ammo, and grenades expose editable fields and that item skills match `template.json`.
