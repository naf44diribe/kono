document.addEventListener("DOMContentLoaded", () => {

    contentContainer = document.getElementById('content');
    navLinks = document.querySelectorAll('nav a');


    /* Function to load page */
    function loadPage(page) {
        fetch(`content/${page}.html?timestamp=${new Date().getTime()}`).then((response) => {
            if (!response.ok) {
                throw new Error('Page not found.');
            }
            return response.text();
        }).then((html) => {
            contentContainer.innerHTML = html;
            updateActiveLink(page)

        }).catch(() => {
            contentContainer.innerHTML = '<h1>Page Not Found.</h1>';
            updateActiveLink(null);
        })
    }

    /* Function to update active link */
    function updateActiveLink(page) {
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (page === linkPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        })
        
    }

    /* function to get page from URL */
    function getPageFromPath() {
        const path = window.location.pathname;
        if (path === '/' || path === '') {
            return 'home';
        }
        else {
            return path.slice(1);
        }
        
    }

    /* Handle navigation clicks */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            
            history.pushState({ page }, '', page === 'home' ? '/' : `content/${page}`);
            loadPage(page);
        })
    })

    /* Handle back or forward navigation */
    window.addEventListener('popstate', () => {
        const page = getPageFromPath();
        loadPage(page);
        
    })

    /* Initial page load */
    loadPage(getPageFromPath())

})
