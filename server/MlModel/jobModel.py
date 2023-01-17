# -*- coding: utf-8 -*-
"""
Created on Mon Jan 16 13:11:44 2023

@author: Jonathan
"""
import numpy as np
import pandas as pd
import json
import pickle 

with open('jobs.json') as json_file:
    data = json.load(json_file)

arr = []

for i, j in data.items():
 #   print(j)   
     arr.append([j['categories'],j['title']])
     
categories = {"Front-end": ["Frontend Developer","Front-end engineer", "Developer Front-end"], "Back-end":[    "Backend Developer",
    "Developer Backend","Database Administrator","Back-end engineer"],"Project Manager": ["IT Project Manager","Project Manager"],"Data":["Data Scientist"],
   ".NET developer":[".NET developer", "C# developer"], "Software Engineer":["Software Developer","Software Engineer"], "AI/ML":[    "Artificial Intelligence Engineer","Computer vision", "Data engineer",
    "Data analyst",     "AI",    "machine learning engineer",], "Cyber Security":["Cyber Security", "Penetration tester",    "Cybersecurity Analyst",
"Malware analyst",
], "Cloud":["Cloud architect", "Cloud Engineer"], "solutions architect":["solutions architect"], "Full-Stack":["Full-Stack"],     "Network Engineer"
:[    "Network Engineer",
], "DevOps": ["DevOps Engineer"], "Computer Hardware Engineer":["Computer Hardware Engineer"],     "Game Developer":[    "Game Developer",
],"Research":[ "Research Engineer", "Research"],     "Infrastructure engineer":[    "Infrastructure engineer"], "Mobile":[ "Mobile Developer"], "Web":[ "Web Developer"], "UI/UX":[ "ui/ux"], "QA":["QA engineer", "QA analyst"], 

}

newarr = []
for i in arr:
    for j,k in categories.items():
        for job in k:
            if job.lower() in i[1].lower():
                newarr.append([i[0], j])
                break
#print(newarr)

df = pd.DataFrame(newarr,columns=['skills','job category'])
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score


######################################################

# Convert the data into a pandas dataframe

# Convert the skills column into a string of comma-separated words
df['skills'] = df['skills'].apply(lambda x: ' '.join(x))

# Create a CountVectorizer object to create a bag-of-words representation of the skills column
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df['skills'])

# Create the target variable
y = df['job category']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a MultinomialNB classifier
clf = MultinomialNB()

# Train the classifier
clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = clf.predict(X_test)

# Print the accuracy score
print(accuracy_score(y_test, y_pred))
pickle.dump(vectorizer,open('vectorizer.pickle','wb'))
pickle.dump(clf,open('jobModel.pickle','wb'))

