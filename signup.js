function validateForm() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Please fill in all fields.');
      return false;
  }

  if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
  }

  fetch('http://localhost:5005/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, email: email, password: password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.message) {
          alert(data.message);
          window.location.href = 'login.html';
      } else {
          alert(data.error);
      }
  })
  .catch(error => console.error('Error:', error));
  return false; // Prevent form submission
}
