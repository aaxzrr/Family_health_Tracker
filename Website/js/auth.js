// Validasi untuk halaman signup
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form dari pengiriman default

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorMessage = document.getElementById('error-message');

        if (password !== confirmPassword) {
            errorMessage.textContent = "Password dan konfirmasi password tidak cocok.";
            errorMessage.classList.remove('hidden');
        } else {
            errorMessage.classList.add('hidden');
            // Di sini Anda dapat menambahkan logika untuk mengirim data ke server
            alert("Signup berhasil!");
        }
    });
}

// Validasi untuk halaman login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form dari pengiriman default

        const email = document.querySelector('#loginForm input[type="email"]').value;
        const password = document.querySelector('#loginForm input[type="password"]').value;

        // Logika sederhana untuk memeriksa email dan password
        // Di sini Anda dapat menambahkan logika untuk mengirim data ke server
        if (email === "user@example.com" && password === "password123") {
            alert("Login berhasil!");
            // Redirect ke halaman lain jika perlu
            // window.location.href = "homepage.html"; // Contoh redirect
        } else {
            alert("Email atau password salah.");
        }
    });
}   