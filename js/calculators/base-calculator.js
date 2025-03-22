document.addEventListener("DOMContentLoaded", () => {
    const screens = {
        standard: document.querySelector('#standard-tab .screen'),
        scientific: document.querySelector('#scientific-tab .screen')
    };

    // ตัวแปรตรวจสอบสถานะการคำนวณ
    let isCalculating = false;

    // ฟังก์ชันเพิ่มค่าบนหน้าจอ
    function appendValue(screen, value) {
        // เคลียร์หน้าจอหากแสดงผลเป็น "Error"
        if (screen.value.includes('Error')) {
            screen.value = '';
        }

        if (['+', '-', '*', '/'].includes(value)) {
            if (screen.value !== '' && !['+', '-', '*', '/'].includes(screen.value.slice(-1))) {
                screen.value += value;
            }
        } else if (value === '.' && screen.value.includes('.')) {
            return; // ป้องกันการเพิ่มจุดทศนิยมซ้ำ
        } else {
            screen.value += value;
        }
    }

    // ฟังก์ชันคำนวณผลลัพธ์ด้วย math.js
    function calculateResult(screen) {
        if (isCalculating) return; // ถ้ากำลังคำนวณอยู่ ให้ข้าม
        isCalculating = true; // ตั้งค่าสถานะเป็นกำลังคำนวณ

        try {
            // ตรวจสอบว่าหน้าจอว่างเปล่าหรือไม่
            if (screen.value.trim() === '') {
                screen.value = 'Error: Empty input';
                return;
            }

            // ตรวจสอบว่าหน้าจอแสดงผลเป็น Error อยู่แล้วหรือไม่
            if (screen.value.includes('Error')) {
                return; // ไม่ต้องทำอะไรถ้าเป็น Error
            }

            // แปลงสัญลักษณ์ให้ตรงกับ math.js
            let expression = screen.value
                .replace(/π/g, 'pi')
                .replace(/√/g, 'sqrt')
                .replace(/x²/g, '^2')
                .replace(/e/g, '2.7182818284590452353602874713527')
                .replace(/%/g, '/100');

            // คำนวณด้วย math.js
            const result = calculate(expression);

            // ตรวจสอบว่าผลลัพธ์เกินขีดจำกัดของ JavaScript หรือไม่
            if (result > Number.MAX_SAFE_INTEGER) {
                screen.value = 'Error: Number too large';
            } else {
                // แสดงผลลัพธ์ในรูปแบบปกติ (ไม่ใช้ toLocaleString() สำหรับตัวเลขขนาดใหญ่)
                screen.value = result.toString();
            }
        } catch (error) {
            screen.value = 'Error: Invalid expression';
        } finally {
            isCalculating = false; // รีเซ็ตสถานะเมื่อคำนวณเสร็จ
        }
    }

    function calculate(expression) {
        // แทนที่คำสั่งพิเศษด้วยฟังก์ชันทางคณิตศาสตร์ของ JavaScript
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, angle) => {
            // แปลงองศาเป็นเรเดียน: radians = degrees * (π/180)
            return "Math.sin(" + angle + " * Math.PI / 180)";
        });

        expression = expression.replace(/cos\(([^)]+)\)/g, (match, angle) => {
            return "Math.cos(" + angle + " * Math.PI / 180)";
        });

        expression = expression.replace(/tan\(([^)]+)\)/g, (match, angle) => {
            return "Math.tan(" + angle + " * Math.PI / 180)";
        });

        expression = expression.replace(/log\(([^)]+)\)/g, (match, number) => {
            return "Math.log10(" + number + ")";  // log ฐาน 10
        });

        expression = expression.replace(/ln\(([^)]+)\)/g, (match, number) => {
            return "Math.log(" + number + ")";    // log ฐาน e (natural log)
        });

        expression = expression.replace(/abs\(([^)]+)\)/g, (match, number) => {
            return "Math.abs(" + number + ")";
        });

        expression = expression.replace(/sqrt\(([^)]+)\)/g, (match, number) => {
            return "Math.sqrt(" + number + ")";
        });

        expression = expression.replace(/\^/g, "**");  // เปลี่ยนเครื่องหมายยกกำลัง
        expression = expression.replace(/pi/g, "Math.PI");  // แทน pi ด้วย Math.PI

        try {
            return eval(expression);
        } catch (error) {
            return "Error";
        }
    }

    // ฟังก์ชันจัดการการคลิกปุ่ม
    function handleButtonClick(screen) {
        return (event) => {
            const value = event.target.textContent;

            // เคลียร์หน้าจอหากแสดงผลเป็น "Error" และผู้ใช้กดปุ่มใด ๆ
            if (screen.value.includes('Error')) {
                screen.value = '';
            }

            switch (value) {
                case "=":
                    calculateResult(screen);
                    break;

                case "AC":
                    screen.value = "";
                    break;

                case "DEL":
                    screen.value = screen.value.slice(0, -1);
                    break;

                case "sin":
                    screen.value += "sin(";
                    break;
                case "cos":
                    screen.value += "cos(";
                    break;
                case "tan":
                    screen.value += "tan(";
                    break;
                case "log":
                    screen.value += "log(";  // เตรียมรับค่าที่จะหา log (ฐาน 10)
                    break;
                case "ln":
                    screen.value += "ln(";   // เตรียมรับค่าที่จะหา ln (ฐาน e)
                    break;
                case "abs":
                    screen.value += "abs(";
                    break;
                case "√":
                    screen.value += "sqrt(";
                    break;

                case "x²":
                    screen.value += "^2";
                    break;

                case "π":
                    screen.value += "pi";
                    break;

                case "e":
                    screen.value += "e";
                    break;

                case "^":
                    screen.value += "^";
                    break;

                default:
                    appendValue(screen, value);
                    break;
            }
        };
    }

    // รองรับการกด Enter เพื่อคำนวณ
    Object.values(screens).forEach((screen) => {
        if (screen) {
            screen.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    calculateResult(screen);
                } else if (event.key === 'Backspace') {
                    event.preventDefault();
                    screen.value = screen.value.slice(0, -1);
                }
            });

            // เคลียร์หน้าจอเมื่อเริ่มพิมพ์ใหม่หลังจาก Error
            screen.addEventListener('input', () => {
                if (screen.value.includes('Error')) {
                    screen.value = '';
                }
            });
        }
    });

    // เพิ่ม event ให้ปุ่ม
    document.querySelectorAll(".calculator-tab .btn").forEach((button) => {
        const tab = button.closest(".calculator-tab");
        const tabType = tab.id.replace("-tab", "");
        const screen = screens[tabType === "standard" ? "standard" : "scientific"];

        button.addEventListener("click", handleButtonClick(screen));
    });
});