// SS13 Core - Mothership d100 System
console.log('SS13 System loaded');

// Global function for damage rolls
window.SS13Damage = {
  roll: async (actor, damage, damageType = 'physical') => {
    const roll = await new Roll(damage).evaluate({async: false});
    const total = roll.total;
    const protection = actor.system.inventory?.protection || {};
    const mitigated = protection[damageType]?.value || 0;
    const final = Math.max(0, total - mitigated);
    const flavor = `${damage} (${damageType})${mitigated > 0 ? ` - ${mitigated} armor = ${final}` : ''}`;
    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({actor}),
      flavor
    });
    return {roll, total, mitigated, final};
  }
};