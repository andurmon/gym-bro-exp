// -----------------------------------------------------------------------------
// Helper function to get current week's date range
// -----------------------------------------------------------------------------

export const getCurrentWeekDateRange = (language = "en-US") => {
  const today = new Date();
  const currentDay = today.getDay();

  // Calculate the start of the week (Monday = 1, Sunday = 0)
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  const startDate = new Date(today.setDate(diff));

  // Calculate the end of the week (Sunday)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  // Format dates as "Month Date – Month Date"
  const formatter = new Intl.DateTimeFormat(language, {
    month: "short",
    day: "numeric",
  });

  return `${formatter.format(startDate)} – ${formatter.format(endDate)}`;
};

/**
 *
 */
export const week = [
  {
    day: "monday",
    key: "MON",
    workout: "Push",
  },
  {
    day: "tuesday",
    key: "TUE",
    workout: "Rest",
  },
  {
    day: "wednesday",
    key: "WED",
    workout: "Pull",
  },
  {
    day: "thursday",
    key: "THU",
    workout: "Rest",
  },
  {
    day: "friday",
    key: "FRI",
    workout: "Legs",
  },
  {
    day: "saturday",
    key: "SAT",
    workout: "Rest",
  },
  {
    day: "sunday",
    key: "SUN",
    workout: "Rest",
  },
];
