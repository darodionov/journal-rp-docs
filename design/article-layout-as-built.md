# Паспорт раскладки страницы статьи (as-built)

> Инвентаризация ФАКТОВ кода на ветке `master` репозитория `../journal`.
> Цель: дать наставнику (без доступа к репозиторию) точную картину устройства
> раскладки статьи, чтобы проектировать главную (A13) и решать, что
> переиспользуется. Это НЕ ревью: описано что есть, с путями и цитатами.
> Все числа и строки CSS — из репозитория, не из спек.
> Маркер `⚠ код vs спека/замер` отмечает расхождение факта кода с
> `design/article-1600-measurements.md` (далее «замеры») или
> `design/plan-delta-a10-revision-2026-07-24.md` (далее «A10/A11»).
> Единицы: rem считаны в px при базе 16px.

---

## 1. Карта файлов раскладки

Маршрут статьи: `/articles/[slug]`. Дерево оболочек снизу вверх.

| Файл | Роль | RSC/Client |
|---|---|---|
| `src/app/layout.tsx` | Корневой layout: `<html>/<body>`, шрифты, `<Header/>`, `<main>`, `<Footer/>` | server |
| `src/app/articles/layout.tsx` | Сегментный layout: обёртка `.article-container` + `RubricPanel` (только от dock) | server |
| `src/app/articles/[slug]/page.tsx` | Страница статьи: `.page-container`, JSON-LD, `TwoColumnLayout`, `ShareRow`, `Related` | server (async) |
| `src/components/layout/two-column-layout.tsx` | `.two-column-grid`: колонка контента (`.content-column` > `article.content-grid`) + `<aside>` сайдбара | server |
| **Chrome** | | |
| `src/components/layout/header/header.tsx` | Шапка: `.header-grid`, логотип (`<picture>`), десктоп-навигация, поиск, вход | server |
| `src/components/layout/header/date-stamp.tsx` | Плашка даты (`<time>`), считает дату на клиенте | **client** (`'use client'`) |
| `src/components/layout/header/menu-taxonomy.tsx` | Бургер-дровер: `Sheet` (side=left) + список рубрик + `CollapsibleSection` | server (оболочка), внутри client-примитивы |
| `src/components/menu/menu-journal-section.tsx` | `CollapsibleSection` — раскрывающийся раздел «Журнал» в дровере | **client** (`'use client'`, useState) |
| `src/components/menu/rubric-panel.tsx` | `RubricPanel` — левая панель рубрик, видима только от dock (≥1600) | server (useId) |
| `src/components/ui/sheet.tsx` | Примитив дровера поверх `@base-ui/react/dialog` | **client** (`'use client'`) |
| `src/components/layout/footer.tsx` | Футер: копирайт + строка «Нашли ошибку» | server |
| **Сайдбар и его блоки** | | |
| `src/components/article/sidebar/article-sidebar.tsx` | `ArticleSidebar` — сборка: `Cite` + `Banner` + `BookShelf`(lg) + `Events` | server |
| `src/components/article/sidebar/cite.tsx` | «Цитата дня» — async, тянет `citeSource.getCite()` | server (async) |
| `src/components/article/sidebar/banner.tsx` | Баннер-ссылка, `getBannerData()` фикстура | server |
| `src/components/article/sidebar/events.tsx` | «События» — секция + хардкод-фикстура `getEventsData()` | server |
| `src/components/article/sidebar/event-card.tsx` | `EventCard` — карточка события (дата/заголовок/текст) | server |
| **Ряды под статьёй** | | |
| `src/components/article/related/related.tsx` | `.related-row` «Другие материалы по теме», 7 карточек | server |
| `src/components/article/related/article-card.tsx` | `ArticleCard` — карточка «по теме» (фото + заголовок + текст) | server |
| `src/components/article/share-row.tsx` | `ShareRow` — соцкнопки-шеры (нужны props url/title) | server |
| **Карточки / полка** | | |
| `src/components/products/bookshelf.tsx` | `BookShelf` — async полка «Библиотека», `getShelfCached()` | server (async) |
| `src/components/products/product-card.tsx` | `ProductCard` — товарная карточка (контейнерный грид) | server |
| **Тело статьи (MDX)** | | |
| `src/components/article/author-block.tsx` | `AuthorBlock` — блок автора (аватар-рельса + текст); вставляется из MDX | server |
| `src/components/mdx/figure.tsx` | `Figure` — изображение с `variant="text|breakout|wide"`; маппится и на `img` | server (async, читает размеры файла) |
| `src/components/article/hero.tsx` | `Hero` — обложка; **не смонтирован в маршрут статьи** (импортируется только `src/app/dev/test/page.tsx`) | server |
| `src/app/globals.css` | Все токены (`@theme`), классы `.page-container`, `.article-container`, `.two-column-grid`, `.content-grid`, `.related-row`, `.book-shelf-track`, `.product-card`, `.author-block`, `.header-grid` | — |

DOM-скелет маршрута (по вложенности layout→page):

```
body.flex.min-h-dvh.flex-col.gap-y-page-vertical.py-page-pad   (layout.tsx)
 ├─ Header
 ├─ main.flex.flex-col.flex-1.gap-vertical
 │   └─ div.article-container                                   (articles/layout.tsx)
 │       ├─ div.hidden.dock:block > RubricPanel                 (только ≥ dock)
 │       └─ div.page-container                                  (articles/[slug]/page.tsx)
 │           ├─ script[ld+json]
 │           ├─ TwoColumnLayout  → div.two-column-grid
 │           │     ├─ div.content-column > article.content-grid.prose   (MDX + shelf-inline)
 │           │     └─ aside.flex.flex-col.gap-y-gutter > ArticleSidebar
 │           ├─ ShareRow
 │           └─ Related  → section.related-row
 └─ Footer
```

---

## 2. Внешний каркас страницы

Три вложенных контейнера, каждый со своей механикой центрирования.

**`.page-container`** (`globals.css:281`) — общий контейнер контента (им же
пользуются Header и Footer):

```css
.page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-vertical);                                  /* 24px */
  margin-inline: auto;
  max-width: calc(var(--page-max) + 2 * var(--spacing-page-pad)); /* 1320 + 2*20 = 1360px */
  padding-inline: var(--spacing-page-pad);                        /* 20px */
}
```

Контейнер задан токеном **`--page-max: 82.5rem` = 1320px** (`globals.css:144`).
Это НЕ grid — это `flex-column` с `max-width` и авто-полями. Полей-констант
для боков нет: боковые поля страницы = следствие центрирования (растут выше 1360).

**`.article-container`** (`globals.css:291`) — оболочка сегмента, grid включается
ТОЛЬКО от брейкпоинта `dock` (100rem = 1600px):

```css
.article-container {
  @variant dock {
    display: grid;
    grid-template-columns: var(--panel-w) minmax(0, var(--page-max)); /* 330px | до 1320px */
    max-width: var(--assembly-max);                                    /* 1650px */
    margin-inline: auto;
    padding-inline: var(--spacing-page-pad);
  }
}
```

Ниже dock `.article-container` — обычный блок без grid (панель рубрик скрыта,
`.page-container` центрируется сам). От dock — двухдорожечный ансамбль:
панель рубрик 330px + контент до 1320px, весь ансамбль центрируется в 1650px.

**Двухколоночная раскладка «контент + сайдбар»** живёт на **`.two-column-grid`**
(`globals.css:417`), на элементе из `two-column-layout.tsx:10`:

```css
.two-column-grid {
  grid-column: 2 / -1;
  display: grid;
  gap: var(--gutter);                                    /* межколонник 18px */
  @variant lg {
    grid-template-columns: minmax(0, 1fr) var(--sidebar-w);  /* контент 1fr | сайдбар 267px */
  }
}
```

- Тип раскладки: **grid**. Дорожки объявлены только от `lg` (64rem = 1024px):
  левая — `minmax(0, 1fr)` (гибкая, контент), правая — фикс **`--sidebar-w: 16.6875rem` = 267px**.
- Межколонник — **`--gutter: 1.125rem` = 18px** (`gap`).
- Ниже lg дорожки не заданы → одна неявная колонка, контент и `<aside>` стекаются.
- ⚠ **код vs факт DOM**: строка `grid-column: 2 / -1` инертна — родитель
  `.page-container` имеет `display:flex`, а `grid-column` действует только на
  grid-элемент. Свойство присутствует, но эффекта в текущем DOM не даёт.

---

## 3. Content-grid тела статьи

Объявлен как класс `.content-grid` (`globals.css:426`); навешен на
`<article className="content-grid prose max-w-none">` (`two-column-layout.tsx:12`).
Контейнерный триггер — `container-name: content-container` на обёртке
`.content-column` (`globals.css:411`), т.е. сетка реагирует на ширину колонки
контента, НЕ вьюпорта.

**Базовый шаблон (колонка < 868px)** — одна дорожка, все именованные линии
схлопнуты в её края:

```css
grid-template-columns:
  [wide-start text-start] minmax(0, var(--measure)) [text-end wide-end];
justify-content: center;
```

**Расширенный шаблон (контейнер ≥ 868px)** — три дорожки:

```css
@container content-container (min-width: 868px) {
  grid-template-columns:
    [wide-start] minmax(var(--author-rail-min), 2fr)   /* левая рельса, пол 122px, вес 2 */
    [text-start] minmax(0, var(--measure))             /* текстовая мера, потолок 746px */
    [text-end] 1fr [wide-end];                          /* правая полоса, вес 1 */
}
```

Именованные линии — только две пары: `wide-start/wide-end` и `text-start/text-end`
(отдельной линии `full` в коде НЕТ). Зоны и куда падают дети:

- `.content-grid > *` → `grid-column: text` по умолчанию (`globals.css:439`).
- `.wide { grid-column: wide }` и `.full { grid-column: wide }` — **идентичны**
  (`globals.css:458-464`): макетное «full» = зона `wide`.
- `.breakout { grid-column: text-start / wide-end }` (`globals.css:466`) — от левого
  края меры до правого края wide.
- `figure` (`.content-grid > figure`) — `grid-template-columns: subgrid`,
  картинка `1 / -1`, подпись — в `text` (`globals.css:444-456`).
- Тoken меры: **`--measure: 46.625rem` = 746px**; рельса: **`--author-rail-min: 7.625rem` = 122px**.

Реальное употребление в MDX (`content/articles/test.mdx`):
`<Figure ... variant="full" />`, `<Figure ... variant="breakout" />`,
`<AuthorBlock ...>` внутри тела.

**Автор-блок** (`.author-block`, `globals.css:470`) — отдельная под-сетка внутри
`content-grid`, управляется переменной `--author-tpl` в трёх режимах:
стек (`1fr`) при колонке < 728; `var(--author-rail-min) 1fr` от контейнера 728
**или** от `lg`; `subgrid` со спаном `wide-start / text-end` от контейнера 868px.

⚠ **код vs замер**: `row-gap` тела — `row-gap: var(--gutter)` = 18px
(`globals.css:428`). Замеры §4 требуют межблочный ритм 35–52px и помечают это
как DEBT; параллельно текст замеров называет gutter «20» — устаревшее число
(в коде `--gutter` = 18).

---

## 4. Сетка рядов («по теме», «События») и их место в DOM

**«Другие материалы по теме»** — компонент `Related` (`related.tsx`),
рендерит `<section className="related-row">` + 7 карточек
(`Array.from({ length: 7 })`). Сетка (`globals.css:710`):

```css
.related-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(173px, 1fr));
  gap: var(--gutter);                                   /* 18px */
}
```

- Механизм — **`repeat(auto-fit, minmax(173px, 1fr))`**, НЕ `repeat(14, minmax(0,1fr))`
  со спанами. Число 173px вбито как минимум карточки (совпадает с «спан 2» из
  замеров), но дорожки не 14 фиксированных, а авто-подбор с растяжением 1fr.
- ⚠ **код vs спека (A10/A11 §3.7)**: спека описывает «карточка = спан 2 колонок
  14-сетки = 173px, шаг 191». В коде «шаг 191» не закодирован: расстояние = `gap`
  18px + гибкий рост дорожек. Совпадает только минимум карточки 173px.
- Карточка `ArticleCard` (`article-card.tsx`): фото `aspect-square`,
  `<Image ... sizes="173px">`, заголовок `.font-narrow.text-h3` с `min-h-[2lh]`,
  текст `.text-small` с `min-h-[4lh]`.

**Место в DOM**: `Related` (и `ShareRow`) — **сиблинги** `TwoColumnLayout`
внутри `.page-container` (`page.tsx:67-69`). То есть ряд «по теме» лежит
**ниже обеих колонок**, на всю ширину `.page-container` (до 1320), а не внутри
контентной колонки. Он «идёт под сайдбаром» именно потому, что это отдельная
секция полной ширины ниже двухколоночного блока.

**«События»** — компонент `Events` (`events.tsx`) — это **НЕ ряд-сетка**, а
`<section className="flex flex-col ...">` c вертикальным стеком `EventCard`.
Живёт **внутри сайдбара** (`ArticleSidebar` → `aside`), не под колонками.
От lg он в правой колонке; ниже lg — в общем стеке сайдбара под контентом.

**Врезка-полка в теле** (< lg): `<div className="shelf-inline not-prose lg:hidden">`
(`page.tsx:61`) с инлайн-стилем `--shelf-slot`. CSS (`globals.css:645`):

```css
.shelf-inline { grid-column: wide; grid-row: var(--shelf-slot); }
```

Номер строки считает страница: `shelfGridRow()` = `Math.max(3, Math.ceil(blocks/3)) + 1`
(`page.tsx:148-152`), где `blocks` — число абзацев MDX. Это позиционирование
врезки внутри `content-grid` по номеру grid-строки.

---

## 5. Расхождение с моделью 14-колоночного генератора

Спека A11 (замеры §2а, A10 §3.1) постулировала общую **порождающую сетку:
14 колонок ≈77,6px, межколонник 18, шаг ≈95,5**; карточка = спан 2 ≈173,
шаг карточек = 2 спана = 191. Владелец фиксирует: **страница НЕ на этом
генераторе**. По факту кода каждый блок сидит на своём механизме ширины:

| Блок / файл | Механизм в коде | Вбитые числа | Совпадение с генератором |
|---|---|---|---|
| Внешний контейнер `.page-container` | flex-column + `max-width: calc(--page-max + 2*--page-pad)` | 1320 (`--page-max`) + 2×20 = 1360 | 1320 = ширина 14-сетки (совпадает как итог, не как дорожки) |
| Ансамбль `.article-container` (dock) | grid `--panel-w minmax(0,--page-max)` | 330 \| до 1320 | панель 330 — вне генератора |
| Две колонки `.two-column-grid` (lg) | grid `minmax(0,1fr) var(--sidebar-w)` | контент = **1fr** (auto), сайдбар = **267px** фикс | сайдбар 267 ≠ «12–14 колонки» 268,5 (−1,5); контент не дорожки, а 1fr |
| Тело `.content-grid` (≥868) | fr-веса `minmax(122, 2fr)` \| `minmax(0, 746)` \| `1fr` | рельса пол **122**, мера потолок **746**; боковые — веса **2fr/1fr** | мера 746 совпадает; 191/98 в коде НЕ вбиты — возникают лишь на плато |
| Ряд «по теме» `.related-row` | grid `repeat(auto-fit, minmax(173px,1fr))` | карточка мин **173px**, gap **18** | 173 совпадает; шаг 191 и «14 дорожек» НЕ закодированы (auto-fit) |
| «События» `Events` | `flex flex-col` | — | вне генератора (не сетка) |
| Полка `.book-shelf-track` | flex, слот `flex: 0 0 var(--shelf-slot-w)` | **184px** (md **224px**), gap 18 | вне генератора (фикс-слоты) |
| Товар `.product-card` (≥13rem) | контейнерный grid `var(--cover-w) 1fr` | обложка **40px** + 1fr | вне генератора |

**Ключевой пункт по телу статьи**: боковые дорожки — это **fr-веса `2fr` (левая)
и `1fr` (правая)**, а не пиксельные константы. Числа 191 и 98 из замеров
возникают только на «плато» (окна ~1360–1599, где мера упёрлась в 746 и излишек
делится 2:1). Внутри 868…плато рельса и правая полоса плавно растут; ниже 868
их нет вовсе.

⚠ **код vs замер §2**: текст замеров §2 называет боковые дорожки «веса `191fr`/`98fr`».
В коде их нет — стоят `2fr`/`1fr`. Амендмент замеров 2026-08-18 и A10 §3.1
(строка «Боковые дорожки — веса 2fr / 1fr») это исправляют и совпадают с кодом;
расходится только более ранний текст §2.

⚠ **код vs замер §6**: замеры §6 помечают `--sidebar-w: 218` как «статьёй не
подтверждён». В коде `--sidebar-w` = **267px** — совпадает с принятым решением
2026-08-01, «218» в коде отсутствует.

---

## 6. Адаптив (что меняется на брейкпоинтах)

Брейкпоинты (`globals.css:136-141`): `md` 48rem=768, `lg` 64rem=1024,
`dock` 100rem=1600. `sm/xl/2xl` выключены (`initial`).

**Две колонки / сайдбар.** Дорожки `.two-column-grid` заданы только в `@variant lg`.
- **< lg (< 1024)**: одна неявная колонка → контент и `<aside>` стекаются
  (сайдбар уходит ПОД контент, во всю ширину).
- **≥ lg**: `minmax(0,1fr) var(--sidebar-w)` → сайдбар встаёт правой колонкой 267px.

**Полка «Библиотека» (`hidden lg:block`-механика).** Две копии `BookShelf`,
взаимоисключающие по lg:
- В сайдбаре: `<div className="hidden lg:block"><BookShelf/></div>`
  (`article-sidebar.tsx:11`) — видна **только от lg**.
- Врезкой в теле: `<div className="shelf-inline not-prose lg:hidden">`
  (`page.tsx:62`) — видна **только до lg**.
Так полка всегда одна на экране: до lg — внутри статьи (по grid-строке),
от lg — в сайдбаре. Обе копии обслуживаются одним чтением `getShelfCached()`.

**Раскладка самой полки** (`.book-shelf-track`, `globals.css:593-628`):
- < md: горизонтальная лента (`flex`, `overflow-x:auto`, scroll-snap),
  слот `--shelf-slot-w` = **184px**.
- md (768–1023): слот дорастает до **`--shelf-slot-w: 14rem` = 224px**.
- ≥ lg: `flex-direction: column`, паддинги 0, прокрутки нет — вертикальный столбик.
- `@variant max-md`: `.book-shelf` уходит в край экрана
  (`margin-inline: calc(-1 * --page-pad)`), рамки/скругления у кромок снимаются.

**Ряд «по теме».** Механика не завязана на брейкпоинты — `auto-fit` сам меняет
число дорожек по доступной ширине (карточка ≥ 173px). На узких — меньше в ряд.

**Тело статьи (`content-grid`).** Переключение 1→3 дорожки — по **контейнерному
запросу** `(min-width: 868px)` на `.content-column`, НЕ по вьюпорту. Автор-блок
переключается по смешанному триггеру (контейнер 728 / 868 **или** `lg`).

**Шапка (`.header-grid`, `globals.css:301`).** Меняет и колонки, и области:
- база (< md): `grid-template-columns: 1fr auto`;
  `grid-template-areas: 'date menu' 'logo logo'` (дата+бургер сверху, логотип ниже).
- md: `grid-template-columns: var(--grid-template-columns-header)`
  (`minmax(0,1fr) auto minmax(0,1fr)`); `areas: 'date logo menu'` (лого по центру);
  логотип переключается на компактный `--container-logo-compact` 196px через `<picture>`.
- lg: `areas: 'date logo enter' 'menu . search'` — появляются десктоп-навигация
  (`.header-nav hidden lg:block`), поиск (`.header-search ... lg:block`), вход
  (`.header-enter ... lg:flex`).

**Панель рубрик и бургер (dock 1600).**
- `RubricPanel` обёрнут `hidden dock:block` (`articles/layout.tsx:10`) — левая
  колонка панели появляется только от dock (в grid `.article-container`).
- Бургер `MenuTaxonomy` несёт `dock:hidden` (`header.tsx:48`) — от dock прячется
  (его роль берёт постоянная панель). Ниже dock рубрики — в дровере (`Sheet`).

**Дровер (`Sheet` side=left, `sheet.tsx:58`).** До lg — на всю ширину
(`data-[side=left]:w-full`); от lg — `lg:w-panel-w` (330px), `lg:max-w-sm`.

---

## 7. Токены раскладки, которые страница реально потребляет

Все объявлены в `@theme` в `src/app/globals.css`. В скобках — где значение
всплывает в раскладке; px посчитан при базе 16.

| Токен | Значение | px | Роль |
|---|---|---|---|
| `--page-max` | 82.5rem | 1320 | потолок ширины контента (`.page-container`, ансамбль dock) |
| `--assembly-max` | 1650px | 1650 | потолок ансамбля «панель + контент» (`.article-container` dock) |
| `--panel-w` (`--width-panel-w`) | 330px | 330 | колонка панели рубрик; ширина дровера от lg (`w-panel-w`) |
| `--sidebar-w` | 16.6875rem | 267 | правая колонка сайдбара (`.two-column-grid` lg) |
| `--gutter` (`--spacing-gutter`) | 1.125rem | 18 | межколонник обеих сеток, gap рядов, row-gap тела |
| `--spacing-page-pad` | 1.25rem | 20 | боковые поля `.page-container`, `py-page-pad` на body |
| `--spacing-vertical` | 1.5rem | 24 | вертикальный gap `.page-container`, `gap-vertical` в main/сайдбаре |
| `--spacing-page-vertical` | 2.5rem | 40 | вертикальный ритм body (`gap-y-page-vertical`) |
| `--measure` | 46.625rem | 746 | потолок текстовой меры (`content-grid`) |
| `--author-rail-min` | 7.625rem | 122 | пол левой рельсы (`content-grid` ≥868, автор-блок) |
| `--cover-w` | 2.5rem | 40 | колонка обложки в товарной карточке (`.product-card` ≥13rem) |
| `--cover-w-showcase` | 4.625rem | 74 | обложка узкой карточки (`.product-card-cover`) |
| `--shelf-slot-w` | 11.5rem → md 14rem | 184 → 224 | слот карточки в ленте полки |
| `--container-logo` | 15rem | 240 | ширина логотипа large (`w-logo`) |
| `--container-logo-compact` | 12.25rem | 196 | логотип medium на md (`w-logo-compact`) |
| `--spacing-avatar` | 6.5rem | 104 | размер аватара по макету |
| `--grid-template-columns-header` | `minmax(0,1fr) auto minmax(0,1fr)` | — | колонки шапки от md |
| `--breakpoint-md` | 48rem | 768 | планшет |
| `--breakpoint-lg` | 64rem | 1024 | десктоп (сайдбар, навигация) |
| `--breakpoint-dock` | 100rem | 1600 | докинг панели рубрик |

Прочие потребляемые в раскладке значения без своего токена: `868px` и `728px`
(литералы в `@container`-запросах `content-grid`/`author-block`); `173px`
(литерал минимума карточки в `.related-row`); `13rem` (порог контейнера
товарной карточки).

---

## 8. Кандидаты на переиспользование главной (A13)

### 8а. Готовы к главной как есть (нет slug/фронтматтера)

| Компонент | Источник данных | Почему переносим |
|---|---|---|
| `Header` (`header.tsx`) | статичен (навигация, лого — хардкод) | нет props. Оговорка: `aria-current="page"` жёстко на «Журнал» |
| `Footer` (`footer.tsx`) | статичен | нет props |
| `MenuTaxonomy` + `Sheet` + `CollapsibleSection` | список рубрик хардкодом внутри | нет props; дровер самодостаточен |
| `RubricPanel` (`rubric-panel.tsx`) | список рубрик хардкодом | нет props (только `useId`) |
| `Cite` (`cite.tsx`) | `citeSource.getCite()` — глобальная фикстура, без slug | async, но не про статью |
| `Banner` (`banner.tsx`) | `getBannerData()` фикстура | без slug |
| `BookShelf` (`bookshelf.tsx`) | `getShelfCached()` — глобальная полка | без slug (различается лишь место монтирования) |
| `Events` (`events.tsx`) + `EventCard` | `getEventsData()` хардкод | без slug |
| `ArticleSidebar` (`article-sidebar.tsx`) | собирает 4 блока выше | нет props; блоки независимы (можно тянуть по отдельности) |
| `TwoColumnLayout` (`two-column-layout.tsx`) | props `children`, `sidebar` | обобщённый каркас, НЕ привязан к статье |
| `ArticleCard`, `ProductCard`, `EventCard`, `CiteQuote` | чистые props | карточки-примитивы |

CSS-каркас (`.page-container`, `.two-column-grid`, `.related-row`, полка,
товарная карточка) — классы в globals.css, тоже переиспользуемы вне статьи.

### 8б. Завязаны на статью — потребуют параметризации

| Узел | Чем именно завязан |
|---|---|
| `articles/[slug]/page.tsx` (оболочка страницы) | `getArticleData(slug)` / `getArticleCached`, чтение фронтматтера, `MDXRemote source={article.content}`, `generateStaticParams`/`generateMetadata`, JSON-LD `Article`, `articleUrl(slug)`. Главная не переиспользует сам шелл — собирает свой |
| `Related` (`related.tsx`) | структурно готов (`.related-row`), НО контент — хардкод-фикстура `article` × 7; для главной нужен реальный источник материалов |
| `ShareRow` (`share-row.tsx`) | обязательные props `url`, `title`; на странице приходят из `articleUrl(article.slug)` и `article.title` |
| Врезка-полка в теле | позиция задаётся `--shelf-slot` из `shelfGridRow(article.content)` — считает абзацы статьи; сам `BookShelf` не завязан, завязано лишь вычисление строки |
| `AuthorBlock` (`author-block.tsx`) | props-driven (avatar/name/role/children), но вставляется из тела MDX статьи; на главной вряд ли нужен |
| `Figure` (`figure.tsx`) | контентное изображение статьи (читает размеры файла); `Hero` — не смонтирован в маршрут |

---

## Открытые вопросы для A13

1. Сайдбар `--sidebar-w` 267 подтверждён статьёй; сверка с главной 1600 ещё
   не сделана (замеры §7.1) — совпадёт ли 267 с колонкой главной?
2. Ряд карточек: главная берёт `repeat(auto-fit, minmax(173px,1fr))` статьи
   или переходит на модель генератора (спан 2, шаг 191)? Механизмы разные.
3. `grid-column: 2/-1` на `.two-column-grid` сейчас инертен (родитель flex) —
   планируется ли на главной page-level grid, где он заработает?
4. Порог 3-дорожечного тела — контейнерный (868 на `.content-column`), не
   вьюпортный; переиспользовать ли контейнерную модель для модулей главной?
5. `aria-current` в шапке жёстко на «Журнал» — для главной нужна per-route
   активная ссылка.
