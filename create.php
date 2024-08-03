<?php
include 'Conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $Name = $_POST['Name'];
    $Email = $_POST['Email'];
    $Phone = $_POST['Phone'];

    $sql = "INSERT INTO `t-crud` (`id`,`Name`, `Phone`) VALUES (NULL,'$Name', '$Phone','$Email')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

header("Location: index.html");
