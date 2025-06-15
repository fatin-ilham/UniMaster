<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>UniMaster - University Progress Tracker</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>📚 UniMaster - Semester Progress Tracker</h1>

    <form id="semesterForm">
      <input type="text" id="semesterName" placeholder="Semester Name (e.g. Spring 2025)" required>
      <input type="number" step="0.01" id="gpa" placeholder="GPA (e.g. 3.25)" required>
      <input type="number" id="credit" placeholder="Credits (e.g. 15)" required>

      <input type="text" id="course1" placeholder="Course 1 Name">
      <input type="text" id="course2" placeholder="Course 2 Name">
      <input type="text" id="course3" placeholder="Course 3 Name">
      <input type="text" id="course4" placeholder="Course 4 Name">
      <input type="text" id="course5" placeholder="Course 5 Name">

      <input type="text" id="currentSemester" placeholder="Current Semester (e.g. 7th)" required>
      <input type="number" id="totalCreditsRequired" placeholder="Total Credits to Graduate (e.g. 130)" required>
      <input type="number" id="creditsCompleted" placeholder="Credits Completed So Far (e.g. 78)" required>

      <button type="submit">➕ Add Semester</button>
    </form>

    <button id="resetButton" style="margin-top: 15px;">🗑️ Reset Data</button>

    <div class="stats">
      <p><strong>Total CGPA:</strong> <span id="cgpa">0.00</span></p>
      <p><strong>Total Credits Completed:</strong> <span id="credits">0</span></p>
      <p><strong>Total Credits Remaining:</strong> <span id="remaining">0</span></p>
      <p><strong>Current Semester:</strong> <span id="currentSem">-</span></p>
      <p><strong>Estimated Semesters Left:</strong></p>
      <ul>
        <li>📘 With 9 credits/semester: <span id="sem9">-</span></li>
        <li>📗 With 12 credits/semester: <span id="sem12">-</span></li>
        <li>📙 With 15 credits/semester: <span id="sem15">-</span></li>
      </ul>
    </div>

    <canvas id="gpaChart" width="400" height="200"></canvas>
  </div>

  <script src="script.js"></script>
</body>
</html>

