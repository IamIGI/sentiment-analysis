# 💬 Sentiment Analyzer

### eng

Sentiment analysis frontend app built with **Svelte**, **TypeScript**, and **SCSS**. It allows users to input a short text and analyze its sentiment (positive, neutral, or negative) using the Hugging Face Inference API.

### pl

Aplikacja frontendowa do analizy sentymentu stworzona przy użyciu Svelte, TypeScript i SCSS. Umożliwia użytkownikowi wprowadzenie krótkiego tekstu i analizę jego sentymentu (pozytywny, neutralny lub negatywny) za pomocą API Hugging Face Inference.

## Linki:

- Strona: https://sentiment-analysis-alpha-seven.vercel.app
- Projekt: https://github.com/users/IamIGI/projects/18/views/1

---

## 🇵🇱 Instrukcja uruchomienia projektu (PL)

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/IamIGI/sentiment-analysis.git
   cd sentiment-analyzer
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   ```

3. Utwórz plik `.env` w katalogu głównym projektu i dodaj swój token API:

   ```
   VITE_API_HUGGINGFACE_ACCESS_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. Aby uzyskać token:

   - Zarejestruj się na stronie [Hugging Face](https://huggingface.co/join)
   - Przejdź do `Settings → Access Tokens`
   - Wygeneruj darmowy token (scope: Inference API)

5. Uruchom aplikację lokalnie:
   ```bash
   npm run dev
   ```

---

## 🇺🇸 Project Setup Instructions (EN)

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sentiment-analyzer.git
   cd sentiment-analyzer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and insert your Hugging Face token:

   ```
   VITE_API_HUGGINGFACE_ACCESS_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. To get the token:

   - Register at [Hugging Face](https://huggingface.co/join)
   - Go to `Settings → Access Tokens`
   - Generate a free token with API access

5. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🧱 Użyte technologie / Technologies Used

- **SvelteKit (v5)**
- **TypeScript**
- **SCSS**
- **Hugging Face Inference API**
- **ESLint** + **Prettier**
- **Husky** (pre-commit hooks)

---

## ⚙️ Wyzwania napotkane podczas realizacji zadania / Challenges Faced

### pl

- 🇵🇱 _Z uwagi na prostotę aplikacji, sporo czasu poświęciłem na odpowiedni layout. Finalnie zdecydowałem się na nagranie w tel oraz gradientowy styl tła z zewnętrzną ramką aby przciągnąć uwagę w centrym aplikacji. Początkowa implementacja z użyciem `::before` nie działała poprawnie przy przezroczystym tle, dlatego użyłem dodatkowego kontenera. Na modalu wymagane było ustawienie wymiarów na sztywno czego nie jestem fanem... co skomplikowało RWD._
- 🇵🇱 \_Odziwo pierwszy raz pracowałem z modalami w Svelte 5 – zauważyłem brak możliwości ich niszczenia przez `.destroy()`, jak w Svelte 4 co uważam za minus nowej wersji. Nowe podejście zarządzanie modalami oparte na callbackach przypomina mi React. Również przejście z `<slot />` na `@render children()` nie jest tak intuicyjne i szybkie jak w SVELTE.4, ale przynajmniej pozbyliśmy się `$` na rzecz `effect()`. 😊

- 🇵🇱 _Konfiguracja Husky'ego była dla mnie nowością – wcześniej takie kontrole kodu mieliśmy ustawione tylko na pipeline'ach, lub projekt posiadał już skonfigurowanego husky-ego_

- 🇵🇱 Z tego co przeczytałem w dokumentacji "Hugging Face", ich API nie posiada wsparcia dla GRAPHQL.

- 🇵🇱 Dokumentacja wymagała aby przycisk wysłania formularza posiadał tekst "Analizuj", zatem język polski, to też poszedłem za ciosem i cała aplikacja posiada interfejs w języku polskim, jednak chciałbym zaznaczyć, że użyty LLM do analizy tekstu nie radzi sobie zbyt dobrze z frazami w jęzku polskim, przez co biłem się pare razy z myslami aby zmienić jednak język interfejsu na angielski... co by sugerował wpisywanie fraz właśnie w tym języku

- 🇵🇱 Przy nawiązywaniu połączeń po stronie klienta, token autoryzaycjny jest widoczy w nagłowkach, zatem zdecydowałem się na proxy - serwer svelte-a pośredniczy w żadaniu między klientem a API, dzieki temu token nie jest widoczny na zewnątrz.

### eng

- 🇬🇧 Due to the simplicity of the application, I spent quite a bit of time crafting a compelling layout. I ultimately decided on using a recorded video and a gradient background with an outer frame to draw attention to the center of the app. My initial implementation using ::before didn't work well with a transparent background, so I opted for an extra container. For the modal, I had to hardcode the dimensions—which I'm not a fan of—which complicated responsive design.

- 🇬🇧 Surprisingly, it was my first time working with modals in Svelte 5 — I noticed the lack of `.destroy()` method that we had in Svelte 4, which I consider a downside. The new callback-based modal management feels much more like React. Also, the shift from `<slot />` to `@render children()` doesn't feel as intuitive or quick as in Svelte 4. Still, at least we’ve gotten rid of `$` in favor of `effect()`, which is a win overall. 😊

- 🇬🇧 Setting up Husky was a new experience for me — previously, code quality checks were mostly handled via CI pipelines or the project already came with Husky configured.

- 🇬🇧 From what I read in the "Hugging Face" documentation, their API does not support GRAPHQL

- 🇬🇧 The documentation required the form submission button to have the text "Analizuj", so the Polish language, so I went with the flow and the entire application has an interface in Polish, but I would like to point out that the LLM used for text analysis does not cope very well with phrases in Polish, which is why I wrestled with the idea of ​​changing the interface language to English a few times... which would suggest entering phrases in that language.

- When establishing connections on the client side, the authorization token is visible in the headers, so I decided to use a proxy - the svelte server acts as an intermediary in the request between the client and the API, thanks to which the token is not visible to the outside.
---

## 📝 License

This project is open-source and available for educational and showcase purposes.
