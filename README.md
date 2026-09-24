#wpthreejs Holding Website

A modern, interactive, RTL Persian website for **wpthreejs Holding**, focused on brand development, business growth, marketing, projects, and company services.

The website combines responsive HTML/CSS with JavaScript, Three.js, Swiper, custom animations, and interactive sections to create an immersive presentation.

## Overview

This project is a responsive single-page website designed primarily for Persian-speaking users.

The page includes:

* Animated hero section
* Separate desktop and mobile/tablet hero experiences
* Responsive images using `<picture>`
* Three.js interactive image gallery
* Swiper project carousel
* Team carousel
* Interactive departments section
* Scroll-based department navigation
* Typing/reveal text animations
* Animated marquee text rows
* Responsive layouts for desktop, tablet, and mobile
* RTL Persian content
* Custom branding and visual effects

## Main Sections

### Hero

The hero section introduces the brand with the main message:

> ما مسیر رشد برندها را طراحی می‌کنیم

Desktop and mobile/tablet use separate animation logic.

The desktop version contains:

* `ما مسیر`
* `رشد`
* Center image/video
* `برندها را طراحی می‌کنیم`

The desktop image/video is dynamically controlled with JavaScript and can expand to cover the entire hero area.

The original mobile/tablet hero animation remains separate from the desktop implementation.

### Growth / Introduction Section

The following section presents the company's growth philosophy and includes animated Persian/English marquee rows.

Example content:

> از خلق برند تا رهبری بازار

It also includes a contact call-to-action.

### Character Video

A responsive image/video presentation section uses `<picture>` to provide different imagery for mobile and desktop devices.

Mobile and desktop assets can therefore be independently optimized.

### Departments

The departments section presents the company's main areas of activity:

1. مسیرهای رشد
2. توسعه برند
3. توسعه بازار و کسب و کار
4. توسعه فروش
5. ارتباطات بازاریابی
6. متد توسعه تری جی اس
7. پروژه‌ها
8. درخواست جلسه

The selected department dynamically changes the displayed image.

### Growth Path Sections

The website contains multiple visual sections describing growth paths, brand development, marketing, and related services.

These sections combine large images with Persian explanatory content and animated reveal effects.

### Projects

Projects are presented using Swiper sliders with:

* Main project slider
* Thumbnail navigation
* Pagination
* Responsive project images

The project section contains eight project entries.

### Team

A Swiper-based team section presents team-related content using an interactive carousel.

### Brand Gallery

The website includes an interactive Three.js gallery for displaying brand/company imagery.

The gallery dynamically calculates its dimensions based on the viewport and uses Three.js for rendering.

## Technologies

### Frontend

* HTML5
* CSS3
* JavaScript
* ES Modules
* Responsive CSS
* RTL layout

### JavaScript Libraries

* [Three.js](https://threejs.org/)
* [Swiper](https://swiperjs.com/)

Three.js is loaded as an ES module through an import map, while Swiper is loaded as a local JavaScript asset.

## Project Structure

The project is expected to use a structure similar to:

```text
project/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   ├── s-2.min.css
│   │   └── ...
│   │
│   ├── js/
│   │   ├── swiper-bundle.min.js
│   │   ├── three.module.js
│   │   └── ...
│   │
│   ├── images/
│   │   ├── wpthreejs-1.png
│   │   ├── f-video.jpg
│   │   ├── charcter.jpg
│   │   ├── 01.png
│   │   ├── dep-01.jpg
│   │   ├── dep-02.jpg
│   │   ├── ...
│   │   ├── s-01.jpg
│   │   ├── s-02.jpg
│   │   └── ...
│   │
│   └── videos/
│       └── Sequence 01_7.mp4
│
└── README.md
```

## Running Locally

Because the project uses JavaScript modules and local assets, it is recommended to run it through a local web server rather than opening `index.html` directly with `file://`.

### Option 1 — Python

If Python is installed:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 2 — VS Code

Use the **Live Server** extension and open `index.html`.

## Responsive Behavior

The project uses different behavior depending on viewport size.

The desktop hero starts at `1024px` and above, while the original hero animation is intentionally skipped on desktop.

The project also uses responsive image sources. For example, the character section provides a mobile-specific image and a desktop image through `<picture>`.

## Desktop Hero Animation

The desktop hero uses a separate JavaScript animation.

The animation architecture separates:

```text
Desktop Hero
│
├── Text
│   ├── ما مسیر
│   ├── رشد
│   └── برندها را طراحی می‌کنیم
│
└── Independent Media Layer
    └── Image / Video
```

The media layer is moved out of the text flex layout at runtime so that it can expand independently without changing the position of the text.

The desktop animation code is activated only when the viewport is at least `1024px`.

## Department Interaction

The departments section uses wheel and touch interaction.

Users can move between departments using:

* Mouse wheel
* Touch gestures

The active department changes dynamically, and the corresponding image is updated.

## Text Animations

Several sections use JavaScript-powered typing/reveal effects.

The project uses `IntersectionObserver` so animations can start when the relevant content becomes visible in the viewport.

## Three.js Gallery

The interactive gallery is built with Three.js.

The gallery dynamically adjusts:

* Camera aspect ratio
* Renderer dimensions
* Container height
* Orbit radius
* Image plane size
* Center image size

Different viewport widths use different gallery configurations.

## Browser Support

The project is intended for modern browsers supporting:

* ES Modules
* Import Maps
* IntersectionObserver
* ResizeObserver
* CSS Flexbox
* CSS Grid
* WebGL

Recommended browsers:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

## Development Notes

### RTL

The website is designed for Persian content and uses:

```html
<html lang="fa">
```

Several components explicitly use RTL direction.

### Local Assets

The website depends heavily on local image, video, CSS, and JavaScript files.

When deploying to GitHub, make sure the complete `assets` directory is committed.

### Video

The desktop hero uses a local MP4 video:

```text
assets/videos/Sequence 01_7.mp4
```

The video is configured with:

```html
autoplay
muted
playsinline
preload="auto"
```

and uses `f-video.jpg` as its poster image.

## Deployment with GitHub Pages

To deploy the project using GitHub Pages:

1. Create a GitHub repository.
2. Upload the complete project.
3. Make sure `index.html` is in the repository root.
4. Commit and push the files.
5. Open:

```text
Repository → Settings → Pages
```

6. Select the branch containing the website.
7. Select the root directory.
8. Save the configuration.

GitHub Pages will then serve the static website.

## Important

Do not remove the `assets` directory or change the relative paths unless the corresponding HTML/JavaScript references are updated.

For example:

```text
assets/images/dep-01.jpg
assets/images/s-01.jpg
assets/js/three.module.js
assets/videos/Sequence 01_7.mp4
```

are referenced directly by the page.

## License

This project is proprietary unless a separate license is provided by the project owner.

All branding, images, videos, logos, written content, and other project assets remain the property of their respective owners.


# وب‌سایت تری جی اس

وب‌سایت معرفی و ارائه خدمات برند **تری جی اس** با طراحی راست‌به‌چپ (RTL)، رابط کاربری واکنش‌گرا و مجموعه‌ای از انیمیشن‌ها و تعاملات بصری مبتنی بر JavaScript، Three.js و GSAP.

این پروژه با تمرکز بر ارائه یک تجربه بصری مدرن برای معرفی برند، خدمات، پروژه‌ها و بخش‌های مختلف مجموعه طراحی شده است.

---

## ✨ ویژگی‌های پروژه

* طراحی کاملاً **Responsive**
* پشتیبانی کامل از زبان فارسی و **RTL**
* طراحی اختصاصی بخش Hero
* انیمیشن ورود و نمایش متن‌ها
* Hero جداگانه برای دسکتاپ و موبایل
* استفاده از تصاویر Responsive با تگ `<picture>`
* انیمیشن‌های مبتنی بر Scroll
* استفاده از **Three.js** برای ایجاد جلوه‌های سه‌بعدی و تعاملی
* اسلایدر پروژه‌ها
* اسلایدر اعضای تیم
* بخش معرفی دپارتمان‌ها
* انیمیشن نمایش تصاویر هنگام ورود به Viewport
* افکت متن متحرک و Marquee
* استفاده از Intersection Observer
* استفاده از ویدئو و تصاویر محلی
* طراحی مناسب برای نمایش در دسکتاپ، تبلت و موبایل

---

## 🛠 تکنولوژی‌های استفاده‌شده

این پروژه با استفاده از تکنولوژی‌های زیر توسعه داده شده است:

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **Three.js**
* **Swiper.js**
* **GSAP**
* **Intersection Observer API**

---

## 📁 ساختار پروژه

ساختار کلی پروژه به شکل زیر است:

```text
project/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── swiper-bundle.min.js
│   │   └── ...
│   │
│   ├── images/
│   │   ├── Katibeh-1.png
│   │   ├── f-video.jpg
│   │   ├── charcter.jpg
│   │   ├── 01.png
│   │   ├── dep-01.jpg
│   │   ├── dep-02.jpg
│   │   ├── s-01.jpg
│   │   ├── s-02.jpg
│   │   └── ...
│   │
│   └── videos/
│       └── Sequence 01_7.mp4
│
└── README.md
```

---

## 🎬 بخش Hero

بخش Hero یکی از قسمت‌های اصلی پروژه است و برای دسکتاپ و موبایل رفتار متفاوتی دارد.

در نسخه دسکتاپ، انیمیشن Hero به‌صورت مستقل اجرا می‌شود و شامل مراحل زیر است:

1. نمایش متن اصلی در مرکز صفحه
2. جداسازی بخش‌های مختلف متن
3. ایجاد فضای بین کلمات
4. ورود تصویر به مرکز فضای ایجادشده
5. بزرگ شدن تصویر
6. تبدیل تصویر به حالت تمام‌صفحه

در نسخه موبایل نیز انیمیشن Hero به‌صورت جداگانه مدیریت می‌شود تا تجربه کاربری متناسب با اندازه صفحه حفظ شود.

---

## 📱 طراحی واکنش‌گرا

برای نمایش صحیح محتوا در اندازه‌های مختلف صفحه، پروژه برای دستگاه‌های زیر بهینه شده است:

* دسکتاپ
* لپ‌تاپ
* تبلت
* موبایل

همچنین برای تصاویر مهم از تکنیک Responsive Image استفاده شده است تا در هر دستگاه تصویر مناسب بارگذاری شود.

نمونه:

```html
<picture>
    <source media="(max-width: 767px)" srcset="assets/images/mobile.jpg">
    <source media="(min-width: 768px)" srcset="assets/images/desktop.jpg">
    <img src="assets/images/desktop.jpg" alt="">
</picture>
```

---

## 🎨 انیمیشن‌ها و تعاملات

بخش‌های مختلف سایت دارای انیمیشن‌های تعاملی هستند.

از جمله:

* نمایش تدریجی کلمات
* انیمیشن تصاویر
* انیمیشن هنگام ورود عناصر به Viewport
* حرکت عناصر هنگام Scroll
* Marquee
* انیمیشن Hero
* جلوه‌های سه‌بعدی با Three.js
* اسلایدرهای تعاملی

برای کنترل برخی از انیمیشن‌ها از `IntersectionObserver` استفاده شده است تا انیمیشن‌ها هنگام ورود عناصر به محدوده قابل مشاهده اجرا شوند.

---

## 🌐 Three.js

در بخش‌هایی از سایت از **Three.js** برای ایجاد جلوه‌های بصری و تعاملی استفاده شده است.

کتابخانه Three.js به‌صورت Local در پروژه قرار گرفته است و برای اجرای جلوه‌های سه‌بعدی و Canvas مورد استفاده قرار می‌گیرد.

---

## 🖼 تصاویر و ویدئو

فایل‌های تصویری و ویدئویی پروژه داخل پوشه `assets` قرار گرفته‌اند.

برای مثال:

```text
assets/images/
assets/videos/
```

ویدئوی مورد استفاده در پروژه نیز به‌صورت Local قرار گرفته است:

```text
assets/videos/Sequence 01_7.mp4
```

---

## 📊 اسلایدرها

برای ایجاد اسلایدرهای پروژه و تیم از **Swiper.js** استفاده شده است.

کتابخانه مورد استفاده:

```text
Swiper
```

این اسلایدرها برای نمایش بهتر محتوا در دسکتاپ و موبایل طراحی شده‌اند.

---

## 🚀 اجرای پروژه

از آنجا که پروژه یک وب‌سایت Front-End است، برای اجرای آن نیازی به Backend ندارید.

کافی است پروژه را Clone کنید:

```bash
git clone https://github.com/USERNAME/REPOSITORY.git
```

سپس وارد پوشه پروژه شوید:

```bash
cd REPOSITORY
```

و فایل زیر را در مرورگر باز کنید:

```text
index.html
```

### پیشنهاد

برای عملکرد بهتر JavaScript، Three.js، ویدئو و سایر Assetها، بهتر است پروژه با یک Web Server محلی اجرا شود.

برای مثال با VS Code و افزونه **Live Server**:

```text
Right Click → Open with Live Server
```

---

## 📦 وابستگی‌ها

کتابخانه‌های اصلی مورد استفاده در پروژه عبارت‌اند از:

```text
Three.js
Swiper.js
GSAP
```

بخشی از این کتابخانه‌ها به‌صورت Local در پروژه قرار گرفته‌اند.

---

## 🌍 انتشار روی GitHub Pages

برای انتشار پروژه روی GitHub Pages:

1. یک Repository جدید در GitHub ایجاد کنید.
2. فایل‌های پروژه را داخل Repository قرار دهید.
3. تغییرات را Commit کنید.
4. پروژه را Push کنید.
5. وارد بخش:

```text
Settings → Pages
```

شوید.

6. در بخش **Build and deployment**، منبع انتشار را انتخاب کنید.
7. Branch موردنظر را انتخاب کنید.
8. پس از انتشار، GitHub یک آدرس برای سایت ایجاد خواهد کرد.

---

## 📂 فایل اصلی پروژه

صفحه اصلی سایت:

```text
index.html
```

است و ساختار اصلی صفحه، بخش‌های مختلف سایت، Hero و منطق اولیه اجرای پروژه را در خود دارد.

---

## ⚡ عملکرد

برای حفظ عملکرد مناسب سایت:

* تصاویر به‌صورت Responsive استفاده شده‌اند.
* انیمیشن‌ها بر اساس Viewport اجرا می‌شوند.
* عناصر غیرضروری در زمان نامناسب اجرا نمی‌شوند.
* بخش‌های دسکتاپ و موبایل دارای منطق انیمیشن مستقل هستند.
* Assetهای پروژه به‌صورت Local نگهداری می‌شوند.

---

## 📱 سازگاری

این پروژه برای مرورگرهای مدرن طراحی شده است و از قابلیت‌های جدید JavaScript و Web APIهای مرورگر استفاده می‌کند.

مرورگرهای پیشنهادی:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

## 👨‍💻 توسعه‌دهنده

این پروژه به‌صورت اختصاصی برای وب‌سایت و هویت دیجیتال **تری جی اس** توسعه داده شده است.

---

## 📄 مجوز

این پروژه یک پروژه اختصاصی است.

تمام حقوق مربوط به کد، طراحی، تصاویر، ویدئوها و محتوای استفاده‌شده در این پروژه متعلق به صاحب پروژه است و استفاده، کپی یا انتشار مجدد آن بدون اجازه مجاز نیست.
