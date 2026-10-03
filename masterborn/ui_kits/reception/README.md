# Recepcja: terminarz

Ekran recepcji HotelManager PRO. Główny widok to terminarz (pokoje × dni 24.12.2024 do 06.01.2025), nad nim wyszukiwanie wolnych pokoi (walk-in).

Pliki: `index.html` (App), `data.js` (model: pokoje, rezerwacje, dostępność, meldunek), `states.css` (kolory stanów, te same w trybie ciemnym), `StateChip.jsx`, `RangeField.jsx` (zakres dat w jednym kalendarzu), `WalkInPanel.jsx`, `Timeline.jsx`, `GuestDrawer.jsx`, `EditReservationDialog.jsx`, `InvoiceFields.jsx`, `AppHeader.jsx`, `OwnerStrip.jsx`, `responsive.js`, `viewports.html` (test szerokości).

Logika:
- Dostępność: `HM.conflicts(room, from, to, guests)`, wspólna dla walk-in i edycji.
- Kolejność wolnych pokoi: gotowe teraz, potem najmniejszy nadmiar miejsc, potem cena.
- Stany rezerwacji: oczekiwany przyjazd, zameldowany, wyjazd dziś, wymeldowany. Stany pokoju: czysty, serwis, remont, zablokowany.
- Wymeldowanie przełącza pokój w serwis. Meldunek jest zablokowany, gdy pokój jest w serwisie lub poprzedni gość się nie wymeldował.
- Język: doba (1 doba, 2 doby, 5 dób), serwisy.
