// Various mock data, to be used randomly in the stories.

export function getItem(items) {
  // Right now, we're just returning the last item in a list.
  // If we dont, our visual tests will always fail, as the content
  // will be different on each page load.
  // In the long run, it would be nice if we could do some kind of environment
  // check here, to see if it's the visual regression run - but that is
  // probably not possible.
  return items[(items.length - 1)];

  // Return an actual random item from the list.
  return items[Math.floor(Math.random() * items.length)];
}

export const imageUrls = [
  'https://bupl.dk/sites/default/files/styles/4_3_tablet_above_fold/public/2022-03/colourbox-colourbox-leg-179-1024x1024.jpg?h=436b82d4&itok=UcPVgg2o',
  'https://bupl.dk/sites/default/files/styles/4_3_tablet_above_fold/public/2022-03/boern_amp_unge-legegener-129.jpg?h=6660d6c8&itok=7t-gPtgu',
  'https://bupl.dk/sites/default/files/styles/4_3_tablet_above_fold/public/2022-04/annie-spratt-unsplash-%20digital-child.jpg?h=f9f5b8cc&itok=e1NQ-HN2',
];

export const imageUrl = getItem(imageUrls);

export const titles = [
  "Din legepædagogik sætter sig i børns gener",
  "Pædagogisk forskning – til pædagoger",
  "Farlige lege gør børn stærke",
  "Ferie",
  "Kontakt BUPL",
  "Pædagogers rolle i legen",
];

export const title = getItem(titles);

export const genres = [
  "Nyhed",
];

export const genre = getItem(genres);

export const dates_formatted = [
  "27. oktober 2021",
];

export const date_formatted = getItem(dates_formatted);

export const date_formatted_short = '12.09.2021';

export const subtitles = [
  "Som pædagog har du ret til orlov i forbindelse med barsel og adoption. Du får løn under en del af orloven og barselsdagpenge i resten.",
  "Intro: Som pædagog har du ret til orlov i forbindelse med barsel og adoption. Du får løn under en del af orloven og barselsdagpenge i resten.",
  "BUPL består af 12 lokale fagforeninger, et forbundskontor og a-kassen. Vi er her for at rådgive og hjælpe dig som medlem, når du har brug for det.",
  "Farlige lege gør børn stærke",
  "Pædagoger, pædagogstuderende og pædagogiske ledere – BUPL formidler pædagogisk forskning til netop jer. Du finder artikler, guides, podcasts og dialogmaterialer inden for en lang række emner."
];

export const subtitle = getItem(subtitles);

export const author_lines = [
  "Forsker Ane Bjerre Odgaard",
  "Tine Søltoft, afdelingsleder",
  "Tina",
  "Hans Johansen",
  `
    Mathilde Graulund og Julie Fristed Hansen,\r\n
    journalister
  `,
];

export const author_line = getItem(author_lines);

export const authors = [
  "Ane Bjerre Odgaard",
  "Tine Søltoft",
  "Tina",
  "Hans Johansen"
];

export const author = getItem(authors);

export const wysiwygs = [
  `
    <p>
      En pædagog, der er gravid, har ret til <strong>barselsorlov</strong> med løn, når der er 8 uger til den forventede fødsel. Efter fødslen har moren ret til 14 ugers barselsorlov med løn.
    </p>
    <p>
      Efter de første 14 uger efter fødslen har begge forældre ret til <a href="#">forældreorlov i 32 uger.</a> Disse 32 ugers forældreorlov til både mor og far dækkes økonomisk af 32 ugers barselsdagpenge, som bopælskommunen betaler.
    </p>
    <h2>Ferieoptjening - hvordan fungerer det?</h2>
    <p>
      Optjening af ferie med løn sker løbende. Når du har været ansat i en måned, har du som fuldtidsansat optjent ret til 15,42 ferietimer. Det er godt 2 feriedage med løn. Denne ferie kan du holde, når måneden er gået. Dette kaldes samtidighedsferie.
      Herudover optjener du ret til den 6. ferieuge. Den optjener du i løbet af et kalenderår fra 1. januar til 31. december. Denne ferie kan du holde fra 1. maj året efter.
      Er du ikke kommunalt ansat, men ansat på en privat skole eller institution, er der andre regler for ferie.
      Er du privatansat? Find din overenskomst her <a href=".pdf">Et PDF link</a> <a href="https://bupl.dk/pjece/test">pjece link</a>

      <h3>Du skal huske:</h3>
      <ul>
          <li>Fortæl din leder om graviditeten senest 3 mdr. før fødslen.</li>
          <li>Fortæl din leder, hvis du begynder i fertilitetsbehandling.</li>
      </ul>
      <ol>
          <li>Fortæl din leder om graviditeten senest 3 mdr. før fødslen.</li>
          <li>Fortæl din leder, hvis du begynder i fertilitetsbehandling.</li>
      </ol>
    </p>
    <div class="table-container">
      <table class="data">
        <thead>
          <tr>
            <th>Entry Header 1</th>
            <th>Entry Header 2</th>
            <th>Entry Header 3</th>
            <th>Entry Header 4</th>
          </tr>
        </thead>
        <tr>
          <td>Entry First Line 1</td>
          <td>Entry First Line 2</td>
          <td>Entry First Line 3</td>
          <td>Entry First Line 4</td>
        </tr>
        <tr>
          <td>Entry Line 1</td>
          <td>Entry Line 2</td>
          <td>Entry Line 3</td>
          <td>Entry Line 4</td>
        </tr>
        <tr>
          <td>Entry Last Line 1</td>
          <td>Entry Last Line 2</td>
          <td>Entry Last Line 3</td>
          <td>Entry Last Line 4</td>
        </tr>
      </table>
    </div>
  `,
  `
    <h2>Ikke for voldsomt</h2>
    <p>
        <a href="#">Forældrenes Landsorganisation FOLA</a> er enig i, at det, at børnene slår sig, kan være gavnligt for deres udvikling. Derfor fastslår formand Signe Nielsen også, at FOLA er positiv stemt overfor den risikofyldte leg.
        <a href="test.pdf">Et PDF link</a> <a href="https://bupl.dk/pjece/test">pjece link</a>
    </p>
    <p>
        »Den der leg, hvor man kommer lidt til skade – <strong>den skal være der.</strong> Det er en del af livet at falde og slå sig,« siger hun, men understreger, at legene ikke må blive så voldsomme, at børnene mister lysten til at lege dem igen.
    </p>
    <p>
        »Man kan altid blive bange, men det må ikke blive så voldsomt, at barnet aldrig kommer op på cyklen igen. Børn skal ikke brække arme og ben i legen, men et blåt mærke eller en hudafskrabning er ingen af os er døde af,« siger Signe Nielsen og påpeger, at rammerne omkring de risikofyldte lege altid skal være trygge.
    </p>
    <p>
        »Det skal være både udfordrende og trygt. Der skal være voksne nok til, at børnene bliver trøstet, og at det ikke bliver så vildt, at de bliver bange for overhovedet at prøve noget igen, fordi de har overskredet deres grænser for meget. Man skal have en meget god fornemmelse for, hvor børnene er henne, og hvordan de har det i de lege,« siger hun.
    </p>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Entry Header 1</th>
            <th>Entry Header 2</th>
            <th>Entry Header 3</th>
            <th>Entry Header 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Entry First Line 1</td>
            <td>Entry First Line 2</td>
            <td>Entry First Line 3</td>
            <td>Entry First Line 4</td>
          </tr>
          <tr>
            <td>Entry Line 1</td>
            <td>Entry Line 2</td>
            <td>Entry Line 3</td>
            <td>Entry Line 4</td>
          </tr>
          <tr>
            <td>Entry Last Line 1</td>
            <td>Entry Last Line 2</td>
            <td>Entry Last Line 3</td>
            <td>Entry Last Line 4</td>
          </tr>
        </tbody>
      </table>
    </div>

  `,
];

export const wysiwyg = getItem(wysiwygs);

export const wysiwygs_limited = [
  `
    <p>
      En pædagog, der er gravid, har ret til <strong>barselsorlov</strong> med løn, når der er 8 uger til den <a href="#">forventede fødsel. Efter fødslen har moren ret til 14 ugers barselsorlov</a> med løn.
    </p>
    <p>
      Efter de første 14 uger efter fødslen har begge forældre ret til <a href="#">forældreorlov i 32 uger.</a> Disse 32 ugers forældreorlov til både mor og far dækkes økonomisk af 32 <strong>ugers barselsdagpenge</strong>, som bopælskommunen betaler.
    </p>
  `
];

export const wysiwyg_limited = getItem(wysiwygs_limited);

export const infogramIframe= `<iframe src="https://e.infogram.com/a71f0ea1-16e1-41c9-a2bb-f8d7a2ce9bad?src=embed" title="Forstå din overenskomst" scrolling="no" style="border:none;" allowfullscreen="allowfullscreen" width="642" height="2045" frameborder="0"></iframe>`
