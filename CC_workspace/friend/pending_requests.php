<?php
session_start();
include "../db/connection.php";

$user_id = $_SESSION['user_id'];

$sql = "SELECT fr.id AS request_id, u.username AS sender_username 
        FROM friend_requests fr 
        JOIN users u ON fr.sender_id = u.id 
        WHERE fr.receiver_id = ? AND fr.status = 'pending'";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($request = $result->fetch_assoc()) {
        echo "Friend request from: " . $request['sender_username'];
        echo '<form action="accept_friend.php" method="POST">
                <input type="hidden" name="request_id" value="' . $request['request_id'] . '">
                <button type="submit">Accept</button>
              </form>';
    }
} else {
    echo "No pending requests!";
}
?>
