<?php

/**
 * Gets header template
 * @return {string}
 */
function get_footer_tmpl() {
    ob_start();
?>
        </div>
    </body>
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="app.js"></script>
    <script>
        // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        // ga('create', '[TODO: CHANGE GOOGLE ANALYTICS ID]', 'auto');
        // ga('send', 'pageview');
    </script>
</html>
<?php
    $output = ob_get_clean();
    ob_flush();

    return $output;
}

?>
