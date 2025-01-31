const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// day suffix
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  const lastDigit = day % 10;
  const suffixes = ["th", "st", "nd", "rd"];
  return suffixes[lastDigit] || "th";
};

// format date - DD, MMM YYYY
export const formatDateToDDMMMYYYY = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate(); // Extract day
  const month = months[date.getMonth()]; // Get abbreviated month
  const year = date.getFullYear(); // Extract year
  const suffix = getDaySuffix(day);
  const formattedDate = `${day}${suffix} ${month}, ${year}`;
  return formattedDate;
};

export const formatDateToDDMMMYYYYWithoutUTC = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate(); // Extract day
  const month = months[date.getMonth()]; // Get abbreviated month
  const year = date.getUTCFullYear(); // Extract year
  const suffix = getDaySuffix(day);
  const formattedDate = `${day}${suffix} ${month}, ${year}`;
  return formattedDate;
};
