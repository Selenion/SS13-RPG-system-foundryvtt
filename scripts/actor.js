// Actor Sheet
export class SS13Actor extends Actor {
  prepareData() {
    super.prepareData();
    
    // Initialize default data if missing
    const system = this.system;
    if (!system?.attributes?.str) {
      console.log("SS13 | Initializing default data for actor:", this.name);
      
      const defaultData = this.type === "npc" ? {
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
      } : {
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
      };
      
      // Directly modify system data instead of calling update()
      Object.assign(this.system, defaultData);
    }
  }
}

export class SS13ActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: 'systems/ss13/templates/actor-sheet.html',
      classes: ['ss13', 'sheet', 'actor'],
      width: 500,
      height: 600
    });
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.skill-roll').click(ev => {
      ev.preventDefault();
      const skill = $(ev.currentTarget).data('skill');
      SS13Roll.skill(this.actor.id, skill);
    });
    html.find('.save-roll').click(ev => {
      ev.preventDefault();
      const save = $(ev.currentTarget).data('save');
      SS13Roll.skill(this.actor.id, save);
    });
  }
}