function Profile(avatar, name, bio) {
  const section = document.querySelector("section#profile");
  section.innerHTML = `
  <img src="${avatar}" alt="Foto de ${name}" width="128" height="128">
  <h2>${name}</h2>
  <p>${bio}</p>
  `
}

function Project(project) {
  const li = document.createElement("li")
  li.setAttribute("class", "project")
  li.innerHTML = `
  <a href="${project.html_url}" target="_blank">
    <div class="project-header">
      <img src="./assets/folder.svg" alt="Folder Icon">
      <strong>${project.full_name}</strong>
    </div>
    <div class="project-content">
      <p>${project.description ? project.description : "No description"}</p>
    </div>
  <div class="project-footer">
    <div class="actions">
     <div class="action star">
      <img src="./assets/star.svg" alt="star project">
      <span>${project.stargazers_count}</span>
    </div>
  <div class="action branch">
    <img src="./assets/git-branch.svg" alt="branch">
    <span>${project.forks_count}</span>
  </div>
  </div>
    <div class="tech">
      <div class="${project.language}"></div>
      <span>${project.language ? project.language: "unknown tech"}</span>
   </div>
  </div>
  </a>
  `
  return li
}
async function Projects() {
  const response = await fetch("https://api.github.com/users/m4zeboy/repos");
  const projects = await response.json();
  const reverseProjects = projects.reverse();
  const ul = document.querySelector("ul.projects");

  for(let i = 0; i <= 3; i++) {
    ul.appendChild(Project(reverseProjects[i]));

  }
}

async function init() {
  const response = await fetch("https://api.github.com/users/m4zeboy");
  const data = await response.json();
  Profile(data.avatar_url, data.name, data.bio)
  Projects()
}


init()  