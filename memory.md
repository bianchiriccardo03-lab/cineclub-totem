# Memory progetto

## Scopo

Il progetto principale e' un totem canvas interattivo per "Il Cinema in Piazza".
L'utente vede un frame casuale tratto da una lista di film, puo' disegnare sopra
l'immagine usando una palette di colori, puo' annullare/ripristinare le azioni,
cancellare il disegno e salvare il risultato su Uploadcare.

La versione attiva dell'interfaccia e' `totem.html` nella root del progetto.
Il file `index.html` resta solo come redirect leggero verso `totem.html`, utile
per aprire il progetto dalla root su GitHub Pages.

## Struttura attuale

- `totem.html`: file principale dell'app. Contiene HTML, CSS e JavaScript.
- `index.html`: redirect automatico a `totem.html`, necessario per rendere
  comodo l'accesso dalla root del sito pubblicato.
- `.nojekyll`: file vuoto per dire a GitHub Pages di servire il progetto come
  static site semplice, senza elaborazione Jekyll.
- `films.json`: elenco dei film disponibili, con titolo, autore, anno, cartella
  dei frame e range numerico dei frame.
- `frames/`: cartella con le immagini JPG organizzate per film.
- `logo.png`: logo mostrato nel footer del totem.
- `canvas.html`: vecchio prototipo di canvas, non e' la versione principale.
- `counter.js`, `package.json`, `package-lock.json`, `README.md`: materiali
  ereditati dal progetto counter/node originale. Non sono il cuore del totem
  attuale.

La cartella `public/` e' stata rimossa per evitare doppioni: non deve esistere
un secondo file principale parallelo.

## Funzionamento di `totem.html`

La pagina costruisce un layout fisso pensato per un totem:

- area canvas superiore da `1194 x 634`;
- barra inferiore con informazioni sul film, azioni e palette colori;
- footer con logo, testo informativo e QR code.

All'avvio la pagina:

1. carica `films.json`;
2. sceglie un film casuale;
3. sceglie un frame casuale nel range `frameMin` / `frameMax`;
4. carica l'immagine da `frames/<cartella>/Sequence 00000.jpg`;
5. disegna il frame sul canvas con comportamento tipo `cover`;
6. inizializza palette, pulsanti, QR code ed eventi mouse/touch.

## Disegno

Il disegno avviene direttamente sul canvas HTML.
Il colore attivo viene preso dalla palette:

- viola: `#5B4FFF`
- giallo: `#FFB800`
- rosa: `#FD5996`
- verde: `#00C97A`
- rosso: `#FF2F27`

La linea usa:

- `lineWidth = 4`;
- estremita' arrotondate;
- un piccolo jitter casuale per dare un effetto piu' manuale.

## Undo, redo e clear

L'app salva snapshot del canvas tramite `getImageData`.
Gli snapshot vengono mantenuti in due stack:

- `undoStack`;
- `redoStack`.

Il limite corrente e' `maxUndo = 10`.

Il pulsante clear ripristina il frame corrente eliminando solo il disegno
sovrapposto.

## Upload

Il salvataggio usa Uploadcare.

La chiave pubblica e' definita in:

```js
const UPLOADCARE_PUBKEY = '5c6b9d160fe3ee2d6566';
```

Quando l'utente salva:

1. il canvas viene convertito in PNG con `canvas.toBlob`;
2. viene creato un nome file basato sul frame corrente e sulla data;
3. il file viene inviato a `https://upload.uploadcare.com/base/`;
4. la UI mostra un messaggio di stato;
5. se l'upload riesce, viene caricato un nuovo frame casuale.

## Dipendenze esterne

La pagina carica da CDN:

- Google Fonts;
- `qrcode@1.5.1` per generare il QR code.

Uploadcare viene chiamato direttamente via `fetch`, senza SDK dedicato.

## Note importanti

- I path sono pensati per eseguire l'app dalla root del progetto.
- `films.json` deve restare nella root.
- `frames/` deve restare nella root.
- Se si sposta `totem.html`, vanno aggiornati i path di `films.json` e dei frame.
- Il QR code punta ancora a `https://example.com`: va sostituito con l'URL reale.
- Il layout e' fisso, adatto a uno schermo totem specifico. Non e' ancora una UI
  responsive completa.
- Non reintrodurre una seconda copia del file principale in `public/` senza una
  ragione precisa.

## Pubblicazione su GitHub Pages

Il progetto e' pronto per essere pubblicato da GitHub Pages usando la root del
branch principale.

Impostazione consigliata nel repository GitHub:

1. andare in `Settings`;
2. aprire `Pages`;
3. in `Build and deployment`, scegliere `Deploy from a branch`;
4. selezionare branch `main` e folder `/root`;
5. salvare.

URL attesi:

- `https://<utente>.github.io/<repo>/` apre `index.html` e reindirizza a
  `totem.html`;
- `https://<utente>.github.io/<repo>/totem.html` apre direttamente il totem.
