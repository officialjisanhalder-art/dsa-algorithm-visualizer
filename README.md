# 📊 DSA Algorithm Visualizer

![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-6c63ff?style=for-the-badge&logo=github)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A web-based visualizer to watch sorting algorithms run step by step — built to make DSA easier to understand!

I built this while self-learning Data Structures & Algorithms because I kept getting confused about how sorting actually works internally. Reading textbooks wasn't enough — watching it visually made everything click.

---

## 🎥 Live Demo

🔗 **[Try it here → officialjisanhalder-art.github.io/dsa-algorithm-visualizer](https://officialjisanhalder-art.github.io/dsa-algorithm-visualizer/)**

> Or clone and open `index.html` locally — no installations needed!

---

## ✨ Features

- 🫧 **Bubble Sort** — with step-by-step comparison highlights
- 🔍 **Selection Sort** — watch it find the minimum each pass
- 🃏 **Insertion Sort** — see elements slide into position
- 🔀 **Merge Sort** — divide and conquer in action
- ⚡ **Quick Sort** — pivot partitioning visualized

### Controls
- Adjust **array size** (10 to 80 elements)
- Control **animation speed** (Very Slow → Very Fast)
- Generate a new **random array** anytime
- **Stop** mid-sort and try another algorithm

### Real-time Stats
- Live **comparison counter**
- Live **swap counter**
- Algorithm **time complexity** display

---

## 🎨 Color Guide

| Color | Meaning |
|-------|---------|
| 🔵 Blue | Unsorted element |
| 🟡 Yellow | Currently comparing |
| 🔴 Red | Being swapped |
| 🟢 Green | Sorted / in place |
| 🟣 Purple | Pivot (Quick Sort) |

---

## 🚀 How to Run

Just download and open in browser:

```bash
git clone https://github.com/yourusername/dsa-visualizer.git
cd dsa-visualizer
# Open index.html in your browser
```

No npm, no frameworks, no setup. Pure HTML + CSS + JS.

---

## 📚 Algorithms & Complexity

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

---

## 🛠️ Tech Stack

- HTML5
- CSS3 (custom dark theme, animations)
- Vanilla JavaScript (async/await for animation)

---

## 📖 What I Learned

- How async/await can be used to create animation delays
- The actual internal workings of sorting algorithms
- DOM manipulation and real-time UI updates
- Time and space complexity trade-offs

---

## 🔮 Future Plans

- [ ] Add more algorithms (Heap Sort, Radix Sort, Shell Sort)
- [ ] Add sound effects for comparisons/swaps
- [ ] Show algorithm pseudocode alongside visualization
- [ ] Mobile responsive improvements
- [ ] Dark/Light mode toggle

---

## 🤝 Contributing

Feel free to fork this and add more algorithms! Open a PR and I'll review it.

---

*Built as a self-learning project while preparing for B.Tech — by Jisan Halder*
