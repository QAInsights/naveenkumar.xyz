document.addEventListener('DOMContentLoaded', async function() {
    // Find all experience and education entries
    const entries = document.querySelectorAll('.experience-entry, .education-entry');
    
    // Add click event listener to each entry
    entries.forEach(entry => {
        const header = entry.querySelector('.experience-header, .education-header');
        header.addEventListener('click', () => {
            entry.classList.toggle('expanded');
            const icon = header.querySelector('.expand-icon');
            icon.textContent = entry.classList.contains('expanded') ? '−' : '+';
        });
    });

    // Make social links clickable
    const socialLinks = document.querySelectorAll('.social-links .string');
    socialLinks.forEach(link => {
        if (link.textContent.startsWith('http') || link.textContent.startsWith('mailto')) {
            link.style.cursor = 'pointer';
            link.addEventListener('click', () => {
                window.open(link.textContent.trim(), '_blank');
            });
        }
    });

    // profile hover
    const profile = document.querySelector('.profile');
    if (profile) {
        profile.addEventListener('mouseover', () => {
            const header = document.querySelector('.header');
            header.style.boxShadow = '0 0 10px #0b57ee';
        });
        profile.addEventListener('mouseout', () => {
            const header = document.querySelector('.header');
            header.style.boxShadow = '0 0 0px #0b57ee';
        });
    }

    // Load all content
    await loadYamlFile();
    await loadConnectYamlFile();
    await loadProjectsYamlFile();
    await loadHeaderJson();
    
    // Load RSS feed after other content is loaded
    checkAndRefreshRSSFeed();
    
    displayCopyright();
});

const loadYamlFile = async () => {
    try {
        const response = await fetch('data/me.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        // Display About
        displayAbout("about", data.about);
        displayStack("stack", data.stack);
        displayExperience("experience", data.experience);
        displayEducation("education", data.education);
        displayCertifications("certifications", data.certifications);
        return data;
    } catch (error) {
        console.error('Error loading YAML:', error);
    }
};

// Call the function
// loadYamlFile();

const loadConnectYamlFile = async () => {
    try {
        const response = await fetch('data/connect.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        displayConnect("connect", data.connect);
         return data;
    } catch (error) {
        console.error('Error loading YAML:', error);
    }
};

// loadConnectYamlFile();

const loadProjectsYamlFile = async () => {
    try {
        const response = await fetch('data/projects.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        displayProjects("projects", data.projects);
         return data;
    } catch (error) {
        console.error('Error loading YAML:', error);
    }
};

// loadProjectsYamlFile();

function displayProjects(key, value) {
    const parentElement = document.getElementsByClassName('social-sidebar')[0];
    const projectsKey = document.createElement('span');
    projectsKey.classList.add('key');
    projectsKey.textContent = key + ":";
    projectsKey.innerHTML = projectsKey.innerHTML + breakLine;
    parentElement.appendChild(projectsKey);
    
    if(Object.keys(value).length > 0) { 
        Object.values(value).forEach(item => {
            const project = document.createElement('span');
            project.classList.add('string');
            const projectUrl = document.createElement('a');
            projectUrl.href = item.url;
            projectUrl.textContent = item.name;
            projectUrl.target = "_blank";
            project.appendChild(projectUrl);
            project.style.marginLeft = '25px';
            project.innerHTML = "-" + indent + project.innerHTML + breakLine;
            parentElement.appendChild(project);
        });
    }
}

function displayConnect(key, value) {
    const parentElement = document.getElementsByClassName('social-sidebar')[0];
    const connectKey = document.createElement('span');
    connectKey.classList.add('key');
    connectKey.textContent = key + ":";
    connectKey.innerHTML = connectKey.innerHTML + breakLine;
    parentElement.appendChild(connectKey);

     
    if(Object.keys(value).length > 0) {
 
        Object.values(value).forEach(item => {
            const connect = document.createElement('span');
            connect.style.marginLeft = '25px';

            const connectUrl = document.createElement('a');
            connectUrl.href = item.url;
            connectUrl.textContent = item.name;
            connectUrl.target = "_blank";
            connect.appendChild(connectUrl);

            connect.innerHTML = "-" + indent + connect.innerHTML + breakLine;
            parentElement.appendChild(connect);
        });
    }
}

const indent = '&nbsp;'.repeat(2);
const breakLine = '<br/>'.repeat(1);
const space = '&nbsp;';

function displayCertifications(key, value) {
    const parentElement = document.getElementsByClassName('content-yaml')[0];
    const certificationsKey = document.createElement('span');
    certificationsKey.classList.add('key');
    certificationsKey.textContent = key + ":";
    certificationsKey.innerHTML = certificationsKey.innerHTML + breakLine;
    parentElement.appendChild(certificationsKey);
    
    if(Object.keys(value).length > 0) {
 
        Object.values(value).forEach(item => {
            const certification = document.createElement('span');
            certification.classList.add('string');
            certification.textContent = item;
            certification.style.marginLeft = '25px';
            certification.innerHTML = "-" + indent + certification.innerHTML + breakLine;
            parentElement.appendChild(certification);
        });
    }
}

function displayEducation(key, value) {
    const parentElement = document.getElementsByClassName('content-yaml')[0];
    const sectionKey = document.createElement('span');
    sectionKey.classList.add('key');
    sectionKey.textContent = key + ":";
    sectionKey.innerHTML = sectionKey.innerHTML + breakLine;
    parentElement.appendChild(sectionKey);
    
    if(Object.keys(value).length > 0) { 
        Object.values(value).forEach((item) => {
            const container = document.createElement('div');
            container.classList.add('entry-container');

            const entries = [
                { key: 'degree', value: item.degree },
                { key: 'university', value: item.university },
                { key: 'year', value: item.year }
            ];
            
            entries.forEach((entry, index) => {
                const row = document.createElement('div');

                const keySpan = document.createElement('span');
                keySpan.classList.add('entry-key');
                keySpan.textContent = (index === 0 ? '- ' : '   ') + entry.key + ":";
                row.appendChild(keySpan);

                const valueSpan = document.createElement('span');
                valueSpan.classList.add('entry-value');
                valueSpan.textContent = entry.value;
                row.appendChild(valueSpan);

                container.appendChild(row);
            });

            parentElement.appendChild(container);
        });
        parentElement.appendChild(document.createElement('br'));
    }
}

function displayExperience(key, value) {
    const parentElement = document.getElementsByClassName('content-yaml')[0];
    const sectionKey = document.createElement('span');
    sectionKey.classList.add('key');
    sectionKey.textContent = key + ":";
    sectionKey.innerHTML = sectionKey.innerHTML + breakLine;
    parentElement.appendChild(sectionKey);
    
    if(Object.keys(value).length > 0) { 
        Object.values(value).forEach(item => {
            const container = document.createElement('div');
            container.classList.add('entry-container');

            const entries = [
                { key: 'company', value: item.company },
                { key: 'position', value: item.position },
                { key: 'year', value: item.year }
            ];
            
            entries.forEach((entry, index) => {
                const row = document.createElement('div');

                const keySpan = document.createElement('span');
                keySpan.classList.add('entry-key');
                keySpan.textContent = (index === 0 ? '- ' : '   ') + entry.key + ":";
                row.appendChild(keySpan);

                const valueSpan = document.createElement('span');
                valueSpan.classList.add('entry-value');
                valueSpan.textContent = entry.value;
                row.appendChild(valueSpan);

                container.appendChild(row);
            });

            parentElement.appendChild(container);
        });
        parentElement.appendChild(document.createElement('br'));
    }
}

function displayBlog(key, value) {
    if (!value) return;
    
    // Get the social-sidebar element
    const socialSidebar = document.querySelector('.social-sidebar');
    if (!socialSidebar) return;
    
    let content = '';
    content += `<div class="blog-section">`;
    content += `<span class="key">recent_posts:</span>${breakLine}`;
    
    // Display articles
    value.articles.forEach(article => {
        content += `<div class="blog-item">`;
        content += `${indent}<span class="array">-</span>`;
        content += `<span class="string clickable-link" data-url="${article.link}" title="${article.title}">${article.title}</span>`;
        content += `</div>`;
    });
    
    content += '</div>';
    
    // Append to social-sidebar
    socialSidebar.insertAdjacentHTML('beforeend', content);
    
    // Make links clickable
    socialSidebar.querySelectorAll('.clickable-link').forEach(link => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', () => {
            const url = link.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });
}

function displayAbout(key, value) {
    const parentElement = document.getElementsByClassName('content-yaml')[0];
    const aboutKey = document.createElement('span');
    aboutKey.classList.add('key');
    aboutKey.textContent = key + ":";
    
    const aboutValue = document.createElement('span');
    aboutValue.classList.add('string');
    aboutValue.textContent = checkForSpace(value);
    aboutValue.style.paddingLeft = '50px';
    // add indent to aboutValue
    aboutValue.innerHTML = indent + aboutValue.innerHTML + breakLine + breakLine;

    parentElement.appendChild(aboutKey);
    parentElement.appendChild(aboutValue);
   
}

function displayStack(key, value) {
    const parentElement = document.getElementsByClassName('content-yaml')[0];
    const stackKey = document.createElement('span');
    stackKey.classList.add('key');
    stackKey.textContent = key + ":";
    stackKey.innerHTML = stackKey.innerHTML + breakLine;
    parentElement.appendChild(stackKey);
    
    if(Object.keys(value).length > 0) {
        const stackContainer = document.createElement('div');
        stackContainer.classList.add('stack-container');
        
        // Create stack entries
        const entries = [
            { key: 'languages', value: value.languages },
            { key: 'frameworks', value: value.frameworks },
            { key: 'testing', value: value.testing },
            { key: 'frontend', value: value.frontend },
            { key: 'tools_os', value: value.tools_os }
        ];
        
        entries.forEach((entry, index) => {
            const container = document.createElement('div');
            
            // Create and append key
            const keySpan = document.createElement('span');
            keySpan.classList.add('stack-key');
            keySpan.textContent = entry.key + ":";
            container.appendChild(keySpan);
            
            // Create and append value
            const valueSpan = document.createElement('span');
            valueSpan.classList.add('stack-value');
            valueSpan.textContent = checkForSpace(entry.value);
            container.appendChild(valueSpan);
            stackContainer.appendChild(container);

            if (index === entries.length - 1) {
                console.log('last');
                stackContainer.appendChild(document.createElement('br'));
            }
        });
        
        parentElement.appendChild(stackContainer);
    }
}

function checkForSpace(item) {
    return JSON.stringify(item);
}

function checkAndRefreshRSSFeed() {
    const cached = localStorage.getItem('rssFeedCache');
    if (cached) {
        const { timestamp } = JSON.parse(cached);
        // Refresh if cache is older than 1 hour
        if (Date.now() - timestamp > 3600000) {
            fetchRSSFeed();
        } else {
            const { data } = JSON.parse(cached);
            displayBlog('rss_feed', data.rss_feed);
        }
    } else {
        fetchRSSFeed();
    }
}

// Initial load
// checkAndRefreshRSSFeed();

// Refresh feed every hour
// setInterval(checkAndRefreshRSSFeed, 3600000);

// Load blog YAML file
const loadBlogYamlFile = async () => {
    try {
        const response = await fetch('data/blog.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);
        // displayBlog("rss_feed", data.rss_feed);
    } catch (error) {
        console.error('Error loading blog YAML:', error);
    }
};

// Call the function to load blog data
// loadBlogYamlFile();

// Read header JSON
const loadHeaderJson = async () => {
    try {
       // read head.json
       const response = await fetch('data/head.json');
       const jsonText = await response.text();
       const data = JSON.parse(jsonText);
       const preHeader = document.getElementsByClassName('header')[0];  
       preHeader.classList.add('header-json'); 
       const contentDiv = document.createElement('div');
       contentDiv.style.flex = '1';
       contentDiv.style.textAlign = 'center';
       contentDiv.textContent = JSON.stringify(data, null, 2);
       preHeader.appendChild(contentDiv);
     } catch (error) {
        console.error('Error loading JSON:', error);
    }        
     
};

// loadHeaderJson();

 
function displayCopyright() {
    const parentElement = document.getElementsByClassName('footer')[0];
    const currentYear = new Date().getFullYear();

    const copyright = document.createElement('span');
    copyright.classList.add('copyright');

    copyright.textContent = `${currentYear} - NaveenKumar Namachivayam`;
    parentElement.appendChild(copyright);
}