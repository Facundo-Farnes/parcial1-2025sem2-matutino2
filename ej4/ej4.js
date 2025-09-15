document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/users"; 
  const form = document.getElementById("userForm");
  const usersList = document.getElementById("users");

  async function fetchUsers() {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderUsers(data);
  }

  function renderUsers(users) {
    usersList.innerHTML = "";
    users.forEach(user => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${user.name} / ${user.role} / ${user.email}
        <button data-action="promote" data-id="${user.id}">Promote</button>
        <button data-action="demote" data-id="${user.id}">Demote</button>
        <button data-action="delete" data-id="${user.id}">Delete</button>
      `;
      usersList.appendChild(li);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    const newUser = { name, email, role };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      form.reset();
      fetchUsers();
    }
  });

  usersList.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = e.target.dataset.id;
      const action = e.target.dataset.action;

      if (action === "delete") {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchUsers();
      }

      if (action === "promote" || action === "demote") {
        const res = await fetch(`${API_URL}/${id}`);
        const user = await res.json();

        const roles = ["Viewer", "Editor", "Admin"];
        let currentIndex = roles.indexOf(user.role);
        let newIndex = currentIndex;

        if (action === "promote" && currentIndex < roles.length - 1) {
          newIndex++;
        }
        if (action === "demote" && currentIndex > 0) {
          newIndex--;
        }

        const nextRole = roles[newIndex];

        await fetch(`${API_URL}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: nextRole }),
        });

        fetchUsers();
      }
    }
  });

  // Inicialización
  fetchUsers();
});
