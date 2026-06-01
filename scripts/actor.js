// Actor Sheet
const ACTOR_DEFAULTS = {
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
  profession: {
    id: "",
    level: 1,
    specialization: ""
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
};

const PROFESSION_TEMPLATES = {
  captain: { label: "Captain", skills: { command: 3, persuade: 2, guns: 1, bureaucracy: 1 } },
  head_of_personnel: { label: "Head of Personnel", skills: { bureaucracy: 3, persuade: 2, command: 1, hacking: 1 } },
  head_of_security: { label: "Head of Security", skills: { guns: 3, command: 2, intimidate: 2, bureaucracy: 1 } },
  chief_engineer: { label: "Chief Engineer", skills: { engineering: 3, power: 2, atmospherics: 2, command: 1 } },
  research_director: { label: "Research Director", skills: { science: 3, robotics: 2, xenobiology: 1, command: 1 } },
  chief_medical_officer: { label: "Chief Medical Officer", skills: { medical: 3, surgery: 2, chemistry: 1, command: 1 } },
  quartermaster: { label: "Quartermaster", skills: { cargo: 3, bureaucracy: 2, persuade: 1, command: 1 } },
  warden: { label: "Warden", skills: { bureaucracy: 3, intimidate: 2, guns: 2, command: 1 } },
  security_officer: { label: "Security Officer", skills: { guns: 3, melee: 2, intimidate: 1, bureaucracy: 1 } },
  detective: { label: "Detective", skills: { sleight: 2, deceive: 2, guns: 1, bureaucracy: 1 } },
  station_engineer: { label: "Station Engineer", skills: { engineering: 3, construction: 2, power: 1, atmospherics: 1 } },
  atmospheric_technician: { label: "Atmospheric Technician", skills: { atmospherics: 3, engineering: 2, construction: 1, survival: 1 } },
  geneticist: { label: "Geneticist", skills: { science: 3, medical: 1, xenobiology: 1, chemistry: 1 } },
  scientist: { label: "Scientist", skills: { science: 3, chemistry: 1, xenobiology: 1 } },
  roboticist: { label: "Roboticist", skills: { robotics: 3, engineering: 2, hacking: 1, science: 1 } },
  doctor: { label: "Doctor", skills: { medical: 3, surgery: 1, persuade: 1, chemistry: 1 } },
  paramedic: { label: "Paramedic", skills: { medical: 2, survival: 2, surgery: 1, piloting: 1 } },
  chemist: { label: "Chemist", skills: { chemistry: 3, science: 2, medical: 1 } },
  cargo_technician: { label: "Cargo Technician", skills: { cargo: 2, bureaucracy: 1, engineering: 1, survival: 1 } },
  shaft_miner: { label: "Shaft Miner", skills: { survival: 3, melee: 2, engineering: 1, explosives: 1 } },
  janitor: { label: "Janitor", skills: { service: 2, construction: 1, chemistry: 1 } },
  bartender: { label: "Bartender", skills: { service: 2, persuade: 2, performance: 1, chemistry: 1 } },
  chef: { label: "Chef", skills: { service: 2, survival: 1, melee: 1, chemistry: 1 } },
  botanist: { label: "Botanist", skills: { service: 2, science: 1, chemistry: 1, survival: 1 } },
  assistant: { label: "Assistant", skills: { sleight: 1, hacking: 1, survival: 1, deceive: 1 } },
  clown: { label: "Clown", skills: { performance: 3, persuade: 1, sleight: 1 } },
  mime: { label: "Mime", skills: { performance: 3, sleight: 1, deceive: 1 } },
  chaplain: { label: "Chaplain", skills: { persuade: 2, performance: 1, survival: 1 } },
  curator: { label: "Curator", skills: { science: 1, bureaucracy: 1, persuade: 1, performance: 1 } },
  lawyer: { label: "Lawyer", skills: { bureaucracy: 3, persuade: 2, intimidate: 1 } },
  psychologist: { label: "Psychologist", skills: { persuade: 3, medical: 1, deceive: 1 } },
  coroner: { label: "Coroner", skills: { medical: 2, surgery: 2, science: 1, bureaucracy: 1 } },
  nanotrasen_representative: { label: "NanoTrasen Representative", skills: { bureaucracy: 3, persuade: 2, command: 1, intimidate: 1 } },
  magistrate: { label: "Magistrate", skills: { bureaucracy: 3, intimidate: 2, persuade: 2 } },
  blueshield_officer: { label: "Blueshield Officer", skills: { guns: 2, melee: 1, intimidate: 1, command: 1 } },
  explorer: { label: "Explorer", skills: { survival: 3, piloting: 2, science: 1, guns: 1 } },
  bitrunner: { label: "Bitrunner", skills: { hacking: 3, science: 1, deceive: 1 } },
  cyborg: { label: "Cyborg", skills: { robotics: 3, engineering: 1, power: 1 } }
};

const SKILL_BONUS_BY_RANK = {
  0: 0,
  1: 10,
  2: 15,
  3: 20
};

const SLOT_ICONS = {
  uniform: "systems/ss13/icons/slots/uniform.png",
  armor: "systems/ss13/icons/slots/suit.png",
  head: "systems/ss13/icons/slots/head.png",
  belt: "systems/ss13/icons/slots/belt.png",
  back: "systems/ss13/icons/slots/back.png",
  id: "systems/ss13/icons/slots/id.png",
  ears: "systems/ss13/icons/slots/ears.png",
  left_pocket: "systems/ss13/icons/slots/pocket.png",
  right_pocket: "systems/ss13/icons/slots/pocket.png",
  left_hand: "systems/ss13/icons/slots/hand_l.png",
  right_hand: "systems/ss13/icons/slots/hand_r.png",
  shoes: "systems/ss13/icons/slots/shoes.png",
  hands: "systems/ss13/icons/slots/gloves.png"
};

const SLOT_ORDER = [
  "head",
  "uniform",
  "armor",
  "back",
  "belt",
  "id",
  "ears",
  "left_pocket",
  "right_pocket",
  "left_hand",
  "right_hand",
  "hands",
  "shoes"
];

const SKILL_GROUPS = [
  {label: "Combat", skills: ["melee", "guns", "throwing", "explosives"]},
  {label: "Engineering", skills: ["engineering", "construction", "power", "atmospherics"]},
  {label: "Medical", skills: ["medical", "surgery", "chemistry"]},
  {label: "Science", skills: ["science", "robotics", "xenobiology", "hacking"]},
  {label: "Social", skills: ["intimidate", "persuade", "deceive", "command", "bureaucracy", "performance"]},
  {label: "Operations", skills: ["cargo", "service", "sleight", "piloting", "survival"]}
];

function legacyValueToRank(value) {
  if (value >= 20) return 3;
  if (value >= 15) return 2;
  if (value > 0) return 1;
  return 0;
}

function migrateLegacySkills(systemData) {
  if (!systemData?.skills) return;
  const legacyMap = {
    tech: "hacking",
    atmosphere: "atmospherics",
    spacecraft: "piloting"
  };

  for (const [oldKey, newKey] of Object.entries(legacyMap)) {
    if (!systemData.skills[oldKey]) continue;
    const oldRank = Number(systemData.skills[oldKey].rank ?? legacyValueToRank(Number(systemData.skills[oldKey].value) || 0));
    const newRank = Number(systemData.skills[newKey]?.rank ?? 0);
    if (systemData.skills[newKey]) {
      systemData.skills[newKey].rank = Math.max(newRank, oldRank);
    }
    delete systemData.skills[oldKey];
  }
}

function applyProfessionRanks(systemData) {
  if (!systemData?.profession || !systemData?.skills) return;
  const professionConfig = PROFESSION_TEMPLATES[systemData.profession.id];
  if (!professionConfig?.skills) return;
  for (const [skillKey, rankValue] of Object.entries(professionConfig.skills)) {
    if (!systemData.skills[skillKey]) continue;
    const currentRank = Number(systemData.skills[skillKey].rank ?? legacyValueToRank(Number(systemData.skills[skillKey].value) || 0));
    systemData.skills[skillKey].rank = Math.max(currentRank, Number(rankValue) || 0);
  }
}

function enrichSkillsForMothership(systemData) {
  if (!systemData?.skills || !systemData?.attributes || !systemData?.saves) return;

  for (const [skillKey, skillData] of Object.entries(systemData.skills)) {
    const rank = Number(skillData.rank ?? legacyValueToRank(Number(skillData.value) || 0));
    const bonus = SKILL_BONUS_BY_RANK[rank] ?? 0;
    skillData.rank = rank;
    skillData.bonus = bonus;
    delete skillData.value;
    delete skillData.target;
  }
}

function buildSkillGroups(systemData) {
  return SKILL_GROUPS.map(group => ({
    label: group.label,
    skills: group.skills
      .filter(key => systemData.skills?.[key])
      .map(key => ({
        key,
        ...systemData.skills[key]
      }))
  }));
}

function buildSlotOptions(selectedSlot = "") {
  return [
    {value: "", label: "None", selected: !selectedSlot},
    ...SLOT_ORDER.map(slot => ({
      value: slot,
      label: slot,
      selected: selectedSlot === slot
    }))
  ];
}

function getEquippedItemIds(slotData) {
  return new Set(Object.values(slotData ?? {}).filter(Boolean));
}

export class SS13Actor extends Actor {
  prepareData() {
    super.prepareData();
    const system = this.system;

    system.attributes = foundry.utils.mergeObject(
      foundry.utils.deepClone(ACTOR_DEFAULTS.attributes),
      foundry.utils.deepClone(system.attributes ?? {}),
      { inplace: false }
    );
    system.saves = foundry.utils.mergeObject(
      foundry.utils.deepClone(ACTOR_DEFAULTS.saves),
      foundry.utils.deepClone(system.saves ?? {}),
      { inplace: false }
    );
    system.resources = foundry.utils.mergeObject(
      foundry.utils.deepClone(ACTOR_DEFAULTS.resources),
      foundry.utils.deepClone(system.resources ?? {}),
      { inplace: false }
    );
    system.skills = foundry.utils.mergeObject(
      foundry.utils.deepClone(ACTOR_DEFAULTS.skills),
      foundry.utils.deepClone(system.skills ?? {}),
      { inplace: false }
    );
    migrateLegacySkills(system);
    system.profession = foundry.utils.mergeObject(
      foundry.utils.deepClone(ACTOR_DEFAULTS.profession),
      foundry.utils.deepClone(system.profession ?? {}),
      { inplace: false }
    );
    system.inventory = foundry.utils.mergeObject(
      foundry.utils.deepClone(ACTOR_DEFAULTS.inventory),
      foundry.utils.deepClone(system.inventory ?? {}),
      { inplace: false }
    );
  }
}

export class SS13ActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/ss13/templates/actor-sheet.html",
      classes: ["ss13", "sheet", "actor"],
      width: 760,
      height: 680,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
    });
  }

  getData(options = {}) {
    const context = super.getData(options);
    context.actor = this.actor;
    context.system = foundry.utils.mergeObject(
      foundry.utils.deepClone(ACTOR_DEFAULTS),
      foundry.utils.deepClone(this.actor.system ?? {}),
      { inplace: false }
    );
    migrateLegacySkills(context.system);
    applyProfessionRanks(context.system);
    enrichSkillsForMothership(context.system);
    context.attributeOptions = Object.entries(context.system.attributes ?? {}).map(([id, data]) => ({
      id,
      label: data.label ?? id.toUpperCase()
    }));
    context.skillGroups = buildSkillGroups(context.system);
    context.professionConfig = {
      professionOptions: [
        { id: "", label: "None", selected: !context.system.profession.id },
        ...Object.entries(PROFESSION_TEMPLATES).map(([id, data]) => ({
          id,
          label: data.label,
          selected: context.system.profession.id === id
        }))
      ],
      engineerSpecializations: []
    };
    const slotData = context.system.inventory?.slots ?? {};
    const equippedItemIds = getEquippedItemIds(slotData);
    context.inventorySlots = SLOT_ORDER.filter(key => key in slotData).map(key => ({
      key,
      itemId: slotData[key],
      item: this.actor.items.get(slotData[key]) ?? null,
      icon: SLOT_ICONS[key] || "systems/ss13/icons/slots/id.png"
    }));
    context.carriedItems = this.actor.items
      .filter(item => !equippedItemIds.has(item.id))
      .map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        img: item.img,
        slot: item.system.slot ?? "",
        slotOptions: buildSlotOptions(item.system.slot ?? "")
      }));
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".skill-roll").click(ev => {
      ev.preventDefault();
      const row = $(ev.currentTarget).closest(".skill-row");
      const attribute = String(row.find(".skill-attribute-select").val() || "com");
      const skill = String($(ev.currentTarget).data("skill") || "");
      SS13Roll.skill(this.actor.id, attribute, skill);
    });
    html.find(".save-roll").click(ev => {
      ev.preventDefault();
      const save = $(ev.currentTarget).data("save");
      SS13Roll.save(this.actor.id, save);
    });

    html.find(".profession-select").change(async ev => {
      const professionId = String(ev.currentTarget.value || "");
      const currentSystem = foundry.utils.mergeObject(
        foundry.utils.deepClone(ACTOR_DEFAULTS),
        foundry.utils.deepClone(this.actor.system ?? {}),
        { inplace: false }
      );
      currentSystem.profession.id = professionId;
      currentSystem.profession.level = 1;
      currentSystem.profession.specialization = "";
      applyProfessionRanks(currentSystem);
      await this.actor.update({ system: currentSystem });
    });

    html.find(".skill-rank-select").change(async ev => {
      const skillKey = String(ev.currentTarget.dataset.skill || "");
      const rankValue = Number(ev.currentTarget.value || 0);
      if (!skillKey) return;
      await this.actor.update({
        [`system.skills.${skillKey}.rank`]: rankValue
      });
    });

    html.find(".equip-item").click(async ev => {
      ev.preventDefault();
      const row = $(ev.currentTarget).closest(".inventory-row");
      const itemId = String(row.data("itemId") || "");
      const slot = String(row.find(".equip-slot-select").val() || "");
      if (!itemId || !slot) return;
      const slots = foundry.utils.deepClone(this.actor.system.inventory?.slots ?? {});
      for (const [slotKey, equippedItemId] of Object.entries(slots)) {
        if (equippedItemId === itemId) slots[slotKey] = "";
      }
      slots[slot] = itemId;
      await this.actor.update({"system.inventory.slots": slots});
    });

    html.find(".unequip-slot").click(async ev => {
      ev.preventDefault();
      const slot = String($(ev.currentTarget).data("slot") || "");
      if (!slot) return;
      await this.actor.update({[`system.inventory.slots.${slot}`]: ""});
    });

    html.find(".open-item").click(ev => {
      ev.preventDefault();
      const itemId = String($(ev.currentTarget).data("itemId") || "");
      const item = this.actor.items.get(itemId);
      item?.sheet?.render(true);
    });
  }
}
