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
export const getWeek = (weekData) => [
  {
    day: "monday",
    key: "MON",
    workout: weekData?.[0]?.monday?.category ?? "Rest Day",
  },
  {
    day: "tuesday",
    key: "TUE",
    workout: weekData?.[0]?.tuesday?.category ?? "Rest Day",
  },
  {
    day: "wednesday",
    key: "WED",
    workout: weekData?.[0]?.wednesday?.category ?? "Rest Day",
  },
  {
    day: "thursday",
    key: "THU",
    workout: weekData?.[0]?.thursday?.category ?? "Rest Day",
  },
  {
    day: "friday",
    key: "FRI",
    workout: weekData?.[0]?.friday?.category ?? "Rest Day",
  },
  {
    day: "saturday",
    key: "SAT",
    workout: weekData?.[0]?.saturday?.category ?? "Rest Day",
  },
  {
    day: "sunday",
    key: "SUN",
    workout: weekData?.[0]?.sunday?.category ?? "Rest Day",
  },
];

export const getCurrentDayIndex = () => {
  const today = new Date();
  return today.getDay(); // Returns 0 (Sunday) to 6 (Saturday)
};

export const getCurrentDayName = () => {
  const today = new Date();
  const options = { weekday: "long" };
  return today.toLocaleDateString("en-EN", options).toLowerCase(); // Returns the full name of the day
};
