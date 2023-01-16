
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

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

# Create a LogisticRegression classifier
clf = LogisticRegression()

# Train the classifier
clf.fit(X_train, y_train)

# Make predictions on the test set
y_pred = clf.predict(X_test)

# Print the accuracy score
print("Accuracy: ", accuracy_score(y_test, y_pred))

# Predict the second element
new_input = ['.net', 'elasticsearch', 'rest', 'sql-server', 'entity-framework']
new_input_vectorized = vectorizer.transform([' '.join(new_input)])
prediction = clf.predict(new_input_vectorized)
print("Prediction for the second element: ", prediction)