/* ===== LOADING ===== */
window.onload = () => {
  setTimeout(() => {
    loading.style.display = "none";
    commandInput.focus();
  }, 1500);
};

/* ===== TERMINAL INPUT LOGIC ===== */
const input = document.getElementById("commandInput");
const output = document.getElementById("output");

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.trim().toLowerCase();
    output.innerHTML += `<div>> ${cmd}</div>`;
    handleCommand(cmd);
    input.value = "";
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

function getOS() {
  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  if (platform.includes("win")) return "Windows";
  if (platform.includes("mac")) return "macOS";
  if (platform.includes("linux")) return "Linux";
  if (/android/.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/.test(userAgent)) return "iOS";

  return "Unknown OS";
}

function getBrowser() {
  const ua = navigator.userAgent;

  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Microsoft Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";

  return "Unknown Browser";
}

async function getIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return "Unable to fetch IP";
  }
}

async function handleCommand(cmd) {
  switch (cmd) {
    case "help":
      output.innerHTML += "<div>Commands: help, whoami, date, clear, os, browser, ip, sysinfo</div>";
      break;

    case "whoami":
      output.innerHTML += "<div>riskimareta</div>";
      break;

    case "date":
      output.innerHTML += `<div>${new Date().toString()}</div>`;
      break;

    case "os":
      output.innerHTML += `<div>OS: ${getOS()}</div>`;
      break;

    case "browser":
      output.innerHTML += `<div>Browser: ${getBrowser()}</div>`;
      break;

    case "ip":
      output.innerHTML += `<div>Fetching IP...</div>`;
      const ip = await getIP();
      output.innerHTML += `<div>IP: ${ip}</div>`;
      break;

    case "sysinfo":
      output.innerHTML += `<div>
OS      : ${getOS()}<br>
Browser: ${getBrowser()}<br>
      </div>`;
      const ipSys = await getIP();
      output.innerHTML += `<div>IP      : ${ipSys}</div>`;
      break;

    case "clear":
      output.innerHTML = "";
      break;

    default:
      output.innerHTML += `<div>Command not found: ${cmd}</div>`;
  }
}

/* ===== BUTTONS CONTROL ===== */
const terminal = document.getElementById("terminal");
const terminalBody = document.getElementById("terminal-body");

const btnMin = document.getElementById("btn-minimize");
const btnMax = document.getElementById("btn-maximize");
const btnClose = document.getElementById("btn-close");

/* ===== MINIMIZE ===== */
btnMin.addEventListener("click", () => {
  terminalBody.classList.toggle("minimized");
});

/* ===== MAXIMIZE ===== */
btnMax.addEventListener("click", () => {
  terminal.classList.toggle("maximized");

  // optional: ganti icon
  btnMax.textContent = terminal.classList.contains("maximized") ? "❐" : "☐";
});

/* ===== CLOSE ===== */
btnClose.addEventListener("click", () => {
  terminal.classList.add("closed");
});