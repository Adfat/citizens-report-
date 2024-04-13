// URL of your WordPress REST API
const apiUrl = 'wp-json/wp/v2/incidents';

// Function to submit a new incident
function submitIncident() {
    const incidentType = document.getElementById('incidentType').value;
    const incidentDescription = document.getElementById('incidentDescription').value;

    const newIncident = {
        title: incidentType,
        content: incidentDescription,
        status: 'publish'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_WORDPRESS_REST_API_TOKEN'
        },
        body: JSON.stringify(newIncident)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Incident submitted:', data);
        // Optionally reload the incident list
        // fetchIncidents();
    })
    .catch(error => console.error('Error submitting incident:', error));
}

// Function to fetch all submitted incidents
function fetchIncidents() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Fetched incidents:', data);
        displayIncidents(data);
    })
    .catch(error => console.error('Error fetching incidents:', error));
}

// Function to display fetched incidents
function displayIncidents(incidents) {
    const incidentListElement = document.getElementById('incidentList');
    incidentListElement.innerHTML = '';

    incidents.forEach(incident => {
        const incidentElement = document.createElement('div');
        incidentElement.innerHTML = `
            <h3>${incident.title.rendered}</h3>
            <p>${incident.content.rendered}</p>
            <hr>
        `;
        incidentListElement.appendChild(incidentElement);
    });
}


fetchIncidents();
