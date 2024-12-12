from flask import Flask, request, jsonify
import numpy as np
import joblib
import tensorflow as tf

app = Flask(__name__)

model = tf.keras.models.load_model('path_to_your_model.h5')
class_names = [
    'Walking',  
    'Jogging',  
    'Stairs',   
    'Sitting',  
    'Standing', 
    'Kicking Soccer Ball', 
    'Playing Catch w/Tennis Ball', 
    'Dribbling Basketball',  
    'Writing',  
]

class_to_category = {
    'Walking': 'Walking',
    'Jogging': 'Jogging',
    'Stairs': 'Stairs',
    'Sitting': 'Sitting',
    'Standing': 'Standing',
    'Kicking Soccer Ball': 'Playing Ball',
    'Playing Catch w/Tennis Ball': 'Playing Ball',
    'Dribbling Basketball': 'Playing Ball',
    'Writing': 'Writing',
}

scaler = joblib.load(r'D:\bangkit\capstone\Family_health_Tracker\ML_workspace\daily_activity\data_array.pkl')
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    X_input = np.array(scaler)  

    # Validasi dimensi input
    if len(X_input.shape) != 4 or X_input.shape[1:] != (1, 80, 3):
        return jsonify({'error': 'Invalid input shape. Expected (num_frames, 1, 80, 3).'}), 400

    num_frames = X_input.shape[0]
    pred_classes = []  
    for i in range(num_frames):
        single_frame = X_input[i] 
        prediction = model.predict(single_frame) 
        class_name = class_names[np.argmax(prediction)]  
        pred_classes.append(class_to_category[class_name])  

    activity_distribution = {category: pred_classes.count(category) for category in set(class_to_category.values())}
    total_frames = len(pred_classes)
    activity_distribution_percentage = {
        category: (count / total_frames * 100) if total_frames > 0 else 0
        for category, count in activity_distribution.items()
    }

    return jsonify({
        'activity_distribution_percentage': activity_distribution_percentage  # Presentase
    })

if __name__ == '__main__':
    app.run(debug=True)
