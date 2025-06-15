let allSemesters = JSON.parse(localStorage.getItem("gpaData")) || [];
let chart;

document.getElementById("gpaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = document.querySelectorAll("#courseInputs input");
  const gpas = [];

  inputs.forEach(input => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) gpas.push(val);
  });

  if (gpas.length < 3) {
    alert("Enter at least 3 course GPAs.");
    return;
  }

  const semesterGPA = (gpas.reduce((a, b) => a + b, 0)) / gpas.length;
  allSemesters.push(semesterGPA.toFixed(2));
  localStorage.setItem("gpaData", JSON.stringify(allSemesters));

  updateDisplay();
});

function updateDisplay() {
  const total = allSemesters.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  const cgpa = total / allSemesters.length;
  document.getElementById("cgpa").textContent = cgpa.toFixed(2);
  document.getElementById("remaining").textContent = 12 - allSemesters.length;

  drawChart();
}

function drawChart() {
  const ctx = document.getElementById("trendChart").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: allSemesters.map((_, i) => `Semester ${i + 1}`),
      datasets: [{
        label: "Semester GPA",
        data: allSemesters,
        backgroundColor: "rgba(57, 255, 20, 0.2)",
        borderColor: "#39ff14",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 4
        }
      }
    }
  });
}

function addCourse() {
  const courseInputs = document.getElementById("courseInputs");
  if (courseInputs.children.length < 5) {
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.placeholder = `Course ${courseInputs.children.length + 1} GPA`;
    courseInputs.appendChild(input);
  }
}

updateDisplay();
