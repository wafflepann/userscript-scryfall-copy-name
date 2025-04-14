// ==UserScript==
// @name         Scryfall Copy Name (CSP-Safe Text Version)
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Adds a copy button to card names on Scryfall, CSP-safe with no emojis or inline styles/scripts.
// @author       You
// @match        *://scryfall.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Use DOM-created <style> instead of GM_addStyle to avoid CSP inline block
    const style = document.createElement("style");
    style.textContent = `
        .copyable-span {
            display: inline-flex;
            align-items: center;
            cursor: pointer !important;
        }
        .copyable-span .text-span {
            font-weight: bold;
        }
        .copyable-span .copy-icon {
            margin-left: 6px;
            font-size: 0.8em;
            color: #079BF5;
            user-select: none;
        }
        .copyable-span.copied .copy-icon {
            color: green;
        }
    `;
    document.head.appendChild(style);

    function initCopyElements() {
        document.querySelectorAll('.card-text-card-name:not([data-copy-initialized])').forEach(span => {
            span.setAttribute('data-copy-initialized', 'true');

            const containerSpan = document.createElement("span");
            containerSpan.className = "copyable-span";
            containerSpan.setAttribute('title', 'Click to copy');

            const textSpan = document.createElement("span");
            textSpan.className = "text-span";
            textSpan.textContent = span.textContent;

            const copyIcon = document.createElement("span");
            copyIcon.className = "copy-icon";
            copyIcon.textContent = "[Copy]";

            containerSpan.appendChild(textSpan);
            containerSpan.appendChild(copyIcon);

            containerSpan.addEventListener("click", async () => {
                try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(textSpan.textContent.trim());
                        copyIcon.textContent = "[✔]";
                        containerSpan.classList.add("copied");
                        setTimeout(() => {
                            copyIcon.textContent = "[Copy]";
                            containerSpan.classList.remove("copied");
                        }, 1500);
                    } else {
                        alert("Clipboard API not available.");
                    }
                } catch (error) {
                    console.error("Clipboard write failed:", error);
                }
            });

            span.replaceWith(containerSpan);
        });
    }

    // Run on initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCopyElements);
    } else {
        initCopyElements();
    }

    // Handle dynamic content
    const observer = new MutationObserver(() => initCopyElements());
    observer.observe(document.body, { childList: true, subtree: true });
})();
