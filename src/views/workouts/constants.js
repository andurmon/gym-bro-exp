export const ADD_MODE = "add";
export const EDIT_MODE = "edit";

export const WORKOUT_CATEGORIES = [
  "push",
  "pull",
  "legs",
  "upper_body",
  "lower_body",
  "full_body",
];

export const TRAINING_TYPES = [
  "strength",
  "hypertrophy",
  "endurance",
  "circuit",
];

// TEMP: stand-in for the exercises API until useExercises is wired in here.
// Shape matches the `exercises` table (id, name) so swapping later is a 1-line change.
export const MOCK_EXERCISES = [
  { id: "1", name: "Bench Press" },
  { id: "2", name: "Incline Dumbbell Press" },
  { id: "3", name: "Triceps Pushdown" },
  { id: "4", name: "Pull Up" },
  { id: "5", name: "Barbell Row" },
  { id: "6", name: "Squat" },
  { id: "7", name: "Romanian Deadlift" },
];
