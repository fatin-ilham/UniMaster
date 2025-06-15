let semesters = JSON.parse(localStorage.getItem("semesters")) || [];
let chart;

function updateChart() {
  const labels = semesters.map(s => s.name);
  const data = semesters.map(s => s.gpa);

  if (chart) chart.destroy();

  const ctx = document.getElementById("gpaChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "GPA Trend",
        data: data,
        borderColor: "#00ffcc",
        backgroundColor: "#004d4d",
        tension: 0.3,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#00ffcc'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#00ffcc'
          }
        },
        y: {
          beginAtZero: true,
          max: 4.0,
          ticks: {
            color: '#00ffcc'
          }
        }
      }
    }
  });
}

function calculateStats() {
  let totalPoints = 0;
  let totalCredits = 0;
  semesters.forEach(({ gpa, credit }) => {
    totalPoints += gpa * credit;
    totalCredits += credit;
  });

  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  const remaining = Math.max(0, 130 - totalCredits);

  document.getElementById("cgpa").textContent = cgpa;
  document.getElementById("credits").textContent = totalCredits;
  document.getElementById("remaining").textContent = remaining;
}

document.getElementById("semesterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("semesterName").value.trim();
  const gpa = parseFloat(document.getElementById("gpa").value.trim());
  const credit = parseInt(document.getElementById("credit").value.trim());

  if (!name || isNaN(gpa) || isNaN(credit)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  semesters.push({ name, gpa, credit });
  localStorage.setItem("semesters", JSON.stringify(semesters));

  this.reset();
  calculateStats();
  updateChart();
});

document.getElementById("resetButton").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all saved data?")) {
    localStorage.removeItem("semesters");
    semesters = [];
    document.getElementById("cgpa").textContent = "0.00";
    document.getElementById("credits").textContent = "0";
    document.getElementById("remaining").textContent = "0";
    if (chart) chart.destroy();
  }
});

calculateStats();
updateChart();
