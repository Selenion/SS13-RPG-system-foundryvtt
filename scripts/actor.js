// Actor Sheet
export class SS13ActorSheet extends ActorSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: 'templates/actor-sheet.html',
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