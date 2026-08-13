/**
 *
 * @param {*} muscleGroups
 * @returns
 */
export const mapMuscleGroups = (muscleGroups) => {
  if (!muscleGroups || muscleGroups.length === 0) {
    return [];
  }
  return muscleGroups
    .map((group) => group?.name || group?.id || group)
    .filter(Boolean);
};
