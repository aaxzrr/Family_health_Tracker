<?php
session_start();
include "../db/connection.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $search_username = $_POST['search_username'];

    $sql = "SELECT * FROM users WHERE username = ? AND id != ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $search_username, $_SESSION['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($user = $result->fetch_assoc()) {
            echo "User found: " . $user['username'];
            echo '<form action="add_friend.php" method="POST">
                    <input type="hidden" name="receiver_id" value="' . $user['id'] . '">
                    <button type="submit">Send Friend Request</button>
                  </form>';
        }
    } else {
        echo "User not found!";
    }
}
?>
<form method="POST">
    <input type="text" name="search_username" placeholder="Search for a user" required>
    <button type="submit">Search</button>
</form>
