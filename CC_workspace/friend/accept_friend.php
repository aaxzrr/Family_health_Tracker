<?php
session_start();
include "../db/connection.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $request_id = $_POST['request_id'];

    // Ambil data sender dan receiver dari friend_requests
    $sql = "SELECT sender_id, receiver_id FROM friend_requests WHERE id = ? AND receiver_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $request_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $request = $result->fetch_assoc();
        $sender_id = $request['sender_id'];
        $receiver_id = $request['receiver_id'];

        // Tambahkan ke tabel friends
        $conn->begin_transaction();
        try {
            // Update status menjadi accepted
            $update_sql = "UPDATE friend_requests SET status = 'accepted' WHERE id = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("i", $request_id);
            $update_stmt->execute();

            // Tambahkan data ke tabel friends
            $insert_sql = "INSERT INTO friends (user_id, friend_id) VALUES (?, ?), (?, ?)";
            $insert_stmt = $conn->prepare($insert_sql);
            $insert_stmt->bind_param("iiii", $sender_id, $receiver_id, $receiver_id, $sender_id);
            $insert_stmt->execute();

            $conn->commit();
            echo "Friend request accepted!";
        } catch (Exception $e) {
            $conn->rollback();
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Friend request not found.";
    }
}
?>
