// Copyright (c) 2021 by Fernando (https://codepen.io/webfoxcore/pen/jqzJBB)

const popUpBox = document.querySelector("#pop-up");
const textInput = document.querySelector("input");
const toDoContainer = document.querySelector("#to-do-container");

let isShowPopUpBox = false;

textInput.addEventListener("keypress", insertToDo);
toDoContainer.addEventListener("click", toDoHandler);

drowColorfulToDo(document.querySelectorAll("li"));
drowColorfulDeleteBtn(document.querySelectorAll(".delete"));

function insertToDo(e) {
  if (e.key === "Enter") {
    const description = this.value;
    if (description == "") {
      return showPopUpBox("warning");
    }
    this.value = "";

    todo = document.createElement("li");
    todo.innerHTML = `<span class="delete"><i class="fa fa-trash" aria-hidden="true"></i></span>${description}`;
    toDoContainer.appendChild(todo);

    drowColorfulToDo(document.querySelectorAll("li"));
    showPopUpBox("added");
    drowColorfulDeleteBtn(document.querySelectorAll(".delete"));
  }
}

function showPopUpBox(message) {
  if (!isShowPopUpBox) {
    if (message === "warning") {
      popUpBox.style.opacity = "100";
      popUpBox.style.height = "50px";
      popUpBox.style.color = "red";
      popUpBox.textContent = "To-do를 입력해주세요!";
      isShowPopUpBox = true;
      setTimeout(togglePopUpBox, 1000);
    } else if (message === "added") {
      popUpBox.style.color = "#FFF";
      popUpBox.style.opacity = "100";
      popUpBox.style.height = "50px";
      popUpBox.textContent = "To-do가 등록되었습니다!";
      isShowPopUpBox = true;
      setTimeout(togglePopUpBox, 1000);
    } else {
      console.log("WARNING");
    }
  }
}

function togglePopUpBox() {
  if (!isShowPopUpBox) {
    popUpBox.style.opacity = "100";
    popUpBox.style.height = "200px";
    isShowPopUpBox = true;
  } else {
    popUpBox.style.opacity = "0";
    popUpBox.style.height = "0px";
    isShowPopUpBox = false;
  }
}

function toDoHandler(e) {
  const target = e.target;
  if (target.tagName === "LI") target.classList.toggle("marked");
  else if (target.tagName === "SPAN") {
    fadeOut(target.parentNode);
    e.stopPropagation();
  } else if (target.tagName === "I") {
    fadeOut(target.parentNode.parentNode);
    e.stopPropagation();
  }
}

function fadeOut(el) {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 0.05) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function drowColorfulToDo(toDo) {
  let r = 72,
    b = 85,
    g = 99,
    a = 0.5,
    gswitch = false;

  for (let i = 0; i < toDo.length; i++) {
    toDo[i].style.background =
      "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    if (!gswitch) {
      if (b < 255) {
        b += 10;
        r -= 20;
        g += 5;
      } else {
        gswitch = true;
      }
    } else {
      if (b > 0) {
        b -= 10;
        r += 20;
        g -= 5;
      } else {
        gswitch = false;
      }
    }
  }
}

function drowColorfulDeleteBtn(toDo) {
  let r2 = 255,
    b2 = 0,
    g2 = 0,
    a2 = 0.5,
    gswitch2 = false;

  for (let i = 0; i < toDo.length; i++) {
    toDo[i].style.background =
      "rgba(" + r2 + ", " + g2 + ", " + b2 + ", " + a2 + ")";
    if (!gswitch2) {
      if (g2 < 255) {
        g2 += 20;
      } else {
        gswitch2 = true;
      }
    } else {
      if (g2 > 0) {
        g2 -= 20;
      } else {
        gswitch2 = false;
      }
    }
  }
}
