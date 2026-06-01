// SS13 Item
const ITEM_TYPES = ["weapon", "tool", "equipment", "ammo", "id", "grenade"];

const EQUIPMENT_SLOTS = [
  "uniform",
  "armor",
  "head",
  "belt",
  "back",
  "id",
  "ears",
  "eyes",
  "left_pocket",
  "right_pocket",
  "left_hand",
  "right_hand",
  "shoes",
  "hands"
];

const SLOT_LABELS = {
  uniform: "Uniform",
  armor: "Armor",
  head: "Head",
  belt: "Belt",
  back: "Back",
  id: "ID",
  ears: "Ears",
  eyes: "HUD / Glasses",
  left_pocket: "Left Pocket",
  right_pocket: "Right Pocket",
  left_hand: "Left Hand",
  right_hand: "Right Hand",
  shoes: "Shoes",
  hands: "Gloves"
};

const SKILL_OPTIONS = [
  "melee",
  "guns",
  "throwing",
  "explosives",
  "engineering",
  "construction",
  "power",
  "atmospherics",
  "medical",
  "surgery",
  "chemistry",
  "science",
  "robotics",
  "xenobiology",
  "hacking",
  "intimidate",
  "persuade",
  "deceive",
  "command",
  "bureaucracy",
  "cargo",
  "service",
  "performance",
  "sleight",
  "piloting",
  "survival"
];

const COMMON_FIELDS = new Set([
  "type",
  "damage",
  "damageType",
  "range",
  "ammo",
  "shots",
  "slot",
  "skill",
  "effect",
  "duration",
  "uses",
  "amount",
  "access",
  "protection",
  "count"
]);

export class SS13ItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: 'systems/ss13/templates/item-sheet.html',
      classes: ["ss13", "item-sheet"],
      width: 420,
      height: 560
    });
  }

  getData() {
    const data = super.getData();
    data.system = this.item.system;
    data.isWeapon = this.item.type === "weapon";
    data.isTool = this.item.type === "tool";
    data.isEquipment = this.item.type === "equipment";
    data.isAmmo = this.item.type === "ammo";
    data.isID = this.item.type === "id";
    data.isGrenade = this.item.type === "grenade";
    data.itemTypes = ITEM_TYPES.map(type => ({
      value: type,
      label: type,
      selected: this.item.type === type
    }));
    data.slotOptions = EQUIPMENT_SLOTS.map(slot => ({
      value: slot,
      label: SLOT_LABELS[slot] ?? slot,
      selected: this.item.system.slot === slot
    }));
    data.skillOptions = [
      {value: "", label: "None", selected: !this.item.system.skill},
      ...SKILL_OPTIONS.map(skill => ({
        value: skill,
        label: skill,
        selected: this.item.system.skill === skill
      }))
    ];
    data.extraFields = Object.entries(this.item.system ?? {})
      .filter(([key, value]) => !COMMON_FIELDS.has(key) && typeof value !== "object")
      .map(([key, value]) => ({key, value}));
    return data;
  }
}
