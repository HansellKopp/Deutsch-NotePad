<?php
/*
A domain Class to prepare translation
*/
Class Translator {

	public function getTranslation($from, $dest, $phrase){
    $result=[];
    $result[$from][] = $phrase;
    $result[$dest] = [];
    $url = "https://glosbe.com/gapi/translate?dest=$dest&format=json&from=$from&phrase=$phrase&pretty=true";
    try {
      $result=[];
      $result[$from][] = $phrase;
      $data = json_decode(file_get_contents($url));
      if ($data->tuc[0] == null)  {
         return null;
      }
      $result[$dest][] = $data->tuc[0]->phrase->text;
      if(isset($data->tuc[0]->meanings) && $data->tuc[0]->meanings) {
        foreach ($data->tuc[0]->meanings as $value) {
           $result[$value->language][] = $value->text;
        }
      }
      return $result;
    } catch (Exception $e) {
      return null;
    }
	}
}
?>
