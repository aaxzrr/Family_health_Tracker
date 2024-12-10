<?php
function process_and_store_frames($user_id, $data) {
    global $pdo;
    $summedData = [];
    foreach ($data as $timestamp => $values) {
        $summedData[$timestamp] = [
            'x' => $values['accel_watch']['x'] + $values['gyro_watch']['x'] +
                   $values['accel_phone']['x'] + $values['gyro_phone']['x'],
            'y' => $values['accel_watch']['y'] + $values['gyro_watch']['y'] +
                   $values['accel_phone']['y'] + $values['gyro_phone']['y'],
            'z' => $values['accel_watch']['z'] + $values['gyro_watch']['z'] +
                   $values['accel_phone']['z'] + $values['gyro_phone']['z']
        ];
    }

    function get_frames($data) {
        $Fs = 20; 
        $frame_size = 80;
        $hop_size = 40;
        $N_FEATURES = 3;

        $frames = [];
        $timestamps = array_keys($data);
        for ($i = 0; $i < count($timestamps) - $frame_size; $i += $hop_size) {
            $frame = [];
            for ($j = $i; $j < $i + $frame_size; $j++) {
                $timestamp = $timestamps[$j];
                $frame[] = [
                    $data[$timestamp]['x'],
                    $data[$timestamp]['y'],
                    $data[$timestamp]['z']
                ];
            }
            $frames[] = [$frame];
        }

        return $frames;
    }
    $frames = get_frames($summedData);

    // Gabungkan semua frame menjadi JSON
    $jsonData = json_encode($frames);

    // Simpan ke database
    $stmt = $pdo->prepare("INSERT INTO user_activities (user_id, activities_data) VALUES (:user_id, :data)
                           ON DUPLICATE KEY UPDATE activities_data = :data");
    $stmt->execute([
        ':user_id' => $user_id,
        ':data' => $jsonData
    ]);
}
?>