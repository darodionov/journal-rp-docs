# Русскій Паломникъ — Токены для разработки (handoff)

Единый срез актуальных значений дизайн-системы для переноса в код. Источник истины —
`tokens/*.css` в этом проекте; здесь то же самое, сгруппировано под разработку + готовый
блок `@theme` для Tailwind v4 (по ADR-0004).

- Версия: Design Guide v2 (решения пунктов 1–4 зафиксированы).
- Ревизия хендоффа: **rev. 5 (2026-08-09)** — докинг панели рубрик (ADR-0004,
  амендмент 2026-08-09): именованная точка `--breakpoint-dock: 100rem` (1600),
  токены `--panel-w: 330px` и `--assembly-max: 1650px`; формулировка «выше lg
  брейкпоинтов нет» уточнена — верна ниже `dock`. Добавлена таблица состояний
  шапки (nav-link / icon-button / icon-search).
- Ревизия хендоффа: **rev. 4 (2026-08-05)** — палитра приведена к брендбуку 2014
  (эталон, Pantone): коричневый `#462512`, бирюза `#76c7d1`, терракота `#d3a086`;
  тинты teal-300/100 пересчитаны (`#98d6db` / `#e6f5f7`); добавлены «потерянные»
  цвета брендбука `--color-sand` `#e0d5bb` (7527 C) и `--color-teal-700` `#318ca5`
  (7689 C); введён `--font-serif` (PT Serif — веб-замена Century из брендбука;
  тело статьи ПОКА остаётся на PT Sans — решение владельца 2026-08-05);
  охранное поле логотипа — 2h (двойная высота литер).
- Ревизия хендоффа: **rev. 3 (2026-08-01)** — роли приведены к именам, реально живущим
  в `globals.css`: `--color-accent` → **`--color-accent-warm`** (коллизия с shadcn-слоем,
  см. врезку ниже); роль `muted` изъята из словаря дизайн-системы (та же коллизия);
  добавлена ступень кегля `--text-quote` (24) для pull-quote; секция «Контейнер и колонки»
  приведена к замерам макета 1600 и внесена в готовый `@theme`-блок.
- Ревизия хендоффа: rev. 2 (2026-07-10) — переименованы текстовые цветовые роли
  (`--color-text-*` → `--color-*`), чтобы в Tailwind v4 они давали чистые классы
  `text-heading` вместо удвоенных `text-text-heading`. Значения не менялись.
- Единицы: размеры и брейкпоинты — **rem**; радиус и границы — px (см. ниже); длительности — ms.
- Дата среза: 2026-08-01 (значения цвета — от 2026-07-10, не менялись).

> **Почему переименование.** В Tailwind v4 токен `--color-<ИМЯ>` порождает утилиты
> `text-<ИМЯ>` / `bg-<ИМЯ>` / `border-<ИМЯ>`, где `<ИМЯ>` — всё после `--color-`.
> Поэтому старое `--color-text-accent` давало класс `text-text-accent`. Префикс
> `--color-` уже отвечает за «цвет текста», второе `text-` было лишним. Убрано.
>
> Мэппинг rev.1 → rev.2 (обновить в своём `@theme`, если переносил раньше):
> `--color-text-heading` → `--color-heading`;
> `--color-text-body` → `--color-body`;
> `--color-text-muted` → `--color-muted`;
> `--color-text-accent` → `--color-accent`;
> `--color-text-on-accent` → `--color-on-accent`.
> Роли `surface-* / link* / button-* / border-*` уже давали чистые классы — не менялись.
> (Тот же приём при желании применим к `--color-danger-bg` → `bg-danger-bg`; в этой
> ревизии оставлен как есть.)

> **⚠ Зона коллизии с shadcn (причина суффикса `-warm`).** В `globals.css` ниже
> секции дизайн-системы стоит блок совместимости `@theme inline`, где имена
> переопределяются на shadcn-роли: `--color-accent: var(--accent)`,
> `--color-muted: var(--muted)` и т. д. Все `@theme`-блоки файла сливаются в один,
> и **побеждает последнее объявление** — то есть shadcn. Практический эффект:
> `--color-accent` дизайн-системы был бы молча перекрашен в `--state-selected-bg`
> (`#faf6f1`), а `--color-muted` — в `#f7f7f7`. Ошибки не будет: утилита просто
> вернёт чужой цвет.
>
> **Правило: имена, занятые shadcn-слоем, дизайн-системой не используются.**
> Занято: `accent`, `accent-foreground`, `muted`, `muted-foreground`, `border`,
> `input`, `ring`, `background`, `foreground`, `card`, `card-foreground`, `popover`,
> `popover-foreground`, `primary`, `primary-foreground`, `secondary`,
> `secondary-foreground`, `destructive`.
> Следствия: тёплый акцент — **`--color-accent-warm`** → класс **`text-accent-warm`**;
> приглушённый текст — **`text-muted-foreground`** (shadcn-цепочка даёт ровно `#939598`),
> роли `--color-muted` у дизайн-системы больше нет.

---

## 1. Палитра — семантические роли

Роли — это то, что используется в разработке. Базовые оттенки (ramp) даны отдельно как их основа.
В колонке «класс» — утилита Tailwind v4, которую роль порождает (чтобы не гадать при вёрстке).

| Роль (токен) | hex | класс | Назначение |
|---|---|---|---|
| `--color-surface-page` | `#ffffff` | `bg-surface-page` | Холст страницы — всегда чистый белый |
| `--color-surface-card` | `#f1f1f1` | `bg-surface-card` | Плоские блоки сайдбара и карточки (без тени) |
| `--color-surface-input` | `#ffffff` | `bg-surface-input` | Фон полей ввода |
| `--color-heading` | `#462512` | `text-heading` | Все заголовки h1–h3, логотип |
| `--color-body` | `#565350` | `text-body` | Основной текст |
| ~~`--color-muted`~~ | `#939598` | **`text-muted-foreground`** | Даты, подписи, футер, плейсхолдеры. Имя `muted` занято shadcn (поверхность) — своей роли нет, цвет берём из shadcn-цепочки |
| `--color-accent-warm` | `#d3a086` | `text-accent-warm` | Тёплый акцент в тексте: даты памяти, орнаментальные кавычки, лейблы (rev.3: было `--color-accent`) |
| `--color-on-accent` | `#ffffff` | `text-on-accent` | Текст на заливке (кнопки, плашки). ⚠ В `globals.css` сейчас `--color-text-on-accent` → класс `text-text-on-accent`: привести к имени из хендоффа |
| `--color-link` | `#76c7d1` | `text-link` | Холодные ссылки, действия |
| `--color-link-hover` | `#55b3bb` | `text-link-hover` | Ховер холодных ссылок |
| `--color-link-warm` | `#d3a086` | `text-link-warm` | Тёплые ссылки: женские имена, месяцы, активная навигация |
| `--color-link-warm-hover` | `#c98d6d` | `text-link-warm-hover` | Ховер тёплых ссылок |
| `--color-button-primary` | `#76c7d1` | `bg-button-primary` | Основная кнопка («Узнать», «В корзину») |
| `--color-button-primary-hover` | `#55b3bb` | `bg-button-primary-hover` | Ховер основной кнопки |
| `--color-button-warm` | `#d3a086` | `bg-button-warm` | Вторичная тёплая кнопка («Отправить» в подписке) |
| `--color-price` | `#76c7d1` | `text-price` | Цена товара |
| `--color-border-divider` | `#e1e1e1` | `border-divider` | Разделители секций, границы блоков |
| `--color-border-input` | `#c6c6c6` | `border-input` | Границы полей ввода |

### Состояния и служебные роли

| Роль (токен) | значение | Назначение |
|---|---|---|
| `--focus-ring` | `0 0 0 1px #fff, 0 0 0 3px #318ca5` | Двойное кольцо фокуса: белый хайрлайн 1px + тёмная бирюза 2px. Одно на все фоны (шаг 3). Всегда в паре с `outline:2px solid transparent` — маячком для forced-colors |
| ~~`--focus-ring-warm`~~ | алиас `--focus-ring` | Упразднён — исключений больше нет, в новой разметке не использовать |
| `--state-hover-tint` | `rgba(70,37,18,0.04)` | Лёгкая подложка ховера на нейтральных строках |
| `--state-selected-bg` | `#faf6f1` | Фон выбранного пункта/строки |
| `--disabled-bg` | `#c6c6c6` | Фон неактивной кнопки |
| `--disabled-text` | `#939598` | Текст неактивного элемента |
| `--color-danger` | `#b23b2e` | Ошибка формы (текст + граница) |
| `--color-danger-bg` | `#f6e7e4` | Подложка поля с ошибкой |
| `--color-success` | `#4a7a4a` | Успех / подтверждение |

### Фокус — зафиксировано (шаг 3, 2026-08-07)

Одно кольцо на все фоны, без исключений: белый хайрлайн отделяет тёмную бирюзу
от бирюзовой заливки кнопки и от тёмных строк. Прежний `--focus-ring` на `--teal-100`
давал на заливке контраст ≈1.7:1 при минимуме 3:1 (WCAG 1.4.11).

```css
:focus-visible {
  box-shadow: var(--focus-ring);     /* 0 0 0 1px #fff, 0 0 0 3px #318ca5 */
  border-radius: var(--radius);
  outline: 2px solid transparent;    /* маячок: box-shadow не рисуется в forced-colors */
  outline-offset: 2px;
}
@media (forced-colors: active) {
  :focus-visible { outline-color: Highlight; }
}
/* где край режется (дровер, списки с overflow) — то же кольцо inset */
.drawer-item:focus-visible {
  box-shadow: inset 0 0 0 1px #fff, inset 0 0 0 3px var(--color-teal-700);
}
```

Правила: только `:focus-visible` (никогда `:focus`); `outline: none` — лишь вместе
с собственным признаком; кольцо не анимируется; картинке-ссылке — `display:inline-block`
+ `--radius`; `tabindex` больше нуля не используется; после закрытия дровера фокус
возвращается на бургер.

### Базовые оттенки (ramps — основа ролей)

- brown: `--brown-900 #3d2210`, `--brown-800 #462512`, `--brown-400 #7f6659`
- teal: `--teal-500 #55b3bb`, `--teal-400 #76c7d1`, `--teal-300 #98d6db`, `--teal-100 #e6f5f7`, `--teal-700 #318ca5` (глубокая, Pantone 7689 C)
- terracotta: `--terracotta-500 #c98d6d`, `--terracotta-400 #d3a086`, `--terracotta-100 #f4e7e0`
- sand: `--sand-400 #e0d5bb` (Pantone 7527 C — тёплые подложки), `--sand-100 #f1ece1`
- gray: `--gray-100 #f7f7f7`, `--gray-150 #f1f1f1`, `--gray-200 #e1e1e1`, `--gray-300 #c6c6c6`, `--gray-500 #939598`, `--gray-700 #565350`, `--white #ffffff`

> Примечание по цвету (rev. 4): эталон — брендбук 2014 (Pantone): коричневый 4975 C,
> бирюза 630 C, терракота 7514 C, песок 7527 C, глубокая бирюза 7689 C.
> Прежний «канон аудита вёрстки 2016» больше не источник цвета — не откатывать.
> Служебные серые и текст #565350 — вне брендбука, без изменений.

---

## 2. Типографика

**Гарнитуры — как в ADR-0004 (без изменений):**
- `--font-sans`: **PT Sans**, веса 400 / 700 + italic. Фолбэк `"Helvetica Neue", Arial, sans-serif`.
- `--font-narrow`: **PT Sans Narrow** (400/700) — подписи, подзаголовки-лейблы. Фолбэк `"Arial Narrow", sans-serif`.
- `--font-serif`: **PT Serif** (400/700 + italic) — резерв по брендбуку (наборный засечный, веб-замена Century). Фолбэк `Georgia, serif`. В тело статьи ПОКА не применяется (решение 2026-08-05).
- italic PT Sans — легитимное выделение по брендбуку (уже используется в подписях цитат).
- Обе гарнитуры остаются (решение пункта 3, вариант A). В проде — `next/font/local`, woff2 в репозитории.
- В этом ките шрифт подключён с Google Fonts как ближайшее соответствие; оригинальные бинарники не предоставлены.

**Ступени размера** (флюидные — через `clamp()`, без промежуточных брейкпоинтов).
Токен в `@theme` — `--text-*`; класс — `text-h1`, `text-base` и т. д.

| Токен (`@theme`) | класс | Значение | Диапазон (px) | Роль |
|---|---|---|---|---|
| `--text-h1` | `text-h1` | `clamp(1.25rem, 1.07rem + 0.9vw, 1.5rem)` | 20 → 24 | Заголовок статьи (потолок 24 = решение п.3) |
| `--text-h2` | `text-h2` | `clamp(1.125rem, 0.98rem + 0.7vw, 1.25rem)` | 18 → 20 | Заголовки секций |
| `--text-h3` | `text-h3` | `1rem` | 16 | Заголовки карточек/блоков |
| `--text-base` | `text-base` | `0.9375rem` | 15 | Основной текст |
| `--text-small` | `text-small` | `0.8125rem` | 13 | Аннотации, подписи, футер |
| `--text-tiny` | `text-tiny` | `0.75rem` | 12 | Лейблы секций, даты |
| `--text-nav` | `text-nav` | `0.875rem` | 14 | Главная навигация |
| `--text-quote` | `text-quote` | `1.5rem` | 24 | Текст pull-quote (спека 3.5); интерлиньяж — в паре с токеном |

> Имя размера основного текста — `--text-base` (класс `text-base`), в конвенции родной
> шкалы Tailwind. В rev.1 хендоффа оно называлось `--text-body`; переименовано при вёрстке.

**Line-height:**
- `--lh-body: 1.65` — основной текст (диапазон решения 1.6–1.7).
- `--lh-heading: 1.25` — заголовки.
- `--text-quote--line-height: 1.35` (≈32px при кегле 24) — интерлиньяж цитаты. Записывается
  парным суффиксом к токену кегля: утилита `text-quote` применяет размер и интерлиньяж разом.
  Правило шкалы: чем крупнее кегль, тем теснее интерлиньяж (1.65 на 24px = 40px — рассыпается).

**Letter-spacing (капс — фирменный мотив):**
- `--tracking-nav: 0.18em` — главное меню (ЖУРНАЛ, СОБЫТИЯ, МАГАЗИН КНИГИ).
- `--tracking-label: 0.14em` — лейблы блоков (ИМЕНА, ПО МЕСЯЦАМ, СОБЫТИЯ).

**Веса:** `--weight-regular: 400`, `--weight-bold: 700`. Промежуточных весов нет.

---

## 3. Радиус, тени, отступы

В легаси их не было системно — заданы с нуля дизайн-системой.

**Радиус — единый (решение п.2):**
- `--radius: 3px` — кнопки, поля, карточки, блоки — всё. Пилюль/кругов нет (кроме круглых аватар-фото).
- `--radius-sm` / `--radius-md` = `3px` — алиасы для совместимости со старой разметкой.

**Тени — НЕТ.** Система принципиально плоская. Глубина и разделение — только подложкой
(`--surface-card`), границей 1px (`--border-divider`) и капс-лейблом. Единственное «затемнение» —
градиент поверх фото-тизеров (белый текст на снимке), это не box-shadow.

**Шкала отступов (шаг 4px = 0.25rem):**

| Токен | rem | px |
|---|---|---|
| `--space-1` | 0.25rem | 4 |
| `--space-2` | 0.5rem | 8 |
| `--space-3` | 0.75rem | 12 |
| `--space-4` | 1rem | 16 |
| `--space-5` | 1.25rem | 20 |
| `--space-6` | 1.5rem | 24 |
| `--space-8` | 2rem | 32 |
| `--space-10` | 2.5rem | 40 |
| `--space-12` | 3rem | 48 |

**Границы:** `--border-w: 1px`.

**Контейнер и колонки:**

Значения контейнера уточнены замером оригинала макета 2026-08-01 —
см. `design/article-1600-measurements.md`.

- `--page-max: 82.5rem` (1320px) — центрирование контента; после 1320 растут поля, не контент.
- `--page-pad: 1.25rem` (20px) — боковые поля на мобильном/планшете.
- `--sidebar-w: 16.6875rem` (267px) — колонки сайдбара на десктопе.
- `--gutter: 1.125rem` (18px) — единый межколонник: страничный зазор, жёлоб сайдбара, карточные сетки.
- `--measure: 46.625rem` (746px) — текстовая мера (ширина полосы набора статьи).
- Порождающая сетка макета: 14 колонок, межколонник 18, шаг 95,5; спан n = n×95,5−18.
  Дорожки content-grid в fr берутся из замеров буквально — `191fr … 98fr`, не «2fr … 1fr».

---

## 4. Motion

Система почти статична: только короткие переходы состояний + выезд панели/оверлея.
Никаких въездов контента, параллаксов, «дыханий». Обязательно уважать `prefers-reduced-motion`
(при reduce — обнулять длительности).

| Токен | Значение | Где |
|---|---|---|
| `--dur-fast` | `120ms` | Ховер/актив ссылок и мелких элементов (цвет текста) |
| `--dur` | `150ms` | Кнопки, поля, табы — база (цвет фона/границы) |
| `--dur-slow` | `280ms` | Выезд левой панели «Журнал», оверлей поиска |
| `--dur-line` | `400ms` | Линия под пунктом навигации (решение шага 1б) |
| `--ease` | `cubic-bezier(0.2,0.6,0.2,1)` | Стандартный (вход+выход) |
| `--ease-out` | `cubic-bezier(0.16,1,0.3,1)` | Появление (дровер, оверлей) |
| `--transition-colors` | `color/bg/border × --dur × --ease` | Готовый transition для интерактива |
| `--transition-panel` | `transform × --dur-slow × --ease-out` | Готовый transition для панелей |
| `--transition-underline` | `transform × --dur-line × --ease` | Линия под пунктом навигации |
| `--underline-h` | `2px` | Толщина той же линии |

**Ховер навигации — зафиксировано (шаг 1б, 2026-08-07).** Цвет текста не меняется; отклик — линия
под пунктом, разворачивающаяся от центра. Это **осознанное расширение правил**: раньше
система допускала только смену цвета. Движение ограничено одной осью, текст не смещается.

```css
.nav-link { position: relative; }
.nav-link::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0;
  height: var(--underline-h);            /* 2px */
  background: var(--color-teal-700);     /* #318ca5 — глубокая бирюза брендбука */
  transform: scaleX(0); transform-origin: center;
  transition: var(--transition-underline); /* transform 400ms --ease */
}
.nav-link:hover::after,
.nav-link:focus-visible::after { transform: scaleX(1); }

/* Текущий раздел (шаг 2, вариант D): та же линия, но постоянная */
.nav-link[aria-current="page"]::after { transform: scaleX(1); }

/* Шаг 2б, D1 — линия уступает: в шапке никогда не бывает двух линий */
.nav-row:has(.nav-link:hover) .nav-link[aria-current="page"]:not(:hover)::after {
  transform: scaleX(0);
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after { transition: opacity 1ms; transform: scaleX(1); opacity: 0; }
  .nav-link:hover::after,
  .nav-link:focus-visible::after,
  .nav-link[aria-current="page"]::after { opacity: 1; }
}
```

**Внешний раздел** («Магазин книги» на легаси-домене) — `color: var(--color-link-warm)`,
без значка. После шага 2 терракота в шапке значит только это — роль «активная навигация»
у неё снята.

> В дровере (320/768) линия не используется — растянутая на ширину строки она читается
> как разделитель. Текущий пункт там — подложка `--state-selected-bg`.
>
> `:has()` поддерживается всеми актуальными браузерами; если нужна более широкая
> поддержка — тот же эффект через класс на `.nav-row` по `mouseenter`/`mouseleave`.

> Почему teal-700, а не терракота: терракота закреплена за внешним разделом
> (шаг 2 закрыт: текущий — та же линия постоянно, внешний — цвет). `--dur-line` вынесен в отдельный

**Таблица состояний шапки (элемент | состояние | свойство | токен):**

```
nav-link          | hover         | линия ::after     | scaleX(1) · --transition-underline · --underline-h · --color-teal-700
nav-link          | current       | линия ::after     | scaleX(1) постоянно ([aria-current="page"])
nav-link          | current+сосед | линия ::after     | scaleX(0) пока наведён другой (:has, шаг 2б D1)
nav-link-ext      | default       | color            | --color-link-warm (внешний раздел, без значка)
nav-link          | focus-visible | box-shadow       | --focus-ring
icon-button       | default       | color            | --color-heading      (бургер)
icon-button       | hover         | color            | --color-link-hover
icon-button       | focus-visible | box-shadow       | --focus-ring
icon-button       | active        | background       | --state-selected-bg
icon-button       | pressed       | background       | --state-selected-bg + aria-expanded="true"
icon-button       | disabled      | color            | #c6c6c6
icon-button       | *             | min-width/height | 44px (тач-цель)
icon-search       | default       | color            | --color-button-primary  (лупа)
icon-search       | hover         | color            | --color-heading (шаг 4 · L2)
icon-search       | focus-visible | box-shadow       | --focus-ring
icon-search       | active        | color+background | --color-heading + --state-selected-bg
icon-search       | pressed       | background/color | --color-button-primary / --color-text-on-accent + aria-expanded="true"
icon-search       | disabled      | color            | #c6c6c6
```

> токен, а не взят из `--dur`/`--dur-slow`: 400 мс — сознательно неторопливый жест
> именно для навигации; кнопки и поля остаются на 150 мс.

---

## 5. Брейкпоинты — ⚠ уже зафиксированы в ADR-0004 п.6

**Совпадает с ADR — конфликта нет.** Приведено для полноты; менять эти числа нельзя без пересмотра ADR.

- `--breakpoint-md: 48rem` (768px) — планшет.
- `--breakpoint-lg: 64rem` (1024px) — десктоп.
- `sm / xl / 2xl` — **не используются** (в Tailwind v4 `--breakpoint-sm/xl/2xl: initial`).
- Три состояния раскладки: `< 768` мобильная (якорь макета 320) · `768–1024` планшетная (768) · `≥ 1024` десктопная (1600).
- Выше `lg` брейкпоинта общей раскладки нет: десктопный макет 1600 обслуживается контейнером `--page-max` (1320) с ростом боковых полей — **верно ниже `dock`**.
- **`--breakpoint-dock: 100rem` (1600) — узкоролевая именованная точка** (ADR-0004, амендмент 2026-08-09). Единственная роль — докинг панели рубрик «Журнал»: от 1600 панель — постоянная колонка страницы (бургер скрыт, крестика нет, интерактива открытия нет — серверная раскладка). Центрируется ансамбль `--assembly-max: 1650px` (`--panel-w: 330px` + контент 1320); сверх 1650 растут поля, контент не тянется. Коридор 1600–1649: контентная коробка ужимается до ~1270 (принято владельцем). Механика — грид-ансамбль `[var(--panel-w) minmax(0, var(--page-max))]`, панель в потоке, уходит со скроллом; JS-замеры и парные взаимо-гасящие сдвиги прототипа не переносятся.
- Режимы панели: `< 1024` — полноэкранное меню с аккордеоном · `1024–1599` — оверлей по бургеру · `≥ 1600 (dock)` — колонка страницы.
- **Мультиконтекстные компоненты** (карточка материала: крупная/оверлей/мини; товар: сайдбар/ряд/карусель) адаптируются **контейнерными запросами** `@container`, а не viewport-точками.

---

## 6. Готовый блок для Tailwind v4 (`@theme`, CSS-first)

Скопировать в глобальный CSS (`@import "tailwindcss";` выше). Значения 1:1 с таблицами выше.
Брейкпоинты — по ADR-0004 п.6; `sm/xl/2xl` глушатся через `initial`.

```css
@import "tailwindcss";

@theme {
  /* — Шрифты — */
  --font-sans: "PT Sans", "Helvetica Neue", Arial, sans-serif;
  --font-narrow: "PT Sans Narrow", "Arial Narrow", sans-serif;
  --font-serif: "PT Serif", Georgia, serif;  /* резерв брендбука; тело статьи пока PT Sans */

  /* — Цвет: базовые ramp — */
  --color-brown-900: #3d2210;
  --color-brown-800: #462512;
  --color-brown-400: #7f6659;
  --color-teal-500: #55b3bb;
  --color-teal-400: #76c7d1;
  --color-teal-300: #98d6db;
  --color-teal-100: #e6f5f7;
  --color-teal-700: #318ca5;
  --color-terracotta-500: #c98d6d;
  --color-terracotta-400: #d3a086;
  --color-terracotta-100: #f4e7e0;
  --color-sand: #e0d5bb;
  --color-sand-100: #f1ece1;
  --color-gray-100: #f7f7f7;
  --color-gray-150: #f1f1f1;
  --color-gray-200: #e1e1e1;
  --color-gray-300: #c6c6c6;
  --color-gray-500: #939598;
  --color-gray-700: #565350;
  --color-white: #ffffff;

  /* — Цвет: семантические роли — */
  /* текстовые роли без лишнего text- : дают классы text-heading / text-body / … */
  --color-surface-page: #ffffff;
  --color-surface-card: #f1f1f1;
  --color-surface-input: #ffffff;
  --color-heading: #462512;
  --color-body: #565350;
  /* muted: имя занято shadcn — своей роли нет, приглушённый текст = text-muted-foreground */
  --color-accent-warm: #d3a086;
  --color-on-accent: #ffffff;
  --color-link: #76c7d1;
  --color-link-hover: #55b3bb;
  --color-link-warm: #d3a086;
  --color-link-warm-hover: #c98d6d;
  --color-button-primary: #76c7d1;
  --color-button-primary-hover: #55b3bb;
  --color-button-warm: #d3a086;
  --color-price: #76c7d1;
  --color-border-divider: #e1e1e1;
  --color-border-input: #c6c6c6;
  --color-danger: #b23b2e;
  --color-danger-bg: #f6e7e4;
  --color-success: #4a7a4a;

  /* — Типографика (флюидная) — */
  --text-h1: clamp(1.25rem, 1.07rem + 0.9vw, 1.5rem);
  --text-h2: clamp(1.125rem, 0.98rem + 0.7vw, 1.25rem);
  --text-h3: 1rem;
  --text-base: 0.9375rem;
  --text-small: 0.8125rem;
  --text-tiny: 0.75rem;
  --text-nav: 0.875rem;
  --text-quote: 1.5rem;              /* 24 — pull-quote, спека 3.5 */
  --text-quote--line-height: 1.35;   /* парный интерлиньяж ступени */

  /* — Радиус — */
  --radius: 3px;

  /* — Контейнер и колонки (замер макета 1600, 1:1) — */
  --page-max: 82.5rem;       /* 1320 — ширина страницы макета */
  --breakpoint-dock: 100rem; /* 1600 — ТОЛЬКО докинг панели рубрик (ADR-0004 ам. 2026-08-09) */
  --panel-w: 330px;          /* панель «Журнал» в режиме колонки */
  --assembly-max: 1650px;    /* панель 330 + контент 1320 — центрируемый ансамбль от dock */
  --page-pad: 1.25rem;       /* 20 — боковые поля */
  --sidebar-w: 16.6875rem;   /* 267 — колонка сайдбара */
  --gutter: 1.125rem;        /* 18 — единый межколонник */
  --measure: 46.625rem;      /* 746 — текстовая мера */

  /* — Шкала отступов (шаг 4px) — */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-5: 1.25rem;  --space-6: 1.5rem;
  --space-8: 2rem;     --space-10: 2.5rem;  --space-12: 3rem;

  /* — Брейкпоинты (ADR-0004 п.6) — */
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-sm: initial;
  --breakpoint-xl: initial;
  --breakpoint-2xl: initial;

  /* — Motion — */
  --ease-standard: cubic-bezier(0.2, 0.6, 0.2, 1);
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Значения вне @theme (не рождают утилит, но доступны как var()) */
:root {
  --lh-body: 1.65;
  --lh-heading: 1.25;
  --tracking-nav: 0.18em;
  --tracking-label: 0.14em;
  --focus-ring: 0 0 0 1px #ffffff, 0 0 0 3px var(--color-teal-700);
  --focus-ring-warm: var(--focus-ring);   /* устарело — алиас */
  --state-hover-tint: rgba(70, 37, 18, 0.04);
  --state-selected-bg: #faf6f1;
  --dur-fast: 120ms;
  --dur: 150ms;
  --dur-slow: 280ms;
  --dur-line: 400ms;                 /* линия под пунктом навигации (шаг 1б) */
  --underline-h: 2px;                /* её толщина */
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

> Примечание: интерлиньяж и трекинг вынесены вне `@theme` намеренно — в Tailwind v4
> `--leading-*` / `--tracking-*` рождают отдельные утилиты; если нужны именно утилиты
> `leading-body` / `tracking-nav`, перенесите их в `@theme` с этими префиксами.

---

## 7. Открытые вопросы / предостережения

- **Порядок объявлений в `globals.css`.** Секция дизайн-системы (`@theme`) должна стоять
  **выше** shadcn-блока `@theme inline`; при совпадении имён побеждает нижний. Никогда не
  переопределять занятые shadcn-имена «снизу» — сломаются компоненты кита (Card, Skeleton).
- **Молчаливые отказы.** Несуществующая утилита в Tailwind не ошибка сборки — класс просто
  ничего не красит (`bg-accent-warm` при отсутствии токена, `bg-gray-400` вне ramp).
  Проверять по таблицам этого файла, а не глазами в браузере.
- **Синтаксис custom properties.** Пропущенная `;` съедает следующие объявления целиком:
  значением переменной становится всё до ближайшей точки с запятой. Диагностика — вкладка
  Computed для `:root` в DevTools.
- **Не решены пункты 5 (навигация/ИА: 6 vs 11 разделов меню) и 6 (роль коммерции: сквозной магазин vs товар в сайдбаре)** — их фиксируем отдельно, в токены не входят.
- **Prose-слой статьи** (`@tailwindcss/typography`) — по ADR-0004 п.3 контентная типографика тела статьи живёт в prose, а не в компонентах. Значения (тело 15px/1.65, pull-quote терракотой, врезки) берём отсюда, но конфигурируем в prose-слое.
- **Шрифт** — оригинальные woff2 PT Sans / PT Sans Narrow положить в репозиторий (`next/font/local`), лицензии тоже. В ките — Google Fonts как временная замена.
- **Логотип** — растровый (`assets/logo-full.png`, `logo-mark.png`), нужен вектор (.ai есть у владельца — ждём SVG-экспорт). Брендбук: охранное поле = 2h (двойная высота литер «Русский Паломник»); допустимые версии — коричневая, чёрная, градации серого, белая на цветном/тёмном.
- **Иконки** — hairline-SVG stroke 1.4, бирюзовый; своего иконфонта нет. ADR предполагает shadcn/ui + Radix для интерактивных примитивов (меню-дровер, оверлей поиска, табы, календарь) — доступность на них.
