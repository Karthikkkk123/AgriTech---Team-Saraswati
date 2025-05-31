import os
from groq import Groq


class NutritionChatbot:
    def __init__(self):
        # Directly using the API key in the code (Not recommended for production)
        self.client = Groq(
            api_key="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"
        )
        self.model = "llama-3-70b-8192"

    def get_ai_response(self, user_message):
        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a helpful and knowledgeable nutrition assistant. "
                            "Only respond to what the user asks. Do not ask follow-up questions. "
                            "If the user asks for a meal plan, give a detailed one based on the query."
                        ),
                    },
                    {"role": "user", "content": user_message},
                ],
                model=self.model,
                stream=False,
            )
            return chat_completion.choices[0].message.content.strip()
        except Exception as e:
            return f"⚠️ Error: {str(e)}"

    def chat(self):
        print(
            "🥗 Welcome to NutriBot — Ask me anything about diet, meal plans, or nutrition."
        )
        print("Type 'quit', 'exit', or 'bye' to end the session.\n")

        while True:
            try:
                user_input = input("You: ").strip()
                if user_input.lower() in ["quit", "exit", "bye"]:
                    print("NutriBot: Take care! Stay healthy! 🌿")
                    break

                if not user_input:
                    continue

                response = self.get_ai_response(user_input)
                print(f"\nNutriBot: {response}\n")

            except KeyboardInterrupt:
                print("\nNutriBot: Goodbye! 👋")
                break
            except Exception as e:
                print(f"\nNutriBot: Oops! Something went wrong: {str(e)}\n")


def main():
    chatbot = NutritionChatbot()
    chatbot.chat()


if __name__ == "__main__":
    main()
