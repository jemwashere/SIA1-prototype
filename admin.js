const studentTable = document.getElementById("studentTable");
const eventTable = document.getElementById("eventTable");
const feeTable = document.getElementById("feeTable");   

document.addEventListener("DOMContentLoaded", () => {
  loadStudents();
  loadEvents();
  loadFees();
});



/* ---------- STUDENTS ---------- */

function loadStudents() {
  if (!studentTable) return;

  const students = JSON.parse(localStorage.getItem("students")) || [];
  studentTable.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.course}</td>
      <td>${student.section}</td>
      <td>
        <button onclick="editStudent(${index}, this)">Edit</button>
      </td>
    `;
    studentTable.appendChild(row);
  });
}

function addStudent(event) {
  event.preventDefault();
  const inputs = event.target.querySelectorAll("input");
  const students = JSON.parse(localStorage.getItem("students")) || [];

  students.push({
    id: inputs[0].value,
    name: inputs[1].value,
    course: inputs[2].value,
    section: inputs[3].value
  });

  localStorage.setItem("students", JSON.stringify(students));
  event.target.reset();
  loadStudents();
}

function editStudent(index, button) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td");
  let students = JSON.parse(localStorage.getItem("students"));

  if (button.textContent === "Save") {
    students[index] = {
      id: cells[0].querySelector("input").value,
      name: cells[1].querySelector("input").value,
      course: cells[2].querySelector("input").value,
      section: cells[3].querySelector("input").value
    };
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
    return;
  }

  for (let i = 0; i < 4; i++) {
    cells[i].innerHTML = `<input value="${cells[i].textContent}">`;
  }
  button.textContent = "Save";
}

function searchStudentById() {
  const input = document.getElementById("searchStudent").value.toLowerCase();
  const rows = document.querySelectorAll("#studentTable tr");

  rows.forEach(row => {
    row.classList.remove("highlight");

    const idCell = row.cells[0];
    if (!idCell) return;

    const studentId = idCell.textContent.toLowerCase();

    if (studentId.includes(input) && input !== "") {
      row.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      row.classList.add("highlight");
    }
  });
}


/* ---------- EVENTS ---------- */

function loadEvents() {
  const eventTable = document.getElementById("eventTable");
  if (!eventTable) return;

  const events = JSON.parse(localStorage.getItem("events")) || [];
  eventTable.innerHTML = "";

  events.forEach((event, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${event.name}</td>
      <td>${event.days}</td>
      <td>₱${event.morningFee}</td>
      <td>₱${event.afternoonFee}</td>
      <td>₱${event.lateFee}</td>
      <td>
        <button onclick="editEvent(${index}, this)">Edit</button>
        <button onclick="deleteEvent(${index})">Delete</button>
      </td>
    `;
    eventTable.appendChild(row);
  });
}

function addEvent(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll("input");
  const events = JSON.parse(localStorage.getItem("events")) || [];

  events.push({
    name: inputs[0].value,
    days: inputs[1].value,
    morningFee: inputs[2].value,
    afternoonFee: inputs[3].value,
    lateFee: inputs[4].value
  });

  localStorage.setItem("events", JSON.stringify(events));
  e.target.reset();
  loadEvents();
}

function editEvent(index, button) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td");
  let events = JSON.parse(localStorage.getItem("events"));

  if (button.textContent === "Save") {
    events[index] = {
      name: cells[0].querySelector("input").value,
      days: cells[1].querySelector("input").value,
      morningFee: cells[2].querySelector("input").value || 0,
      afternoonFee: cells[3].querySelector("input").value || 0,
      lateFee: cells[4].querySelector("input").value || 0
    };
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
    return;
  }

  // Turn table cells into input fields
  for (let i = 0; i < 5; i++) {
    const value = cells[i].textContent.replace("₱", "") || 0;
    cells[i].innerHTML = `<input value="${value}">`;
  }
  button.textContent = "Save";
}

function deleteEvent(index) {
  let events = JSON.parse(localStorage.getItem("events")) || [];
  if (confirm("Delete this event?")) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
  }
}


function searchEventByName() {
  const input = document.getElementById("searchEvent").value.toLowerCase();
  const table = document.getElementById("eventTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    rows[i].classList.remove("highlight");

    const eventNameCell = rows[i].cells[0];
    if (!eventNameCell) continue;

    const eventName = eventNameCell.textContent.toLowerCase();

    if (input !== "" && eventName.includes(input)) {
      rows[i].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      rows[i].classList.add("highlight");
      break; 
    }
  }
}





function showSection(id) {
  // hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  // show selected section
  const selected = document.getElementById(id);
  if (selected) selected.classList.add('active');
}


/* ---------- FEES ---------- */

function loadFees() {
  const feeTable = document.getElementById("feeTable");
  if (!feeTable) return;

  const fees = JSON.parse(localStorage.getItem("fees")) || [];
  feeTable.innerHTML = "";

  fees.forEach((fee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${fee.description}</td>
      <td>${fee.type}</td>
      <td>₱${fee.amount}</td>
      <td>
        <button onclick="editFee(${index}, this)">Edit</button>
        <button onclick="deleteFee(${index})">Delete</button>
      </td>
    `;
    feeTable.appendChild(row);
  });
}

function addFee(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll("input");
  const fees = JSON.parse(localStorage.getItem("fees")) || [];

  fees.push({
    description: inputs[0].value,
    type: inputs[1].value,
    amount: inputs[2].value
  });

  localStorage.setItem("fees", JSON.stringify(fees  ));
  e.target.reset();
  loadFees();
}   

function editFee(index, button) {
  const row = button.parentElement.parentElement;
  const cells = row.querySelectorAll("td");
  let fees = JSON.parse(localStorage.getItem("fees"));

  if (button.textContent === "Save") {
    fees[index] = {
      description: cells[0].querySelector("input").value,
      type: cells[1].querySelector("input").value,
      amount: cells[2].querySelector("input").value || 0
    };
    localStorage.setItem("fees", JSON.stringify(fees));
    loadFees();
    return;
  }

  // Turn table cells into input fields
  for (let i = 0; i < 3; i++) {
    const value = cells[i].textContent.replace("₱", "") || 0;
    cells[i].innerHTML = `<input value="${value}">`;
  }
  button.textContent = "Save";
}

function deleteFee(index) {
  let fees = JSON.parse(localStorage.getItem("fees")) || [];
  if (confirm("Delete this fee?")) {
    fees.splice(index, 1);
    localStorage.setItem("fees", JSON.stringify(fees));
    loadFees();
  }
}

function searchFeeByDescription() {
  const input = document.getElementById("searchFee").value.toLowerCase();
  const table = document.getElementById("feeTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    rows[i].classList.remove("highlight");

    const feeDescriptionCell = rows[i].cells[0];
    if (!feeDescriptionCell) continue;

    const feeDescription = feeDescriptionCell.textContent.toLowerCase();

    if (input !== "" && feeDescription.includes(input)) {
      rows[i].scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      rows[i].classList.add("highlight");
      break; 
    }
  }
}


function showSection(id) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  const selected = document.getElementById(id);
  if (selected) selected.classList.add('active');

  // reload data when switching tabs
  if (id === "fees") loadFees();
  if (id === "students") loadStudents();
  if (id === "events") loadEvents();
}






