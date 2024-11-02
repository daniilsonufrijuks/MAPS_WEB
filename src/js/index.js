var map = L.map('map').setView([56.946285, 24.105078], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();


// Fetch the JSON file
// fetch('../json/map.json')
//     .then(response => response.json())
//     .then(data => {
//         // Loop through the features array
//         data.features.forEach(function(feature) {
//             // Extract coordinates and properties
//             var coordinates = feature.geometry.coordinates;
//             var properties = feature.properties;

//             // Add a marker for each feature
//             L.marker([coordinates[1], coordinates[0]]).addTo(map)
//                 .bindPopup(properties.PLACENAME)
//                 .addTo(map);
//         });
//     })
//     .catch(error => console.error('Error fetching the JSON file:', error));


// Define the source and destination coordinate systems
var sourceProj = 'EPSG:3059';
var destProj = 'EPSG:4326';

// Fetch the JSON file
fetch('../json/map.json')
    .then(response => response.json())
    .then(data => {
        console.log('JSON data:', data); // Debug log

        // Loop through the features array
        data.features.forEach(function(feature) {
            // Extract coordinates and properties
            var coordinates = feature.geometry.coordinates;
            var properties = feature.properties;

            console.log('Original coordinates:', coordinates); // Debug log

            // Transform the coordinates
            var transformedCoordinates = proj4(sourceProj, destProj, coordinates);

            console.log('Transformed coordinates:', transformedCoordinates); // Debug log

            // Add a marker for each feature
            L.marker([transformedCoordinates[1], transformedCoordinates[0]]).addTo(map)
                .bindPopup(properties.PLACENAME);
        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));