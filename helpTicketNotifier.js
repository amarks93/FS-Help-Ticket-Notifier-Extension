let messages,
  newCount,
  interval,
  body = document.body,
  overlay = document.createElement("div");

  overlay.style.cssText =
  "position: fixed; min-width: 380px; height: 100%; right: 0%; background-color: #fff; box-shadow: -20px 0px 40px -35px; z-index: 999";

  let listenIcon = document.createElement("img");
(listenIcon.src =
  "https://media4.giphy.com/media/26wfQrP51M7TJGBiHL/giphy.gif"),
  (listenIcon.style.cssText =
    "position: absolute; width: 300px; height: 300px; top: 35%; margin-top: -100px; left: 40px; object-fit: cover; z-index: 999");

    let notificationIcon = document.createElement("img");
(notificationIcon.src =
  "https://i.pinimg.com/originals/a6/0a/bc/a60abcad4488f05309e4d5b2405d8ec9.gif"),
  (notificationIcon.style.cssText =
    "position: absolute; width: 300px; height: 300px; top: 35%; margin-top: -100px; left: 40px; object-fit: cover; z-index: 999");

    let listenButton = document.createElement("button");
    listenButton.innerText = "Start Listening";
    listenButton.style.cssText =
    "position: fixed; width: 200px; height: 50px; right: 90px; bottom: 54px; background-color: #66d193; text-align: center; color: #fff; font-size: 0.9rem; font-weight: 600; border-radius: 100px; border-width: 0px; outline: none; z-index: 999;";
    listenButton.onclick = () => {
      start();
    };

  let stopListenButton = document.createElement("button");
(stopListenButton.innerText = "Stop Listening"),
  (stopListenButton.style.cssText =
    "position: fixed; width: 200px; height: 50px; right: 90px; bottom: 54px; background-color: #d68989; text-align: center; color: #fff; font-size: 0.9rem; font-weight: 600; border-radius: 100px; border-width: 0px; outline: none; z-index: 999"),
  (stopListenButton.onclick = () => {
    stop();
  });

  let dismissButton = document.createElement("button");
(dismissButton.innerText = "Dismiss"),
  (dismissButton.style.cssText =
    "position: absolute; width: 150px; height: 50px; left: 115px; top: 80%; background-color: #bbb; text-align: center; color: #fff; font-size: 0.9rem; font-weight: 600; box-shadow: 0px 0px 40px -5px; border-radius: 100px; border-width: 0px; outline: none; z-index: 999"),
  (dismissButton.onclick = () => {
    dismiss();
  });

  let listenText = document.createElement("h1");
(listenText.innerText = "Listening..."),
  (listenText.style.cssText =
    "position: absolute; width: 100%; top: 55%; text-align: center; color: #555; font-size: 1.5rem; font-weight: 600; z-index: 999");

    let notificationText = document.createElement("h1");
(notificationText.innerText = "New Help Ticket(s)!"),
  (notificationText.style.cssText =
    "position: absolute; width: 100%; top: 50%; text-align: center; color: #333; font-size: 1.5rem; font-weight: 600; z-index: 999"),
  overlay.appendChild(listenIcon),
  overlay.appendChild(listenText),
  overlay.appendChild(stopListenButton),
  body.appendChild(listenButton);

  let audioCtx = new (window.AudioContext ||
  window.webkitAudioContext ||
  window.audioContext)();

  function beep(t, e, o, i, n) {
    let s = audioCtx.createOscillator(),
        l = audioCtx.createGain();
    s.connect(l),
        l.connect(audioCtx.destination),
        o && (l.gain.value = o),
        e && (s.frequency.value = e),
        i && (s.type = i),
        n && (s.onended = n),
        s.start(audioCtx.currentTime),
        s.stop(audioCtx.currentTime + (t || 500) / 1e3);
    }

function start() {
  body.appendChild(overlay),
    (messages = Array.from(document.querySelectorAll("div[id='ticket']"))
      .length),
    (newCount = Array.from(document.querySelectorAll("div[id='ticket']"))
      .length),
    (interval = setInterval(() => {
      console.log("Listening..."),
        (newCount = Array.from(document.querySelectorAll("div[id='ticket']"))
          .length),
        messages < newCount
          ? (notify(), (messages = newCount))
          : messages > newCount && (messages = newCount);
    }, 1e3));
}

function notify() {
  (overlay.style.cssText =
    "position: fixed; min-width: 380px; height: 100%; right: 0%; background-color: #F4F9FE; box-shadow: -20px 0px 40px -35px; z-index: 999"),
    overlay.removeChild(listenIcon),
    overlay.removeChild(listenText),
    overlay.appendChild(notificationIcon),
    overlay.appendChild(notificationText),
    overlay.appendChild(dismissButton),
    overlay.removeChild(stopListenButton),
    beep(),
    clearInterval(interval);
}

function dismiss() {
  overlay.removeChild(notificationIcon),
    overlay.removeChild(notificationText),
    overlay.removeChild(dismissButton),
    overlay.appendChild(listenIcon),
    overlay.appendChild(listenText),
    overlay.appendChild(stopListenButton),
    (overlay.style.cssText =
      "position: fixed; min-width: 380px; height: 100%; right: 0%; background-color: #fff; box-shadow: -20px 0px 40px -35px; z-index: 999"),
    stop();
}

function stop() {
  body.removeChild(overlay),
    console.log("Stopped Listening"),
    clearInterval(interval);
}