// Your provided API Key
const apiKey = "AIzaSyBDl5Ko272-ASW3PfezhAkMjP0EPqHh51k";

// Extracted from your provided URL
const sheetID = "1SJwLU7pEWIyeytUYvdyHuG8y_1cdSg6sjHAOh_DA3ATJ"; 

// Replace "Sheet1" if your sheet has a different name
const sheetName = "Sheet1";

// Google Sheets API URL
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;

// Fetch data from your Google Sheet
fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.values) {
      createTable(data.values);
    } else {
      document.getElementById("table-container").innerHTML = "No data found or check your sheet name.";
    }
  })
  .catch(err => {
    console.error('Error:', err);
    document.getElementById("table-container").innerHTML = "Failed to load data.";
  });

// Function to create HTML table
function createTable(rows) {
  let tableHTML = "<table>";

  rows.forEach((row, index) => {
    tableHTML += "<tr>";

    row.forEach(cell => {
      tableHTML += (index === 0) ? `<th>${cell}</th>` : `<td>${cell}</td>`;
    });

    tableHTML += "</tr>";
  });

  tableHTML += "</table>";

  document.getElementById("table-container").innerHTML = tableHTML;
}
