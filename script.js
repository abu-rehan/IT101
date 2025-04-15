document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#sidebar a');
    const contentDiv = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const file = this.getAttribute('data-file');
            loadContent(file);
        });
    });

    function loadContent(file) {
        fetch(`content/${file}`)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
            })
            .catch(error => {
                contentDiv.innerHTML = '<p>Error loading content.</p>';
                console.error('Error:', error);
            });
    }
});