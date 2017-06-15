<?php
require_once("SimpleRest.php");
require_once("Translator.php");
/*
 Rest class to handle api requests
*/
class TranslateRest extends SimpleRest {

	public function getTranslation() {
    $from = filter_input(INPUT_GET,"from",FILTER_SANITIZE_STRING);
    $dest = filter_input(INPUT_GET,"dest",FILTER_SANITIZE_STRING);
    $phrase = trim(filter_input(INPUT_GET,"phrase",FILTER_SANITIZE_STRING));
    $rawData = null;
    if($from !== null && $dest !== null && $phrase !==null ) {
      $translator = new Translator();
      $rawData = $translator->getTranslation($from, $dest, $phrase);
    }
    if($rawData === null) {
      $statusCode = 500;
    }
    else {
      $statusCode = 200;
    }
    $this->setHttpHeaders($statusCode);
    echo json_encode($rawData);
	}
}
?>
