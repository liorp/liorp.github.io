(function loadGA() {
    var ga = document.createElement('script')
    ga.type = 'text/javascript'
    ga.async = true
    ga.src =
        ('https:' == document.location.protocol
            ? 'https://www'
            : 'http://www') +
        '.googletagmanager.com/gtag/js?id=G-6P7DB582X4'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(ga, s)
    window.dataLayer = window.dataLayer || []
    function gtag() {
        dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', 'G-6P7DB582X4', { page_path: window.location.pathname})
})()