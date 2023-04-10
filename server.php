<?php
$_POST = json_decode(file_get_contents('php://input'), true); // если нужно поработать с json
echo var_dump($_POST);