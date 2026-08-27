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
        exercise.muscleGroup?.key,
        exercise.muscleGroup?.name,
        exercise.equipment?.key,
        exercise.equipment?.name,
        exercise.category,
        exercise.description,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());

      const muscleGroup =
        exercise?.muscleGroups?.key ?? exercise?.muscleGroups?.name;
      const equipment = exercise?.equipment?.key ?? exercise?.equipment?.name;

      const matchesGroup =
        activeMuscleGroup === ALL_OPTION || muscleGroup === activeMuscleGroup;
      const matchesEquipment =
        activeEquipment === ALL_OPTION || equipment === activeEquipment;

      return matchesSearch && matchesGroup && matchesEquipment;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};
