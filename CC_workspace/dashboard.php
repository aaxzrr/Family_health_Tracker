<?php
session_start();
include "db/connection.php";

// Periksa apakah pengguna sudah login
if (!isset($_SESSION['user_id'])) {
    header("Location: auth/login.php");
    exit;
}

$user_id = $_SESSION['user_id'];

// Query untuk mendapatkan daftar teman
$sql = "
    SELECT u.id, u.username 
    FROM friends f
    JOIN users u ON (f.friend_id = u.id OR f.user_id = u.id)
    WHERE (f.user_id = ? OR f.friend_id = ?) AND u.id != ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iii", $user_id, $user_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Menyimpan hasil dalam array
$friends = [];
while ($row = $result->fetch_assoc()) {
    $friends[] = $row;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h1>Welcome to your Dashboard</h1>
    <p>Hi, user ID: <?= $user_id ?>!</p>

    <h2>Your Friends</h2>
    <?php if (count($friends) > 0): ?>
        <ul>
            <?php foreach ($friends as $friend): ?>
                <li><?= htmlspecialchars($friend['username']) ?> (ID: <?= $friend['id'] ?>)</li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>You have no friends yet. Start adding some!</p>
    <?php endif; ?>

    <a href="friend/search_user.php">Search for Friends</a><br>
    <a href="friend/pending_requests.php">View Pending Friend Requests</a><br>
    <a href="auth/logout.php">Logout</a>
</body>
</html>
