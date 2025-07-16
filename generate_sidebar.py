import os
import re

def extract_topic_name(file_path):
    """
    Extracts the topmost <h2> header content from an HTML file.

    :param file_path: Path to the HTML file.
    :return: The content of the <h2> tag, or None if no <h2> tag is found.
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            # Search for the first occurrence of an <h2> tag
            match = re.search(r'<h2>(.*?)</h2>', line, re.IGNORECASE)
            if match:
                return match.group(1)
    return None


def generate_sidebar_html_from_directory(directory):
    """
    Generates HTML code for a sidebar by scanning a directory for HTML files
    and extracting the topmost <h2> header as the topic name.

    :param directory: Path to the directory containing HTML files.
    :return: A string containing the generated HTML code.
    """
    html = '    <ul>\n'

    # Iterate through all files in the directory
    for file_name in sorted(os.listdir(directory)):
        if file_name.endswith('.html'):  # Only process HTML files
            file_path = os.path.join(directory, file_name)
            topic_name = extract_topic_name(file_path)
            if topic_name:  # Only include files with an <h2> header
                html += f'        <li><a href data-file="{file_name}">{topic_name}</a></li>\n'

    html += '    </ul>\n'
    return html


# Example usage
if __name__ == "__main__":
    # Define the path to the 'content' directory
    content_directory = "content"

    # Generate the sidebar HTML
    if os.path.exists(content_directory) and os.path.isdir(content_directory):
        sidebar_html = generate_sidebar_html_from_directory(content_directory)
        print(sidebar_html)
        fd= os.open('sidebar.html', os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o644)
        os.write(fd, sidebar_html.encode('utf-8'))
        os.close(fd)
    else:
        print(f"The directory '{content_directory}' does not exist.")
