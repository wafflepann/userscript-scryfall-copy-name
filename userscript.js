(function() {
    // Wait for the page to load relevant elements
    window.addEventListener('DOMContentLoaded', () => {
        // make elements for scryfall userscript
        const copyableElements = document.querySelectorAll('.card-text-card-name');

        copyableElements.forEach(span => {
            // new container for styling
            const containerSpan = document.createElement("span");
            containerSpan.style.display = "inline-flex";
            containerSpan.style.alignItems = "center";
            containerSpan.style.cursor = "pointer";
            containerSpan.title = "Click to copy";

            // generate class
            const className = `copyable-span`;
            containerSpan.className = className;

            // span for text
            const textSpan = document.createElement("span");
            textSpan.className = `text-span`;
            textSpan.innerText = copyableElements.innerText;
            // textSpan.style.fontSize = "12px";
            textSpan.style.fontWeight = "bold";
            // textSpan.style.color = "black";

            // copy icon
            let copyIcon = document.createElement("span");
            copyIcon.className = `copy-icon`;
            copyIcon.innerHTML = "&#x1f5cd;";
            copyIcon.style.marginLeft = "2px";
            copyIcon.style.fontSize = "12px";
            copyIcon.style.color = "#079BF5";

            // append icon
            containerSpan.appendChild(textSpan);
            containerSpan.appendChild(copyIcon);

            // Click event to copy to clipboard
            containerSpan.addEventListener("click", async function () {
                try {
                    // text from span clicked
                    const textSpan = containerSpan.querySelector(".text-span");
                    await navigator.clipboard.writeText(textSpan.innerText.trim());

                    // change icon on click
                    copyIcon.innerHTML = `Copied &#x1f5cd;`;
                    copyIcon.style.color = "green";

                    // swap back after five seconds
                    setTimeout (() => {
                        copyIcon.innerHTML = "&#x1f5cd;";
                        copyIcon.style.color = "#079BF5";
                    }, 3000);
                } catch (error) {
                    console.error("Failed to copy text: ", error);
                }
            });

            // replace card name span with copyable span
            copyableElements.parentNode.replaceChild(containerSpan, copyableElements);
        });
    });
})();