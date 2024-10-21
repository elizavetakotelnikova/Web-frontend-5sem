(function() {
    window.addEventListener('load', function() {
        const $curr = document.querySelector('.js-perf')

        const pageEnd = performance.mark('pageEnd')
        const loadTime = (pageEnd.startTime / 1000).toFixed(4)

        const additionalFooter = document.createElement('div');
        additionalFooter.style.position = 'fixed';
        additionalFooter.style.bottom = '0';
        additionalFooter.style.width = '100%';
        additionalFooter.style.backgroundColor = '#f8f9fa';
        additionalFooter.style.textAlign = 'center';
        additionalFooter.style.padding = '10px 0';
        additionalFooter.style.borderTop = '1px solid #dee2e6';
        additionalFooter.style.color = 'black'
        additionalFooter.innerText = 'Page load time is ' + loadTime + ' seconds';

        document.body.appendChild(additionalFooter);
    });
})();
