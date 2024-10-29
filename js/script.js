document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(event.target);
    const jsonData = new URLSearchParams(formData).toString();

    // Your Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyIPsk6jjCKVl2VRFMW5HV9sP7z76JEwflg5xSc8oPc9-gdcosScTIYF4m1OttwPj1-yw/exec';

    const responseMessageDiv = document.getElementById('responseMessage');

            // Send data to Google Sheets
            fetch(scriptURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: jsonData
            })
            .then(response => response.text())
            .then(responseMessage => {
                // Customize success message
                responseMessageDiv.innerText = "Thank you for your interest!";
                responseMessageDiv.classList.add('response-success');
                responseMessageDiv.classList.remove('response-error');
                responseMessageDiv.style.display = 'block';
                
                // Clear the form
                event.target.reset();

                // Clear the message after 5 seconds
                setTimeout(() => {
                    responseMessageDiv.style.display = 'none';
                }, 5000); // 5000ms = 5 seconds
            })
            .catch(error => {
                // Customize error message
                responseMessageDiv.innerText = "There was an error submitting your info. Please try again.";
                responseMessageDiv.classList.add('response-error');
                responseMessageDiv.classList.remove('response-success');
                responseMessageDiv.style.display = 'block';

                // Clear the message after 5 seconds
                setTimeout(() => {
                    responseMessageDiv.style.display = 'none';
                }, 5000);
            });
        });