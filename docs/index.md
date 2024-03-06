---
toc: false
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 2rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>

<div class="hero">
  <h1>Singapore Blood Stocks Tracker</h1>
  <h2> See <a href="https://sriramsami.com/bloodstocks/" target="_blank">this blog post</a> for more details on the methodology of this data. </h2>
</div>


```js
let orig_data = await FileAttachment("./data/blood.json").json();
const data = orig_data.map((d) => ({...d, date: new Date(d.date)}));
// display(data);

function bloodstocks(data, {width} = {}) {
  return Plot.plot({
    title: "Singapore Blood Stock Amounts",
    width,
    height: 300,
    grid: true,
    x: {label: "Date"},
    y: {label: "Stock Percentage (%)"},
    color: {legend: true},
    marks: [
        Plot.line(data, {x: "date", y: "fillLevel", stroke: "bloodType", tip: true}),
    ]
  });
}
display(bloodstocks(data, {width}))
```

<!-- <div class="grid grid-cols-1" style="grid-auto-rows: 504px;">
  <div class="card">${
    resize((width) => Plot.plot({
      title: "Singapore Blood Stock Tracker",
      width,
      grid: true,
      x: {label: "Date"},
      y: {label: "Stock Percentage (%)"},
      color: {legend: true},
      marks: [
        Plot.linearRegressionY(penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species"}),
        Plot.dot(penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species", tip: true})
      ]
    }))
  }</div>
</div> -->

---