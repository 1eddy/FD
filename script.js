function calculateDebt() {
    let initialDebt = parseFloat(document.getElementById('initialDebt').value);
    let months = parseInt(document.getElementById('months').value);
    let monthlyInterest = 0.42 / 100;
    
    if (isNaN(initialDebt) || isNaN(months)) {
        alert("Bitte geben Sie gültige Werte ein.");
        return;
    }

    let totalDebt = initialDebt;
    for (let i = 0; i < months; i++) {
        totalDebt += totalDebt * monthlyInterest;
    }

    const result = {
        initialDebt,
        months,
        totalDebt: totalDebt.toFixed(2)
    };

    saveResult(result);

    document.getElementById('result').innerHTML = `
        <h2>Ergebnis</h2>
        <p>Nach ${months} Monaten betragen Ihre Schulden: CHF ${totalDebt.toFixed(2)}</p>
    `;
}

function saveResult(result) {
    let savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    savedResults.push(result);
    localStorage.setItem('savedResults', JSON.stringify(savedResults));
    displaySavedResults();
}

function displaySavedResults() {
    let savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
    const savedResultsContainer = document.getElementById('savedResults');
    savedResultsContainer.innerHTML = '<h2>Gespeicherte Ergebnisse</h2>';
    savedResults.forEach((result, index) => {
        savedResultsContainer.innerHTML += `
            <p>Ergebnis ${index + 1}: Schuldenbetrag: CHF ${result.initialDebt}, Monate: ${result.months}, Gesamtbetrag: CHF ${result.totalDebt}</p>
        `;
    });
}

// Display saved results on page load
window.onload = displaySavedResults;
