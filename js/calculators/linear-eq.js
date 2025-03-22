// Linear Equations Solver
document.addEventListener('DOMContentLoaded', function() {
    const varRadios = document.querySelectorAll('input[name="var-count"]');
    const zTerms = document.querySelectorAll('.z-term');
    const eq3Row = document.querySelector('.eq3-row');
    const solveBtn = document.querySelector('#linear-eq-tab .solve-btn');
    const clearBtn = document.querySelector('#linear-eq-tab .clear-btn');
    const solutionResult = document.getElementById('solution-result');
    const allInputs = document.querySelectorAll('#linear-eq-tab input[type="number"]');
    
    // Toggle between 2 and 3 variables
    varRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const varCount = parseInt(this.value);
            
            if (varCount === 3) {
                // Show z terms and third equation
                zTerms.forEach(term => term.style.display = 'inline');
                eq3Row.style.display = 'block';
            } else {
                // Hide z terms and third equation
                zTerms.forEach(term => term.style.display = 'none');
                eq3Row.style.display = 'none';
            }
            
            // Clear results when switching
            solutionResult.innerHTML = '';
        });
    });
    
    // Solve button click handler
    solveBtn.addEventListener('click', function() {
        const varCount = parseInt(document.querySelector('input[name="var-count"]:checked').value);
        
        try {
            // Create coefficient matrix A and constants vector b
            const A = [];
            const b = [];
            
            // Collect inputs
            for (let i = 0; i < varCount; i++) {
                A[i] = [];
                for (let j = 0; j < varCount; j++) {
                    const coefInput = document.querySelector(`.coef-input[data-row="${i}"][data-col="${j}"]`);
                    const coef = parseFloat(coefInput.value) || 0;
                    A[i][j] = coef;
                }
                
                const constInput = document.querySelector(`.const-input[data-row="${i}"]`);
                const constVal = parseFloat(constInput.value) || 0;
                b[i] = constVal;
            }
            
            // Solve the system using Gaussian elimination
            const solution = solveLinearSystem(A, b);
            
            // Display results
            displayResults(solution, varCount);
            
        } catch (error) {
            solutionResult.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    });
    
    // Clear button click handler
    clearBtn.addEventListener('click', function() {
        // Clear all input fields
        allInputs.forEach(input => {
            input.value = '';
        });
        
        // Clear results
        solutionResult.innerHTML = '';
    });
    
    // Gaussian elimination algorithm
    function solveLinearSystem(A, b) {
        const n = A.length;
        
        // Create augmented matrix
        const augMatrix = [];
        for (let i = 0; i < n; i++) {
            augMatrix[i] = [...A[i], b[i]];
        }
        
        // Forward elimination
        for (let i = 0; i < n; i++) {
            // Find pivot
            let maxRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(augMatrix[j][i]) > Math.abs(augMatrix[maxRow][i])) {
                    maxRow = j;
                }
            }
            
            // Swap rows if needed
            if (maxRow !== i) {
                [augMatrix[i], augMatrix[maxRow]] = [augMatrix[maxRow], augMatrix[i]];
            }
            
            // Check if matrix is singular
            if (Math.abs(augMatrix[i][i]) < 1e-10) {
                throw new Error("A system of equations that does not have a unique solution (because the matrix is singular).");
            }
            
            // Eliminate below
            for (let j = i + 1; j < n; j++) {
                const factor = augMatrix[j][i] / augMatrix[i][i];
                for (let k = i; k <= n; k++) {
                    augMatrix[j][k] -= factor * augMatrix[i][k];
                }
            }
        }
        
        // Back substitution
        const solution = new Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            solution[i] = augMatrix[i][n];
            for (let j = i + 1; j < n; j++) {
                solution[i] -= augMatrix[i][j] * solution[j];
            }
            solution[i] /= augMatrix[i][i];
        }
        
        return solution;
    }
    
    // Display results in the result box
    function displayResults(solution, varCount) {
        let resultHTML = '';
        const varLabels = ['x', 'y', 'z'];
        
        for (let i = 0; i < varCount; i++) {
            // Round to avoid floating point errors (e.g., 2.0000000000000004)
            const roundedValue = Math.round(solution[i] * 1000000) / 1000000;
            resultHTML += `<p>${varLabels[i]} = ${roundedValue}</p>`;
        }
        
        solutionResult.innerHTML = resultHTML;
    }
});