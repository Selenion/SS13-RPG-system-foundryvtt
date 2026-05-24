// SS13 Item
export class SS13ItemSheet extends ItemSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: 'templates/item-sheet.html',
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