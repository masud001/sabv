let calendar = document.querySelector(".calendar");

// Lithuanian month names
const month_names = [
  "Sausis",
  "Vasaris",
  "Kovas",
  "Balandis",
  "Gegužė",
  "Birželis",
  "Liepa",
  "Rugpjūtis",
  "Rugsėjis",
  "Spalis",
  "Lapkritis",
  "Gruodis",
];

// Function to determine if a year is a leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Function to get the number of days in February
const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

// Function to generate the calendar for a specific month and year
const generateCalendar = (month, year) => {
  let calendar_days = calendar.querySelector(".calendar-days");
  let calendar_header_year = calendar.querySelector("#year");

  // Days in each month
  let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  calendar_days.innerHTML = "";

  let currDate = new Date();
  if (month === undefined) month = currDate.getMonth();
  if (year === undefined) year = currDate.getFullYear();

  let curr_month = month_names[month];
  month_picker.innerHTML = curr_month;
  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month, 1);
  let first_day_of_week = first_day.getDay();
  let days_in_current_month = days_of_month[month];

  // Fill previous month days
  let prev_month_days = [];
  if (first_day_of_week !== 0) {
    let prev_month = month === 0 ? 11 : month - 1;
    let prev_year = month === 0 ? year - 1 : year;
    let days_in_prev_month = days_of_month[prev_month];
    for (
      let i = days_in_prev_month - first_day_of_week + 1;
      i <= days_in_prev_month;
      i++
    ) {
      prev_month_days.push({ day: i, year: prev_year, month: prev_month });
    }
  }

  // Fill current month days
  let current_month_days = [];
  for (let i = 1; i <= days_in_current_month; i++) {
    current_month_days.push({ day: i, year: year, month: month });
  }

  // Fill next month days
  let next_month_days = [];
  let total_days = prev_month_days.length + current_month_days.length;
  if (total_days < 42) {
    let next_month = month === 11 ? 0 : month + 1;
    let next_year = month === 11 ? year + 1 : year;
    let days_in_next_month = days_of_month[next_month];
    for (let i = 1; total_days + i <= 42; i++) {
      next_month_days.push({ day: i, year: next_year, month: next_month });
    }
  }

  // Combine all days
  let all_days = [
    ...prev_month_days,
    ...current_month_days,
    ...next_month_days,
  ];

  // Render days
  all_days.forEach((dayObj) => {
    let day = document.createElement("div");
    day.classList.add("calendar-day");
    if (dayObj.year === year && dayObj.month === month) {
      day.classList.add("calendar-day-hover");
      if (
        dayObj.day === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add("curr-date");
      }
    } else {
      day.classList.add("calendar-day-other-month");
    }
    day.innerHTML = dayObj.day;
    calendar_days.appendChild(day);
  });
};

// Generate month list with Lithuanian names
let month_list = calendar.querySelector(".month-list");

month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div data-month="${index}">${e}</div>`;
  month.querySelector("div").onclick = () => {
    month_list.classList.remove("show");
    curr_month.value = index;
    generateCalendar(index, curr_year.value);
  };
  month_list.appendChild(month);
});

let month_picker = calendar.querySelector("#month-picker");

month_picker.onclick = () => {
  month_list.classList.add("show");
};

let currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);

// Handle year navigation
document.querySelector("#prev-year").onclick = () => {
  --curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector("#next-year").onclick = () => {
  ++curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

// Handle month navigation
document.querySelector("#prev-month").onclick = () => {
  if (curr_month.value === 0) {
    curr_month.value = 11;
    --curr_year.value;
  } else {
    --curr_month.value;
  }
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector("#next-month").onclick = () => {
  if (curr_month.value === 11) {
    curr_month.value = 0;
    ++curr_year.value;
  } else {
    ++curr_month.value;
  }
  generateCalendar(curr_month.value, curr_year.value);
};

// Dark mode toggle functionality
let dark_mode_toggle = document.querySelector(".dark-mode-switch");

dark_mode_toggle.onclick = () => {
  document.querySelector("body").classList.toggle("light");
  document.querySelector("body").classList.toggle("dark");
};
