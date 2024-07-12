// Fetch data from the JSON file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        window.travelData = data;
    })
    .catch(error => console.error('Error fetching data:', error));

// Search recommendations
function searchRecommendations() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const results = [];

    if (searchQuery === 'beach' || searchQuery === 'beaches') {
        // Return all beaches if the search query is 'beach' or 'beaches'
        window.travelData.beaches.forEach(beach => {
            results.push(beach);
        });
    } else if (searchQuery === 'temple' || searchQuery === 'temples') {
        // Return all temples if the search query is 'temple' or 'temples'
        window.travelData.temples.forEach(temple => {
            results.push(temple);
        });
    } else {
        // Search for countries
        window.travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(searchQuery)) {
                    results.push(city);
                }
            });
        });

        // Search for specific temples
        window.travelData.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(searchQuery)) {
                results.push(temple);
            }
        });

        // Search for specific beaches
        window.travelData.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(searchQuery)) {
                results.push(beach);
            }
        });
    }

    displayResults(results);
}

// Display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        const img = document.createElement('img');
        img.src = result.imageUrl;
        img.alt = result.name;
        resultDiv.appendChild(img);

        const name = document.createElement('h3');
        name.textContent = result.name;
        resultDiv.appendChild(name);

        const description = document.createElement('p');
        description.textContent = result.description;
        resultDiv.appendChild(description);

        resultsContainer.appendChild(resultDiv);
    });
}

// Reset results
function resetResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('search-bar').value = '';
}

// Function to display time in a specific timezone
function displayTime(timezone, elementId) {
    const options = { timeZone: timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const timeString = new Date().toLocaleTimeString('en-US', options);
    document.getElementById(elementId).textContent = `Current time: ${timeString}`;
}

// Example usage
displayTime('America/New_York', 'ny-time');
