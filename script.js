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
  document.getElementById("cgpa").textContent = cgpa;
  document.getElementById("credits").textContent = totalCredits;

  const totalCreditsRequired = parseInt(localStorage.getItem("totalCreditsRequired")) || 130;
  const creditsCompleted = parseInt(localStorage.getItem("creditsCompleted")) || 0;
  const currentSemester = localStorage.getItem("currentSemester") || "-";
  const remaining = Math.max(0, totalCreditsRequired - creditsCompleted);

  document.getElementById("remaining").textContent = remaining;
  document.getElementById("currentSem").textContent = currentSemester;
  document.getElementById("sem9").textContent = Math.ceil(remaining / 9);
  document.getElementById("sem12").textContent = Math.ceil(remaining / 12);
  document.getElementById("sem15").textContent = Math.ceil(remaining / 15);
}

document.getElementById("semesterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("semesterName").value.trim();
  const gpa = parseFloat(document.getElementById("gpa").value.trim());
  const credit = parseInt(document.getElementById("credit").value.trim());
  const currentSemester = document.getElementById("currentSemester").value.trim();
  const totalCreditsRequired = parseInt(document.getElementById("totalCreditsRequired").value.trim());
  const creditsCompleted = parseInt(document.getElementById("creditsCompleted").value.trim());

  if (!name || isNaN(gpa) || isNaN(credit) || isNaN(totalCreditsRequired) || isNaN(creditsCompleted)) {
    alert("Please fill in all required fields correctly.");
    return;
  }

  // Optional course fields (just saved for now if needed later)
  const courses = [
    document.getElementById("course1").value.trim(),
    document.getElementById("course2").value.trim(),
    document.getElementById("course3").value.trim(),
    document.getElementById("course4").value.trim(),
    document.getElementById("course5").value.trim()
  ];

  semesters.push({ name, gpa, credit, courses });
  localStorage.setItem("semesters", JSON.stringify(semesters));
  localStorage.setItem("currentSemester", currentSemester);
  localStorage.setItem("totalCreditsRequired", totalCreditsRequired);
  localStorage.setItem("creditsCompleted", creditsCompleted);

  this.reset();
  calculateStats();
  updateChart();
});

document.getElementById("resetButton").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all saved data?")) {
    localStorage.clear();
    semesters = [];
    document.getElementById("cgpa").textContent = "0.00";
    document.getElementById("credits").textContent = "0";
    document.getElementById("remaining").textContent = "0";
    document.getElementById("currentSem").textContent = "-";
    document.getElementById("sem9").textContent = "-";
    document.getElementById("sem12").textContent = "-";
    document.getElementById("sem15").textContent = "-";
    if (chart) chart.destroy();
  }
});

calculateStats();
updateChart();

