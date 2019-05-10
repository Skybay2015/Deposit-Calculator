let div = document.querySelector("#container");
let notification = document.createElement("div");
function showNotification(options) {
    // if displayed - hide
    if  (div.style.display != 'none') {
        div.style.display = 'none';
    }
    // create prototype to not suddenly rewrite options props
    let obj = Object.create(options);
    // set counter
    let counter = 0;
    let counerContainer = document.createElement("span");
    // add to prototype options prop
    obj.top = obj.top || 0;
    obj.left = obj.left || 0;
    obj.html = obj.html || "Hi";
    obj.className = obj.className || "";
    // text and classes for notification
    notification.textContent = obj.html;
    notification.classList.add("notification");
    notification.classList.add(obj.className);
    // styles for notification
    notification.style.position = 'absolute';
    notification.style.top = obj.top + 'px';
    notification.style.right = obj.right + 'px';

    // append 
    notification.appendChild(counerContainer)
    div.appendChild(notification);
    // return function that will show/hide our notification and increase counter
    return function () {
        div.style.display = "";
        counter++;
        counerContainer.innerHTML = counter;
        setTimeout(function tick() {
            div.style.display = "none";
        }, 1000);
    }
}

let not = showNotification({
    top: 220,
    right: 10,
    html: "Привет",
    className: "welcome"
  })  

  console.log(not)

setInterval(not, 2000)