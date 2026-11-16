const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const users = JSON.parse(localStorage.getItem('users')) || [];

if (!loggedInUser || loggedInUser.role !== "admin") {
    window.location.href = "login.html";
}

const welcomeMessage = document.getElementById('welcomeMessage');

if (loggedInUser) {
    welcomeMessage.textContent = "Welcome " + loggedInUser.username;
}

const usersTable = document.getElementById('usersTable');

users.forEach(user => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td class="p-3 border">${user.username}</td>
        <td class="p-3 border">${user.email}</td>
        <td class="p-3 border">${user.dob}</td>
        <td class="p-3 border">${user.role}</td>
    `;

    usersTable.appendChild(row);
});