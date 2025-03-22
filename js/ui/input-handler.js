// input-handler.js
function setFromCalculation(event) {
    const calcScreen = document.querySelector('.calculator-tab.active .screen');
    const parentDiv = event.target.closest('.conversion-group'); 
    const inputField = parentDiv.querySelector('.sci-input, #unit-input'); 

    if (calcScreen?.value.trim()) { 
        inputField.value = calcScreen.value; 
    }
}

document.querySelectorAll('.set-btn').forEach(button => {
    button.addEventListener('click', setFromCalculation);
});

// Keyboard Shortcuts
const screen = document.querySelector('.screen');
screen.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        document.querySelector(".equals").click(); 
    } else if (event.key === "Backspace") { 
        event.preventDefault();
        screen.value = screen.value.slice(0, -1);
    }
});