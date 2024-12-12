// SIDEBAR
const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle")

    toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close");
    });


// CALENDAR
// Check Leap year
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'Maret', 'April', 'May', 'June', 'july', 'August', 'September', 'October', 'November', 'Desember']


generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}


// CHART HEARTRATE
const ctx = document.getElementById('heartRateLineChart').getContext('2d');

// Data untuk grafik menyerupai detak jantung
const heartRateLineData = {
  labels: Array.from({ length: 30 }, (_, i) => i + 1), // Buat label untuk 30 data poin
  datasets: [{
    label: 'Heart Rate',
    data: [70, 75, 72, 90, 50, 70, 80, 70, 72, 50, 90, 100, 70, 60, 85, 70, 50, 95, 80, 70, 60, 85, 90, 50, 70, 75, 72, 90, 50, 70],
    borderColor: '#27bc69',
    borderWidth: 2,
    fill: false,
    tension: 0.3, // Membuat garis melengkung
    pointRadius: 0, // Hilangkan titik data
  }]
};

const config = {
  type: 'line',
  data: heartRateLineData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hilangkan legenda
      }
    },
    scales: {
      x: {
        display: false, // Hilangkan sumbu X
      },
      y: {
        display: false, // Hilangkan sumbu Y
        min: 40,        // Atur nilai minimum (untuk memastikan grafik pas)
        max: 110,       // Atur nilai maksimum
      }
    }
  },
};

new Chart(ctx, config);


// TODAY ACTIVITY
const todayActivity = document.getElementById('activityChart').getContext('2d');

const data = {
  labels: ['Stretching', 'CrossFit', 'Yoga'],
  datasets: [
    {
      data: [25, 40, 55], // Minutes
      backgroundColor: ['#28b2c4', '#deda6c', '#27bc69'],
      borderWidth: 0,
      cutout: '95%', // Membuat lingkaran tengah
    },
  ],
};

const options = {
  plugins: {
    tooltip: {
      enabled: false, // Disable tooltip
    },
    legend: {
      display: false, // Hide legend
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

new Chart(todayActivity, {
  type: 'doughnut',
  data: data,
  options: options,
});



// Script running challange
// Calculate stroke-dashoffset dynamically
const percentage = 65; // Set the progress value
const circle = document.querySelector('.progress .value');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference - (percentage / 100) * circumference}`;


// Calculate stroke-dashoffset dynamically
const percentageW = 50; // Set the progress value in percent
const circleW = document.querySelector('.progressW .valueW');
const radiusW = circleW.r.baseVal.value;
const circumferenceW = 2 * Math.PI * radius;

circleW.style.strokeDasharray = `${circumferenceW}`;
circleW.style.strokeDashoffset = `${circumferenceW - (percentageW / 100) * circumferenceW}`;


// FORM HEART ATTACK
document.getElementById("heart-attack-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  // Ambil nilai input dari form
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const cp = document.getElementById("cp").value;
  const trestbps = document.getElementById("trestbps").value;
  const chol = document.getElementById("chol").value;
  const fbs = document.getElementById("fbs").value;
  const restecg = document.getElementById("restecg").value;
  const thalachh = document.getElementById("thalachh").value;
  const exang = document.getElementById("exang").value;
  const oldpeak = document.getElementById("oldpeak").value;
  const slope = document.getElementById("slope").value;
  const ca = document.getElementById("ca").value;
  const thal = document.getElementById("thal").value;

  // Data untuk dikirim ke API
  const inputData = {
      age: age,
      sex: sex,
      cp: cp,
      trestbps: trestbps,
      chol: chol,
      fbs: fbs,
      restecg: restecg,
      thalachh: exang,
      oldpeak: oldpeak,
      slope: slope,
      ca: ca,
      thal: thal
  };

  try {
      // Mengirim data ke API
      const response = await fetch('link api deployan', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputData),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Menampilkan hasil dalam modal
      const modal = document.getElementById("result-modal");
      const resultMessage = document.getElementById("result-message");
      resultMessage.innerText = `Prediction: ${result.prediction}`;
      modal.style.display = "flex";

  } catch (error) {
      alert("Error: " + error.message);
  }
});

// Tutup modal
document.querySelector(".close-btn").addEventListener("click", function() {
  const modal = document.getElementById("result-modal");
  modal.style.display = "none";
});

// Tutup modal jika klik di luar konten modal
window.addEventListener("click", function(event) {
  const modal = document.getElementById("result-modal");
  if (event.target === modal) {
      modal.style.display = "none";
  }
});

