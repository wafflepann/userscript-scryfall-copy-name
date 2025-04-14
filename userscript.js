(function() {
    // Wait for the page to load relevant elements
    window.addEventListener('DOMContentLoaded', () => {
        const nameSpans = document.querySelectorAll('.card-text-card-name');

        nameSpans.forEach(span => {
            const originalText = span.innerText.trim();

            // Style it to look clickable (optional)
            span.style.cursor = 'pointer';
            span.title = 'Click to copy name';

            // Click event to copy to clipboard
            span.addEventListener('click', () => {
                navigator.clipboard.writeText(originalText)
                    .then(() => {
                        // Optional visual feedback
                        const oldText = span.innerText;
                        span.innerText = '✓ Copied!';
                        setTimeout(() => {
                            span.innerText = oldText;
                        }, 1000);
                    })
                    .catch(err => console.error('Copy failed:', err));
            });
        });
    });
})();