/* ===== LOADING ===== */
window.onload = () => {
  setTimeout(() => {
    loading.style.display = "none";
    commandInput.focus();
  }, 1500);
};

/* ===== TERMINAL LOGIC ===== */
const input = document.getElementById("commandInput");
const output = document.getElementById("output");

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    output.innerHTML += `<div>> ${cmd}</div>`;
    handleCommand(cmd);
    input.value = "";
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

function handleCommand(cmd) {
  switch (cmd) {
    case "help":
      output.innerHTML += "<div>Commands: help, whoami, date, clear</div>";
      break;
    case "whoami":
      output.innerHTML += "<div>riskimareta</div>";
      break;
    case "date":
      output.innerHTML += `<div>${new Date()}</div>`;
      break;
    case "clear":
      output.innerHTML = "";
      break;
    default:
      output.innerHTML += "<div>Command not found</div>";
  }
}

/* ===== BUTTONS CONTROL ===== */
function minimize() {
  terminalBody.classList.toggle("hidden-body");
}

function maximize() {
  terminal.classList.toggle("maximized");
}

function closeTerminal() {
  terminal.innerHTML = "<div style='padding:20px;color:red'>Terminal closed</div>";
}