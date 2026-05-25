// Actor Sheet
const ACTOR_DEFAULTS = {
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
  captain: { label: "Captain", skills: { persuade: 15, intimidate: 10, guns: 10, survival: 10 } },
  head_of_personnel: { label: "Head of Personnel", skills: { persuade: 20, tech: 10, sleight: 10 } },
  head_of_security: { label: "Head of Security", skills: { guns: 20, melee: 15, intimidate: 15 } },
  chief_engineer: { label: "Chief Engineer", skills: { engineering: 20, tech: 15, atmosphere: 10 } },
  research_director: { label: "Research Director", skills: { science: 20, tech: 15, engineering: 10 } },
  chief_medical_officer: { label: "Chief Medical Officer", skills: { medical: 25, science: 15, persuade: 5 } },
  quartermaster: { label: "Quartermaster", skills: { persuade: 10, tech: 10, survival: 10 } },
  warden: { label: "Warden", skills: { intimidate: 20, guns: 15, melee: 10 } },
  security_officer: { label: "Security Officer", skills: { guns: 20, melee: 15, intimidate: 10 } },
  detective: { label: "Detective", skills: { sleight: 15, guns: 10, persuade: 10 } },
  prisoner: { label: "Prisoner", skills: { sleight: 10, survival: 10 } },
  station_engineer: { label: "Station Engineer", skills: { engineering: 20, tech: 15, atmosphere: 10 } },
  atmospheric_technician: { label: "Atmospheric Technician", skills: { atmosphere: 25, engineering: 15, tech: 10 } },
  geneticist: { label: "Geneticist", skills: { science: 20, medical: 10, tech: 10 } },
  scientist: { label: "Scientist", skills: { science: 25, tech: 10 } },
  roboticist: { label: "Roboticist", skills: { tech: 20, engineering: 15, science: 10 } },
  doctor: { label: "Doctor", skills: { medical: 20, science: 10, persuade: 5 } },
  paramedic: { label: "Paramedic", skills: { medical: 15, survival: 15, melee: 5 } },
  chemist: { label: "Chemist", skills: { science: 20, medical: 10, tech: 5 } },
  cargo_technician: { label: "Cargo Technician", skills: { survival: 10, persuade: 10, engineering: 5 } },
  shaft_miner: { label: "Shaft Miner", skills: { survival: 20, melee: 10, engineering: 10 } },
  janitor: { label: "Janitor", skills: { tech: 10, survival: 10 } },
  bartender: { label: "Bartender", skills: { persuade: 15, melee: 10 } },
  chef: { label: "Chef", skills: { survival: 10, melee: 10 } },
  botanist: { label: "Botanist", skills: { science: 10, survival: 15 } },
  assistant: { label: "Assistant", skills: { sleight: 10, tech: 10, survival: 10 } },
  clown: { label: "Clown", skills: { persuade: 10, sleight: 10 } },
  mime: { label: "Mime", skills: { sleight: 10, persuade: 10 } },
  chaplain: { label: "Chaplain", skills: { persuade: 10, survival: 10 } },
  curator: { label: "Curator", skills: { science: 10, persuade: 10 } },
  lawyer: { label: "Lawyer", skills: { persuade: 20, intimidate: 5 } },
  psychologist: { label: "Psychologist", skills: { persuade: 20, medical: 5 } },
  coroner: { label: "Coroner", skills: { medical: 15, science: 10 } },
  nanotrasen_representative: { label: "NanoTrasen Representative", skills: { persuade: 20, intimidate: 10 } },
  magistrate: { label: "Magistrate", skills: { intimidate: 15, persuade: 15 } },
  blueshield_officer: { label: "Blueshield Officer", skills: { guns: 15, intimidate: 10, melee: 10 } },
  explorer: { label: "Explorer", skills: { survival: 20, science: 10, spacecraft: 10 } },
  bitrunner: { label: "Bitrunner", skills: { tech: 20, science: 10 } },
  ai: { label: "AI", skills: { tech: 25, science: 15 } },
  cyborg: { label: "Cyborg", skills: { tech: 20, engineering: 10 } }
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

function applySpecializationBonuses(systemData) {
  if (!systemData?.profession || !systemData?.skills) return;
  const professionConfig = PROFESSION_TEMPLATES[systemData.profession.id];
  if (!professionConfig?.skills) return;
  for (const [skillKey, bonusValue] of Object.entries(professionConfig.skills)) {
    if (!systemData.skills[skillKey]) continue;
    systemData.skills[skillKey].value = Math.max(Number(systemData.skills[skillKey].value) || 0, bonusValue);
  }
}

function enrichSkillsForMothership(systemData) {
  if (!systemData?.skills || !systemData?.attributes || !systemData?.saves) return;

  for (const [skillKey, skillData] of Object.entries(systemData.skills)) {
    const rank = Number(skillData.rank ?? 0);
    const legacyValue = Number(skillData.value) || 0;
    const bonus = SKILL_BONUS_BY_RANK[rank] ?? legacyValue;
    skillData.rank = rank;
    skillData.target = legacyValue + bonus;
  }
}

export class SS13Actor extends Actor {
  prepareData() {
    super.prepareData();
    const system = this.system;

    if (!system.attributes) system.attributes = foundry.utils.deepClone(ACTOR_DEFAULTS.attributes);
    if (!system.saves) system.saves = foundry.utils.deepClone(ACTOR_DEFAULTS.saves);
    if (!system.resources) system.resources = foundry.utils.deepClone(ACTOR_DEFAULTS.resources);
    if (!system.skills) system.skills = foundry.utils.deepClone(ACTOR_DEFAULTS.skills);
    if (!system.profession) system.profession = foundry.utils.deepClone(ACTOR_DEFAULTS.profession);
    if (!system.inventory) system.inventory = foundry.utils.deepClone(ACTOR_DEFAULTS.inventory);
  }
}

export class SS13ActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/ss13/templates/actor-sheet.html",
      classes: ["ss13", "sheet", "actor"],
      width: 500,
      height: 600
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
    applySpecializationBonuses(context.system);
    enrichSkillsForMothership(context.system);
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
    context.inventorySlots = SLOT_ORDER.filter(key => key in slotData).map(key => ({
      key,
      itemId: slotData[key],
      icon: SLOT_ICONS[key] || "systems/ss13/icons/slots/id.png"
    }));
    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".skill-roll").click(ev => {
      ev.preventDefault();
      const skill = $(ev.currentTarget).data("skill");
      SS13Roll.skill(this.actor.id, skill);
    });
    html.find(".save-roll").click(ev => {
      ev.preventDefault();
      const save = $(ev.currentTarget).data("save");
      SS13Roll.skill(this.actor.id, save);
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
      applySpecializationBonuses(currentSystem);
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
  }
}
