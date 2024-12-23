document.addEventListener('DOMContentLoaded', function() {
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
    profile.addEventListener('mouseover', () => {
       const header = document.querySelector('.header');
       header.style.boxShadow = '0 0 10px #0b57ee';
    });
    profile.addEventListener('mouseout', () => {
        const header = document.querySelector('.header');
        header.style.boxShadow = '0 0 0px #0b57ee';
    });

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
loadYamlFile();

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

loadConnectYamlFile();

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

loadProjectsYamlFile();

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
    const educationKey = document.createElement('span');
    educationKey.classList.add('key');
    educationKey.textContent = key + ":";
    educationKey.innerHTML = educationKey.innerHTML + breakLine;
    parentElement.appendChild(educationKey);
    
    if(Object.keys(value).length > 0) { 
        Object.values(value).forEach((item) => {
            const entries = [
                { key: 'degree', value: item.degree },
                { key: 'university', value: item.university },
                { key: 'year', value: item.year }
            ];
            
            entries.forEach((entry, index) => {
                const key = document.createElement('span');
                key.classList.add('key');
                key.textContent = entry.key + ":";
                if (index === 0) {
                    key.innerHTML = indent + "-" + indent + key.innerHTML;
                }
                else {
                    key.innerHTML = indent + indent + space + key.innerHTML;
                }
                parentElement.appendChild(key);
                
                const value = document.createElement('span');
                value.classList.add('string');

                if(index === 0) {
                    value.style.marginLeft = '35px';
                }
                else if (index === 2) {
                    value.classList.remove('string');
                    value.classList.add('education-year');
                }
                
                value.textContent = entry.value;
                value.innerHTML = value.innerHTML + breakLine;
                parentElement.appendChild(value);

                if (index === entries.length - 1) {
                    parentElement.appendChild(document.createElement('br'));
                }
            });
        });
    }
}

function displayExperience(key, value) {
    const parentElement = document.getElementsByClassName('content-yaml')[0];
    const experienceKey = document.createElement('span');
    experienceKey.classList.add('key');
    experienceKey.textContent = key + ":";
    experienceKey.innerHTML = experienceKey.innerHTML + breakLine;
    parentElement.appendChild(experienceKey);
    
    if(Object.keys(value).length > 0) { 
        Object.values(value).forEach(item => {
            const entries = [
                { key: 'company', value: item.company },
                { key: 'position', value: item.position },
                { key: 'year', value: item.year }
            ];
            
            entries.forEach((entry, index) => {
                const companyKey = document.createElement('span');
                companyKey.classList.add('key');
                companyKey.textContent = entry.key + ":";
                
                if (index === 0) {
                    companyKey.innerHTML = indent + "-" + indent + companyKey.innerHTML;
                }
                else {
                    companyKey.innerHTML = indent + indent + space + companyKey.innerHTML;
                }
                parentElement.appendChild(companyKey);
                
                const companyValue = document.createElement('span');
                companyValue.classList.add('string');
                if (index === 0) {
                    companyValue.style.marginLeft = '10px';
                } 

                if(index === 2) {
                    companyValue.classList.remove('string');
                    companyValue.classList.add('year');
                }
                companyValue.textContent = entry.value;
                companyValue.innerHTML = companyValue.innerHTML + breakLine;
                parentElement.appendChild(companyValue);

                if (index === entries.length - 1) {
                    parentElement.appendChild(document.createElement('br'));
                }
            });            
        });

    }
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

loadHeaderJson();

 
function displayCopyright() {
    const parentElement = document.getElementsByClassName('footer')[0];
    const currentYear = new Date().getFullYear();

    const copyright = document.createElement('span');
    copyright.classList.add('copyright');

    copyright.textContent = ` ${currentYear} - NaveenKumar Namachivayam`;
    parentElement.appendChild(copyright);
}


 