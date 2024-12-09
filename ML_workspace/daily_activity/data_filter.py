import pandas as pd 
import numpy as np 
import tensorflow as tf 


def get_frames(df, frame_size, hop_size):
    encoder = OneHotEncoder(sparse_output=False)
    N_FEATURES = 3
    frames = []
    labels = []
    for i in range(0,len(df )- frame_size, hop_size):
        x = df['x'].values[i: i+frame_size]
        y = df['y'].values[i: i+frame_size]
        z = df['z'].values[i: i+frame_size]
        
        label = stats.mode(df['label'][i: i+frame_size])[0]
        frames.append([x,y,z])
        labels.append(label)
        
    frames = np.asarray(frames).reshape(-1, frame_size, N_FEATURES)
    frames = np.expand_dims(frames,axis=1)
    labels = np.asarray(labels).reshape(-1,1)
    labels = encoder.fit_transform(labels)
    
    return frames, labels
