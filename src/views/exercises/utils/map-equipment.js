/**
 *
 * @param {*} equipment
 * @returns
 */
export const mapEquipment = (equipment) => {
  if (!equipment || equipment.length === 0) {
    return [];
  }
  return equipment
    .map((group) => group?.name || group?.id || group)
    .filter(Boolean);
};
