function calculateFCFS(previousPosition, values) {
    let movements = [];
    let currentPosition = previousPosition;
    let totalTime = 0;

    let requests = values.split(',').map(Number);

    for (let i = 0; i < requests.length; i++) {
        movements.push(currentPosition);
        totalTime += Math.abs(currentPosition - requests[i]);
        currentPosition = requests[i];
    }

    return { movements, totalTime };
}

function calculateSSTF(previousPosition, values) {
    let movements = [];
    let currentPosition = previousPosition;
    let totalTime = 0;

    let requests = values.split(',').map(Number);
    let remainingRequests = requests.slice();

    while (remainingRequests.length > 0) {
        let nearestIndex = 0;
        let shortestDistance = Math.abs(currentPosition - remainingRequests[0]);

        for (let i = 1; i < remainingRequests.length; i++) {
            let distance = Math.abs(currentPosition - remainingRequests[i]);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestIndex = i;
            }
        }

        movements.push(currentPosition);
        totalTime += shortestDistance;
        currentPosition = remainingRequests[nearestIndex];
        remainingRequests.splice(nearestIndex, 1);
    }

    movements.push(currentPosition);
    return { movements, totalTime };
}

function calculateSCAN(previousPosition, values, range) {
    let movements = [];
    let currentPosition = previousPosition;
    let totalTime = 0;

    let requests = values.split(',').map(Number);
    requests.push(currentPosition);

    requests.sort((a, b) => a - b);
    let currentIdx = requests.indexOf(currentPosition);

    if (previousPosition > requests[currentIdx + 1]) {  // Moving downwards
        for (let i = currentIdx; i >= 0; i--) {
            movements.push(currentPosition);
            totalTime += Math.abs(currentPosition - requests[i]);
            currentPosition = requests[i];
        }

        if (currentPosition !== 0) {
            movements.push(0);
            totalTime += currentPosition;
            currentPosition = 0;
        }

        for (let i = currentIdx + 1; i < requests.length; i++) {
            movements.push(currentPosition);
            totalTime += Math.abs(currentPosition - requests[i]);
            currentPosition = requests[i];
        }
    } else {  // Moving upwards
        for (let i = currentIdx; i < requests.length; i++) {
            movements.push(currentPosition);
            totalTime += Math.abs(currentPosition - requests[i]);
            currentPosition = requests[i];
        }

        if (currentPosition !== range) {
            movements.push(range);
            totalTime += range - currentPosition;
            currentPosition = range;
        }

        for (let i = currentIdx - 1; i >= 0; i--) {
            movements.push(currentPosition);
            totalTime += Math.abs(currentPosition - requests[i]);
            currentPosition = requests[i];
        }
    }

    return { movements, totalTime };
}

function calculateCSCAN(previousPosition, values, range) {
    let movements = [];
    let currentPosition = previousPosition;
    let totalTime = 0;

    let requests = values.split(',').map(Number);
    requests.push(currentPosition);
    requests.sort((a, b) => a - b);
    let currentIdx = requests.indexOf(currentPosition);

    if (previousPosition > requests[currentIdx + 1]) {  // Moving downwards
        for (let i = currentIdx; i >= 0; i--) {
            movements.push(currentPosition);
            totalTime += Math.abs(currentPosition - requests[i]);
            currentPosition = requests[i];
        }

        movements.push(0);
        totalTime += currentPosition;
        currentPosition = range;

        movements.push(range);
        totalTime += range;

        for (let i = requests.length - 1; i > currentIdx; i--) {
            movements.push(currentPosition);
            totalTime += Math.abs(currentPosition - requests[i]);
            currentPosition = requests[i];
        }
    } else {  // Moving upwards
        for (let i = currentIdx; i < requests.length; i++) {
            movements.push(currentPosition);
            totalTime += Math.abs(currentPosition - requests[i]);
            currentPosition = requests[i];
        }

        movements.push(range);
        totalTime += range - currentPosition;
        currentPosition = 0;

        movements.push(0);
        totalTime += range;

        for (let i = 0; i < currentIdx; i++) {
            movements.push(currentPosition);
            totalTime += Math.abs(currentPosition - requests[i]);
            currentPosition = requests[i];
        }
    }

    return { movements, totalTime };
}

function calculateLOOK(previousPosition, values) {
    let movements = [];
    let currentPosition = previousPosition;
    let totalTime = 0;

    let requests = values.split(',').map(Number);

    totalTime = look(requests, previousPosition, movements);

    return { movements, totalTime };
}

function calculateCLOOK(previousPosition, values) {
    let movements = [];
    let currentPosition = previousPosition;
    let totalTime = 0;
    let requests = values.split(',').map(Number);

    totalTime = clook(requests, previousPosition, movements);

    return { movements, totalTime };
}

function look(requests, head, movements) {
    let totalMovement = 0;
    let currentPosition = head;
    movements.push(currentPosition);

    const sortedRequests = requests.slice().sort((a, b) => a - b);

    let index = 0;
    while (index < sortedRequests.length && sortedRequests[index] < head) {
        index++;
    }

    if (head > sortedRequests[index]) {  // Moving downwards
        for (let i = index - 1; i >= 0; i--) {
            totalMovement += Math.abs(currentPosition - sortedRequests[i]);
            currentPosition = sortedRequests[i];
            movements.push(currentPosition);
        }

        for (let i = sortedRequests.length - 1; i >= index; i--) {
            totalMovement += Math.abs(currentPosition - sortedRequests[i]);
            currentPosition = sortedRequests[i];
            movements.push(currentPosition);
        }
    } else {  // Moving upwards
        for (let i = index; i < sortedRequests.length; i++) {
            totalMovement += Math.abs(currentPosition - sortedRequests[i]);
            currentPosition = sortedRequests[i];
            movements.push(currentPosition);
        }

        for (let i = 0; i < index; i++) {
            totalMovement += Math.abs(currentPosition - sortedRequests[i]);
            currentPosition = sortedRequests[i];
            movements.push(currentPosition);
        }
    }

    return totalMovement;
}

function clook(requests, head, movements) {
    const sortedRequests = [...requests].sort((a, b) => a - b);
    let totalMovement = 0;
    let currentPosition = head;
    movements.push(currentPosition);

    let index = 0;
    while (index < sortedRequests.length && sortedRequests[index] < head) {
        index++;
    }

    if (head > sortedRequests[index]) {  // Moving downwards
        for (let i = index - 1; i >= 0; i--) {
            totalMovement += Math.abs(currentPosition - sortedRequests[i]);
            currentPosition = sortedRequests[i];
            movements.push(currentPosition);
        }

        for (let i = sortedRequests.length - 1; i >= index; i--) {
            totalMovement += Math.abs(currentPosition - sortedRequests[i]);
            currentPosition = sortedRequests[i];
            movements.push(currentPosition);
        }
    } else {  // Moving upwards
        for (let i = index; i < sortedRequests.length; i++) {
            totalMovement += Math.abs(currentPosition - sortedRequests[i]);
            currentPosition = sortedRequests[i];
            movements.push(currentPosition);
        }

        for (let i = 0; i < index; i++) {
            totalMovement += Math.abs(currentPosition - sortedRequests[i]);
            currentPosition = sortedRequests[i];
            movements.push(currentPosition);
        }
    }

    return totalMovement;
}

function showBestEfficiency() {
    let previousPosition = parseInt(document.getElementById('previousPosition').value);
    let values = document.getElementById('values').value.trim();
    let range = parseInt(document.getElementById('range').value);

    let algorithms = ['fcfs', 'sstf', 'scan', 'cscan', 'look', 'clook'];
    let results = []; // Array to store results for each algorithm

    // Calculate and store time taken for each algorithm
    for (let algorithm of algorithms) {
        let result = calculateAlgorithm(algorithm, previousPosition, values, range);
        results.push({
            algorithm: algorithm,
            totalTime: result.totalTime,
            movements: result.movements
        });
    }

    // Find the algorithm with the minimum total time
    let bestTime = Infinity;
    let bestAlgorithm = '';
    let bestMovements = [];
    let bestTimeTaken = 0;

    for (let result of results) {
        if (result.totalTime < bestTime) {
            bestTime = result.totalTime;
            bestAlgorithm = result.algorithm;
            bestMovements = result.movements;
            bestTimeTaken = result.totalTime;
        }
    }

    // Display all algorithms' time taken
    let resultElement = document.getElementById('result');
    let movementsElement = document.getElementById('movements');

    // Prepare HTML for displaying all algorithm times
    let resultsHTML = '<h2>Algorithm Times:</h2>';
    resultsHTML += '<ul>';

    for (let result of results) {
        resultsHTML += `<li>Algorithm: ${result.algorithm.toUpperCase()} - Time Taken: ${result.totalTime}</li>`;
    }

    resultsHTML += '</ul>';

    resultElement.innerHTML = resultsHTML;
    console.log("aasd");    

    // Display movements and details for the best algorithm
    displayResults(bestAlgorithm, bestMovements, bestTimeTaken);
}

function calculateAlgorithm(algorithm, previousPosition, values, range) {
    switch (algorithm) {
        case 'fcfs':
            return calculateFCFS(previousPosition, values);
        case 'sstf':
            return calculateSSTF(previousPosition, values);
        case 'scan':
            return calculateSCAN(previousPosition, values, range);
        case 'cscan':
            return calculateCSCAN(previousPosition, values, range);
        case 'look':
            return calculateLOOK(previousPosition, values);
        case 'clook':
            return calculateCLOOK(previousPosition, values);
        default:
            return { movements: [], totalTime: 0 };
    }
}

function calculateAlgorithm(algorithm, previousPosition, values, range) {
    switch (algorithm) {
        case 'fcfs':
            return calculateFCFS(previousPosition, values);
        case 'sstf':
            return calculateSSTF(previousPosition, values);
        case 'scan':
            return calculateSCAN(previousPosition, values, range);
        case 'cscan':
            return calculateCSCAN(previousPosition, values, range);
        case 'look':
            return calculateLOOK(previousPosition, values);
        case 'clook':
            return calculateCLOOK(previousPosition, values);
        default:
            return { movements: [], totalTime: 0 };
    }
}

function calculateAlgorithm(algorithm, previousPosition, values, range) {
    switch (algorithm) {
        case 'fcfs':
            return calculateFCFS(previousPosition, values);
        case 'sstf':
            return calculateSSTF(previousPosition, values);
        case 'scan':
            return calculateSCAN(previousPosition, values, range);
        case 'cscan':
            return calculateCSCAN(previousPosition, values, range);
        case 'look':
            return calculateLOOK(previousPosition, values);
        case 'clook':
            return calculateCLOOK(previousPosition, values);
        default:
            return { movements: [], totalTime: 0 };
    }
}

function displayResults(algorithm, movements, timeTaken) {
    let resultElement = document.getElementById('result');
    let movementsElement = document.getElementById('movements');

    resultElement.innerHTML = `
        <h2>Algorithm: ${algorithm.toUpperCase()}</h2>
        <p>Total Time Taken: ${timeTaken}</p>
    `;

    movementsElement.innerHTML = `
        <h3>Movements:</h3>
        <p>${movements.join(' ➔ ')}</p>
    `;
}

// Event listener for the "Best Efficiency" button
document.getElementById('bestEfficiencyButton').addEventListener('click', showBestEfficiency);
// Event listener for the "Best Efficiency" button
document.getElementById('bestEfficiencyButton').addEventListener('click', showBestEfficiency);function showBestEfficiency() {
    let previousPosition = parseInt(document.getElementById('previousPosition').value);
    let values = document.getElementById('values').value.trim();
    let range = parseInt(document.getElementById('range').value);

    let algorithms = ['fcfs', 'sstf', 'scan', 'cscan', 'look', 'clook'];
    let results = []; // Array to store results for each algorithm

    // Calculate and store time taken for each algorithm
    for (let algorithm of algorithms) {
        let result = calculateAlgorithm(algorithm, previousPosition, values, range);
        results.push({
            algorithm: algorithm,
            totalTime: result.totalTime,
            movements: result.movements
        });
    }

    // Find the algorithm with the minimum total time
    let bestTime = Infinity;
    let bestAlgorithm = '';
    let bestMovements = [];
    let bestTimeTaken = 0;

    for (let result of results) {
        if (result.totalTime < bestTime) {
            bestTime = result.totalTime;
            bestAlgorithm = result.algorithm;
            bestMovements = result.movements;
            bestTimeTaken = result.totalTime;
        }
    }

    // Display all algorithms' time taken
    let resultElement = document.getElementById('result');
    let movementsElement = document.getElementById('movements');

    // Prepare HTML for displaying all algorithm times
    let resultsHTML = '<h2>Algorithm Times:</h2>';
    resultsHTML += '<ul>';

    for (let result of results) {
        resultsHTML += `<li>Algorithm: ${result.algorithm.toUpperCase()} - Time Taken: ${result.totalTime}</li>`;
    }

    resultsHTML += '</ul>';

    resultElement.innerHTML = resultsHTML;

    // Display movements and details for the best algorithm
    displayResults(bestAlgorithm, bestMovements, bestTimeTaken);
}

function calculateAlgorithm(algorithm, previousPosition, values, range) {
    switch (algorithm) {
        case 'fcfs':
            return calculateFCFS(previousPosition, values);
        case 'sstf':
            return calculateSSTF(previousPosition, values);
        case 'scan':
            return calculateSCAN(previousPosition, values, range);
        case 'cscan':
            return calculateCSCAN(previousPosition, values, range);
        case 'look':
            return calculateLOOK(previousPosition, values);
        case 'clook':
            return calculateCLOOK(previousPosition, values);
        default:
            return { movements: [], totalTime: 0 };
    }
}

function calculate() {
    let previousPosition = parseInt(document.getElementById('previousPosition').value);
    let values = document.getElementById('values').value.trim();
    let algorithm = document.getElementById('algorithm').value;
    let range = parseInt(document.getElementById('range').value);

    let result = calculateAlgorithm(algorithm, previousPosition, values, range);
    displayResults(algorithm, result.movements, result.totalTime);
}

// Event listener for the "Best Efficiency" button
document.getElementById('bestEfficiencyButton').addEventListener('click', showBestEfficiency);

