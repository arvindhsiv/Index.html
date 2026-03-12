// blogs.js — Portfolio Blog/Writeup Cards
// Add new entries here. Tags, URL, and description are used to render cards.

const blogsData = [
    {
        title: "A Comprehensive Plan For Conducting a Simulated Cyber Defense Exercise — SPYWARE",
        url: "https://www.linkedin.com/pulse/comprehensive-plan-conducting-simulated-cyber-defense-arvindh-siva-h3rqc/",
        description: "A detailed playbook for designing and executing a realistic cyber defense simulation — covering threat scenarios, team structure, tooling, and post-exercise analysis to harden organizational resilience.",
        tags: ["Simulation", "Threat Modeling", "LinkedIn"],
        icon: "fas fa-chess-king"
    },
    {
        title: "Cybersecurity Capability Maturity Model — C2M2",
        url: "https://www.linkedin.com/pulse/cybersecurity-capability-maturity-model-c2m2-arvindh-siva/",
        description: "Deep dive into the C2M2 framework — explaining maturity domains, assessment methodology, and practical steps organizations can take to measure and improve their cybersecurity posture.",
        tags: ["C2M2", "Assessment", "Governance", "LinkedIn"],
        icon: "fas fa-chart-line"
    }
];

function renderBlogs() {
    const grid = document.getElementById('blogs-grid');
    if (!grid) return;
    grid.innerHTML = '';

    blogsData.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card hover-glow';

        const tagsHTML = blog.tags.map(tag => `<li>${tag}</li>`).join('');

        card.innerHTML = `
            <div class="blog-card-icon-row">
                <div class="blog-icon-wrap">
                    <i class="${blog.icon}"></i>
                </div>
                <a href="${blog.url}" target="_blank" class="blog-ext-link hover-glow-text accent" title="Open article">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
            <a href="${blog.url}" target="_blank" style="text-decoration: none;">
                <h4 class="project-title accent blog-title">${blog.title}</h4>
            </a>
            <p class="project-desc">${blog.description}</p>
            <ul class="project-tech">
                ${tagsHTML}
            </ul>
        `;

        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderBlogs);
