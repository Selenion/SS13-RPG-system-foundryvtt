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
};

const ENGINEER_SPECIALIZATIONS = {
  atmos_tech: {
    label: "Atmospheric Technician",
    bonuses: { engineering: 15, atmosphere: 20, tech: 10 }
  },
  engine_operator: {
    label: "Engine Operator",
    bonuses: { engineering: 20, tech: 15, science: 10 }
  }
};

function applySpecializationBonuses(systemData) {
  if (!systemData?.profession || !systemData?.skills) return;
  if (systemData.profession.id !== "engineer" || Number(systemData.profession.level) !== 1) return;
  const specialization = ENGINEER_SPECIALIZATIONS[systemData.profession.specialization];
  if (!specialization) return;

  for (const [skillKey, bonusValue] of Object.entries(specialization.bonuses)) {
    if (!systemData.skills[skillKey]) continue;
    const currentValue = Number(systemData.skills[skillKey].value) || 0;
    systemData.skills[skillKey].value = Math.max(currentValue, bonusValue);
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
    context.professionConfig = {
      professionOptions: [
        { id: "", label: "None", selected: !context.system.profession.id },
        { id: "engineer", label: "Engineer (Level 1)", selected: context.system.profession.id === "engineer" }
      ],
      engineerSpecializations: Object.entries(ENGINEER_SPECIALIZATIONS).map(([id, data]) => ({
        id,
        label: data.label,
        selected: context.system.profession.specialization === id
      }))
    };
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
      currentSystem.profession.specialization = professionId === "engineer" ? "atmos_tech" : "";
      applySpecializationBonuses(currentSystem);
      await this.actor.update({ system: currentSystem });
    });

    html.find(".specialization-select").change(async ev => {
      const specializationId = String(ev.currentTarget.value || "");
      const currentSystem = foundry.utils.mergeObject(
        foundry.utils.deepClone(ACTOR_DEFAULTS),
        foundry.utils.deepClone(this.actor.system ?? {}),
        { inplace: false }
      );
      currentSystem.profession.id = "engineer";
      currentSystem.profession.level = 1;
      currentSystem.profession.specialization = specializationId;
      applySpecializationBonuses(currentSystem);
      await this.actor.update({ system: currentSystem });
    });
  }
}
