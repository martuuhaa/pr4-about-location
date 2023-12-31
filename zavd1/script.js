  document.addEventListener('DOMContentLoaded', getMyLocation);

        let watchId = null;

        const collegeCoords = {
            latitude: 48.94321,
            longitude: 24.73380
        };

        function getMyLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(displayLocation, displayError);
                const watchButton = document.getElementById('watch');
                watchButton.addEventListener('click', toggleWatchLocation);
                const clearWatchButton = document.getElementById('clearWatch');
                clearWatchButton.addEventListener('click', clearWatch);
            } else {
                alert("Oops, no geolocation support");
            }
        }

        function displayLocation(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const divLocation = document.getElementById("location");
            divLocation.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
            divLocation.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`;

            const km = computeDistance(position.coords, collegeCoords);
            const divDistance = document.getElementById("distance");
            divDistance.innerHTML = `You are ${km.toFixed(2)} km from the College`;
        }

        function displayError(error) {
            const errorTypes = {
                0: "Unknown error",
                1: "Permission denied by user",
                2: "Position is not available",
                3: "Request timed out"
            };
            let errorMessage = errorTypes[error.code];
            if (error.code == 0 || error.code == 2) {
                errorMessage = errorMessage + " " + error.message;
            }
            const divLocation = document.getElementById("location");
            divLocation.innerHTML = errorMessage;
        }

        function computeDistance(startCoords, destCoords) {
            const startLatRads = degreesToRadians(startCoords.latitude);
            const startLongRads = degreesToRadians(startCoords.longitude);
            const destLatRads = degreesToRadians(destCoords.latitude);
            const destLongRads = degreesToRadians(destCoords.longitude);
            const Radius = 6371;
            const distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) *
                Math.cos(startLongRads - destLongRads)) * Radius;
            return distance;
        }

        function degreesToRadians(degrees) {
            const radians = (degrees * Math.PI) / 180;
            return radians;
        }

        function toggleWatchLocation() {
            if (watchId) {
                clearWatch();
            } else {
                watchLocation();
            }
        }

        function watchLocation() {
            watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
        }

        function clearWatch() {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
                watchId = null;
            }
        }