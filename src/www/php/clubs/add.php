<?php
session_start();
if(!isset($_SESSION["loggedIn"])) {
  die(json_encode([
    "error" => -99,
    "rowsAffected" => 0
  ]));
}

include('../database.php');

$db = new Database();

if(isset($_FILES["logodata"])) {
  $fileName = time() . "-" . $_FILES["logodata"]["name"];
  if(move_uploaded_file($_FILES["logodata"]["tmp_name"], "../../clublogos/" . $fileName)) {
    $image = new Imagick();
    $image->readImage("../../clublogos/" . $fileName);
    $image->resizeImage(0, 350, Imagick::FILTER_CUBIC, 1);
    $image->writeImage("../../clublogos/" . $fileName);
    $image->clear();
  }

  $stmt = $db->execute("INSERT INTO clubs(name, logodata) VALUES(:name, :logodata)", ["name" => $_POST["name"],
                                                                                      "logodata" => $fileName]);
  die(json_encode([
    "error" => $stmt->errorCode(),
    "rowsAffected" => $stmt->rowCount()
  ]));
} else {
  die(json_encode([
    "error" => -1,
    "rowsAffected" => 0
  ]));
}
?>
