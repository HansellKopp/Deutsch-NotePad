<?php
/*
 Api entry point
*/
require_once("TranslateRest.php");
$rest = new TranslateRest();
$rest->getTranslation();
?>
