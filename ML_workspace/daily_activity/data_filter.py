import pandas as pd 
import numpy as np 
import tensorflow as tf 


def get_frames(df):
    frame_size = Fs*4 
    hop_size = Fs*2
    encoder = OneHotEncoder(sparse_output=False)
    N_FEATURES = 3
    frames = []
    for i in range(0,len(df )- frame_size, hop_size):
        x = df['x'].values[i: i+frame_size]
        y = df['y'].values[i: i+frame_size]
        z = df['z'].values[i: i+frame_size]
        frames.append([x,y,z])
        
    frames = np.asarray(frames).reshape(-1, frame_size, N_FEATURES)
    frames = np.expand_dims(frames,axis=1)

    
    return frames
