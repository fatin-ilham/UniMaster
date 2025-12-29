document.getElementById("creditForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const totalCreditsRequired = parseInt(document.getElementById("totalCreditsRequired").value.trim());
  const creditsCompleted = parseInt(document.getElementById("creditsCompleted").value.trim());
  const thesisTiming = document.getElementById("thesisTiming").value;

  if (
    isNaN(totalCreditsRequired) ||
    isNaN(creditsCompleted) ||
    totalCreditsRequired <= 0 ||
    creditsCompleted < 0 ||
    thesisTiming === ""
  ) {
    alert("Please enter valid information.");
    return;
  }

  const remaining = Math.max(0, totalCreditsRequired - creditsCompleted);

  let sem9 = Math.ceil(remaining / 9);
  let sem12 = Math.ceil(remaining / 12);
  let sem15 = Math.ceil(remaining / 15);

 
  if (thesisTiming === "early2") {
    sem9 += 1;
    sem12 += 1;
    sem15 += 1;

  
  }

  if (thesisTiming === "early1"){
  sem9 += 2
  sem12 += 2
  sem15 += 2
  
  }

  if (thesisTiming === "early3"){
  sem9 += 3
  sem12 += 3
  sem15 += 3
  
  }

  document.getElementById("credits").textContent = creditsCompleted;
  document.getElementById("remaining").textContent = remaining;
  document.getElementById("sem9").textContent = sem9;
  document.getElementById("sem12").textContent = sem12;
  document.getElementById("sem15").textContent = sem15;
});




