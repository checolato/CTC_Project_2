document.addEventListener("DOMContentLoaded", () => {
  const SHEET_ID = '1SJwLU7pEWIyeytUYvdyHuG8y_1cdSg6sjHAOh_DA3ATJ';
  const API_KEY = 'AIzaSyBDl5Ko272-ASW3PfezhAkMjP0EPqHh51k';
  const RANGE = 'Sheet1!A2:B50';

  const SHEET_API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  fetch(SHEET_API_URL)
      .then(res => res.json())
      .then(data => {
          const items = document.querySelectorAll(".item");

          data.values.forEach((row, index) => {
              if (index < items.length && row[1]) {
                  const img = document.createElement("img");
                  img.setAttribute('loading', 'lazy');
                  
                  // Set placeholder first
                  img.src = "https://via.placeholder.com/120?text=Loading...";
                  img.alt = `Image ${index + 1}`;

                  const realImage = new Image();
                  realImage.src = row[1].trim();
                  realImage.onload = () => {
                      img.src = realImage.src;  // Replace placeholder with real image once loaded
                  };
                  realImage.onerror = () => {
                      img.src = "https://via.placeholder.com/120"; // Error placeholder
                  };

                  items[index].textContent = "";
                  items[index].appendChild(img);
              }
          });
      })
      .catch(err => console.error("Error:", err));
});
