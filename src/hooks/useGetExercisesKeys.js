import translations from "../../public/locales/en-EN/translation.json";

const useGetExercisesKeys = () => {
  const exercisesLibrary = translations?.["exercises_library"] ?? {};

  const exercisesKeys = Object.entries(exercisesLibrary).map((item) => ({
    label: item?.[1],
    value: item?.[0],
  }));

  return exercisesKeys;
};

export default useGetExercisesKeys;
