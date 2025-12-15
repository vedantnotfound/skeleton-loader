# react-auto-skeleton-loader

A zero-config, "magic" skeleton loader generator for React.
Wrap your component, and it automatically generates a skeleton layout matching your actual UI structure.

## 📦 Installation

```bash
npm install react-auto-skeleton-loader
# or
yarn add react-auto-skeleton-loader
```

## 🚀 Usage

1. Import the component and styles.
2. Wrap your target component with `<AutoSkeleton>`.
3. Pass `loading={true}` to see the skeleton.

**Important**: Your component must render its layout structure (even with dummy data/text) for the skeleton to measure it. The library makes the content invisible and draws skeletons over it.

```tsx
import { AutoSkeleton } from 'react-auto-skeleton-loader';
import 'react-auto-skeleton-loader/dist/style.css'; 

function UserProfile({ isLoading, user }) {
  // Even when loading, render the layout!
  // Use safe checks (user?.name) or dummy data.
  
  return (
    <AutoSkeleton loading={isLoading}>
      <div className="card">
        <img 
            src={user?.avatar || '/placeholder.png'} 
            className="avatar" 
            alt="avatar" 
        />
        <h3>{user?.name || 'User Name'}</h3>
        <p>{user?.bio || 'Short user bio goes here...'}</p>
        <button>Follow</button>
      </div>
    </AutoSkeleton>
  );
}
```

## ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | **Required** | When `true`, hides children and shows skeleton overlay. |
| `children`| `ReactNode`| **Required** | The component layout to analyze. |
| `animate` | `boolean` | `true` | Enable/disable shimmer animation. |

## 🛠 How it Works

1. **Wraps** your children in a relative container.
2. **Hides** the children using `visibility: hidden` opacity 0 (so they retain layout size).
3. **Analyzes** the DOM using `BoundingClientRect` to find images, headings, buttons, and text blocks.
4. **Overlays** absolute positioned skeleton blocks that match the exact geometry of your elements.
5. **Updates** automatically if the layout changes (via `ResizeObserver` and `MutationObserver`).

## ⚠️ Limitations

- **Render Required**: Your component must be mounted and render DOM elements for them to be measured. If your component returns `null` when loading, no skeleton will appear.
- **Complex styles**: Elements with complex shapes (clip-path) or transforms might not be perfectly matched, though standard transforms usually trigger correct bounding boxes.
- **Leaf Nodes**: The analyzer focuses on "leaf" content (text, images, inputs). Container divs usually aren't drawn unless they have specific backgrounds, to avoid clutter.

## 📄 License

MIT
