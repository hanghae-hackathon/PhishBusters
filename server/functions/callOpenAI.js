const OpenAI = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

async function getOpenAIResponse(prompt, preconfirmedResult) {
  // 확정 결과에 일부러 편향시킬 것인지 고민
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `당신은 사기 전담 팀에 속해있는 경찰관입니다. 보이스피싱 혹은 문자피싱을 판단하는데 전문가 입니다. 당신은 어떤 문장이 피싱인지 아닌지 정확한 근거를 판단할 수 있습니다.`,
      },
      {
        role: "user",
        content: `0점에 가까울수록 보이스피싱이 아니고, 10점에 가까울수록 보이스피싱에 해당합니다. 다음 대화가 보이스피싱일 점수를 알려주세요. 추가적인 정보는 없다고 가정합니다. 답변은 5문장 이하로 해주세요.
                ${prompt}
                당신의 답변은 다음과 같이 구성되면 좋겠습니다.
                보이스피싱 점수: (숫자)
                1. (이유 1)
                2. (이유 2)
                3. (이유 3)`,
      },
    ],
    model: "gpt-4o-2024-05-13",
  });

  return completion.choices;
}

module.exports = { getOpenAIResponse };
