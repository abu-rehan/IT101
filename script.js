console.error("Error running")
document.addEventListener('DOMContentLoaded', function() {
    console.log("Running script");
    const sidebar = document.getElementById("sidebar");
    const contentDiv = document.getElementById('content');
    const sidebarFile = "./sidebar.html";
    console.log("Loading sidebar from:", sidebarFile);
    fetch(sidebarFile)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load sidebar content");
            }
            return response.text();
        })
        .then(html => {
            // Insert the loaded HTML into the sidebar
            sidebar.innerHTML = html;
            const links = sidebar.querySelectorAll('a'); // Select all <a> elements inside the sidebar
            links.forEach(link => {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    const file = this.getAttribute('data-file');
                    if (file) {
                        loadContent(file);
                    }
                });
            });
        })
        .catch(error => {
            console.error("Error loading sidebar:", error);
            sidebar.innerHTML = "<p>Failed to load sidebar content.</p>";
        });

    const links = document.querySelectorAll('#sidebar');



    function loadContent(file) {
        fetch(`content/${file}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load content");
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
            })
            .catch(error => {
                contentDiv.innerHTML = '<p>Error loading content.</p>';
                console.error('Error:', error);
            });
    }
});


const toggleButton = document.getElementById('toggleButton');
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');

        toggleButton.addEventListener('click', () => {
            toggleButton.classList.toggle('passive');
            sidebar.classList.toggle('hidden');
        });