document.addEventListener("DOMContentLoaded", () => {
    // Use the spreadsheet ID from your editable link
    const SHEET_ID = '1XgMtAG_idVA2LEXWFetGb94ZMjKDHUzH6D87uXv6lSo';
    const API_KEY = 'AIzaSyBDl5Ko272-ASW3PfezhAkMjP0EPqHh51k';
    // Adjust the range to get 50 rows (change as needed)
    const RANGE = 'Sheet1!A2:G51';

    const SHEET_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    fetch(SHEET_API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debug: Check the fetched data structure
            const rows = data.values; // Extract rows from the fetched data
            const items = document.querySelectorAll(".item"); // Select all item boxes

            rows.forEach((row, index) => {
                if (index < items.length && row[1]) { // row[1] should be your image URL column (e.g., column B)
                    const img = document.createElement("img");
                    img.src = row[1].trim();
                    // Use column A for title if available; adjust as needed
                    img.alt = row[0] ? row[0].trim() : `Image ${index + 1}`;
                    // Optionally, set styles or use CSS to style images
                    img.style.width = "100%";
                    img.style.height = "100%";
                    img.onerror = () => img.src = "https://via.placeholder.com/100"; // Fallback image if URL fails

                    items[index].textContent = ""; // Remove the default number
                    items[index].appendChild(img);

                    // Optional: Display title below the image if present in column A
                    if (row[0]) {
                        const title = document.createElement("p");
                        title.textContent = row[0].trim();
                        items[index].appendChild(title);
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
