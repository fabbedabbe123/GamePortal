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

## Se statistik (Google Analytics)

Portalen kan skicka besöks- och spelstatistik till Google Analytics — helt
gratis, ingen server behövs, och du ser allt i Googles egna dashboard.

### Koppla in det (gör en gång)

1. Gå till [analytics.google.com](https://analytics.google.com) och logga in
   med ditt Google-konto
2. **Admin** (kugghjulet nere till vänster) → **Create property**
3. Ge den ett namn (t.ex. "Shelf"), välj Sverige/din tidszon, klicka igenom
4. Under **Data collection**, välj **Web**, ange din GitHub Pages-URL
5. Du får ett **Measurement ID** som ser ut som `G-XXXXXXXXXX` — kopiera det
6. Öppna `analytics.js` i din portal-mapp och ersätt raden:
   ```js
   const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // <-- replace with your own
   ```
   med ditt eget ID
7. Ladda upp den ändrade `analytics.js` till ditt repo (samma sätt som du
   lagt till andra filer)

Tills du bytt ut ID:t gör filen ingenting alls — portalen funkar precis som
vanligt.

### Vad besökare ser

Första gången någon besöker sidan dyker en liten ruta upp längst ner som
frågar om det är ok att använda Analytics. Väljer de "Neka" spåras
ingenting alls för dem. Detta är ett EU/GDPR-krav, inte valfritt att hoppa
över.

### Var du hittar statistiken

- **Besökare & sessioner:** Google Analytics → **Reports → Realtime** (live
  just nu) eller **Reports → Engagement**
- **Vilka spel som spelas:** **Reports → Engagement → Events**, leta upp
  `play_game` — klicka på den för att se hur många gånger den triggats.
  Vill du se *vilket* spel specifikt: lägg till `game_title` som en
  sekundär dimension i rapporten (Google Analytics → Reports →
  Engagement → Events → klicka "+" bredvid tabellen → välj
  "Event parameter: game_title")

Statistiken dyker upp med viss fördröjning (ofta någon timme för de flesta
rapporter, men Realtime är typ direkt).

### Nollställa en topplista

Adminpanelen har en **🏆 Topplistor**-flik: välj spel i listan, klicka
**"Nollställ den här topplistan"** en gång (knappen ber om bekräftelse),
klicka igen för att faktiskt utföra det. Går inte att ångra.

Detta kräver att du **uppdaterar din Worker-kod** i Cloudflare (koden i
`worker/cloudflare-worker.js` har en ny DELETE-funktion) — klistra in den
uppdaterade filen i Cloudflares editor och **Deploy** igen, annars ger
knappen bara ett felmeddelande.

## Delad topplista, meddelanden till alla och feedback

Adminpanelen (⚙-knappen) är **dold för vanliga besökare** — den syns bara
i din egen webbläsare efter att du anslutit första gången. Innan dess,
tryck **Ctrl+Alt+C** för att öppna den och göra din
första anslutning — därefter dyker knappen upp automatiskt varje gång du
besöker sidan i just den webbläsaren. Detta stoppar inte en teknisk person
som letar i sidans kod, men gör det osynligt för vanliga nyfikna besökare.
Samma GitHub-koppling som "Lägg till spel" har nu fyra flikar:

- **+ Spel** — samma som innan
- **📢 Meddelande** — skriv ett meddelande (t.ex. "Scheduled restart 20:00")
  och det visas som en banner högst upp för alla besökare tills de stänger
  den eller du tar bort det. Sparas i `announcement.json` i repot, samma
  GitHub-koppling som spel-uppladdningen — inget extra behövs.
- **💬 Feedback** — läser in idéer/buggar som besökare skickat in via
  "Tyck till"-knappen i sidfoten. Kräver Worker + Admin-nyckel (se nedan).
- **📊 Statistik** — genväg till Google Analytics.

Topplistan (🏆-knappen på spel som har en) och Feedback-fliken kräver en
liten gratis "mellanhand" eftersom vanliga besökare inte kan skriva direkt
till ditt GitHub-repo (bara du med din token kan det) — GitHub Pages ensamt
kan inte ta emot data från alla som spelar.

### Sätt upp Cloudflare Worker (en gång, ~10 minuter)

1. Gå till [workers.cloudflare.com](https://workers.cloudflare.com), skapa
   ett gratis konto (inget kreditkort behövs)
2. **Create Worker** — ge den ett namn, t.ex. `shelf-backend`
3. Öppna koden i `worker/cloudflare-worker.js` (i den här mappen), kopiera
   allt, klistra in i Workers-editorn (skriv över exempelkoden) → **Deploy**
4. **Skapa lagringen:** Workers & Pages → **KV** → **Create namespace** →
   döp den till t.ex. `shelf-kv`
5. **Koppla ihop dem:** gå till din Worker → **Settings → Variables →
   KV Namespace Bindings → Add binding** → Variable name: `SHELF_KV`,
   KV namespace: den du just skapade → **Save and deploy**
6. **Sätt ett admin-lösenord:** samma Settings-sida → **Environment
   Variables → Add variable** → Name: `ADMIN_KEY`, Value: valfritt
   lösenord du hittar på → kryssa **Encrypt** → **Save and deploy**
7. Kopiera din Workers-URL (visas högst upp, ser ut som
   `https://shelf-backend.dittnamn.workers.dev`)
8. Öppna `leaderboard.js` i portal-mappen, ersätt:
   ```js
   const WORKER_URL = "https://REPLACE-ME.workers.dev";
   ```
   med din riktiga URL, och ladda upp filen till repot
9. I portalens adminpanel, klistra in samma lösenord du satte i steg 6 i
   fältet **Admin-nyckel** på anslutningssidan

Klart. Tills du gjort steg 7-8 gör topplistan och feedback-funktionen
ingenting alls — resten av portalen funkar exakt som innan.

### Hur leaderboarden funkar

Spel med en `scoreKey` i `games.js` (just nu: Neon Runner, Cartridge Match,
Keeper Reflex) läser sitt eget sparade highscore ur webbläsarens
`localStorage` när du stänger spelet, och skickar det till Workern om det
är nytt/bättre — tillsammans med ett smeknamn du väljs att sätta första
gången. Alla kan se topplistan genom 🏆-knappen på kortet, ingen inloggning
krävs för att titta eller för att spela.

**The Gilded Fox är medvetet inte med** — det spelet har en inbyggd
"sätt exakt saldo"-funktion för fusk/test, vilket gör poängen ojämförbara
mellan spelare.

Vill du lägga till leaderboard för ett eget spel senare: lägg till
`scoreKey` (namnet på den `localStorage`-nyckel spelet redan sparar sitt
bästa resultat under), `scoreLabel` och `scoreBetter` (`"higher"` eller
`"lower"`) i spelets post i `games.js`.

## Lägg till spel via sidan (utan att röra GitHub manuellt)

Portalen har en **"+ Lägg till spel"**-knapp uppe till höger. Första gången
kopplar du den till ditt GitHub-repo — sedan laddar du bara upp en HTML-fil,
fyller i titel/kategori/beskrivning, och portalen committar filen och
registrerar spelet i `games.js` **direkt i ditt repo**. GitHub Pages bygger
om sig automatiskt (oftast under en minut), och sen syns spelet för alla som
besöker sidan — inget manuellt uppladdande via GitHubs webbgränssnitt behövs.

Detta kräver internet (det pratar med GitHub:s API), och funkar bara på
sidan när den faktiskt ligger på GitHub Pages med ett riktigt repo — inte när
du bara öppnar filen lokalt utan att ha pushat något än.

### Skapa en GitHub-token (gör en gång)

1. Gå till **github.com → din profilbild → Settings**
2. Scrolla ner till **Developer settings** (längst ner i vänstermenyn)
3. **Personal access tokens → Fine-grained tokens → Generate new token**
4. Under **Repository access**, välj **Only select repositories** och peka ut
   ditt `game-portal`-repo (inte alla dina repon)
5. Under **Permissions → Repository permissions**, hitta **Contents** och
   sätt den till **Read and write**
6. Generera token och kopiera den — den visas bara en gång

### Använda den i portalen

1. Klicka **+ Lägg till spel**
2. Skriv in repot som `dittanvändarnamn/game-portal`
3. Klistra in token, klicka **Spara & fortsätt**
4. Fyll i titel, kategori, beskrivning, en accentfärg och välj din spelfil
   (en `.html`-fil för enkla spel, eller en `.zip` om spelet har flera
   filer — se avsnittet "Nya funktioner" nedan)
5. Klicka **Ladda upp & publicera**

**Säkerhet:** token sparas bara i din egen webbläsares `localStorage` — den
skickas aldrig någon annanstans än till `api.github.com`, och skrivs aldrig in
i någon fil som committas. Dela den ändå aldrig med någon, och använd den
bara på enheter du själv litar på. Vill du koppla bort, finns en
"Koppla från GitHub"-knapp i panelen. Dina kompisar behöver ingen token —
de bara spelar via länken som vanligt.

## Nya funktioner i den här omgången

**Spel med flera filer:** "Lägg till spel" accepterar nu även en `.zip`-fil,
inte bara en enda `.html`. Zippa ihop din spelmapp (måste ha en `index.html`
i roten av zippen, plus valfria bilder/JS/CSS-filer i samma mapp eller
undermappar) och välj den istället för en enskild HTML-fil — varje fil i
zippen laddas upp till sin egen plats under `games/<spelnamn>/`.

**Spam-skydd:** Workern har nu en enkel gräns på antal förfrågningar per
IP-adress (30 poänginlämningar / 10 idéer per 10 minuter) för att undvika
skräp från botar eller elaka besökare. **Du måste uppdatera din Worker-kod
i Cloudflare** (klistra in den nya `worker/cloudflare-worker.js` och
Deploy) för att få detta, annars fortsätter den gamla koden köra utan
skyddet.

**"NY"-märke:** Spel som lagts till de senaste 7 dagarna får automatiskt
en liten "NY"/"NEW"-etikett bredvid titeln. Kräver inget extra jobb —
sätts automatiskt när du lägger till spel via adminpanelen.

**Sortering:** En ny dropdown bredvid sökrutan låter dig och dina kompisar
sortera biblioteket på Standard, Senast tillagd, Mest spelad, eller A–Ö.
"Mest spelad" räknas via Workern (samma en som sköter topplistorna) — kräver
alltså att Worker-URL är satt i `leaderboard.js`.

**Felsida vid trasigt spel:** Om ett spel inte laddar inom några sekunder
(t.ex. om en fil glömdes bort vid uppladdning) visas ett vänligt
felmeddelande med en "Tillbaka"-knapp istället för en tom vit ruta.

**Fullständig översättning:** Alla statusmeddelanden i adminpanelen
(uppladdning, meddelanden, feedback, topplista-nollställning) växlar nu
språk tillsammans med resten av portalen.

## Lägg till ett eget spel manuellt

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

