// tab-controller.js
document.addEventListener('DOMContentLoaded', () => {
    const calculatorContainer = document.querySelector('.calculator-container');
    const tabButtons = calculatorContainer.querySelectorAll('.calculator-tabs .tab-btn');
    const tabs = calculatorContainer.querySelectorAll('.tab-content-container .calculator-tab');

    const updateSetButtonsState = (activeTabId) => {
        const isCalculatorTab = ['standard', 'scientific'].includes(activeTabId);
        document.querySelectorAll('.set-btn').forEach(btn => {
            btn.disabled = !isCalculatorTab;
        });
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            const tabId = button.getAttribute('data-tab');
            button.classList.add('active');
            const targetTab = document.getElementById(`${tabId}-tab`);
            
            if (targetTab) {
                targetTab.classList.add('active');
                updateSetButtonsState(tabId);
            } else {
                console.error(`Tab content #${tabId}-tab not found`);
            }
        });
    });

    // Initialize state on load
    const initialActiveTab = document.querySelector('.calculator-tabs .tab-btn.active');
    updateSetButtonsState(initialActiveTab?.getAttribute('data-tab'));
});