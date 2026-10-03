# HotelManager PRO: system projektowy

Redesign ekranu rezerwacji z zadania rekrutacyjnego (Masterborn). HotelManager PRO to wewnętrzne narzędzie dla małych obiektów noclegowych (3 do 50 pokoi). Użytkownicy: **recepcjonista** pod presją czasu i **właściciel**, który chce szybko zobaczyć obłożenie.

**Teza redesignu:** oryginał nie zna dostępności w czasie. Pokój, rezerwacja i status to jeden ręcznie wypełniany wiersz. Nowy model rozdziela pokoje i rezerwacje, status liczy z dat, a główny ekran odpowiada na pytanie „co mam wolne w tym terminie dla tylu osób”.

## Źródła
- `uploads/figma 1.png`: oryginalna lista rezerwacji (tabela 17 kolumn, status jako kolorowe tło, ceny niebieskie jak linki, akcje R/E/U).
- `uploads/figma 2.png`: oryginalne okno „Edycja rezerwacji” (status wybierany ręcznie z listy).
- `uploads/figma 3.png`: oryginalny formularz „Nowa rezerwacja” (wymaga numeru pokoju przed jakąkolwiek podpowiedzią).
- Brief w czacie: dane pokoi i rezerwacji, zasady UI. Nie było pliku Figma, kodu ani logo.

Oryginał jest antywzorcem, a nie źródłem stylu. System jest zaprojektowany od zera na podstawie zasad z briefu.

## Index
- `styles.css`: punkt wejścia (same `@import`).
- `tokens/`: `fonts.css`, `colors.css`, `typography.css`, `spacing.css`.
- `components/`: prymitywy React (lista niżej), każdy z `.d.ts` i `.prompt.md`.
- `guidelines/`: karty fundamentów (kolory, typografia, odstępy, marka).
- `ui_kits/reception/`: pełny ekran Recepcji z działającym walk-in.
- `explore/`: dwa szkice układu walk-in (A: karty, B: dwie kolumny). Wybrano B.
- `thumbnail.html`, `SKILL.md`.

## Components
- **Icon** (`components/core`): ikona Lucide jako inline SVG.
- **Button** (`components/forms`): primary, secondary, danger, danger-quiet, ghost; md 44 px, sm 34 px.
- **Stepper** (`components/forms`): licznik plus i minus dla nocy i osób.
- **DateField** (`components/forms`): data DD.MM.RRRR z kalendarzem; eksportuje też `formatDate`.
- **TextField** (`components/forms`): pole z etykietą nad nim, flaga `optional`.
- **StatusBadge** (`components/feedback`): status jako ikona i tekst, 5 tonów.
- **Dialog** (`components/feedback`): modal dla zadań pobocznych.
- **ConfirmDialog** (`components/feedback`): potwierdzenie usunięcia lub resetu.
- **DataTable** (`components/data`): tabela min. 14 px, zaznaczenie wiersza, podświetlenie nowego, grupa „sunken”.

Brak źródłowej biblioteki komponentów, więc zestaw jest dobrany do potrzeb ekranu recepcji. Celowo pominięte: Toast, Tabs, Tooltip, Avatar (ekran ich nie potrzebuje).

## CONTENT FUNDAMENTALS
- **Język:** polski, rzeczowy, krótki. Interfejs mówi w trybie bezosobowym lub rozkazującym do recepcjonisty („Wybierz pokój”, „Zarezerwuj pokój 202”), bez „Państwo” i bez „ja” systemu.
- **Wielkość liter:** zdania i etykiety wielką literą tylko na początku. Nigdy CAPS (oryginał: „NOWA REZERWACJA”, „WOLNY”).
- **Bez półpauz i myślników.** Zakres dat: „28.12.2024 do 02.01.2025”. Tytuł z dwukropkiem: „Walk-in: dostępne przez cały pobyt”, „Edycja rezerwacji: pokój 102”. Wyliczenia przecinkami.
- **Daty:** jeden format DD.MM.RRRR, zawsze wybierane z kalendarza. Godziny „11:00”, przybliżenia „ok. 14:00”.
- **Kwoty:** „1 250 PLN” (spacja tysięcy, waluta po liczbie). Ceny w kolorze tekstu, półgrube, nigdy niebieskie.
- **Akcje to czasowniki:** „Edytuj”, „Usuń”, „Anuluj”, „Zapisz zmiany”, „Przywróć dane początkowe”. Przycisk potwierdzenia powtarza czasownik („Usuń rezerwację”), treść mówi co i komu („Jan Kowalski, pokój 102 … Tej operacji nie można cofnąć.”).
- **Statusy mówią, do kiedy:** „Zajęty do 02.01.2025”, „Wolny tylko do 29.12.2024”, „Wyłączony do 30.12.2024 (wymiana kranu)”, „Za mały, maks. 1 os.”, „Gotowy od ok. 14:00”.
- **Puste stany podpowiadają ruch:** „Brak pokoi dostępnych przez cały pobyt. Zmień liczbę nocy, osób lub datę przyjazdu.”
- **Pola:** wymagane są domyślne, opcjonalne oznaczamy „(opcjonalnie)”. Bez gwiazdek.
- **Emoji:** nie używamy. Skróty tylko utarte: „os.”, „ok.”, „maks.”.

## VISUAL FOUNDATIONS
- **Klimat:** spokojne narzędzie biurowe. Ciepły papier jako tło, chłodny grafit tekstu, jeden niebieski akcent. Gęstość średnia: czytelna na stanowisku 1440 px, bez marnowania wysokości.
- **Kolor:** neutralne `--paper-*` (ciepłe) dla powierzchni, `--ink-*` dla tekstu. Akcent `--blue-600` tylko dla głównej akcji, fokusu, zaznaczenia i „Najlepsze dopasowanie”. Pięć tonów statusu (ok zielony, warn bursztyn, busy czerwony, off łupek, info niebieski), zawsze jasne tło plus ciemny tekst i ikona. Kontrast tekstu min. 4.5:1.
- **Typografia:** IBM Plex Sans (400/500/600/700), cyfry tabelaryczne. Body 15 px, tabele 14 px (minimum), etykiety 13 px/500, tytuły sekcji 20 px/600 z lekkim ujemnym trackingiem, numer pokoju 18 px/700, suma 17 px/600.
- **Odstępy:** skala 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 64. Margines strony 32 px, padding kart 20 do 24 px, odstęp między sekcjami 24 px.
- **Tła:** jednolite. Bez zdjęć, gradientów, tekstur i ilustracji. Strona `--surface-page`, karty białe, panel kroków `--surface-panel`, grupy drugorzędne `--surface-sunken`, pasek właściciela `--surface-strip`.
- **Karty:** białe, 1 px `--border-default`, promień 12 px, bez cienia.
- **Cienie:** tylko dla warstw pływających: popover kalendarza (`--shadow-pop`) i dialog (`--shadow-dialog`) na przyciemnionym tle `--overlay`. Bez blur.
- **Promienie:** 6 px (drobne), 8 px (kontrolki), 12 px (karty, dialogi, popover), pill dla statusów.
- **Ramki:** 1 px; kontrolki `--border-strong`, podziały `--border-default`. Zaznaczony wiersz: tło `--surface-selected` plus 3 px pasek akcentu z lewej. Nowy wiersz: `--surface-new`.
- **Hover:** przyciski jaśniej lub ciemniej o jeden stopień (secondary `--surface-hover`, primary `--blue-800`), wiersze klikalne `--blue-25`. Bez zmiany rozmiaru.
- **Press/fokus:** fokus to obrys 2 px `--focus-ring`. Bez efektu zmniejszania.
- **Animacja:** minimalna. Przejścia koloru 120 ms, bez odbić i wjazdów. Recepcja ma działać od razu.
- **Układ:** stały nagłówek 56 px plus pasek właściciela 44 px na górze treści, kontener max 1440 px. Walk-in to siatka 360 px plus reszta. Główne zadanie nigdy w modalu.
- **Przezroczystość:** tylko tło pod dialogiem.
- **Obrazy:** brak. Produkt nie używa fotografii.

## ICONOGRAPHY
- **Zestaw:** [Lucide](https://lucide.dev) 0.460.0 z CDN (`https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js`), linia 2 px, 16 px w tekście i statusach, 18 do 20 px w nagłówkach dialogów. W React przez komponent `Icon`, który czyta `window.lucide.icons`.
- **Zamiennik:** oryginał używał emoji i ikon systemowych w nawigacji. Nie było własnego zestawu ikon, więc wybraliśmy Lucide jako najbliższy neutralny zestaw liniowy.
- **Zasada:** ikona nigdy nie występuje sama jako jedyny nośnik znaczenia. Zawsze obok słowa (status, akcja, pozycja paska właściciela). Jedyny wyjątek to „Zamknij” (X) z `aria-label`.
- **Słownik:** calendar (data), users (pojemność), bed-double (obłożenie), circle-check (gotowy), clock-3 (gotowy później), lock (zajęty), calendar-clock (wolny tylko do), wrench (wyłączony), log-in / log-out (przyjazd / wyjazd), spray-can (sprzątanie), pencil (edytuj), trash-2 (usuń), rotate-ccw (reset), star (najlepsze dopasowanie).
- **Emoji i znaki unicode jako ikony:** nie.
- **Logo:** brak w materiałach. Nazwa „HotelManager PRO” składana krojem IBM Plex Sans 700.

## Intentional additions
- **Icon:** opakowanie Lucide, żeby komponenty nie zależały od `data-lucide` i `createIcons()`.

## Fonty
IBM Plex Sans ładowany z Google Fonts (oryginał używał Arial i Times). Jeśli marka ma własny krój, podmień `tokens/fonts.css` i `--font-sans`.
