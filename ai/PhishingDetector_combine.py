import torch
import numpy as np
from transformers import BertModel, BertTokenizer
from torch.utils.data import DataLoader, Dataset
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.base import BaseEstimator, TransformerMixin
import argparse

# TF-IDF 벡터라이저
class WeightedTfidfVectorizer(BaseEstimator, TransformerMixin):
    def __init__(self, df_weights):
        self.df_weights = df_weights
        self.tfidf = TfidfVectorizer()
        self.weight_dict = {row['type1_단어']: row['type1_확률'] for index, row in df_weights.iterrows()}

    def fit(self, X, y=None):
        self.tfidf.fit(X)
        return self

    def transform(self, X):
        X_tfidf = self.tfidf.transform(X)
        # 각 단어에 대한 가중치 적용
        for word, idx in self.tfidf.vocabulary_.items():
            if word in self.weight_dict:
                X_tfidf[:, idx] *= self.weight_dict[word]
        return X_tfidf

data = pd.read_csv('../ai/dataset.csv')
weights_df = pd.read_csv('../ai/coefficients.csv')

# TF-IDF 모델
X_train, X_test, y_train, y_test = train_test_split(data['Transcript'], data['Label'], test_size=0.2, random_state=42)
pipeline_weighted = Pipeline([('weighted_tfidf', WeightedTfidfVectorizer(weights_df)),
                              ('log_reg', LogisticRegression())])
pipeline_weighted.fit(X_train, y_train)

# BERT 모델
model = BertModel.from_pretrained('monologg/kobert')
tokenizer = BertTokenizer.from_pretrained('monologg/kobert')
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
classifier = torch.nn.Linear(model.config.hidden_size, 2)
classifier.to(device)

class CustomTextDataset(Dataset):
    def __init__(self, texts, tokenizer, max_len=64):
        self.encodings = tokenizer(texts, truncation=True, padding='max_length', max_length=max_len, return_tensors="pt")

    def __getitem__(self, idx):
        return {key: val[idx] for key, val in self.encodings.items()}

    def __len__(self):
        return len(self.encodings.input_ids)

def predict(text):
    dataset = CustomTextDataset([text], tokenizer)
    dataloader = DataLoader(dataset, batch_size=1)

    model.eval()
    classifier.eval()

    with torch.no_grad():
        for batch in dataloader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            outputs = model(input_ids, attention_mask=attention_mask)
            pooled_output = outputs.pooler_output
            logits = classifier(pooled_output)
            prediction = torch.argmax(logits, dim=1)
            return "보이스피싱" if prediction.item() == 1 else "일반"

def combined_predict(text):
    # BERT 모델
    bert_prediction = predict(text)

    # TF-IDF 모델
    tfidf_prediction = "보이스피싱" if pipeline_weighted.predict([text])[0] == 1 else "일반"

    bert_weight = 0.3
    tfidf_weight = 0.7

    if bert_prediction == "보이스피싱" or (tfidf_prediction == "보이스피싱" and bert_prediction == "보이스피싱"):
        return "보이스피싱"
    else:
        return "일반"

def get_args():
    parser = argparse.ArgumentParser(
                                    description="Hello name",
                                    # description = test_sentence_final,
                                    formatter_class = argparse.ArgumentDefaultsHelpFormatter,
                                    )
    parser.add_argument("-t", "--text", metavar="str", type=str, default=None)
    args = parser.parse_args()

    return args

if __name__ == "__main__":
    args = get_args()
    if args.text:
        result = combined_predict(args.text)
        print(result)
    else:
        print("No text provided for analysis.")
