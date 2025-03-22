document.addEventListener('DOMContentLoaded', () => {
    // เพิ่ม Event Listeners สำหรับเมทริกซ์
    document.querySelectorAll('.dropdown-row').forEach(row => {
        row.addEventListener('click', function() {
            const prefixValue = this.getAttribute('value');
            const parentDropdown = this.closest('.matrix-dropdown');
            
            // ตรวจสอบว่า parentDropdown ไม่เป็น null
            if (!parentDropdown || !parentDropdown.parentElement) {
                console.warn('Matrix dropdown or its parent not found');
                return;
            }
            
            const targetPrefix = parentDropdown.parentElement.querySelector('.unit-dropdown-select');
            
            // ตรวจสอบว่า targetPrefix ไม่เป็น null
            if (!targetPrefix) {
                console.warn('Target prefix element not found');
                return;
            }
            
            const selectedValueElement = targetPrefix.querySelector('.selected-value');
            if (!selectedValueElement) {
                console.warn('Selected value element not found');
                return;
            }

            // ตรวจสอบว่ามี dropdown cells
            const firstCell = this.querySelector('.dropdown-cell:first-child');
            
            if (!firstCell) {
                console.warn('Dropdown cells not found');
                return;
            }

            const prefixName = firstCell.textContent;
            selectedValueElement.textContent = prefixName;

            // อัพเดต hidden inputs
            const hiddenInput = parentDropdown.parentElement.querySelector('input[type="hidden"]');
            if (!hiddenInput) {
                console.warn('Hidden input not found');
                return;
            }
            
            hiddenInput.value = prefixValue;
        });
    });

    // ฟังก์ชันจัดรูปแบบผลลัพธ์
    function formatResult(number) {
        if (isNaN(number)) {
            return 'Invalid result';
        }
        
        if (number === 0 && document.getElementById('selected-from-prefix') && 
            document.getElementById('selected-to-prefix')) {
            const fromPrefix = parseFloat(document.getElementById('selected-from-prefix').value);
            const toPrefix = parseFloat(document.getElementById('selected-to-prefix').value);
            
            if (fromPrefix < toPrefix) {
                const inputValue = parseFloat(document.querySelector('.sci-input').value);
                const accurateResult = (inputValue * fromPrefix) / toPrefix;
                
                // จัดรูปแบบเป็นสัญกรณ์วิทยาศาสตร์
                return formatScientificNotation(accurateResult);
            }
        }
        
        const absNumber = Math.abs(number);
        let formattedNumber;

        if ((absNumber <= 1e-4 || absNumber > 1e7) && absNumber !== 0) {
            return formatScientificNotation(number);
        } 
        else {
            // จัดรูปแบบตัวเลขด้วย commas และตัดทศนิยมที่ไม่จำเป็น
            formattedNumber = number.toLocaleString('en-US', {
                maximumFractionDigits: 4,
                useGrouping: true
            }).replace(/\.0+$/, ''); // ตัด .0 ท้ายถ้าไม่มีทศนิยม
        }

        return formattedNumber;
    }
    
    // แยกฟังก์ชันสำหรับจัดรูปแบบสัญกรณ์วิทยาศาสตร์
    function formatScientificNotation(number) {
        let formattedNumber = number.toExponential(4)
            .replace('e', '×10')
            .replace(/(\.\d*?[1-9])0+×/, '$1×') // ตัดศูนย์ท้าย
            .replace(/\.0+×/, '×');
        
        // แยกส่วนและแปลงเลขชี้กำลัง
        const parts = formattedNumber.split('×10');
        const base = parts[0];
        let exponent = parts[1];
        
        // แปลงเลขชี้กำลังเป็นตัวยก
        const superscriptMap = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '⁺' };
        let superscriptExponent = '';
        
        for (let i = 0; i < exponent.length; i++) {
            superscriptExponent += superscriptMap[exponent[i]] || exponent[i];
        }
        
        return base + '×10' + superscriptExponent;
    }

    // ประกาศฟังก์ชันเป็น Global
    window.convertSIPrefix = () => {
        const inputElement = document.querySelector('.sci-input');
        
        if (!inputElement) {
            console.error('Input element not found');
            return;
        }
        
        const inputValue = parseFloat(inputElement.value);
        
        const fromPrefixElement = document.getElementById('selected-from-prefix');
        const toPrefixElement = document.getElementById('selected-to-prefix');
        
        if (!fromPrefixElement || !toPrefixElement) {
            console.error('Prefix elements not found');
            return;
        }
        
        const fromPrefix = parseFloat(fromPrefixElement.value);
        const toPrefix = parseFloat(toPrefixElement.value);

        if (isNaN(inputValue) || isNaN(fromPrefix) || isNaN(toPrefix)) {
            const resultElement = document.getElementById('si-result');
            if (resultElement) {
                resultElement.textContent = 'Invalid input';
            }
            return;
        }

        const result = (inputValue * fromPrefix) / toPrefix;
        
        let formattedResult;
        if (Math.abs(fromPrefix / toPrefix) < 1e-10 || Math.abs(fromPrefix / toPrefix) > 1e10) {
            formattedResult = formatResult(result);
        } else {
            formattedResult = formatResult(result);
        }
        
        const resultElement = document.getElementById('si-result');
        
        if (resultElement) {
            resultElement.innerHTML = `Result: ${formattedResult}`;
        } else {
            console.error('Result element not found');
        }
    };
});