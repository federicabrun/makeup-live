console.log("Skin Agent visual question v3 loaded");

const skinChat = document.getElementById("skinChat");
const skinOptions = document.getElementById("skinOptions");
const skinResult = document.getElementById("skinResult");
const restartSkinQuiz = document.getElementById("restartSkinQuiz");

const answers = [];

const questions = [
  {
    id: "after_wash",
    text: "After washing your face and waiting 30 minutes without products, how does your skin feel?",
    options: [
      { label: "Tight or uncomfortable", value: "dry" },
      { label: "Shiny or greasy", value: "oily" },
      { label: "Oily in some areas, dry in others", value: "mixed" },
      { label: "Comfortable and balanced", value: "normal" }
    ]
  },
  {
    id: "visual_skin",
    text: "Which image looks closest to your skin?",
    imageQuestion: true,
    options: [
      {
        label: "Dry skin",
        value: "dry",
        image: "../assets/img/skin-types/dry-skin.jpg"
      },
      {
        label: "Oily skin",
        value: "oily",
        image: "../assets/img/skin-types/oily-skin.jpg.webp"
      },
      {
        label: "Mixed skin",
        value: "mixed",
        image: "../assets/img/skin-types/mixed-skin.jpg"
      },
      {
        label: "Normal skin",
        value: "normal",
        image: "../assets/img/skin-types/normal-skin.jpg.webp"
      }
    ]
  },
  {
    id: "midday",
    text: "How does your skin usually look around midday?",
    options: [
      { label: "Mostly matte or flaky", value: "dry" },
      { label: "Very shiny all over", value: "oily" },
      { label: "Shiny on the T-zone only", value: "mixed" },
      { label: "Still balanced", value: "normal" }
    ]
  },
  {
    id: "pores",
    text: "How would you describe your pores?",
    options: [
      { label: "Small or barely visible", value: "dry" },
      { label: "Large and visible in many areas", value: "oily" },
      { label: "Visible mainly on nose and forehead", value: "mixed" },
      { label: "Average and even", value: "normal" }
    ]
  },
  {
    id: "makeup",
    text: "What usually happens when you wear foundation?",
    options: [
      { label: "It clings to dry patches", value: "dry" },
      { label: "It separates or gets oily quickly", value: "oily" },
      { label: "It gets oily in the T-zone but dry elsewhere", value: "mixed" },
      { label: "It stays quite even", value: "normal" }
    ]
  }
];

let currentQuestionIndex = 0;

function addMessage(text, sender = "agent") {
  const message = document.createElement("div");
  message.className = `chat-bubble ${sender}`;
  message.textContent = text;
  skinChat.appendChild(message);
  skinChat.scrollTop = skinChat.scrollHeight;
}

function showQuestion() {
  skinOptions.innerHTML = "";

  const question = questions[currentQuestionIndex];

  addMessage(question.text, "agent");

  if (question.imageQuestion) {
    skinOptions.classList.add("image-options");
  } else {
    skinOptions.classList.remove("image-options");
  }

  question.options.forEach(option => {
    const button = document.createElement("button");

    if (question.imageQuestion) {
      button.className = "skin-image-option";
      button.innerHTML = `
        <img src="${option.image}" alt="${option.label}" />
        <span>${option.label}</span>
      `;
    } else {
      button.className = "btn secondary skin-option-btn";
      button.textContent = option.label;
    }

    button.addEventListener("click", () => {
      addMessage(option.label, "user");
      answers.push(option.value);

      currentQuestionIndex += 1;

      if (currentQuestionIndex < questions.length) {
        setTimeout(showQuestion, 400);
      } else {
        setTimeout(showResult, 400);
      }
    });

    skinOptions.appendChild(button);
  });
}

function calculateSkinType() {
  const scores = {
    dry: 0,
    oily: 0,
    mixed: 0,
    normal: 0
  };

  answers.forEach(answer => {
    scores[answer] += 1;
  });

  return Object.keys(scores).reduce((top, current) => {
    return scores[current] > scores[top] ? current : top;
  }, "normal");
}

function getResultText(type) {
  const resultMap = {
    dry: {
      label: "Dry skin",
      description:
        "Your answers suggest that your skin may need more hydration and gentle, creamy products. Look for hydrating primers, dewy foundations and avoid very matte formulas."
    },
    oily: {
      label: "Oily skin",
      description:
        "Your answers suggest that your skin produces more oil during the day. You may prefer oil-control primers, long-wear foundations and setting powders."
    },
    mixed: {
      label: "Mixed skin",
      description:
        "Your answers suggest combination skin: oily in some areas and dry or normal in others. You may need different products for different zones of your face."
    },
    normal: {
      label: "Normal skin",
      description:
        "Your answers suggest balanced skin. You can usually use a wide range of products, depending on the finish you prefer."
    }
  };

  return resultMap[type];
}

function showResult() {
  skinOptions.innerHTML = "";
  skinOptions.classList.remove("image-options");

  const skinType = calculateSkinType();
  const result = getResultText(skinType);

  localStorage.setItem("suggested_skin_type", skinType);

  addMessage(`Your likely skin type is: ${result.label}.`, "agent");

  skinResult.style.display = "block";
  skinResult.innerHTML = `
    <h2>${result.label}</h2>
    <p>${result.description}</p>
    <p class="muted">
      This is a suggestion based on your answers. We saved it so you can use it when creating your account.
    </p>
  `;
}

function restartQuiz() {
  answers.length = 0;
  currentQuestionIndex = 0;
  skinChat.innerHTML = "";
  skinOptions.innerHTML = "";
  skinOptions.classList.remove("image-options");
  skinResult.style.display = "none";
  skinResult.innerHTML = "";

  addMessage(
    "Hi! I am your Skin Type Assistant. Let’s find your skin type before you create an account.",
    "agent"
  );

  showQuestion();
}

restartSkinQuiz.addEventListener("click", restartQuiz);

restartQuiz();