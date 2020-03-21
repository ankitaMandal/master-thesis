import numpy as np
import matplotlib. pyplot as plt
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np



plt.show()
data = pd.read_csv('sentenceBERT-top_matches.tsv', encoding='UTF-8',sep='\t')
df = pd.DataFrame()
df = df.append(data)
thresholds = df['kein_Noten_dist']
accuracy_list=[]
precision_list=[]
recall_list=[]
f1_list=[]
fpr =[]
for threshold in thresholds:
    tp = 0
    fp = 0
    fn = 0
    tn = 0
    top_matches = df[df['kein_Noten_dist'] >= threshold]
    rest = df[df['kein_Noten_dist'] < threshold]
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
    fprate = fp /(fp+tn)
    print("Accuracy:", accuracy)
    print("Precison:", precision)
    print("Recall:", recall)
    print("F1:", f1)
    accuracy_list.append(accuracy)
    precision_list.append(precision)
    recall_list.append(recall)
    f1_list.append(f1)
    fpr.append(fprate)

p=np.asarray(precision_list, dtype = float)
r=y=np.asarray(recall_list, dtype = float)# true_positive_rate
t=np.asarray(thresholds, dtype = float)
x=np.asarray(fpr, dtype = float)# false_positive_rate



# This is the ROC curve
plt.plot(x,y)
# plt.show()

# This is the AUC
# auc = np.trapz(y,x)
plt.show()


