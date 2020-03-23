import torch
print(torch.__version__)
map_location=torch.device('cpu')
from sentence_transformers import SentenceTransformer
import scipy.spatial
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import re
import seaborn as sns
embedder = SentenceTransformer('distiluse-base-multilingual-cased')
def embed(input):
  return embedder.encode(input)


def plot_similarity(labels, features, rotation):
  corr = np.inner(features, features)
  sns.set(font_scale=0.6)
  g = sns.heatmap(
      corr,
      xticklabels=labels,
      yticklabels=labels,
      vmin=0,
      vmax=1,
      cmap="YlGnBu")
  g.set_xticklabels(labels, rotation=rotation)
  g.set_title("Semantic Textual Similarity")

def run_and_plot(messages_):
  message_embeddings_ = embed(messages_)
  plot_similarity(messages_, message_embeddings_, 90)
messages = [
    # Notensystem
    "keine Noten nur Hinweise",
    "keine Noten zu geben",
    "Abschaffung der Noten",

    # Weather
    "reagieren nur auf Gesichter",
    "die Zellen werden besonders aktiv nur bei der Erkennung eines Gesichtes",
    "es lokalisiert in Temporallappen im Gehrin, es wird aktiv",

    # Food and health
    "Raum 5",
    "Raum5",
    "Raum fünf",

    # Asking about age
    "USB Stick",
    "Speicherstick",
]

run_and_plot(messages)
plt.show()