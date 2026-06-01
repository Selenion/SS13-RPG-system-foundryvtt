// SS13 System initialization
console.log("SS13 | === MODULE LOADING START ===");

import { SS13Actor, SS13ActorSheet } from "./scripts/actor.js";
import { SS13ItemSheet } from "./scripts/item.js";
import "./scripts/ss13.js";

console.log("SS13 | Imports loaded");

// Default actor data template
const DEFAULT_ACTOR_DATA = {
  character: {
    attributes: {
      str: { value: 25, label: "STR" },
      dex: { value: 25, label: "DEX" },
      int: { value: 25, label: "INT" },
      com: { value: 25, label: "COM" },
      cha: { value: 25, label: "CHA" }
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
      melee: { rank: 0, label: "Melee" },
      guns: { rank: 0, label: "Guns" },
      throwing: { rank: 0, label: "Throwing" },
      explosives: { rank: 0, label: "Explosives" },
      engineering: { rank: 0, label: "Engineering" },
      construction: { rank: 0, label: "Construction" },
      power: { rank: 0, label: "Power" },
      atmospherics: { rank: 0, label: "Atmospherics" },
      medical: { rank: 0, label: "Medical" },
      surgery: { rank: 0, label: "Surgery" },
      chemistry: { rank: 0, label: "Chemistry" },
      science: { rank: 0, label: "Science" },
      robotics: { rank: 0, label: "Robotics" },
      xenobiology: { rank: 0, label: "Xenobiology" },
      hacking: { rank: 0, label: "Hacking" },
      intimidate: { rank: 0, label: "Intimidate" },
      persuade: { rank: 0, label: "Persuade" },
      deceive: { rank: 0, label: "Deceive" },
      command: { rank: 0, label: "Command" },
      bureaucracy: { rank: 0, label: "Bureaucracy" },
      cargo: { rank: 0, label: "Cargo" },
      service: { rank: 0, label: "Service" },
      performance: { rank: 0, label: "Performance" },
      sleight: { rank: 0, label: "Sleight" },
      piloting: { rank: 0, label: "Piloting" },
      survival: { rank: 0, label: "Survival" }
    },
    inventory: {
      slots: {
        uniform: "", armor: "", head: "", belt: "", back: "",
        id: "", ears: "", left_pocket: "", right_pocket: "",
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
      com: { value: 25, label: "COM" },
      cha: { value: 25, label: "CHA" }
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
      melee: { rank: 0, label: "Melee" },
      guns: { rank: 0, label: "Guns" },
      throwing: { rank: 0, label: "Throwing" },
      explosives: { rank: 0, label: "Explosives" },
      engineering: { rank: 0, label: "Engineering" },
      construction: { rank: 0, label: "Construction" },
      power: { rank: 0, label: "Power" },
      atmospherics: { rank: 0, label: "Atmospherics" },
      medical: { rank: 0, label: "Medical" },
      surgery: { rank: 0, label: "Surgery" },
      chemistry: { rank: 0, label: "Chemistry" },
      science: { rank: 0, label: "Science" },
      robotics: { rank: 0, label: "Robotics" },
      xenobiology: { rank: 0, label: "Xenobiology" },
      hacking: { rank: 0, label: "Hacking" },
      intimidate: { rank: 0, label: "Intimidate" },
      persuade: { rank: 0, label: "Persuade" },
      deceive: { rank: 0, label: "Deceive" },
      command: { rank: 0, label: "Command" },
      bureaucracy: { rank: 0, label: "Bureaucracy" },
      cargo: { rank: 0, label: "Cargo" },
      service: { rank: 0, label: "Service" },
      performance: { rank: 0, label: "Performance" },
      sleight: { rank: 0, label: "Sleight" },
      piloting: { rank: 0, label: "Piloting" },
      survival: { rank: 0, label: "Survival" }
    },
    inventory: {
      slots: {
        uniform: "", armor: "", head: "", belt: "", back: "",
        id: "", ears: "", left_pocket: "", right_pocket: "",
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
const SKILL_BONUS_BY_RANK = { 0: 0, 1: 10, 2: 15, 3: 20 };

async function loadBaseItems() {
  const response = await fetch("systems/ss13/items.json");
  if (!response.ok) {
    throw new Error(`Unable to load base items: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.items ?? [];
}

async function importBaseItems({ updateExisting = false } = {}) {
  if (!game.user?.isGM) {
    ui.notifications?.warn("Only a GM can import SS13 base items.");
    return {created: 0, updated: 0, skipped: 0};
  }

  const sourceItems = await loadBaseItems();
  const existingBySourceId = new Map(
    game.items
      .filter(item => item.getFlag("ss13", "sourceId"))
      .map(item => [item.getFlag("ss13", "sourceId"), item])
  );
  const toCreate = [];
  let updated = 0;
  let skipped = 0;

  for (const sourceItem of sourceItems) {
    const existing = existingBySourceId.get(sourceItem.id);
    const itemData = {
      name: sourceItem.name,
      type: sourceItem.type,
      img: sourceItem.img,
      system: foundry.utils.deepClone(sourceItem.system ?? {}),
      flags: {
        ss13: {
          sourceId: sourceItem.id
        }
      }
    };

    if (existing) {
      if (updateExisting) {
        await existing.update(itemData);
        updated += 1;
      } else {
        skipped += 1;
      }
      continue;
    }

    toCreate.push(itemData);
  }

  if (toCreate.length) {
    await Item.createDocuments(toCreate);
  }

  const result = {created: toCreate.length, updated, skipped};
  ui.notifications?.info(`SS13 items import: ${result.created} created, ${result.updated} updated, ${result.skipped} skipped.`);
  return result;
}

class SS13ImportItemsConfig extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: "SS13 Base Items",
      id: "ss13-import-items",
      template: "systems/ss13/templates/import-items.html",
      width: 420,
      height: "auto",
      closeOnSubmit: false
    });
  }

  async getData() {
    const sourceItems = await loadBaseItems();
    const existingSourceIds = new Set(
      game.items
        .filter(item => item.getFlag("ss13", "sourceId"))
        .map(item => item.getFlag("ss13", "sourceId"))
    );
    const missingCount = sourceItems.filter(item => !existingSourceIds.has(item.id)).length;
    return {
      totalCount: sourceItems.length,
      importedCount: sourceItems.length - missingCount,
      missingCount
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='import']").click(async ev => {
      ev.preventDefault();
      await importBaseItems();
      this.render();
    });
    html.find("[data-action='update']").click(async ev => {
      ev.preventDefault();
      await importBaseItems({updateExisting: true});
      this.render();
    });
  }

  async _updateObject() {}
}

window.SS13Roll = {
  skill: async (actorId, attribute, skill) => {
    const actor = game.actors.get(actorId);
    if (!actor) return;
    const skillData = actor.system.skills?.[skill];
    const attributeData = actor.system.attributes?.[attribute];
    if (!skillData || !attributeData) return;
    const rank = Number(skillData.rank ?? 0);
    const skillBonus = SKILL_BONUS_BY_RANK[rank] ?? 0;
    const attributeValue = Number(attributeData.value ?? 0);
    const target = attributeValue + skillBonus;

    const roll = await new Roll('1d100').evaluate({async: false});
    const success = roll.total <= target;
    const attributeLabel = attributeData.label ?? attribute.toUpperCase();
    const skillLabel = skillData.label ?? skill;
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({actor}),
      flavor: `${attributeLabel} ${attributeValue} + ${skillLabel} ${skillBonus} = ${target}${success ? ' (Success)' : ' (Failure)'}`
    });
    return {roll, success, target};
  },

  save: async (actorId, save) => {
    const actor = game.actors.get(actorId);
    if (!actor) return;
    const saveData = actor.system.saves?.[save];
    if (!saveData) return;
    const target = Number(saveData.value ?? 0);
    const roll = await new Roll('1d100').evaluate({async: false});
    const success = roll.total <= target;
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({actor}),
      flavor: `${saveData.label ?? save} ${target}${success ? ' (Success)' : ' (Failure)'}`
    });
    return {roll, success, target};
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

  game.settings.registerMenu("ss13", "importBaseItems", {
    name: "Import Base Items",
    label: "Open Importer",
    hint: "Import or update the bundled SS13 base items into this world.",
    icon: "fas fa-box-open",
    type: SS13ImportItemsConfig,
    restricted: true
  });
});

Hooks.once("ready", () => {
  game.ss13 = foundry.utils.mergeObject(game.ss13 ?? {}, {
    importBaseItems,
    loadBaseItems
  });
  console.log("SS13 | Ready. Use game.ss13.importBaseItems() to import base items.");
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
