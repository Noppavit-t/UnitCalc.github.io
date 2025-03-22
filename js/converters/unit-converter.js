document.addEventListener('DOMContentLoaded', () => {
    const conversionRates = {
        length: {
            meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001,
            inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34
        },
        mass: {
            kilogram: 1, gram: 0.001, milligram: 0.000001, tonne: 1000,
            pound: 0.453592, ounce: 0.0283495
        },
        temperature: { celsius: 1, fahrenheit: 1, kelvin: 1
        },
        volume: {
            liter: 1, milliliter: 0.001, cubicmeter: 1000, cubiccentimeter: 0.001,
            cubicinch: 0.0163871, cubicfoot: 28.3168, cubicyard: 764.555
        },
        speed: {
            meterpersecond: 1, kilometerperhour: 0.277778, mileperhour: 0.44704
        },
        area: {
            squaremeter: 1, squarekilometer: 1000000, squarecentimeter: 0.0001, squaremillimeter: 0.000001,
            squaremile: 2589988.11, squareyard: 0.836127, squarefoot: 0.092903, squareinch: 0.00064516
        },
        time: {
            second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2628000, year: 31536000
        }
    };

    const categorySelect = document.querySelector('#unit-category');
    const fromUnitSelect = document.querySelector('#from-unit');
    const toUnitSelect = document.querySelector('#to-unit');
    const inputField = document.querySelector('#unit-input');
    const convertBtn = document.querySelector('#convert-btn');
    const setFromCalcBtn = document.querySelector('.set-btn'); // ใช้ class `.set-btn`
    const resultBox = document.querySelector('#unit-result');

    // ฟังก์ชันอัปเดต dropdown
    const updateUnitOptions = () => {
        const category = categorySelect.value;
        const units = Object.keys(conversionRates[category]);

        fromUnitSelect.innerHTML = units.map(unit => `<option value="${unit}">${unit}</option>`).join('');
        toUnitSelect.innerHTML = units.map(unit => `<option value="${unit}">${unit}</option>`).join('');

        toUnitSelect.selectedIndex = 1;
    };

    // ฟังก์ชันแปลงหน่วย
    const convertUnits = () => {
        const category = categorySelect.value;
        const inputValue = parseFloat(inputField.value);
        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;

        if (isNaN(inputValue)) {
            resultBox.textContent = 'Invalid input';
            return;
        }

        let result;
        if (category === 'temperature') {
            result = convertTemperature(inputValue, fromUnit, toUnit);
        } else {
            result = (inputValue * conversionRates[category][fromUnit]) / conversionRates[category][toUnit];
        }

         resultBox.textContent = `Result: ${result.toLocaleString()}`; 
    };

    // ฟังก์ชันแปลงอุณหภูมิ
    const convertTemperature = (value, from, to) => {
        if (from === to) return value;

        let celsius;
        if (from === 'celsius') celsius = value;
        else if (from === 'fahrenheit') celsius = (value - 32) * (5 / 9);
        else if (from === 'kelvin') celsius = value - 273.15;

        if (to === 'celsius') return celsius;
        if (to === 'fahrenheit') return celsius * (9 / 5) + 32;
        if (to === 'kelvin') return celsius + 273.15;
    };

    // ฟังก์ชันดึงค่าจากเครื่องคิดเลข
    function setFromCalculation(event) {
        const calcScreen = document.querySelector('#standard-tab .screen'); // หาเครื่องคิดเลข
        const parentDiv = event.target.closest('.conversion-group'); // หา parent div
        const inputField = parentDiv.querySelector('.unit-input'); // หา input ภายในกลุ่ม

        inputField.value = calcScreen.value; // กำหนดค่าจากเครื่องคิดเลข
    }

    // ตั้งค่า event listeners
    categorySelect.addEventListener('change', updateUnitOptions);
    convertBtn.addEventListener('click', convertUnits);
    setFromCalcBtn.addEventListener('click', setFromCalculation); // ใช้ฟังก์ชัน setFromCalculation

    // ตั้งค่าเริ่มต้น
    updateUnitOptions();
})
