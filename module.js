// SS13 System initialization
import { SS13ActorSheet } from "./scripts/actor.js";
import { SS13ItemSheet } from "./scripts/item.js";

// Global roll functions for template clicks
window.SS13Roll = {
  skill: async (actorId, skill) => {
    const actor = game.actors.get(actorId);
    if (!actor) return;
    const value = actor.system.skills[skill]?.value || actor.system.saves[skill]?.value || 20;
    const roll = await new Roll('1d100').evaluate({async: false});
    const success = roll.total <= value;
    const label = actor.system.skills[skill] ? `${skill} check` : `${skill} save`;
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({actor}),
      flavor: `${label}${success ? ' (Success)' : ' (Failure)'}`
    });
    return {roll, success, target: value};
  }
};

Hooks.once('init', async function() {
  console.log('SS13 System | Initializing');
  
  Actors.registerSheet("ss13", SS13ActorSheet, { 
    types: ["character", "npc"], 
    makeDefault: true 
  });
  
  Items.registerSheet("ss13", SS13ItemSheet, { 
    makeDefault: true 
  });
});

// Set default type for new actors and items
Hooks.on("preCreateActor", (document, createData, options, userId) => {
  if (!createData.type) createData.type = "character";
  // Initialize system data from template
  const template = game.system.template.Actor[createData.type === "character" ? "character" : "npc"];
  if (template && !createData.system) {
    createData.system = foundry.utils.deepClone(template);
  }
});

Hooks.on("preCreateItem", (document, createData, options, userId) => {
  if (!createData.type) createData.type = "equipment";
});