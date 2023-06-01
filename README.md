# Coding the Curbs website
Een website om een smartzone te zoeken en boeken en vragen te stellen.

## Inhoudsopgave

  * [📄 Beschrijving](#-beschrijving)
  * [💻 Gebruik](#-gebruik)
  * [📌 Kenmerken](#-kenmerken)
  * [⚙️ Installatie](#%EF%B8%8F-installatie)
  * [📁 Bronnen](#-bronnen)
  * [🔒 Licentie](#-licentie)

## 📄 Beschrijving
Deze pagina is gemaakt voor de volgende userstory's:
* "Als vervoerder wil ik een overzicht van smartzones in een stad kunnen bekijken, zodat ik kan zien waar ik kan parkeren om mijn goederen te laden/lossen"
* "Als vervoerder wil ik onderweg vanuit mijn voertuig meer informatie over een smartzone kunnen bekijken, zodat ik kan zien of de zone geschikt is om mijn goederen te laden en/of lossen"
* "Als vervoerder wil een smart zone kunnen reserveren, zodat ik mijn plek kan bevestigen"
* "Als gebruiker wil ik een vraag kunnen stellen, zodat ik hulp kan krijgen"

De eerste pagina is een overzichtspagina met de verschillende smartzones, die ook hun eigen detailslide hebben. Verder is een kaart te zien met de locaties van de zones. De tweede pagina is een pagina waar een reserveerformulier staat waar je de gewenste smartzone kunt boeken en je gegevens invult.

<img src="https://github.com/CathelijneVisser/CTC-A-chatbot/assets/112859814/86b4d081-cfc4-46c2-af4a-3859484f7bc6" alt="Desktop search pagina" width=100%><br>
<img src="https://github.com/CathelijneVisser/CTC-A-chatbot/assets/112859814/4ca3eeb6-4933-4a4b-8c3c-17a0eb17b7f5" alt="Desktop book pagina" width=100%>

De website vind je [hier](https://ctc-a.adaptable.app).

## 💻 Gebruik
Deze website bestaat uit meerdere delen. Aan de linkerkant staat een overzicht van alle smartzones. Aan de rechterkant staat de kaart of het formulier om te kunnen reserveren.

Elke smartzone heeft een eigen tegel en ziet er als volgt uit:

<img src="https://github.com/CathelijneVisser/performance-matters-optimized-website/assets/112859814/3752bcb9-5816-4495-bcfe-05bd4a9a1ac9" alt="" width=25%>

Er is meer informatie beschikbaar per smartzone als je op het i-icoontje klikt:

<img src="https://github.com/CathelijneVisser/performance-matters-optimized-website/assets/112859814/6e463dc9-e114-4078-b671-38e0ed40e8e9" alt="" width=25%>

Het logo en de navigatiebar blijven in beeld staan als je scrollt:

<img src="https://github.com/CathelijneVisser/performance-matters-optimized-website/assets/112859814/5211031c-6e75-4482-912f-89708620bf10" alt="" height=400px>

De navigatiebar bevat de volgende pagina's:

<img src="https://user-images.githubusercontent.com/112859814/225850302-d20bc7fe-85ff-4ba7-8da9-976c6d91de6e.jpg" alt="" width=25%>

De kaart heeft markers die gelinkt zijn aan de zones en ziet er als volgt uit:

<img src="https://github.com/CathelijneVisser/performance-matters-optimized-website/assets/112859814/2aed387b-678a-482a-a7a8-7430a7ba5f7a" alt="" width=35%>

Het formulier om te reserveren bevat de volgende velden:

<img src="https://user-images.githubusercontent.com/112859814/230346385-455f642b-8d06-422b-b6fc-8cdcb3ae71ef.jpg" alt="" width=25%>

Er zijn drie manieren om met het formulier te beginnen:
1. Op de 'Book' knop uit de navigatie klikken. Het formulier begint dan helemaal leeg.
2. Op de 'Book now' knop van een smartzone klikken. In het formulier worden al de smartzone en de start datum ingevuld.
3. Op de 'Book later' knop van een smartzone klikken. In het formulier wordt al de smartzone ingevuld.

Op elke pagina is een chatbot te vinden om vragen te stellen:

<img src="https://github.com/CathelijneVisser/CTC-A-chatbot/assets/112859814/8b46988e-79af-44be-9234-12f813cd5862" alt="" width=300px>

## 📌 Kenmerken
Voor dit project heb we met node.js, express en ejs gewerkt. Daarnaast is er ook gebruik gemaakt van de JavaScript library Leaflet en maptiler.

HTML is ondergebracht in partials die door middel van EJS aan een grotere pagina vastzitten. 

Met behulp van CSS zijn er SVG's geanimeerd met keyframes.

In JavaScript hebben we een invalid statement voor het formulier gemaakt. Hierdoor kijkt het formulier pas als je op de submit knop hebt gedruk of alles is ingevuld. 

Met NODE hebben we de pagina's een route gegeven waardoor ze de informatie uit de API krijgen en informatie naar de API kunnen sturen.

Door EJS kunnen we JavaScript in de HTML gebruiken. Hierdoor kunnnen we in het formulier kijken naar welke datum vandaag is en ervoor zorgen dat er geen datum in het verleden geselecteerd kan worden.

Voor de kaart hebben we Leaflet gebruikt. Hiermee kunnen we makkelijk een kaart maken met markers die klikbaar zijn.

De chat is gemaakt met socket.io en chat-gpt. Hierdoor kun je een vraag stellen waar automatisch antwoord op wordt gegeven.

## ⚙️ Installatie
Om (verder) te kunnen werken aan dit project, moet je de volgende stappen volgen:

<ol>
 <li> Instaleer node versie 18.15.0
 <li> Clone deze repository
 <li> Open de terminal (CTRL + `)
 <li> Type 'npm install express ejs dotenv openai socket.io'
 <li> Je ziet nu de node_modules map
 <li> Maak een .env bestand met beide variable die in de example.env staan
 <li> Type in terminal 'npm start'
 <li> Klik link localhost
</ol>

Let op, er is gebruik gemaakt van een .env bestand.

## 📁 Bronnen
* [Leaflet](https://leafletjs.com/)
* [Maptiler](https://www.maptiler.com/)
* [socket.io](https://socket.io/get-started/chat)
* [Openai](https://www.npmjs.com/package/openai)
* [Front-End Performance Checklist](https://www.smashingmagazine.com/2021/01/front-end-performance-2021-free-pdf-checklist/)
* Informatie uit de colleges van FDND

## 🔒 Licentie
This project is licensed under the terms of the [MIT license](./LICENSE).
