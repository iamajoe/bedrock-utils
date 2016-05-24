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

        <link rel="stylesheet" href="/app.css">
        <link rel="stylesheet" href="/app.js">
        <meta name="application-name" content="example"/>
        <title>Example</title>
    </head>
    <!--[if IE]>
    <body class="no-script is-ie">
    <![endif]-->
    <!--[if !IE]> -->
    <body class="no-script">
    <!-- <![endif]-->
        <div id="body-wrapper">
            <header>
            </header>
            <content>
<?php
    $output = ob_get_clean();
    ob_flush();

    return $output;
}

?>
