import { ALL_OPTION } from "../../../commons/constants";

/**
 *
 * @param {*} exerciseData
 * @param {*} searchQuery
 * @param {*} activeMuscleGroup
 * @param {*} activeEquipment
 * @returns
 */
export const filterExercises = (
  exerciseData,
  searchQuery,
  activeMuscleGroup,
  activeEquipment,
) => {
  if (!exerciseData || !Array.isArray(exerciseData)) {
    return [];
  }
  return exerciseData
    ?.filter((exercise) => {
      const searchTarget = [
        exercise.name,
        exercise.muscleGroup,
        exercise.equipment,
        exercise.category,
        exercise.description,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());
      const matchesGroup =
        activeMuscleGroup === ALL_OPTION ||
        exercise?.muscleGroups?.name === activeMuscleGroup;
      const matchesEquipment =
        activeEquipment === ALL_OPTION ||
        exercise?.equipment?.name === activeEquipment;

      return matchesSearch && matchesGroup && matchesEquipment;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};
