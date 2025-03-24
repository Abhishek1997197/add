let isBlockingEnabled = false;

document.getElementById("enable").addEventListener("click", function() {
    isBlockingEnabled = true;
    alert("Tab blocking enabled!");
});

document.getElementById("disable").addEventListener("click", function() {
    isBlockingEnabled = false;
    alert("Tab blocking disabled!");
});

// Override window.open to prevent new tabs
window.open = function() {
    if (isBlockingEnabled) {
        alert("New tabs are blocked!");
        return null;
    } else {
        return window.__proto__.open.apply(window, arguments);
    }
};

// Prevent middle mouse clicks and Ctrl+click from opening new tabs
document.addEventListener("click", function(event) {
    if (isBlockingEnabled && (event.ctrlKey || event.metaKey || event.button === 1)) {
        event.preventDefault();
        alert("New tab opening blocked!");
    }
}, true);

// Prevent Ctrl+T or Cmd+T from opening new tabs
document.addEventListener("keydown", function(event) {
    if (isBlockingEnabled && (event.ctrlKey || event.metaKey) && event.key === "t") {
        event.preventDefault();
        alert("New tab opening blocked!");
    }
});

// Prevent <a> links from opening in a new tab
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("a[target='_blank']").forEach(link => {
        link.addEventListener("click", function(event) {
            if (isBlockingEnabled) {
                event.preventDefault();
                alert("New tab opening blocked!");
            }
        });
    });
});
