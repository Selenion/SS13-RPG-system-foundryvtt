// SS13 System initialization
console.log("SS13 | === MODULE LOADING START ===");

import { SS13Actor, SS13ActorSheet } from "./scripts/actor.js";
import { SS13ItemSheet } from "./scripts/item.js";

console.log("SS13 | Imports loaded");

// Default actor data template
const DEFAULT_ACTOR_DATA = {
  character: {
    attributes: {
      str: { value: 25, label: "STR" },
      dex: { value: 25, label: "DEX" },
      int: { value: 25, label: "INT" },
      com: { value: 25, label: "COM" }
    },
    saves: {
      san: { value: 20, label: "SAN" },
      ftr: { value: 20, label: "FTR" },
      phy: { value: 20, label: "PHY" }
    },
    resources: {
      hp: { value: 15, max: 15 },
      stress: { value: 0 }
    },
    skills: {
      melee: { value: 0, label: "Melee" },
      guns: { value: 0, label: "Guns" },
      engineering: { value: 0, label: "Engineering" },
      medical: { value: 0, label: "Medical" },
      science: { value: 0, label: "Science" },
      tech: { value: 0, label: "Tech" },
      intimidate: { value: 0, label: "Intimidate" },
      persuade: { value: 0, label: "Persuade" },
      sleight: { value: 0, label: "Sleight" },
      atmosphere: { value: 0, label: "Atmosphere" },
      spacecraft: { value: 0, label: "Spacecraft" },
      survival: { value: 0, label: "Survival" }
    },
    inventory: {
      slots: {
        uniform: "", armor: "", head: "", belt: "", back: "",
        id: "", left_pocket: "", right_pocket: "",
        left_hand: "", right_hand: "", shoes: "", hands: ""
      },
      protection: {
        brute: { value: 0, max: 0 },
        burn: { value: 0, max: 0 },
        toxin: { value: 0, max: 0 },
        radiation: { value: 0, max: 0 }
      }
    }
  },
  npc: {
    attributes: {
      str: { value: 25, label: "STR" },
      dex: { value: 25, label: "DEX" },
      int: { value: 25, label: "INT" },
      com: { value: 25, label: "COM" }
    },
    saves: {
      san: { value: 20, label: "SAN" },
      ftr: { value: 20, label: "FTR" },
      phy: { value: 20, label: "PHY" }
    },
    resources: {
      hp: { value: 15, max: 15 },
      stress: { value: 0 }
    },
    skills: {
      melee: { value: 0, label: "Melee" },
      guns: { value: 0, label: "Guns" },
      engineering: { value: 0, label: "Engineering" },
      medical: { value: 0, label: "Medical" },
      science: { value: 0, label: "Science" },
      tech: { value: 0, label: "Tech" },
      intimidate: { value: 0, label: "Intimidate" },
      persuade: { value: 0, label: "Persuade" },
      sleight: { value: 0, label: "Sleight" },
      atmosphere: { value: 0, label: "Atmosphere" },
      spacecraft: { value: 0, label: "Spacecraft" },
      survival: { value: 0, label: "Survival" }
    },
    inventory: {
      slots: {
        uniform: "", armor: "", head: "", belt: "", back: "",
        id: "", left_pocket: "", right_pocket: "",
        left_hand: "", right_hand: "", shoes: "", hands: ""
      },
      protection: {
        brute: { value: 0, max: 0 },
        burn: { value: 0, max: 0 },
        toxin: { value: 0, max: 0 },
        radiation: { value: 0, max: 0 }
      }
    }
  }
};

// Global roll functions for template clicks
window.SS13Roll = {
  skill: async (actorId, skill) => {
    const actor = game.actors.get(actorId);
    if (!actor) return;
    const skillData = actor.system.skills?.[skill];
    const skillRank = Number(skillData?.rank ?? 0);
    const skillValue = Number(skillData?.value ?? 0);
    const skillTarget = Number(skillData?.target ?? 0);
    const skillBonusByRank = { 0: 0, 1: 10, 2: 15, 3: 20 };

    let value = actor.system.saves?.[skill]?.value || 20;
    if (skillData) {
      const rankBonus = skillBonusByRank[skillRank] ?? skillValue;
      value = Math.max(skillValue + rankBonus, skillTarget, skillValue);
    }

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
  console.log('SS13 | Game available:', !!game);
  console.log('SS13 | Actor class:', typeof SS13Actor);
  console.log('SS13 | Actor Sheet class:', typeof SS13ActorSheet);
  console.log('SS13 | Item Sheet class:', typeof SS13ItemSheet);
  
  // Register custom Actor document class
  CONFIG.Actor.documentClass = SS13Actor;
  
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
  if (!createData.system?.attributes) {
    const template = DEFAULT_ACTOR_DATA[createData.type] || DEFAULT_ACTOR_DATA.character;
    document.updateSource({ system: foundry.utils.deepClone(template) });
  }
});

// Backup: ensure actor has data after creation
Hooks.on("createActor", (actor, options, userId) => {
  if (!actor.system?.attributes) {
    const template = actor.type === "character" ? 
      DEFAULT_ACTOR_DATA.character : DEFAULT_ACTOR_DATA.npc;
    actor.update({ system: foundry.utils.deepClone(template) });
  }
});

Hooks.on("preCreateItem", (document, createData, options, userId) => {
  if (!createData.type) createData.type = "equipment";
});
