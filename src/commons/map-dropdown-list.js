/**
 *
 * @param {*} list
 * @returns
 */
export const mapDropdownList = (list, key = "key") => {
  if (!list || list.length === 0) {
    return [];
  }
  return list
    .map((group) => group?.[key] || group?.name || group?.id || group)
    .filter(Boolean);
};
