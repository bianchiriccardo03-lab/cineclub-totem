# counterApp
Autore: [Emanuele Della Valle](http://emanueledellavalle.org/), [Matteo Valoriani](https://www.linkedin.com/in/matteovaloriani/)

Un'applicazione web minimale in nodejs, html e js che dimostra i servizi REST.

## Architettura

Si tratta di un'applicazione client-server basata sul Web.

Il server è un'applicazione node.js che espone i seguenti servizi:
- `GET /value` restituisce lo stato del contatore; il valore iniziale è 0
- `GET /inc?n=<valore>` aggiunge `valore` al contatore 
- `GET /dec?n=<valore>` sottrae `valore` dal contatore 
- `GET /` serve la pagina index.html nel folder public all'utente.

Il client è una pagina web HTML 5 che
- richiama il `GET /value` per visualizzare lo stato
- offre un campo `input` per consentire all'utente di inserire un numero
- offre due pulsanti: 
  - uno incrementa il contatore del valore presente nel campo di input, chiamando il servizio `GET /inc?n=<value>`
  - l'altro decrementa il contatore chiamando il servizio `GET /dec?n=<valore>`.
- si auto ricarica ogni secondo

## prerequisiti

1. avere installato Node.js e VSC
2. installare express con `npm install express` 

## demo
1. lanciare il server dalla cartella `counter` in cui c'è `counter.js` con il comando `node counter.js`
2. aprire [http://127.0.0.1:3000/](http://127.0.0.1:3000/) per provare la demo
3. pubblicare la vostra applicazione su internet facendo *port forward* (vedi punto 10 in [setup node.js e VSC](https://github.com/IxD-PoliMI/setup-node-js-and-VSC))
4. apri da un altro dispositivo (es. il tuo telefono) l'url del *forwarded address* 
5. osserva che puoi cambiare il valore del counter dai due dispositivi

# counterApp
Author: [Emanuele Della Valle](http://emanueledellavalle.org/), [Matteo Valoriani](https://www.linkedin.com/in/matteovaloriani/)

A minimal web application in nodejs, html and js that demonstrates REST services.

## Architecture

This is a web-based client-server application.

The server is a node.js application that exposes the following services:
- `GET /value` returns the counter status; the initial value is 0
- `GET /inc?n=<value>` adds `value` to the counter 
- `GET /dec?n=<value>` subtracts `value` from the counter 
- `GET /` serves the index.html page in the public folder to the user.

The client is an HTML 5 web page that
- calls `GET /value` to display the status
- offers an `input` field to allow the user to enter a number
- offers two buttons: 
  - one increments the counter of the value present in the input field, calling the service `GET /inc?n=<value>`
  - the other decreases the counter by calling the service `GET /dec?n=<value>`.
- it reloads itself every second

## prerequisites

1. have Node.js and VSC installed
2. install express with `npm install express` 

## demo
1. launch the server from the `counter` folder where there is `counter.js` with the command `node counter.js`
2. open [http://127.0.0.1:3000/](http://127.0.0.1:3000/) to try the demo
3. publish your application on the internet by doing a *port forward* (see point 10 in [setup node.js and VSC](https://github.com/IxD-PoliMI/setup-node-js-and-VSC))
4. open the url of the *forwarded address* from another device (e.g. your phone) 
5. note that you can change the counter value from both devices