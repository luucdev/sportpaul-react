<?php
include('../database.php');

if(!isset($_POST["cart"])) {
  die(json_encode([
    "error" => -1,
    "rowsAffected" => 0
  ]));
}

$db = new Database();
$rowsAffected = 0;

$stmt = $db->execute("SELECT name FROM clubs WHERE id=:clubid", ["clubid" => $_POST["clubid"]]);
$results = $db->fetchAssoc($stmt, 1);

$stmt = $db->execute("INSERT INTO orders(clubid, clubname, firstname, lastname, street, housenr, postcode, town, email, telephone, created, updated) VALUES(:clubid, :clubname, :firstname, :lastname, :street, :housenr, :postcode, :town, :email, :telephone, NOW(), NOW())",
                    ["clubid" => $_POST["clubid"],
                     "clubname" => $results["name"],
                     "firstname" => $_POST["firstname"],
                     "lastname" => $_POST["lastname"],
                     "street" => $_POST["street"],
                     "housenr" => $_POST["housenr"],
                     "postcode" => $_POST["postcode"],
                     "town" => $_POST["town"],
                     "email" => $_POST["email"],
                     "telephone" => $_POST["phone"]]);

$rowsAffected += $stmt->rowCount();

if($stmt->errorCode() !== "00000") {
  die(json_encode([
    "error" => $stmt->errorCode(),
    "rowsAffected" => $rowsAffected
  ]));
} else {
  $id = $db->lastInsertId();
  $cart = json_decode($_POST["cart"]);
  foreach($cart as $key => $item) {
    if($item->flockingPrice === null || $item->flocking === null || strlen($item->flocking) < 1) {
      $item->flockingPrice = 0;
    }
    $stmt2 = $db->execute("INSERT INTO items(clubid, orderid, productid, internalid, name, flocking, defaultFlocking, size, price, flockingPrice) VALUES(:clubid, :orderid, :productid, :internalid, :name, :flocking, :defaultFlocking, :size, :price, :flockingPrice)",
                          ["clubid" => $_POST["clubid"],
                           "orderid" => $id,
                           "productid" => $item->id,
                           "internalid" => $item->internalid,
                           "name" => $item->name,
                           "flocking" => $item->flocking,
                           "defaultFlocking" => $item->defaultFlocking,
                           "size" => $item->size,
                           "price" => $item->price,
                           "flockingPrice" => $item->flockingPrice]);
    $rowsAffected += $stmt2->rowCount();
    if($stmt2->errorCode() !== "00000") {
      die(json_encode([
        "error" => $stmt2->errorCode(),
        "errorInfo" => $stmt2->errorInfo(),
        "rowsAffected" => $rowsAffected
      ]));
    }
  }
}

die(json_encode([
  "error" => $stmt->errorCode(),
  "rowsAffected" => $rowsAffected
]));

?>
