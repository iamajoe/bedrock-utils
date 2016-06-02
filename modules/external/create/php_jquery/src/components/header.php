<?php

/**
 * Gets header template
 * @return {string}
 */
function get_header_tmpl() {
    ob_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <meta content="width=device-width" name="viewport">

        <link rel="stylesheet" href="app.css">
        <meta name="application-name" content="<%= name %>"/>
        <title><%= name %></title>
    </head>
    <!--[if IE]>
    <body class="no-script is-ie">
    <![endif]-->
    <!--[if !IE]> -->
    <body class="no-script">
    <!-- <![endif]-->
        <div id="body-wrapper">
            <div id="outdated">
                <h6>Your browser is out-of-date!</h6>
                <p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p>
                <p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>
            </div>
<?php
    $output = ob_get_clean();
    ob_flush();

    return $output;
}

?>
