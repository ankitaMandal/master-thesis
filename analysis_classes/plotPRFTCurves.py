import numpy as np
import matplotlib. pyplot as plt
import pandas as pd
data = pd.read_csv('POSLemma-Metaphone.tsv', encoding='UTF-8',sep='\t')
df = pd.DataFrame()
df = df.append(data)
thresholds = df['dist']
accuracy_list=[]
precision_list=[]
recall_list=[]
f1_list=[]
for threshold in thresholds:
    tp = 0
    fp = 0
    fn = 0
    tn = 0
    top_matches = df[df['dist'] >= threshold]
    rest = df[df['dist'] < threshold]
    for index, row in top_matches.iterrows():  ##iterate over top matches
        if (row['gesamt'] == 1):
            tp = tp + 1
        else:
            fp = fp + 1
    for index, row in rest.iterrows():  ##iterate over rest of the answers (which were not matched)
        if (row['gesamt'] == 1):
            fn = fn + 1
        else:
            tn = tn + 1
    accuracy = (tp + tn) / (tp + tn + fp + fn)
    precision = (tp) / (tp + fp)
    recall = (tp) / (tp + fn)
    f1 = (2 * tp) / ((2 * tp) + fp + fn)
    print("Accuracy:", accuracy)
    print("Precison:", precision)
    print("Recall:", recall)
    print("F1:", f1)
    accuracy_list.append(accuracy)
    precision_list.append(precision)
    recall_list.append(recall)
    f1_list.append(f1)
def plot_prec_recall_vs_tresh(precisions, recalls, thresholds):
    plt.plot(thresholds, precisions, 'b--', label='precision')
    plt.plot(thresholds, recalls, 'g--', label = 'recall')
    plt.xlabel('Threshold')
    plt.legend(loc='upper left')
    plt.ylim([0,1])
p=np.asarray(precision_list, dtype = float)
r=np.asarray(recall_list, dtype = float)
t=np.asarray(thresholds, dtype = float)
print('Average Precision:',np.mean(p, dtype=np.float64))
plot_prec_recall_vs_tresh(p ,r , t)
plt.show()