// Enhanced Dropdown Management
document.addEventListener('DOMContentLoaded', function () {
    // Get all unit-dropdown-select elements (there are two of them)
    const selectBoxes = document.querySelectorAll('.unit-dropdown-select');
    const dropdowns = document.querySelectorAll('.matrix-dropdown');

    // Initialize each dropdown separately
    selectBoxes.forEach(selectBox => {
        // Find the parent .custom-select for proper scoping - check if exists first
        const parentSelect = selectBox.closest('.custom-select');

        // Skip if parent element not found
        if (!parentSelect) {
            console.warn('Parent .custom-select not found for', selectBox);
            return;
        }
        

        const matrixDropdown = parentSelect.querySelector('.matrix-dropdown');

        // Skip if dropdown not found
        if (!matrixDropdown) {
            console.warn('Dropdown .matrix-dropdown not found in', parentSelect);
            return;
        }

        const selectedValueDisplay = selectBox.querySelector('.selected-value');

        // Skip if selected value display not found
        if (!selectedValueDisplay) {
            console.warn('Selected value display not found in', selectBox);
            return;
        }

        // Store the selected prefix value (hidden input)
        let hiddenInput;
        if (selectBox.id === 'from-prefix') {
            hiddenInput = document.getElementById('selected-from-prefix');
        } else if (selectBox.id === 'to-prefix') {
            hiddenInput = document.getElementById('selected-to-prefix');
        }

        // Track the currently selected cell
        let selectedCell = null;

        // Open/close dropdown when clicking the select box
        selectBox.addEventListener('click', function (event) {
            // Prevent the click from immediately closing the dropdown
            event.stopPropagation();

            // Close all other dropdowns first
            dropdowns.forEach(dropdown => {
                if (dropdown !== matrixDropdown) {
                    dropdown.style.display = 'none';
                }
            });

            // Toggle current dropdown
            matrixDropdown.style.display = matrixDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Handle selection of individual cells in the dropdown
        const dropdownCells = parentSelect.querySelectorAll('.dropdown-cell');
        if (dropdownCells.length === 0) {
            console.warn('No .dropdown-cell elements found in', parentSelect);
        }

        dropdownCells.forEach(cell => {
            cell.addEventListener('click', function (event) {
                // Prevent event from bubbling up to row
                event.stopPropagation();

                // Get the parent row to access its value attribute
                const parentRow = this.closest('.dropdown-row');
                if (!parentRow) {
                    console.warn('Parent .dropdown-row not found for', this);
                    return;
                }

                const value = parentRow.getAttribute('value');

                // Get the clicked cell's text content
                const selectedText = this.textContent;

                // Remove selection from previous cell if exists
                if (selectedCell) {
                    selectedCell.classList.remove('selected');
                }

                // Mark this cell as selected
                this.classList.add('selected');
                selectedCell = this;

                // Update the display with just the clicked cell's text
                selectedValueDisplay.textContent = selectedText;

                // Store the row's value in the hidden input
                if (hiddenInput) {
                    hiddenInput.value = value;
                }

                // Close the dropdown
                matrixDropdown.style.display = 'none';
            });
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', function (event) {
        let clickedInsideDropdown = false;

        // Check if click was inside any dropdown or select box
        dropdowns.forEach(dropdown => {
            if (dropdown && dropdown.contains(event.target)) {
                clickedInsideDropdown = true;
            }
        });

        selectBoxes.forEach(selectBox => {
            if (selectBox && selectBox.contains(event.target)) {
                clickedInsideDropdown = true;
            }
        });

        // If clicked outside, close all dropdowns
        if (!clickedInsideDropdown) {
            dropdowns.forEach(dropdown => {
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            });
        }
    });
});