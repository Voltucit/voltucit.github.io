(() => {
    const comments = document.getElementById('guestbook-comments');
    const error = document.getElementById('guestbook-error');
    const giscusOrigin = 'https://giscus.app';
    const currentTheme = () => document.body.classList.contains('DarkMode') ? 'dark' : 'light';

    function syncTheme() {
        const frame = comments.querySelector('.giscus-frame');
        frame?.contentWindow.postMessage({ giscus: { setConfig: { theme: currentTheme() } } }, giscusOrigin);
    }

    const script = document.createElement('script');
    script.src = giscusOrigin + '/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    Object.assign(script.dataset, comments.dataset, { theme: currentTheme() });
    script.addEventListener('error', () => {
        error.hidden = false;
    });

    comments.addEventListener('load', syncTheme, true);
    new MutationObserver(syncTheme).observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
    comments.after(script);
})();
