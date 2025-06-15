document.getElementById("creditForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const totalCreditsRequired = parseInt(document.getElementById("totalCreditsRequired").value.trim());
  const creditsCompleted = parseInt(document.getElementById("creditsCompleted").value.trim());

  if (isNaN(totalCreditsRequired) || isNaN(creditsCompleted) || totalCreditsRequired <= 0 || creditsCompleted < 0) {
    alert("Please enter valid credit numbers.");
    return;
  }

  const remaining = Math.max(0, totalCreditsRequired - creditsCompleted);

  document.getElementById("credits").textContent = creditsCompleted;
  document.getElementById("remaining").textContent = remaining;
  document.getElementById("sem9").textContent = Math.ceil(remaining / 9);
  document.getElementById("sem12").textContent = Math.ceil(remaining / 12);
  document.getElementById("sem15").textContent = Math.ceil(remaining / 15);
});
