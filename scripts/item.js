// SS13 Item
export class SS13ItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: 'systems/ss13/templates/item-sheet.html',
      classes: ["ss13", "item-sheet"],
      width: 300,
      height: 400
    });
  }

  getData() {
    const data = super.getData();
    data.isWeapon = this.item.type === "weapon";
    data.isTool = this.item.type === "tool";
    data.isEquipment = this.item.type === "equipment";
    data.isID = this.item.type === "id";
    return data;
  }
}