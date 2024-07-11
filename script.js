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

    document.getElementById('result').innerHTML = `
        <h2>Ergebnis</h2>
        <p>Nach ${months} Monaten betragen Ihre Schulden: CHF ${totalDebt.toFixed(2)}</p>
    `;

    // Send data to Logic App
    sendCalculationToLogicApp(initialDebt, months, totalDebt);
}

function sendCalculationToLogicApp(initialDebt, months, totalDebt) {
    const url = 'https://prod-72.westeurope.logic.azure.com:443/workflows/212f7d58d72046f09f719d15186e6fe7/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=89qVFJM4x-s7L6uv9NsamJCTTCyoT9lBx1N5cMuw878'; 
    const data = {
        initialDebt: initialDebt,
        months: months,
        totalDebt: totalDebt
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
