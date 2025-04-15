# 🛒 Custom Cart Modal + Styled Sort Dropdown

This project contains a **React/Next.js** shopping cart modal with Redux integration, as well as a **custom fully-styled dropdown** for sorting items using TailwindCSS.

---

## 🚀 Features

### 🛍 Cart Modal

* Displays cart items with price and quantity.
* Quantity can be incremented/decremented.
* Items can be removed from cart.
* Cart can be cleared completely.
* Checkout/Continue Shopping CTA.
* Overlay and modal design using Tailwind.

### 🎨 Custom Sort Dropdown

* Fully styled dropdown using TailwindCSS.
* Styled options (unlike native `<select>`).
* Handles value selection and passes to parent `onChange`.
* Dark mode compatible.

---

## 🧩 Folder Structure

```
components/
  ├─ CartModal.tsx         # Cart modal with Redux actions

store/
  ├─ store.ts              # Redux store setup
  ├─ slices/
        ├─ cartSlice.ts  
        ├─ productSlice.ts 


  # Cart slice: add, updateQuantity, remove, clear
```

---

## 📦 Installation

1. Clone the repo

```bash
git clone https://github.com/alanthomasdev/Ecommerce-demo.git
```

2. Navigate to the project directory

```bash
cd ecommerce-product
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

---

## ⚙️ Redux Slice Example

```ts
// store/slices/cartSlice.ts
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => { ... },
    removeFromCart: (state, action) => { ... },
    updateQuantity: (state, action) => { ... },
    clearCart: (state) => { state.items = []; }
  }
});
```

---

## 🧠 Usage

### CartModal

```tsx
<CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
```

### SortDropdown

```tsx
<SortDropdown onChange={(value) => console.log('Sort By:', value)} />
```

---

## 📄 License

MIT License

---

## 🙌 Contributions

Feel free to open issues or PRs to improve functionality, styling, or accessibility.

---

## 🔗 Credits

* Built with ❤️ using React + Redux + TailwindCSS
