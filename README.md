# Shelf — din spelportal

En egen spelportal där dina HTML/JS-spel samlas på ett ställe. Fungerar både
lokalt (dubbelklicka på `index.html`) och på GitHub Pages — samma filer, ingen
skillnad i kod.

## Struktur

```
game-portal/
├── index.html        ← portalens sida (behöver du sällan röra)
├── style.css          ← utseendet
├── script.js          ← logik (sök, filter, favoriter, språk, spelaren)
├── games.js           ← LISTAN över dina spel — hit lägger du nya spel
├── i18n.js            ← delad "översättare" som alla spel kan använda
└── games/
    ├── neon-runner/          index.html + i18n-data.js
    ├── memory-match/         index.html + i18n-data.js
    ├── keeper-reflex/        index.html + i18n-data.js
    └── gilded-fox/           index.html   (redan bara engelska, ingen ordlista behövs)
```

## Lägg till ett eget spel

1. Skapa en ny mapp i `games/`, t.ex. `games/mitt-spel/`
2. Lägg din spelfil där och döp den till **index.html**
   (om spelet har flera filer, lägg dem i samma mapp — se till att alla
   sökvägar i spelet är *relativa*, t.ex. `style.css` inte `/style.css`)
3. Öppna `games.js` och lägg till en post i listan:

```js
{
  id: "mitt-spel",
  title: "Mitt Spel",
  folder: "mitt-spel",
  category: "Action",
  description: "Kort beskrivning på svenska.",
  descriptionEn: "Short description in English.",
  color: "#e36b8a",
  cart: "05",
  thumb: `<svg viewBox="0 0 320 200">...din omslagsbild...</svg>`
}
```

`thumb` är rå SVG-kod som visas som omslagsbild på kortet — ingen bildfil
behövs. Enklast är att kopiera en befintlig post och byta färger/former.

## Byta språk i spelen (EN/SV)

Portalen har en SV/EN-knapp uppe till höger. Den byter inte bara texten i
portalen, utan skickar också med `?lang=en` (eller `sv`) till spelet när det
öppnas, och laddar om spelet om du byter språk medan det är igång.

För att ett spel faktiskt ska översättas behöver det en liten ordlista:

1. Skapa `games/mitt-spel/i18n-data.js` med spelets svenska fraser och deras
   engelska översättning:

```js
const GAME_I18N = [
  { sv: "Poäng", en: "Score" },
  { sv: "Spela igen", en: "Play again" }
];
```

2. Lägg till dessa två rader precis innan `</body>` i spelets `index.html`:

```html
<script src="i18n-data.js"></script>
<script src="../../i18n.js"></script>
```

Det är allt — `i18n.js` letar upp texten på sidan (även text som dyker upp
medan man spelar, t.ex. poäng eller meddelanden) och byter ut den mot
engelskan när `?lang=en` är satt. Du behöver aldrig röra spelets egen kod.

Har spelet inget `i18n-data.js` visas det bara på sitt originalspråk oavsett
vilket portalspråk som är valt — det är t.ex. läget för The Gilded Fox, som
redan är skrivet helt på engelska.

## Kör lokalt (offline)

Dubbelklicka på `index.html`. Ingen server, inget internet krävs
(förutom att typsnitten hämtas online om du har internet — annars
faller sidan tillbaka på systemets typsnitt automatiskt).

## Publicera på GitHub Pages

1. Skapa ett nytt repo på GitHub, t.ex. `game-portal`
2. Ladda upp *hela* innehållet i den här mappen till repot (behåll mappstrukturen)
3. Gå till repots **Settings → Pages**
4. Under "Build and deployment", välj **Deploy from a branch**,
   branch **main**, mapp **/ (root)** → Save
5. Efter någon minut är sidan live på
   `https://ditt-användarnamn.github.io/game-portal/`

Samma repo funkar alltså både som din lokala fil och som din live-portal —
du behöver bara pusha ändringar när du lägger till nya spel.

## Tips

- **Favoriter** och **språkval** sparas i webbläsarens `localStorage` — de är
  lokala för varje enhet/webbläsare, inte delade mellan dig och dina kompisar.
- Vill du att kompisar ska spela dina spel: publicera på GitHub Pages och
  skicka länken. Ingen inloggning behövs.
- Om ett spel behöver tangentbord/mus i fullskärm, använd
  fullskärmsknappen uppe till höger i spelaren.

