const toggle = document.getElementById("theme-toggle");
const icon   = document.getElementById("theme-icon");
const root   = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  toggle.checked = (theme === "light");
  icon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
  localStorage.setItem("theme", theme);
}

const saved = localStorage.getItem("theme") || "dark";
applyTheme(saved);

toggle.addEventListener("change", () => {
  const next = toggle.checked ? "light" : "dark";
  applyTheme(next);
});

const apiUrl = `https://api.portfolio.mugabo.rw/api/profile`;



fetch(apiUrl)
    .then((res) => {
        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
	console.log(res);	
        return res.json();
    })
    .then((data) =>{
	
	if(!data || !data.name) {
		throw new Error("Invalid data structure from API")
	}        


        document.getElementById("name").textContent = data.name;
        document.getElementById("title").textContent = data.title;
        document.getElementById("about").textContent = data.about;
        document.getElementById("profile-pic").src = data.picture;

        document.getElementById("location").textContent = `Location: ${data.location}`;
        document.getElementById("availability").textContent = `Availability: ${data.availability}`
        document.getElementById("email").textContent = `Email: ${data.contact.email}`;
        document.getElementById("phone").textContent = `Phone: ${data.contact.phone}`;

        //Skills
        const skills = data.skills;
        const skillsContainer = document.getElementById("skills-container");
	skillsContainer.innerHTML = "";
        for (let category in skills) {
            const group = document.createElement("div");
            group.innerHTML = `<strong>${category}:</strong> ${skills[category].join(", ")}`;
            skillsContainer.appendChild(group);
        }

        //Experience
        const experienceContainer = document.getElementById("experience-container");
        data.experience.forEach((job) => {
            const div = document.createElement("div");
            div.innerHTML = `<h4>${job.role} (${job.duration})</h4> <p>${job.company}</p><p>${job.details}</p>`;
            experienceContainer.appendChild(div);
        });

        // Socials
        const socials = data.socials;
        const socialLinks = document.getElementById("social-links");
        for (let key in socials){
            const a = document.createElement("a");
            a.href = socials[key];
            a.target = "_blank";
            a.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            socialLinks.appendChild(a);
        }

    })
    .catch((error) =>{
	console.error("Error loading profile data:",error);
	const main = document.getElementById("app");
	if (main) {
		main.innerHTML = "<p style='color:red;'> Failed to load portfolio data.</p>";
	}	

	});
