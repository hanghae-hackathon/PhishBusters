import torch
import numpy as np
from transformers import BertModel, BertTokenizer
from torch.utils.data import DataLoader, Dataset
import argparse

test_sentence_final = "안녕하세요, 우리은행의 보안팀입니다. 최근 귀하의 계좌에서 이상 거래가 감지되어 확인 차 연락드렸습니다. 계좌를 안전하게 보호하기 위해서는 본인 인증이 필요합니다. 계좌 비밀번호와 주민등록번호를 알려주시겠습니까?"
# test_sentence_final = "안녕하세요, 삼성서비스 지원팀입니다. 저희 제품을 이용해 주셔서 감사합니다."

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
            print(prediction.item())
            
            return "보이스피싱" if prediction.item() == 1 else "일반"

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
    # result = predict(test_sentence_final)
    # print(result)
    args = get_args()
    if args.text:
        result = predict(args.text)
        print(result)
    else:
        print("No text provided for analysis.")
