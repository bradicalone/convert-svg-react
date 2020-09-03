# SVG Converter

## Prerequisites

Using an inline xml SVG:

* Example below of an svg inline element to be converted into a useable react component:

```html
<div class="photo-robot-wrapper">
  <svg version="1.1" id="photo-robot" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 661.869 785.377" xml:space="preserve">
  <style type="text/css">
    .photo-st0{fill:#061E2D;}
    .photo-st1{fill:#40A6BF;}
  </style>
  <use xlink:href="/svg/svg-sprite#my-icon"/>
  <circle class="photo-st0" cx="276.101" cy="181.159" r="40.222"/>
  <linearGradient id="photo-fill_1_" gradientUnits="userSpaceOnUse" x1="253.2721" y1="199.6016" x2="306.5327" y2="199.6016">
		<stop  offset="0" style="stop-color:#C4C4C4"/>
		<stop  offset="0" style="stop-color:#C5C5C5"/>
  </linearGradient>
  </svg>
</div>
```

Converted:

```html
<div className="photo-robot-wrapper">
   <svg version="1.1" id="photo-robot" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 661.869 785.377" xmlSpace="preserve">
     <style type="text/css">{
      ".photo-st0{fill:#061E2D;}"+
      ".photo-st1{fill:#40A6BF;}"
     }</style>
     <use href="/svg/svg-sprite#my-icon"/>
     <circle className="photo-st0" cx="276.101" cy="181.159" r="40.222"/>
     <linearGradient id="photo-fill_1_" gradientUnits="userSpaceOnUse" x1="253.2721" y1="199.6016" x2="306.5327" y2="199.6016">
      <stop  offset="0" stopColor="#C4C4C4"/>
      <stop  offset="0" stopColor="#C5C5C5"/>
     </linearGradient>
  </svg>
</div>
```

## Installing <svg-to-react-converter>

To install , follow these steps:
- Clone repository
- `cd svg-react-converter`

```
npm install
```

## Using in Development

To use <svg-converter>, follow these steps:

```
npm run build
```

- Opens in the browser, usually at `http://localhost:8080/` :
```
npm run start:dev
```
