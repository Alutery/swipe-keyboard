import Keyboard from "simple-keyboard";
import $ from "jquery";

import "simple-keyboard/build/css/index.css";
import "./index.css";

const TIMEOUT = 1500;


let keyboard = new Keyboard({
  theme: "hg-theme-default hg-theme-ios",
  layout: {
    default: [
      "1 2 3 4 5 6 7 8 9 0",
      "й ц у к е н г ш щ з х ъ {bksp}",
      "ф ы в а п р о л д ж э {enter}",
      "{shift} я ч с м и т ь б ю {shift}",
      "{alt} {smileys} , {space} . {downkeyboard}"
    ],
    shift: [
      "1 2 3 4 5 6 7 8 9 0",
      "Й Ц У К Е Н Г Ш Щ З {bksp}",
      "Ф Ы В А П Р О Л Д Ж Э {enter}",
      "{shiftactivated} Я Ч С М И Т Ь Б Ю {shiftactivated}",
      "{alt} {smileys} , {space} . {downkeyboard}"
    ],
    alt: [
      "1 2 3 4 5 6 7 8 9 0 `",
      `@ # $ & * ( ) ' " {bksp}`,
      "% - + = / ; : ! ? {enter}",
      "^ ~ { } ( ) /\ & < > [ ]",
      "{default} {smileys} , {space} . {downkeyboard}"
    ],
    smileys: [
      "😀 😊 😅 😂 🙂 😉 😍 😛 😠 😎 😤 😫",
      `😏 😬 😭 😓 😱 😪 😬 😴 😯 {bksp}`,
      "😐 😇 🤣 😘 😚 😆 😡 😥 😓 🙄 {enter}",
      "🤔 🤐 🤨 😒 🤥 😌 🥳 🤠 🤓 {shift}",
      "{default} {smileys} {space} {altright} {downkeyboard}"
    ]
  },
  display: {
    "{alt}": ".?123",
    "{smileys}": "\uD83D\uDE03",
    "{shift}": "⇧",
    "{shiftactivated}": "⇧",
    "{enter}": "enter",
    "{bksp}": "⌫",
    "{altright}": ".?123",
    "{downkeyboard}": "⬇",
    "{space}": " ",
    "{default}": "ABC",
    "{back}": "⇦"
  }
});


const inputElement = document.querySelector(".input");

/**
 * Update simple-keyboard when input is changed directly
 */
inputElement.addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

/**
 * Update simple-keyboard layout when key is pressed
 * @param button 
 */
function handleLayoutChange(button) {
  let currentLayout = keyboard.options.layoutName;
  let layoutName;

  switch (button) {
    case "{shift}":
    case "{shiftactivated}":
    case "{default}":
      layoutName = currentLayout === "default" ? "shift" : "default";
      break;

    case "{alt}":
    case "{altright}":
      layoutName = currentLayout === "alt" ? "default" : "alt";
      break;

    case "{smileys}":
      layoutName = currentLayout === "smileys" ? "default" : "smileys";
      break;

    default:
      break;
  }

  if (layoutName) {
    keyboard.setOptions({
      layoutName: layoutName
    });
  }
}  

function handleSpecialKeys(button) {
  switch(button) {
    case "{space}":
      inputElement.value += " ";
      break;
    case "{bksp}":
      inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1)
      break;
    case "{enter}":
      // not implemented
      break;
  }
}

$('.simple-keyboard').on('mouseover', '.hg-button', function(event) {
  
  const btnValue = String($( this ).data( 'skbtn' )); 
  console.log('btnValue: ', btnValue);
// debugger
  window.keyboardTimeout = setTimeout(() => {
    if (btnValue.includes("{") && btnValue.includes("}")) {
      handleSpecialKeys(btnValue)
      handleLayoutChange(btnValue);

      return;
    }

    inputElement.value += btnValue;
  }, TIMEOUT);
});

$('.simple-keyboard').on('mouseout', '.hg-button', function() { 
  clearTimeout(window.keyboardTimeout);
});