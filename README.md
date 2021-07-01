# honeyhunterworld-api

An Api which grabs data from
https://genshin.honeyhunterworld.com/

I created a website which displays the stats from different Characters in Genshin Impact.
The aim is to use chart.js to automatically display the scaling of the attributes of the various characters.

## Installation
```bash
$ git clone https://github.com/Oskar1504/honeyhunterworld-api.git
$ npm install
$ npm run dev
```

## Usage/example

Small website using vue and bootstrap 5 hosted at http://localhost:3001/ .

If u just want to host the api delete public folder and change server.js

## routes

| Route        | Parameter       | Return           |
| ------------- |-------------|-------------|
| /api/gi/char/:id |  name of character   | json obj: Character stats and Attack talent |

## Object Structure

 /api/gi/char/:id return json obj
```json
 {
  statProgression:{
    tableMatrix:[[...],[...],...],
  },
  attackTalents:{
    attacks:[...],
    tableMatrix:[[...],[...],...],
  }
 }
 ```
 
## API call example
```javascript
async function fetchCharData() {
    const response = await fetch('<host>/api/gi/char/<character_name>');
    const data = await response.json();
    return data;
}
fetchCharData().then(data => {
        console.log(data)
    });
})
```
