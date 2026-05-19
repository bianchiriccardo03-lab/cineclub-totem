# Memory progetto

Ultimo aggiornamento: 15 maggio 2026.

## Scopo

Il progetto e' un totem canvas interattivo per "Il Cinema in Piazza".

L'utente vede un frame casuale tratto da una lista di film, puo' disegnare sopra
l'immagine usando una palette di colori, puo' annullare/ripristinare le azioni,
cancellare il disegno e salvare il risultato su Uploadcare.

La pagina principale dell'esperienza e' `totem.html`.
Il file `index.html` resta nella root solo come redirect verso `totem.html`,
cosi' GitHub Pages puo' aprire correttamente il sito dalla root.

## Repository e pubblicazione

Repository GitHub:

```text
https://github.com/bianchiriccardo03-lab/cineclub-totem.git
```

Branch di pubblicazione:

```text
main
```

GitHub Pages pubblica dalla root del branch `main`.

URL pubblici:

```text
https://bianchiriccardo03-lab.github.io/cineclub-totem/
https://bianchiriccardo03-lab.github.io/cineclub-totem/totem.html
```

Ultimo commit pubblicato verificato:

```text
9980e26 versione con upload funzionante
```

Il workflow GitHub Pages `pages build and deployment` e' stato verificato con
esito `success` sul commit `9980e2601d8593dbc1dc5dd5dd2c29d2c4b6157d`.

GitHub Pages puo' mantenere cache CDN fino a circa 10 minuti. Se si vede una
versione vecchia, usare refresh forzato o aggiungere un parametro cache-busting:

```text
https://bianchiriccardo03-lab.github.io/cineclub-totem/totem.html?v=9980e260
```

## Struttura attuale

- `totem.html`: file principale dell'app. Contiene HTML, CSS e JavaScript.
- `index.html`: redirect automatico a `totem.html`.
- `.nojekyll`: file vuoto per fare servire il sito da GitHub Pages senza Jekyll.
- `memory.md`: memoria di progetto, struttura, funzionamento e note operative.
- `films.json`: elenco dei film, con titolo, autore, anno, cartella dei frame e
  range numerico dei frame.
- `frames/`: immagini JPG organizzate per film.
- `logo.png`: logo mostrato nel footer.
- `canvas.html`: vecchio prototipo di canvas, non e' la versione principale.
- `counter.js`, `package.json`, `package-lock.json`, `README.md`: materiali
  ereditati dal progetto counter/node originale; non sono il cuore del totem.

La cartella `public/` e' stata rimossa dal progetto. Se l'IDE mostra ancora
`public/index.html` come tab aperto, e' un riferimento vecchio: non va usato e
non va ricreato.

## Funzionamento di `totem.html`

La pagina costruisce un layout fisso pensato per un totem:

- area canvas superiore da `1194 x 634`;
- barra inferiore con informazioni sul film, pulsanti azione e palette colori;
- footer con logo, testo informativo e QR code.

All'avvio la pagina:

1. carica `films.json`;
2. sceglie un film casuale;
3. sceglie un frame casuale nel range `frameMin` / `frameMax`;
4. carica l'immagine da `frames/<cartella>/Sequence 00000.jpg`;
5. disegna il frame sul canvas con comportamento tipo `cover`;
6. inizializza palette, pulsanti, QR code ed eventi mouse/touch.

I path sono relativi alla root del sito. Per questo `totem.html`, `films.json`,
`frames/` e `logo.png` devono restare nella root.

## Dati film

`films.json` contiene una lista di oggetti con questa forma:

```json
{
  "cartella": "frames/8_mezzo",
  "titolo": "8½",
  "autore": "Federico Fellini",
  "anno": 1963,
  "frameMin": 1800,
  "frameMax": 1862
}
```

Il codice costruisce il path del frame cosi':

```js
`${film.cartella}/Sequence ${String(frameNumber).padStart(5, '0')}.jpg`
```

I range dichiarati sono stati verificati: tutti i 863 frame attesi sono presenti.

## Disegno

Il disegno avviene direttamente sul canvas HTML.

Palette colori corrente:

- viola: `#5B4FFF`
- giallo: `#FFB800`
- rosa: `#FD5996`
- verde: `#00C97A`
- rosso: `#FF2F27`

Impostazioni principali del tratto:

- `lineWidth = 4`;
- `lineJoin = 'round'`;
- `lineCap = 'round'`;
- piccolo jitter casuale per un effetto piu' manuale.

Gli eventi supportano mouse e touch.

## Undo, redo e clear

L'app salva snapshot del canvas tramite `getImageData`.

Stack usati:

- `undoStack`;
- `redoStack`.

Limite corrente:

```js
const maxUndo = 10;
```

Il pulsante clear cancella il disegno sovrapposto e ridisegna il frame corrente.

## Upload

Il salvataggio usa Uploadcare tramite `fetch`, senza SDK dedicato.

Chiave pubblica:

```js
const UPLOADCARE_PUBKEY = '5c6b9d160fe3ee2d6566';
```

Endpoint:

```text
https://upload.uploadcare.com/base/
```

Flusso upload:

1. il canvas viene convertito in PNG con `canvas.toBlob`;
2. viene creato un nome file basato sul frame corrente e sulla data;
3. il file viene inviato a Uploadcare;
4. la UI mostra stato, successo o errore;
5. se l'upload riesce, viene caricato un nuovo frame casuale.

Nota: la struttura locale e GitHub Pages sono state verificate, ma l'upload reale
su Uploadcare va provato manualmente quando serve validare la chiave e il
salvataggio effettivo.

## Dipendenze esterne

La pagina carica da CDN:

- Google Fonts;
- `qrcode@1.5.1` per generare il QR code.

Il QR code punta ancora a:

```text
https://example.com
```

Va sostituito con l'URL reale quando disponibile.

## Test locale

Per testare in locale dalla root del progetto:

```bash
python3 -m http.server 8080
```

URL locale:

```text
http://localhost:8080/
http://localhost:8080/totem.html
```

Verifiche gia' fatte:

- `index.html`: `200 OK`;
- `totem.html`: `200 OK`;
- `films.json`: `200 OK`;
- `logo.png`: `200 OK`;
- frame di esempio `frames/8_mezzo/Sequence 01800.jpg`: `200 OK`;
- unico file app principale: `totem.html`.

## Pubblicazione

Per pubblicare modifiche gia' committate:

```bash
git push origin main
```

Per controllare lo stato:

```bash
git status --short --branch
```

Per controllare gli ultimi commit:

```bash
git log --oneline --decorate --max-count=5
```

Impostazioni GitHub Pages consigliate:

1. repository GitHub;
2. `Settings`;
3. `Pages`;
4. `Build and deployment`;
5. `Deploy from a branch`;
6. branch `main`;
7. folder `/root`.

## Note importanti

- Non reintrodurre una seconda copia del file principale in `public/`.
- Non spostare `totem.html`, `films.json`, `frames/` o `logo.png` senza
  aggiornare i path.
- Il layout e' fisso, adatto a uno schermo totem specifico. Non e' ancora una UI
  responsive completa.
- `index.html` non contiene l'app: serve solo per redirect.
- `totem.html` e' la fonte principale da modificare.
- Prima di pubblicare, testare almeno il caricamento di `totem.html`,
  `films.json` e un frame.
