(function() {
    window.addEventListener('load', function() {
        var menuItems = document.querySelectorAll('.top-container__menu a');
        var location = document.location.pathname.split('/');
        var currentPage = '/' + location.pop()

        menuItems.forEach(function(item) {
            if (item.getAttribute('href').indexOf(currentPage) !== -1) {
                console.log(item)
                item.classList.add('active');
            }

            console.log(item.getAttribute("href"), currentPage)
        });
    });
})();
