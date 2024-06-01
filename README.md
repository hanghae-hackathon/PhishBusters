# PhishBusters

### Our team, PhishBusters, specializes in stopping phishing attacks.

---

![Phishing Call](images/hanghae_call.avif)

## Team Members

- [changmi-kim](https://github.com/changmi-kim)
- [Goohyun3436](https://github.com/Goohyun3436)
- [rladydqls99](https://github.com/rladydqls99)
- [ddevkim](https://github.com/ddevkim)

## Mission

Our mission is to leverage AI technology to eliminate phishing phone calls, creating a safer world free from the economic distress caused by phone scams. We strive to build a cleaner and better society by developing innovative solutions to combat these fraudulent activities.

## Project Structure

### Front-End (FE)

The front-end part of the project is responsible for the user interface and user experience. It includes:

**UI Design**: Development of visually simple and user-friendly design.

- **User Experience**: Experience design aimed at providing an environment where users can easily interact.
- **Voice Recording**: Utilizing the Web Audio API to record user's voice and transmit it to the server.
- **Mobile Compatibility**: Development and testing considering compatibility on mobile platforms.

1. **Navigate to the Client Folder**

   ```bash
   cd client
   ```

2. **Install Node.js**:
   - Install Node.js and dependencies:
   ```bash
   brew install node
   ```
3. **Install yarn**
   ```bash
   brew install yarn --ignore-dependencies
   ```
4. **Install dependencies**:
   ```bash
   yarn install
   ```
5. **Start Client Server**:
   ```bash
   yarn dev
   ```
6. **View In The Browser**:
   ```bash
   localhost:5173
   ```

### Back-End (BE)

The back-end part of the project handles the core functionalities and data processing. It includes:

- **AI Algorithms**: Implementation of deep learning models to detect and block phishing calls.
- **API Services**: Robust APIs to support front-end functionalities and third-party integrations.
- **Speech to Text**: Utilizing Google Cloud API to convert voice files into text.
- **Predict Phishing Calls**: Using trained models on phishing call datasets to predict and identify scam calls.

1. **Navigate to the Server Folder**

   ```bash
   cd server
   ```

2. **Install Node.js**:
   - Install Node.js and dependencies:
   ```bash
   brew install node
   npm ci
   ```
3. **Install Python 3.12 and Pipenv**
   - Install Python 3.12
   ```bash
   brew install python@3.12
   ```
   - Install Pipenv and dependencies:
   ```bash
   pip3 install pipenv
   pipenv install
   ```
4. **Run Python Environment**:
   ```bash
   pipenv shell
   ```
5. **Start Server**:
   ```bash
   npm run server:dev
   ```

---

### AI
**Dataset**
- "Voice Phishing": Financial Supervisory Service Voice Phishing Dataset
- "General": AI Hub Voice Dataset, AI Hub Ethics Verification Data

**TF-IDF Model Vectorizer(TF-IDF Based Logistic Regression Model)**
- Purpose: To emphasize the importance of specific words related to voice phishing in the text data.
Operation: After TF-IDF transformation, multiply each w	ord vector by the weights defined in weight_dict to improve classification accuracy.
- Pipeline Composition:
- Vectorizer: Use WeightedTfidfVectorizer to extract features from the text data.
- Classifier: Use LogisticRegression to classify the text as voice phishing or not.

**SKT Brain's KoBERT Model**
- KoBERT: A Transformer-based model that understands the meaning of words by considering the bidirectional context of the given text.

**Combined Approach with the Two Models**
- Combined Predict: Combine the predictions of the two models, taking into account their respective weights.
- Advantages:
- TF-IDF Model: Uses a statistical approach to evaluate the importance of keywords within the text, but may not capture the contextual relationships or hidden meanings of the words.
- KoBERT: Understands the meaning of language by considering the entire context, providing a strong advantage for data where context is crucial, such as voice calls.
- Weight Settings: Set the weight of the BERT model to 0.7 and the weight of the TF-IDF model to 0.3.

**Retrospective**
- Challenges: While aiming for a complementary development as described above, the performance was found to be inferior compared to the GPT model, indicating a need for further model training and additional research.

---
This project is a result of a hackathon supported by Hanghae99.

![Hanghae99 Logo](images/hh_small.jpeg)