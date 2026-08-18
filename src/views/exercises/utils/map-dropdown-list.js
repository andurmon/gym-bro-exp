/**
 *
 * @param {*} list
 * @returns
 */
export const mapDropdownList = (list) => {
  if (!list || list.length === 0) {
    return [];
  }
  return list.map((group) => group?.name || group?.id || group).filter(Boolean);
};
