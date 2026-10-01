/* Content for the Puzzle Round (words.js). Everything is hand-written; the daily puzzle is picked from these lists by the date.
   Five:  common five-letter words (A-Z only).
   Four:  16 words that fall into 4 groups; level 0 = easiest (yellow) … 3 = trickiest (purple).
   Quiz:  general knowledge, 4 answers, `a` is the index of the right one, `f` a short fun fact. */
const WORDS_DATA = {
  de: {
    five: ["APFEL", "BIRNE", "BLUME", "BRIEF", "BRAUN", "BAUCH", "DACHS", "DAUER", "ENTEN", "FEUER", "FISCH", "FLUSS", "FRAGE", "GABEL", "GEIGE", "HAFEN", "HONIG", "HUMOR",
      "INSEL", "KATZE", "KERZE", "KLEID", "KRANK", "LAMPE", "LEBEN", "LICHT", "LINIE", "MAUER", "MILCH", "MUSIK", "NACHT", "NEBEL", "OLIVE", "PIZZA", "PLATZ", "RADIO", "REGEN",
      "RIESE", "ROBBE", "ROSEN", "SALAT", "SCHAF", "SCHUH", "SONNE", "SPIEL", "STERN", "STEIN", "TASSE", "TIGER", "TRAUM", "VOGEL", "WAAGE", "WELLE", "WIESE", "WOLKE", "WURST",
      "ZEBRA", "ZIEGE", "ZWERG"],
    four: [
      { groups: [
        { n: "Flüsse in Österreich", w: ["DONAU", "INN", "MUR", "DRAU"] }, { n: "Wiener ___", w: ["WALZER", "SCHNITZEL", "WÜRSTEL", "PRATER"] },
        { n: "Bundesländer", w: ["TIROL", "KÄRNTEN", "SALZBURG", "BURGENLAND"] }, { n: "Komponisten", w: ["MOZART", "HAYDN", "SCHUBERT", "STRAUSS"] }] },
      { groups: [
        { n: "Gewürze", w: ["PFEFFER", "ZIMT", "KÜMMEL", "PAPRIKA"] }, { n: "Beilagen", w: ["NUDEL", "SPÄTZLE", "KNÖDEL", "GNOCCHI"] },
        { n: "Besteck", w: ["GABEL", "LÖFFEL", "MESSER", "STÄBCHEN"] }, { n: "Kochen", w: ["RÜHREN", "KNETEN", "BRATEN", "KOCHEN"] }] },
      { groups: [
        { n: "Rot", w: ["ROSE", "TOMATE", "ERDBEERE", "FEUERWEHR"] }, { n: "Gelb", w: ["BANANE", "ZITRONE", "SONNE", "SENF"] },
        { n: "Grün", w: ["GRAS", "FROSCH", "SALAT", "MINZE"] }, { n: "Blau", w: ["HIMMEL", "MEER", "JEANS", "BLAUBEERE"] }] },
      { groups: [
        { n: "___BALL", w: ["FUSS", "VOLLEY", "BASKET", "HAND"] }, { n: "___SCHUH", w: ["HAUS", "SCHNEE", "TURN", "LAUF"] },
        { n: "___KARTE", w: ["LAND", "SPEISE", "POST", "GRUSS"] }, { n: "___UHR", w: ["SAND", "SONNEN", "KUCKUCKS", "TASCHEN"] }] },
      { groups: [
        { n: "Himmelskörper", w: ["MOND", "SONNE", "KOMET", "PLANET"] }, { n: "Wetter", w: ["REGEN", "NEBEL", "HAGEL", "BLITZ"] },
        { n: "Jahreszeiten", w: ["FRÜHLING", "SOMMER", "HERBST", "WINTER"] }, { n: "Tageszeiten", w: ["MORGEN", "MITTAG", "ABEND", "NACHT"] }] },
      { groups: [
        { n: "Programmiersprachen", w: ["JAVA", "RUBY", "SWIFT", "RUST"] }, { n: "Schlangen", w: ["PYTHON", "KOBRA", "VIPER", "NATTER"] },
        { n: "Browser", w: ["CHROME", "FIREFOX", "SAFARI", "EDGE"] }, { n: "Spielkonsolen", w: ["WII", "XBOX", "SWITCH", "GAMEBOY"] }] },
      { groups: [
        { n: "Körperteile", w: ["KNIE", "ELLBOGEN", "DAUMEN", "FERSE"] }, { n: "Teile eines Schuhs", w: ["SOHLE", "ABSATZ", "ZUNGE", "SCHNALLE"] },
        { n: "Teile eines Hauses", w: ["FENSTER", "TREPPE", "DACH", "KELLER"] }, { n: "Teile eines Buches", w: ["SEITE", "KAPITEL", "COVER", "REGISTER"] }] },
      { groups: [
        { n: "Brettspiele", w: ["SCHACH", "MÜHLE", "RISIKO", "DAME"] }, { n: "Schachfiguren", w: ["TURM", "LÄUFER", "SPRINGER", "BAUER"] },
        { n: "Kartenspiele", w: ["SKAT", "POKER", "RUMMY", "BRIDGE"] }, { n: "Glücksspiele", w: ["LOTTO", "BINGO", "ROULETTE", "KENO"] }] }
    ],
    quiz: [
      { q: "Wie heißt die Hauptstadt von Australien?", o: ["Sydney", "Canberra", "Melbourne", "Perth"], a: 1, f: "Canberra wurde als Kompromiss zwischen Sydney und Melbourne gegründet." },
      { q: "Wie viele Planeten hat unser Sonnensystem?", o: ["7", "8", "9", "10"], a: 1, f: "Pluto gilt seit 2006 als Zwergplanet." },
      { q: "Welches chemische Symbol hat Gold?", o: ["Go", "Gd", "Au", "Ag"], a: 2, f: "Au kommt vom lateinischen „aurum“." },
      { q: "Wer malte die Mona Lisa?", o: ["Michelangelo", "Leonardo da Vinci", "Raffael", "Botticelli"], a: 1, f: "Sie hängt im Louvre in Paris." },
      { q: "Wie heißt der höchste Berg Österreichs?", o: ["Zugspitze", "Großglockner", "Wildspitze", "Dachstein"], a: 1, f: "Der Großglockner ist 3.798 Meter hoch." },
      { q: "Wie viele Herzen hat ein Oktopus?", o: ["1", "2", "3", "4"], a: 2, f: "Zwei pumpen Blut zu den Kiemen, eines in den Körper." },
      { q: "Welches Land hat seit 2023 die meisten Einwohner?", o: ["China", "Indien", "USA", "Indonesien"], a: 1, f: "Nach Angaben der UNO hat Indien China überholt." },
      { q: "In welchem Jahr fiel die Berliner Mauer?", o: ["1985", "1987", "1989", "1991"], a: 2, f: "Am 9. November 1989." },
      { q: "Was ist das größte Organ des Menschen?", o: ["Leber", "Haut", "Lunge", "Darm"], a: 1, f: "Die Haut wiegt bei Erwachsenen etwa 3 bis 4 Kilogramm." },
      { q: "Wer schrieb „Faust“?", o: ["Schiller", "Goethe", "Lessing", "Kafka"], a: 1, f: "Goethe arbeitete fast sein ganzes Leben daran." },
      { q: "Wie heißt die Hauptstadt von Kanada?", o: ["Toronto", "Vancouver", "Ottawa", "Montreal"], a: 2, f: "Viele tippen auf Toronto, die größte Stadt." },
      { q: "Welches Landtier ist am schnellsten?", o: ["Löwe", "Gepard", "Pferd", "Antilope"], a: 1, f: "Der Gepard schafft kurzzeitig über 100 km/h." },
      { q: "Wie viele Saiten hat eine klassische Gitarre?", o: ["4", "5", "6", "8"], a: 2, f: "Die Stimmung lautet E A D G H E." },
      { q: "Welches Gas macht den größten Teil der Luft aus?", o: ["Sauerstoff", "Stickstoff", "Kohlendioxid", "Argon"], a: 1, f: "Etwa 78 % der Luft sind Stickstoff." },
      { q: "Welcher Fluss fließt durch Wien?", o: ["Rhein", "Donau", "Elbe", "Inn"], a: 1, f: "Die Donau fließt durch zehn Länder." },
      { q: "Wie heißt der kleinste Planet im Sonnensystem?", o: ["Merkur", "Mars", "Venus", "Pluto"], a: 0, f: "Merkur ist nur etwas größer als unser Mond." },
      { q: "Wer erfand das World Wide Web?", o: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Linus Torvalds"], a: 1, f: "Er schlug es 1989 am CERN vor." },
      { q: "Wie viele Spieler stehen pro Team beim Fußball auf dem Feld?", o: ["9", "10", "11", "12"], a: 2, f: "Inklusive Torwart." },
      { q: "Wie heißt ein junges Känguru?", o: ["Joey", "Kitz", "Welpe", "Fohlen"], a: 0, f: "Es lebt monatelang im Beutel der Mutter." },
      { q: "Welches Tier ist im Wappen Österreichs zu sehen?", o: ["Löwe", "Adler", "Bär", "Hirsch"], a: 1, f: "Der Bundesadler hält Hammer und Sichel in den Fängen." },
      { q: "Welche ist die größte heiße Wüste der Welt?", o: ["Gobi", "Sahara", "Kalahari", "Atacama"], a: 1, f: "Sie ist fast so groß wie die USA." },
      { q: "Welche Farbe entsteht aus Blau und Gelb?", o: ["Grün", "Orange", "Lila", "Braun"], a: 0, f: "Beim Mischen von Farbpigmenten." },
      { q: "Wer betrat 1969 als Erster den Mond?", o: ["Buzz Aldrin", "Juri Gagarin", "Neil Armstrong", "Michael Collins"], a: 2, f: "Aldrin folgte ihm wenige Minuten später." },
      { q: "Wie viele Kontinente zählt man üblicherweise?", o: ["5", "6", "7", "8"], a: 2, f: "In manchen Ländern zählt man anders." },
      { q: "Welcher Komponist wurde im Laufe seines Lebens taub?", o: ["Mozart", "Bach", "Beethoven", "Haydn"], a: 2, f: "Seine Neunte Symphonie schrieb er fast taub." },
      { q: "Wie heißt die Hauptstadt von Brasilien?", o: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], a: 2, f: "Sie wurde in den 1950ern neu gebaut." },
      { q: "Welcher Staat ist der kleinste der Welt?", o: ["Monaco", "Vatikanstadt", "San Marino", "Liechtenstein"], a: 1, f: "Er ist kleiner als 0,5 Quadratkilometer." },
      { q: "Welches Element hat die Ordnungszahl 1?", o: ["Helium", "Wasserstoff", "Sauerstoff", "Lithium"], a: 1, f: "Es ist das häufigste Element im Universum." },
      { q: "Wie lange dauert ein Fußballspiel regulär?", o: ["80 Minuten", "90 Minuten", "100 Minuten", "120 Minuten"], a: 1, f: "Zwei Halbzeiten zu je 45 Minuten." },
      { q: "In welcher Stadt findet der berühmte Opernball statt?", o: ["Salzburg", "Graz", "Wien", "Linz"], a: 2, f: "In der Wiener Staatsoper, meist im Februar." }
    ]
  },
  en: {
    five: ["APPLE", "BREAD", "BRAIN", "BEACH", "CHAIR", "CLOUD", "CRANE", "DREAM", "EARTH", "FLAME", "FRUIT", "GHOST", "GRAPE", "GREEN", "HEART", "HOUSE", "JUICE", "LEMON", "LIGHT",
      "MONEY", "MOUSE", "MUSIC", "NIGHT", "OCEAN", "PAPER", "PIANO", "PIZZA", "PLANT", "RIVER", "ROBOT", "SHEEP", "SMILE", "SNAKE", "SPACE", "STONE", "STORM", "SUGAR", "TABLE",
      "TIGER", "TOAST", "TRAIN", "VOICE", "WATER", "WHALE", "WORLD", "ZEBRA", "CANDY", "DANCE", "EAGLE", "FAIRY", "GIANT", "HONEY", "IGLOO", "KNIFE", "LASER", "MAGIC", "NOVEL",
      "PLANE", "QUEEN"],
    four: [
      { groups: [
        { n: "Planets", w: ["VENUS", "SATURN", "EARTH", "NEPTUNE"] }, { n: "Candy bars", w: ["MARS", "TWIX", "SNICKERS", "KITKAT"] },
        { n: "Gods", w: ["ZEUS", "ODIN", "THOR", "APOLLO"] }, { n: "Greek letters", w: ["ALPHA", "BETA", "GAMMA", "DELTA"] }] },
      { groups: [
        { n: "Spices", w: ["PEPPER", "CUMIN", "PAPRIKA", "CINNAMON"] }, { n: "Cutlery", w: ["FORK", "SPOON", "KNIFE", "CHOPSTICK"] },
        { n: "Pasta", w: ["PENNE", "FUSILLI", "RAVIOLI", "SPAGHETTI"] }, { n: "Bread", w: ["BAGUETTE", "CIABATTA", "SOURDOUGH", "RYE"] }] },
      { groups: [
        { n: "___BALL", w: ["FOOT", "BASKET", "HAND", "VOLLEY"] }, { n: "___HOUSE", w: ["GREEN", "LIGHT", "DOG", "TREE"] },
        { n: "___FISH", w: ["GOLD", "SWORD", "STAR", "JELLY"] }, { n: "___FLY", w: ["BUTTER", "DRAGON", "FIRE", "HORSE"] }] },
      { groups: [
        { n: "Instruments", w: ["PIANO", "VIOLIN", "FLUTE", "DRUM"] }, { n: "Genres", w: ["JAZZ", "ROCK", "BLUES", "POP"] },
        { n: "One-name artists", w: ["ADELE", "PRINCE", "SHAKIRA", "BONO"] }, { n: "Music terms", w: ["TEMPO", "CHORD", "SCALE", "BEAT"] }] },
      { groups: [
        { n: "Celestial bodies", w: ["MOON", "SUN", "COMET", "PLANET"] }, { n: "Weather", w: ["RAIN", "FOG", "HAIL", "STORM"] },
        { n: "Seasons", w: ["SPRING", "SUMMER", "AUTUMN", "WINTER"] }, { n: "Times of day", w: ["MORNING", "NOON", "EVENING", "NIGHT"] }] },
      { groups: [
        { n: "Programming languages", w: ["RUBY", "SWIFT", "RUST", "JAVA"] }, { n: "Snakes", w: ["PYTHON", "COBRA", "VIPER", "ADDER"] },
        { n: "Browsers", w: ["CHROME", "FIREFOX", "SAFARI", "EDGE"] }, { n: "Game consoles", w: ["WII", "XBOX", "SWITCH", "GAMEBOY"] }] },
      { groups: [
        { n: "Body parts", w: ["KNEE", "ELBOW", "THUMB", "HEEL"] }, { n: "Parts of a shoe", w: ["SOLE", "LACE", "TONGUE", "BUCKLE"] },
        { n: "Parts of a house", w: ["WINDOW", "STAIRS", "ROOF", "CELLAR"] }, { n: "Parts of a book", w: ["PAGE", "CHAPTER", "COVER", "INDEX"] }] },
      { groups: [
        { n: "Board games", w: ["CHESS", "CHECKERS", "RISK", "MONOPOLY"] }, { n: "Chess pieces", w: ["ROOK", "BISHOP", "KNIGHT", "PAWN"] },
        { n: "Card games", w: ["POKER", "BRIDGE", "RUMMY", "HEARTS"] }, { n: "Games of chance", w: ["LOTTO", "BINGO", "ROULETTE", "KENO"] }] }
    ],
    quiz: [
      { q: "What is the capital of Australia?", o: ["Sydney", "Canberra", "Melbourne", "Perth"], a: 1, f: "Canberra was built as a compromise between Sydney and Melbourne." },
      { q: "How many planets does our solar system have?", o: ["7", "8", "9", "10"], a: 1, f: "Pluto has counted as a dwarf planet since 2006." },
      { q: "What is the chemical symbol for gold?", o: ["Go", "Gd", "Au", "Ag"], a: 2, f: "Au comes from the Latin “aurum”." },
      { q: "Who painted the Mona Lisa?", o: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Botticelli"], a: 1, f: "She hangs in the Louvre in Paris." },
      { q: "What is the highest mountain in Austria?", o: ["Zugspitze", "Grossglockner", "Wildspitze", "Dachstein"], a: 1, f: "The Grossglockner is 3,798 metres high." },
      { q: "How many hearts does an octopus have?", o: ["1", "2", "3", "4"], a: 2, f: "Two pump blood to the gills, one to the body." },
      { q: "Which country has had the most people since 2023?", o: ["China", "India", "USA", "Indonesia"], a: 1, f: "According to the UN, India overtook China." },
      { q: "In which year did the Berlin Wall fall?", o: ["1985", "1987", "1989", "1991"], a: 2, f: "On 9 November 1989." },
      { q: "What is the largest organ of the human body?", o: ["Liver", "Skin", "Lungs", "Intestine"], a: 1, f: "In adults, skin weighs around 3 to 4 kilograms." },
      { q: "Who wrote “Faust”?", o: ["Schiller", "Goethe", "Lessing", "Kafka"], a: 1, f: "Goethe worked on it for most of his life." },
      { q: "What is the capital of Canada?", o: ["Toronto", "Vancouver", "Ottawa", "Montreal"], a: 2, f: "Many guess Toronto, the biggest city." },
      { q: "Which land animal is the fastest?", o: ["Lion", "Cheetah", "Horse", "Antelope"], a: 1, f: "A cheetah can reach over 100 km/h in short bursts." },
      { q: "How many strings does a classical guitar have?", o: ["4", "5", "6", "8"], a: 2, f: "They are tuned E A D G B E." },
      { q: "Which gas makes up most of the air?", o: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], a: 1, f: "About 78 % of air is nitrogen." },
      { q: "Which river flows through Vienna?", o: ["Rhine", "Danube", "Elbe", "Inn"], a: 1, f: "The Danube flows through ten countries." },
      { q: "What is the smallest planet in the solar system?", o: ["Mercury", "Mars", "Venus", "Pluto"], a: 0, f: "Mercury is only a bit bigger than our Moon." },
      { q: "Who invented the World Wide Web?", o: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Linus Torvalds"], a: 1, f: "He proposed it at CERN in 1989." },
      { q: "How many players per team are on the pitch in football?", o: ["9", "10", "11", "12"], a: 2, f: "Including the goalkeeper." },
      { q: "What is a baby kangaroo called?", o: ["Joey", "Kid", "Pup", "Foal"], a: 0, f: "It lives in its mother's pouch for months." },
      { q: "Which animal is on the coat of arms of Austria?", o: ["Lion", "Eagle", "Bear", "Deer"], a: 1, f: "The eagle holds a hammer and a sickle in its claws." },
      { q: "What is the largest hot desert in the world?", o: ["Gobi", "Sahara", "Kalahari", "Atacama"], a: 1, f: "It is almost as big as the USA." },
      { q: "Which colour do you get by mixing blue and yellow?", o: ["Green", "Orange", "Purple", "Brown"], a: 0, f: "When mixing paint pigments." },
      { q: "Who was the first person on the Moon in 1969?", o: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], a: 2, f: "Aldrin followed a few minutes later." },
      { q: "How many continents are usually counted?", o: ["5", "6", "7", "8"], a: 2, f: "Some countries count differently." },
      { q: "Which composer went deaf during his life?", o: ["Mozart", "Bach", "Beethoven", "Haydn"], a: 2, f: "He wrote his Ninth Symphony almost deaf." },
      { q: "What is the capital of Brazil?", o: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], a: 2, f: "It was built from scratch in the 1950s." },
      { q: "Which is the smallest country in the world?", o: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], a: 1, f: "It is smaller than half a square kilometre." },
      { q: "Which element has atomic number 1?", o: ["Helium", "Hydrogen", "Oxygen", "Lithium"], a: 1, f: "It is the most common element in the universe." },
      { q: "How long does a football match last in normal time?", o: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"], a: 1, f: "Two halves of 45 minutes." },
      { q: "In which city does the famous Opera Ball take place?", o: ["Salzburg", "Graz", "Vienna", "Linz"], a: 2, f: "In the Vienna State Opera, usually in February." }
    ]
  }
};
