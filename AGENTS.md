# ss13-system - FoundryVTT Module

A Space Station 13 RPG system for FoundryVTT, based on Mothership RPG rules.

## Status: Ready for Testing
- **38 items** in items.json (weapons, tools, equipment, ammo)
- **Dice rolls** working (d100 skill/save checks)
- **Character sheet** with inventory display
- **CSS styling** with SS13 dark theme

## Quick Start
- **Manual installation**: Copy `ss13-system` folder to Foundry `Data/systems/`
- **Development**: Edit files and reload in Foundry
- **No build step** - pure JSON/HTML/CSS/JS system

## Structure
- `system.json` - System manifest
- `template.json` - Actor data template with inventory slots
- `items.json` - 38 base items (weapons, tools, equipment, ammo)
- `scripts/` - ES6 modules (actor.js, item.js, ss13.js)
- `templates/` - Handlebars HTML templates
- `styles/` - CSS styling

## Icons
Using Foundry VTT default system icons:
- `icons/weapons/` - Weapons (guns, melee)  
- `icons/equipment/` - Armor, uniforms, gear
- `icons/tools/` - Tools, medical items

Custom icons: Place PNG files in `icons/items/`

## Dice Rolls
- **Skill checks**: d100 <= skill value (success)
- **Saves**: d100 <= save value (success)
- **Damage**: Weapon dice - armor protection
- Click skill/save buttons on character sheet to roll