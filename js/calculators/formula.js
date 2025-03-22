// ข้อมูลสูตร
const formulas = {
    'ohms-law': {
        name: "Ohm's Law",
        equation: "V = IR",
        description: "กฎของโอห์ม (Ohm's Law) เป็นความสัมพันธ์พื้นฐานระหว่างแรงดันไฟฟ้า (V) กระแสไฟฟ้า (I) และความต้านทาน (R) ในวงจรไฟฟ้า",
        applications: [
            "ใช้คำนวณหาค่าในวงจรไฟฟ้าพื้นฐาน",
            "ใช้ในการออกแบบวงจรไฟฟ้าและอิเล็กทรอนิกส์",
            "ใช้ในการวิเคราะห์และแก้ไขปัญหาในวงจรไฟฟ้า"
        ],
        example: "ตัวอย่าง: หากมีแรงดันไฟฟ้า 12V ผ่านความต้านทาน 4Ω จะมีกระแสไฟฟ้า I = V/R = 12/4 = 3A",
        variables: [
            { symbol: 'V', label: 'Voltage', unit: 'V', min: 0, max: 1000 },
            { symbol: 'I', label: 'Current', unit: 'A', min: 0, max: 100 },
            { symbol: 'R', label: 'Resistance', unit: 'Ω', min: 0, max: 10000 }
        ],
        calculate: (inputs) => {
            if (inputs.V && inputs.I) return { R: inputs.V / inputs.I };
            if (inputs.V && inputs.R) return { I: inputs.V / inputs.R };
            if (inputs.I && inputs.R) return { V: inputs.I * inputs.R };
            return null;
        }
    },
    'stress': {
        name: "Stress",
        equation: "σ = F/A",
        description: "ความเค้น (Stress) คือแรงต่อหนึ่งหน่วยพื้นที่ มีหน่วยเป็นปาสคาล (Pascal หรือ Pa) หรือนิวตันต่อตารางเมตร (N/m²)",
        applications: [
            "ใช้ในงานออกแบบโครงสร้างวิศวกรรม",
            "ใช้ในการวิเคราะห์ความแข็งแรงของวัสดุ",
            "ใช้คำนวณในงานวิศวกรรมโยธาและเครื่องกล"
        ],
        example: "ตัวอย่าง: เสาที่รับแรง 1,000N บนพื้นที่หน้าตัด 0.01m² จะเกิดความเค้น σ = F/A = 1,000/0.01 = 100,000 Pa หรือ 100 kPa",
        variables: [
            { symbol: 'F', label: 'Force', unit: 'N', min: 0, max: 1000000 },
            { symbol: 'A', label: 'Area', unit: 'm²', min: 0.0001, max: 1000 },
            { symbol: 'σ', label: 'Stress', unit: 'Pa', min: 0, max: 1000000000 }
        ],
        calculate: (inputs) => {
            if (inputs.F && inputs.A) return { σ: inputs.F / inputs.A };
            if (inputs.σ && inputs.A) return { F: inputs.σ * inputs.A };
            if (inputs.F && inputs.σ) return { A: inputs.F / inputs.σ };
            return null;
        }
    },
    'newtons-second': {
        name: "Newton's Second Law",
        equation: "F = ma",
        description: "กฎข้อที่ 2 ของนิวตัน อธิบายความสัมพันธ์ระหว่างแรง (F) มวล (m) และความเร่ง (a) ของวัตถุ",
        applications: [
            "ใช้คำนวณในงานกลศาสตร์",
            "ใช้ในการออกแบบระบบการเคลื่อนที่และการขนส่ง",
            "ใช้ในการวิเคราะห์ระบบพลศาสตร์"
        ],
        example: "ตัวอย่าง: วัตถุมวล 5kg ได้รับแรง 20N จะมีความเร่ง a = F/m = 20/5 = 4 m/s²",
        variables: [
            { symbol: 'F', label: 'Force', unit: 'N', min: 0, max: 10000 },
            { symbol: 'm', label: 'Mass', unit: 'kg', min: 0.001, max: 1000 },
            { symbol: 'a', label: 'Acceleration', unit: 'm/s²', min: 0, max: 1000 }
        ],
        calculate: (inputs) => {
            if (inputs.F && inputs.m) return { a: inputs.F / inputs.m };
            if (inputs.F && inputs.a) return { m: inputs.F / inputs.a };
            if (inputs.m && inputs.a) return { F: inputs.m * inputs.a };
            return null;
        }
    },
    'pythagoras': {
        name: "Pythagorean Theorem",
        equation: "c = √(a² + b²)",
        description: "ทฤษฎีบทพีทาโกรัส อธิบายความสัมพันธ์ระหว่างด้านทั้งสามของสามเหลี่ยมมุมฉาก โดยกำลังสองของด้านตรงข้ามมุมฉาก (c) เท่ากับผลรวมของกำลังสองของด้านประกอบมุมฉากอีกสองด้าน (a และ b)",
        applications: [
            "ใช้ในงานเรขาคณิตและตรีโกณมิติ",
            "ใช้ในงานสำรวจและแผนที่",
            "ใช้ในงานออกแบบและก่อสร้าง"
        ],
        example: "ตัวอย่าง: สามเหลี่ยมมุมฉากที่มีด้านประกอบมุมฉากยาว 3 และ 4 หน่วย จะมีด้านตรงข้ามมุมฉากยาว c = √(3² + 4²) = √(9 + 16) = √25 = 5 หน่วย",
        variables: [
            { symbol: 'a', label: 'Side a', unit: 'units', min: 0, max: 1000 },
            { symbol: 'b', label: 'Side b', unit: 'units', min: 0, max: 1000 },
            { symbol: 'c', label: 'Hypotenuse', unit: 'units', min: 0, max: 1000 }
        ],
        calculate: (inputs) => {
            if (inputs.a && inputs.b) return { c: Math.sqrt(Math.pow(inputs.a, 2) + Math.pow(inputs.b, 2)) };
            if (inputs.a && inputs.c) return { b: Math.sqrt(Math.pow(inputs.c, 2) - Math.pow(inputs.a, 2)) };
            if (inputs.b && inputs.c) return { a: Math.sqrt(Math.pow(inputs.c, 2) - Math.pow(inputs.b, 2)) };
            return null;
        }
    },
    'kinetic-energy': {
        name: "Kinetic Energy",
        equation: "Ek = ½mv²",
        description: "พลังงานจลน์ (Ek) คือพลังงานที่วัตถุมีเนื่องจากการเคลื่อนที่ ขึ้นอยู่กับมวล (m) และความเร็ว (v) ของวัตถุ",
        applications: [
            "ใช้ในงานกลศาสตร์และฟิสิกส์",
            "ใช้วิเคราะห์การเคลื่อนที่ของวัตถุ",
            "ใช้ในการศึกษาการชนและการถ่ายโอนพลังงาน"
        ],
        example: "ตัวอย่าง: วัตถุมวล 2kg เคลื่อนที่ด้วยความเร็ว 10m/s จะมีพลังงานจลน์ Ek = ½ × 2 × 10² = ½ × 2 × 100 = 100J",
        variables: [
            { symbol: 'Ek', label: 'Kinetic Energy', unit: 'J', min: 0, max: 1000000 },
            { symbol: 'm', label: 'Mass', unit: 'kg', min: 0.001, max: 1000 },
            { symbol: 'v', label: 'Velocity', unit: 'm/s', min: 0, max: 1000 }
        ],
        calculate: (inputs) => {
            if (inputs.m && inputs.v) return { Ek: 0.5 * inputs.m * Math.pow(inputs.v, 2) };
            if (inputs.Ek && inputs.m) return { v: Math.sqrt((2 * inputs.Ek) / inputs.m) };
            if (inputs.Ek && inputs.v) return { m: (2 * inputs.Ek) / Math.pow(inputs.v, 2) };
            return null;
        }
    },
    'potential-energy': {
        name: "Gravitational Potential Energy",
        equation: "Ep = mgh",
        description: "พลังงานศักย์โน้มถ่วง (Ep) คือพลังงานที่วัตถุมีเนื่องจากตำแหน่งในสนามโน้มถ่วง ขึ้นอยู่กับมวล (m) ความเร่งเนื่องจากแรงโน้มถ่วง (g) และความสูง (h)",
        applications: [
            "ใช้ในงานกลศาสตร์และฟิสิกส์",
            "ใช้ในการวิเคราะห์ระบบพลังงาน",
            "ใช้ในการศึกษาการเคลื่อนที่ในแนวดิ่ง"
        ],
        example: "ตัวอย่าง: วัตถุมวล 5kg อยู่ที่ความสูง 10m จากพื้น (g = 9.8m/s²) จะมีพลังงานศักย์โน้มถ่วง Ep = 5 × 9.8 × 10 = 490J",
        variables: [
            { symbol: 'Ep', label: 'Potential Energy', unit: 'J', min: 0, max: 1000000 },
            { symbol: 'm', label: 'Mass', unit: 'kg', min: 0.001, max: 1000 },
            { symbol: 'g', label: 'Gravitational Acceleration', unit: 'm/s²', min: 0, max: 100, default: 9.8 },
            { symbol: 'h', label: 'Height', unit: 'm', min: 0, max: 10000 }
        ],
        calculate: (inputs) => {
            // กำหนดค่า g เป็น 9.8 หากไม่ได้ระบุ
            const g = inputs.g || 9.8;
            
            // กรณีที่มีการระบุค่า Ep, m และ g
            if (inputs.Ep && inputs.m && inputs.g) return { h: inputs.Ep / (inputs.m * inputs.g) };
            
            // กรณีที่มีการระบุค่า Ep, m และ h
            if (inputs.Ep && inputs.m && inputs.h) return { g: inputs.Ep / (inputs.m * inputs.h) };
            
            // กรณีที่มีการระบุค่า Ep, g และ h
            if (inputs.Ep && inputs.g && inputs.h) return { m: inputs.Ep / (inputs.g * inputs.h) };
            
            // กรณีที่มีการระบุค่า m, g และ h
            if (inputs.m && inputs.g && inputs.h) return { Ep: inputs.m * inputs.g * inputs.h };
            
            return null;
        }
    },
    'electrical-power': {
        name: "Electrical Power",
        equation: "P = VI",
        description: "กำลังไฟฟ้า (P) คือพลังงานไฟฟ้าที่ใช้ต่อหนึ่งหน่วยเวลา ขึ้นอยู่กับแรงดันไฟฟ้า (V) และกระแสไฟฟ้า (I)",
        applications: [
            "ใช้ในงานวิศวกรรมไฟฟ้า",
            "ใช้ในการคำนวณการใช้พลังงานของอุปกรณ์ไฟฟ้า",
            "ใช้ในการออกแบบระบบไฟฟ้า"
        ],
        example: "ตัวอย่าง: อุปกรณ์ไฟฟ้าที่ใช้แรงดัน 220V และกระแส 2A จะใช้กำลังไฟฟ้า P = 220 × 2 = 440W",
        variables: [
            { symbol: 'P', label: 'Power', unit: 'W', min: 0, max: 100000 },
            { symbol: 'V', label: 'Voltage', unit: 'V', min: 0, max: 1000 },
            { symbol: 'I', label: 'Current', unit: 'A', min: 0, max: 100 }
        ],
        calculate: (inputs) => {
            if (inputs.V && inputs.I) return { P: inputs.V * inputs.I };
            if (inputs.P && inputs.V) return { I: inputs.P / inputs.V };
            if (inputs.P && inputs.I) return { V: inputs.P / inputs.I };
            return null;
        }
    },
    'strain': {
        name: "Strain",
        equation: "ε = ΔL/L₀",
        description: "ความเครียด (Strain) คืออัตราส่วนของการเปลี่ยนแปลงความยาว (ΔL) ต่อความยาวเดิม (L₀) ของวัสดุเมื่อได้รับแรงกระทำ",
        applications: [
            "ใช้ในงานวิศวกรรมวัสดุ",
            "ใช้ในการวิเคราะห์ความแข็งแรงของโครงสร้าง",
            "ใช้ในการทดสอบคุณสมบัติของวัสดุ"
        ],
        example: "ตัวอย่าง: วัสดุที่มีความยาวเดิม 100mm เมื่อได้รับแรงดึงแล้วยืดออกเป็น 102mm จะมีความเครียด ε = (102-100)/100 = 2/100 = 0.02 หรือ 2%",
        variables: [
            { symbol: 'ε', label: 'Strain', unit: '', min: 0, max: 1 },
            { symbol: 'ΔL', label: 'Change in Length', unit: 'm', min: 0, max: 100 },
            { symbol: 'L₀', label: 'Original Length', unit: 'm', min: 0.001, max: 1000 }
        ],
        calculate: (inputs) => {
            if (inputs.ΔL && inputs.L0) return { ε: inputs.ΔL / inputs.L0 };
            if (inputs.ε && inputs.L0) return { ΔL: inputs.ε * inputs.L0 };
            if (inputs.ε && inputs.ΔL) return { L0: inputs.ΔL / inputs.ε };
            return null;
        }
    },
    'youngs-modulus': {
        name: "Young's Modulus",
        equation: "E = σ/ε",
        description: "โมดูลัสของยัง (Young's Modulus) คืออัตราส่วนของความเค้น (σ) ต่อความเครียด (ε) ในช่วงยืดหยุ่นของวัสดุ",
        applications: [
            "ใช้ในงานวิศวกรรมวัสดุ",
            "ใช้ในการวิเคราะห์การเสียรูปของวัสดุ",
            "ใช้ในการเลือกวัสดุสำหรับงานวิศวกรรม"
        ],
        example: "ตัวอย่าง: วัสดุที่มีความเค้น 200MPa และความเครียด 0.002 จะมีโมดูลัสของยัง E = 200/0.002 = 100,000MPa หรือ 100GPa",
        variables: [
            { symbol: 'E', label: "Young's Modulus", unit: 'Pa', min: 0, max: 1000000000000 },
            { symbol: 'σ', label: 'Stress', unit: 'Pa', min: 0, max: 1000000000 },
            { symbol: 'ε', label: 'Strain', unit: '', min: 0, max: 1 }
        ],
        calculate: (inputs) => {
            if (inputs.σ && inputs.ε) return { E: inputs.σ / inputs.ε };
            if (inputs.E && inputs.ε) return { σ: inputs.E * inputs.ε };
            if (inputs.E && inputs.σ) return { ε: inputs.σ / inputs.E };
            return null;
        }
    },
    'thermal-expansion': {
        name: "Thermal Expansion",
        equation: "ΔL = α⋅L₀⋅ΔT",
        description: "การขยายตัวทางความร้อน อธิบายการเปลี่ยนแปลงความยาว (ΔL) ของวัสดุเมื่อมีการเปลี่ยนแปลงอุณหภูมิ (ΔT) โดยขึ้นอยู่กับความยาวเดิม (L₀) และสัมประสิทธิ์การขยายตัวทางความร้อน (α)",
        applications: [
            "ใช้ในงานวิศวกรรมโครงสร้าง",
            "ใช้ในการออกแบบระบบท่อและรางรถไฟ",
            "ใช้ในการออกแบบเครื่องจักรที่ทำงานที่อุณหภูมิสูง"
        ],
        example: "ตัวอย่าง: เหล็กความยาว 10m มีสัมประสิทธิ์การขยายตัวทางความร้อน α = 12×10⁻⁶ /°C เมื่ออุณหภูมิเพิ่มขึ้น 50°C จะขยายตัว ΔL = 12×10⁻⁶ × 10 × 50 = 0.006m หรือ 6mm",
        variables: [
            { symbol: 'ΔL', label: 'Change in Length', unit: 'm', min: 0, max: 10 },
            { symbol: 'α', label: 'Coefficient of Thermal Expansion', unit: '1/°C', min: 0, max: 0.001 },
            { symbol: 'L₀', label: 'Original Length', unit: 'm', min: 0.001, max: 1000 },
            { symbol: 'ΔT', label: 'Temperature Change', unit: '°C', min: -273, max: 10000 }
        ],
        calculate: (inputs) => {
            // ต้องการอย่างน้อย 3 ตัวแปรเพื่อคำนวณหาตัวแปรที่ 4
            let filledCount = Object.keys(inputs).filter(key => inputs[key] !== undefined).length;
            if (filledCount < 3) return null;
            
            if (inputs.α && inputs.L0 && inputs.ΔT) return { ΔL: inputs.α * inputs.L0 * inputs.ΔT };
            if (inputs.ΔL && inputs.L0 && inputs.ΔT) return { α: inputs.ΔL / (inputs.L0 * inputs.ΔT) };
            if (inputs.ΔL && inputs.α && inputs.ΔT) return { L0: inputs.ΔL / (inputs.α * inputs.ΔT) };
            if (inputs.ΔL && inputs.α && inputs.L0) return { ΔT: inputs.ΔL / (inputs.α * inputs.L0) };            
            return null;
        }
    },
    'heat-transfer': {
        name: "Heat Transfer",
        equation: "Q = m⋅c⋅ΔT",
        description: "การถ่ายเทความร้อน (Heat Transfer) อธิบายปริมาณความร้อน (Q) ที่ถ่ายเทเมื่อวัสดุมวล (m) มีการเปลี่ยนแปลงอุณหภูมิ (ΔT) โดยขึ้นอยู่กับความจุความร้อนจำเพาะ (c) ของวัสดุ",
        applications: [
            "ใช้ในงานวิศวกรรมความร้อน",
            "ใช้ในการออกแบบระบบทำความร้อนและความเย็น",
            "ใช้ในงานวิศวกรรมกระบวนการ"
        ],
        example: "ตัวอย่าง: น้ำมวล 2kg มีความจุความร้อนจำเพาะ 4,186J/(kg⋅°C) เมื่ออุณหภูมิเพิ่มขึ้น 10°C จะมีปริมาณความร้อนที่ถ่ายเท Q = 2 × 4,186 × 10 = 83,720J หรือ 83.72kJ",
        variables: [
            { symbol: 'Q', label: 'Heat', unit: 'J', min: 0, max: 10000000 },
            { symbol: 'm', label: 'Mass', unit: 'kg', min: 0.001, max: 1000 },
            { symbol: 'c', label: 'Specific Heat Capacity', unit: 'J/(kg⋅°C)', min: 1, max: 10000 },
            { symbol: 'ΔT', label: 'Temperature Change', unit: '°C', min: -273, max: 10000 }
        ],
        calculate: (inputs) => {
            // ต้องการอย่างน้อย 3 ตัวแปรเพื่อคำนวณหาตัวแปรที่ 4
            let filledCount = Object.keys(inputs).filter(key => inputs[key] !== undefined).length;
            if (filledCount < 3) return null;
            
            if (inputs.m && inputs.c && inputs.ΔT) return { Q: inputs.m * inputs.c * inputs.ΔT };
            if (inputs.Q && inputs.c && inputs.ΔT) return { m: inputs.Q / (inputs.c * inputs.ΔT) };
            if (inputs.Q && inputs.m && inputs.ΔT) return { c: inputs.Q / (inputs.m * inputs.ΔT) };
            if (inputs.Q && inputs.m && inputs.c) return { ΔT: inputs.Q / (inputs.m * inputs.c) };
            
            return null;
        }
    }
};

// ตัวแปรที่เก็บสถานะของฟอร์ม
let currentFormula = null;
let debounceTimer = null;
let infoModalVisible = false;

// ฟังก์ชันตรวจสอบค่าที่ป้อนว่าอยู่ในช่วงที่กำหนดหรือไม่
function validateInput(value, min, max) {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return { valid: false, message: "Please enter a number " };
    if (numValue < min) return { valid: false, message: `The value must be greater than or equal to ${min}` };
    if (numValue > max) return { valid: false, message: `The value must be less than or equal to ${max}` };
    return { valid: true };
}

// ฟังก์ชันแสดงข้อความข้อผิดพลาด
function showError(inputElement, message) {
    // ลบข้อความผิดพลาดเดิม (ถ้ามี)
    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // สร้างและแสดงข้อความผิดพลาดใหม่
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
    inputElement.parentElement.appendChild(errorElement);
    
    // ใส่สีขอบแดงให้ input field
    inputElement.style.borderColor = 'red';
}

// ฟังก์ชันลบข้อความข้อผิดพลาด
function clearError(inputElement) {
    const existingError = inputElement.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    inputElement.style.borderColor = '';
}

// ฟังก์ชันคำนวณสูตร
function calculateFormula() {
    if (!currentFormula) return;
    
    const formula = formulas[currentFormula];
    if (!formula) return;
    
    const inputs = {};
    let hasValidInputs = false;
    let filledInputsCount = 0;
    
    // ตรวจสอบแต่ละ input field
    formula.variables.forEach(varItem => {
        const inputElement = document.getElementById(varItem.symbol);
        if (!inputElement) return;
        
        const value = inputElement.value.trim();
        if (value === '') return;
        
        filledInputsCount++;
        
        // ตรวจสอบความถูกต้องของค่า
        const validation = validateInput(value, varItem.min, varItem.max);
        if (!validation.valid) {
            showError(inputElement, validation.message);
            return;
        } else {
            clearError(inputElement);
            inputs[varItem.symbol] = parseFloat(value);
            hasValidInputs = true;
        }
    });
    
    // ตรวจสอบว่ากรอกข้อมูลมากเกินไปหรือไม่
    if (filledInputsCount > 2) {
        const resultBox = document.getElementById('formula-result');
        resultBox.innerHTML = '<p class="error-message" style="color: red;">Please enter only two variables.</p>';
        return;
    }
    
    // คำนวณและแสดงผล
    const result = hasValidInputs && filledInputsCount >= 2 ? formula.calculate(inputs) : null;
    const resultBox = document.getElementById('formula-result');
    
    if (result) {
        resultBox.innerHTML = Object.entries(result).map(([symbol, value]) => {
            const variable = formula.variables.find(v => v.symbol === symbol);
            return `<p>${variable.label} = ${value.toFixed(2)} ${variable.unit}</p>`;
        }).join('');
    } else if (filledInputsCount < 2) {
        resultBox.innerHTML = '<p>Please enter at least two variables to calculate the remaining one.</p>';
    } else {
        resultBox.innerHTML = '<p>Calculation cannot be performed. Please check the entered values.</p>';
    }
}

// ฟังก์ชัน debounce เพื่อไม่ให้คำนวณบ่อยเกินไป
function debounceCalculate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(calculateFormula, 500); // คำนวณหลังจากพิมพ์หยุด 500ms
}

// ฟังก์ชันแสดงข้อมูลเพิ่มเติม
function toggleFormulaInfo() {
    if (!currentFormula) return;
    
    const formula = formulas[currentFormula];
    if (!formula) return;
    
    // หากมี modal อยู่แล้ว ให้ลบออก
    const existingModal = document.getElementById('info-modal');
    if (existingModal) {
        document.body.removeChild(existingModal);
        infoModalVisible = false;
        return;
    }
    
    // สร้าง modal สำหรับแสดงข้อมูลเพิ่มเติม
    const modal = document.createElement('div');
    modal.id = 'info-modal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    modal.style.zIndex = '1000';
    modal.style.maxWidth = '500px';
    modal.style.width = '90%';
    
    modal.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h2 style="margin: 0;">${formula.name}</h2>
            <button id="close-modal" style="background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
        </div>
        <div style="margin-bottom: 15px;">
            <h3>สมการ</h3>
            <p style="font-size: 18px; font-weight: bold;">${formula.equation}</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h3>คำอธิบาย</h3>
            <p>${formula.description}</p>
        </div>
        <div style="margin-bottom: 15px;">
            <h3>การประยุกต์ใช้</h3>
            <ul>
                ${formula.applications.map(app => `<li>${app}</li>`).join('')}
            </ul>
        </div>
        <div>
            <h3>ตัวอย่าง</h3>
            <p>${formula.example}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // เพิ่ม event listener สำหรับปุ่มปิด
    document.getElementById('close-modal').addEventListener('click', toggleFormulaInfo);
    
    infoModalVisible = true;
}

// สร้าง Input Fields ตามสูตร
document.getElementById('formula-select').addEventListener('change', function() {
    currentFormula = this.value;
    if (!currentFormula) return;
    
    const formula = formulas[currentFormula];
    const inputFields = document.getElementById('input-fields');
    
    // สร้างกล่องสำหรับข้อมูลสูตรและ input fields
    inputFields.innerHTML = `
        <div class="formula-header" style="display: flex; align-items: center; margin-bottom: 15px; margin-top: 15px;">
            <h3 style="margin: 0 10px 0 0;">${formula.name}</h3>
            <span class="equation" style="font-weight: bold; margin-right: 15px;">${formula.equation}</span>
            <button id="info-button" class="info-btn" style="background-color: #007bff; color: white; border: none; border-radius: 82%; width: 24px; height: 23px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px;">?</button>
        </div>
        <p class="instructions" style="color: gray; font-size: 13px;">(Enter 2 variables to automatically calculate the 3rd variable.)</p>
        <div class="input-container" style="margin-top: 15px;">
            ${formula.variables.map(varItem => `
                <div class="input-group" style="margin-bottom: 15px;">
                    <label for="${varItem.symbol}">${varItem.label} (${varItem.unit})</label>
                    <input 
                        type="number" 
                        id="${varItem.symbol}" 
                        placeholder="(${varItem.min} - ${varItem.max})" 
                        min="${varItem.min}" 
                        max="${varItem.max}" 
                        step="any"
                        style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;"
                    >
                </div>
            `).join('')}
        </div>
    `;
    
    // เพิ่ม event listener สำหรับปุ่มข้อมูลเพิ่มเติม
    document.getElementById('info-button').addEventListener('click', toggleFormulaInfo);
    
    // เพิ่ม event listener สำหรับ auto-calculate
    formula.variables.forEach(varItem => {
        const inputElement = document.getElementById(varItem.symbol);
        if (inputElement) {
            inputElement.addEventListener('input', debounceCalculate);
        }
    });
    
    // เคลียร์ผลลัพธ์เก่า
    document.getElementById('formula-result').innerHTML = '';
});

// นำฟังก์ชันไปใช้ได้จากภายนอก (สำหรับปุ่ม Calculate ถ้ายังต้องการใช้)
window.calculateFormula = calculateFormula;

// สำหรับปิด modal เมื่อคลิกภายนอก
document.addEventListener('click', function(event) {
    const modal = document.getElementById('info-modal');
    const infoButton = document.getElementById('info-button');
    
    if (infoModalVisible && modal && !modal.contains(event.target) && infoButton !== event.target) {
        toggleFormulaInfo();
    }
});