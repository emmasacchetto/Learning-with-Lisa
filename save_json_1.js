const fs = require('fs');
const json1 = `{
  "DIALOGUES": [
    {
      "id": "u8x_weather_week_plan",
      "category": "Unit 8 Fun Time - Choosing a Day",
      "vars": [],
      "lines": [
        {
          "speaker": "A",
          "eng": "I want to go sailing this week.",
          "spa": "Quiero ir a navegar esta semana.",
          "emoji": "⛵"
        },
        {
          "speaker": "B",
          "eng": "Check the weather chart first.",
          "spa": "Primero revisa la tabla del tiempo.",
          "emoji": "🌦️"
        },
        {
          "speaker": "A",
          "eng": "Wednesday is sunny and windy.",
          "spa": "El miércoles está soleado y ventoso.",
          "emoji": "💨"
        },
        {
          "speaker": "B",
          "eng": "That sounds good for sailing.",
          "spa": "Eso suena bien para navegar.",
          "emoji": "✅"
        },
        {
          "speaker": "A",
          "eng": "What can we do on the rainy day?",
          "spa": "¿Qué podemos hacer el día lluvioso?",
          "emoji": "🌧️"
        },
        {
          "speaker": "B",
          "eng": "We can visit a museum.",
          "spa": "Podemos visitar un museo.",
          "emoji": "🏛️"
        }
      ]
    },
    {
      "id": "u8x_sdg_planet_words",
      "category": "Unit 8 SDG - Protect Trees",
      "vars": [],
      "lines": [
        {
          "speaker": "A",
          "eng": "What happens when land is very dry?",
          "spa": "¿Qué pasa cuando la tierra está muy seca?",
          "emoji": "🏜️"
        },
        {
          "speaker": "B",
          "eng": "It can become a desert.",
          "spa": "Puede convertirse en un desierto.",
          "emoji": "☀️"
        },
        {
          "speaker": "A",
          "eng": "What are Everest and K2?",
          "spa": "¿Qué son el Everest y el K2?",
          "emoji": "🏔️"
        },
        {
          "speaker": "B",
          "eng": "They're mountains.",
          "spa": "Son montañas.",
          "emoji": "⛰️"
        },
        {
          "speaker": "A",
          "eng": "What takes water to the oceans?",
          "spa": "¿Qué lleva agua a los océanos?",
          "emoji": "🌊"
        },
        {
          "speaker": "B",
          "eng": "Rivers do.",
          "spa": "Los ríos.",
          "emoji": "🏞️"
        }
      ]
    }
  ]
}`;
fs.writeFileSync('json_batch_1_dialogues.json', json1);
