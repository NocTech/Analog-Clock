let canvas, ctx;

if (document.addEventListener) {
  document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false
  );
} else {
  document.attachEvent("oncontextmenu", function () {
    window.event.returnValue = false;
  });
}

function draw() {
  let time = (function () {
    let midnight = new Date();
    midnight.setHours(0);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    return Date.now() - midnight.getTime();
  })(),
    hours = time / (60 * 60 * 1000),
    minutes = (hours * 60) % 60,
    seconds = (minutes * 60) % 60,
    digitalHours = Math.trunc(hours);
  digitalMinutes = Math.trunc(minutes);
  digitalSeconds = Math.trunc(seconds);
  digitalHours = ("0" + digitalHours).slice(-2);
  digitalMinutes = ("0" + digitalMinutes).slice(-2);
  digitalSeconds = ("0" + digitalSeconds).slice(-2);
  digitalClock = digitalHours + ":" + digitalMinutes + ":" + digitalSeconds;

  ctx.clearRect(0, 0, size, size);

  ctx.lineCap = "round";
  c = { x: size / 2, y: size / 2 };

  face();
  digital();
  logo();
  secondHand();

  function face() {
    // Background
    ctx.beginPath();
    ctx.arc(c.x, c.y, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#1a1a1a";
    ctx.fill();

    // Dashes
    ctx.lineWidth = 12;
    for (let i = 0; i < 60; i++) {
      let r = (size - 20) / 2,
        l = 0;
      ctx.strokeStyle = "rgb(100, 35, 35)";
      let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
      v.setMag(r + l);
      ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
      ctx.stroke();
    }

    // 5 second dashes
    ctx.lineWidth = 12;
    for (let i = 0; i < 12; i++) {
      let r = (size - 20) / 2 - 20,
        l = 0;
      ctx.strokeStyle = "#ff0000";

      let v = new Vector(r, Math.PI * 2 * (i / 12) - Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
      v.setMag(r + l);
      ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
      ctx.stroke();
    }
  }

  function digital() {
    ctx.font = "800 5rem Helvetica";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.fillText(digitalClock, size / 2, size / 2 + 25);
  }

  function logo() {
    ctx.font = "800 2rem serif";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.fillText("Analog clock", size / 2, (size / 4) * 3);
  }

  function secondHand() {
    ctx.lineWidth = 12;

    for (let i = 0; i < seconds; i++) {
      let r = (size - 20) / 2,
        l = 0;
      ctx.strokeStyle = "#7fff00";

      let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
      v.setMag(r + l);
      ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
      ctx.stroke();
    }
  }
}

function init() {
  canvas = document.getElementById("clock");
  width = (window.innerWidth / 5) * 4.65;
  height = (window.innerHeight / 5) * 4.65;
  if (width > height) {
    size = height;
  } else {
    size = width;
  }
  //size = height
  console.log(width + "*" + height);
  console.log("size: " + size);
  canvas.width = canvas.height = size;
  console.log("canvas.width: " + canvas.width);
  console.log("canvas.height: " + canvas.height);
  ctx = canvas.getContext("2d");

  setInterval(draw, 10);
}

init();
