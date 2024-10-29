export const primaryColor = "#0088ff";
export const secondaryClor = "#4D4C7D";
// export const secondaryClor = "##334155"; slate 700
export const bgSlate900 = "#1E293B";
export const collegeName = "Lyallpur Khalsa College Technical Compus";

export const isadmin = true;
export const dbUrl = "http://192.168.225.216:3000";

// utils.js
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const formatTime = (timee) => {
  const time = new Date(timee);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${period}`; // e.g., "3:30 PM"
};
