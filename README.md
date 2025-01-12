# TimePick Kit React

A flexible and customizable time picker component for React applications with built-in popover support.

## Features

🎨 Fully customizable styling via Tailwind CSS  
🔄 Smooth animations with Framer Motion  
⌨️ Keyboard navigation support  
🎯 Click outside detection  
🌗 Light/Dark mode support  
📱 Mobile-friendly design  
⚡ Lightweight and performant  
🔌 Easy integration

## Installation

```bash
npm install timepick-kit-react
```

### Required Peer Dependencies

The following packages are required as peer dependencies:

```json
{
  "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
  "date-fns": "^2.30.0",
  "framer-motion": "^10.12.16",
  "lucide-react": "^0.244.0",
  "clsx": "^1.2.1",
  "tailwind-merge": "^1.12.0"
}
```

## Basic Usage

```tsx
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverButton,
  TimePicker,
  TimeInput,
} from "timepick-kit-react";
import "timepick-kit-react/index.css";

function App() {
  const [time, setTime] = useState<TimeInput>(new Date());

  return (
    <Popover>
      <PopoverTrigger>
        <PopoverButton time={time} />
      </PopoverTrigger>
      <PopoverContent>
        <TimePicker value={time} onChange={(newTime) => setTime(newTime)} />
      </PopoverContent>
    </Popover>
  );
}
```

## Components API

### TimePicker

Main component for time selection.

| Prop                    | Type                   | Default       | Description                                       |
| ----------------------- | ---------------------- | ------------- | ------------------------------------------------- |
| `value`                 | `TimeInput`            | **required**  | Current time value (Date, string, or Time object) |
| `onChange`              | `(time: Time) => void` | **required**  | Callback when time changes                        |
| `toggle`                | `() => void`           | optional      | Function to close picker                          |
| `timepickerClassName`   | `string`               | optional      | Custom class for picker container                 |
| `buttonClassName`       | `string`               | optional      | Custom class for increment/decrement buttons      |
| `sectionClassName`      | `string`               | optional      | Custom class for hour/minute sections             |
| `inputClassName`        | `string`               | optional      | Custom class for time input fields                |
| `periodToggleClassName` | `string`               | optional      | Custom class for AM/PM toggle                     |
| `closeButtonClassName`  | `string`               | optional      | Custom class for close button                     |
| `incrementIcon`         | `LucideIcon`           | `ChevronUp`   | Custom icon for increment button                  |
| `decrementIcon`         | `LucideIcon`           | `ChevronDown` | Custom icon for decrement button                  |
| `closeIcon`             | `LucideIcon`           | `X`           | Custom icon for close button                      |

### Popover Components

#### `<Popover />`

Container component that manages popover state.

| Prop        | Type        | Default      | Description                |
| ----------- | ----------- | ------------ | -------------------------- |
| `children`  | `ReactNode` | **required** | Popover content components |
| `className` | `string`    | optional     | Additional CSS classes     |

#### `<PopoverTrigger />`

Trigger element that toggles the popover.

| Prop        | Type        | Default      | Description                   |
| ----------- | ----------- | ------------ | ----------------------------- |
| `children`  | `ReactNode` | **required** | Element that triggers popover |
| `className` | `string`    | optional     | Additional CSS classes        |

#### `<PopoverContent />`

Content container for the popover.

| Prop        | Type          | Default                                 | Description                      |
| ----------- | ------------- | --------------------------------------- | -------------------------------- |
| `children`  | `ReactNode`   | **required**                            | Content to display in popover    |
| `className` | `string`      | optional                                | Additional CSS classes           |
| `isAnimate` | `boolean`     | `true`                                  | Enable/disable animations        |
| `variants`  | `MotionProps` | [Default Animation](#default-animation) | Framer Motion animation variants |

##### Default Animation

```tsx
{
  initial: { opacity: 0, y: "20%" },
  animate: { opacity: 1, y: "5%" },
  exit: { opacity: 0, y: "-20%" },
  transition: { duration: 0.2 }
}
```

## Types

### TimeInput

```ts
type TimeInput = Date | string | Time;

interface Time {
  hour: number; // 1-12
  minute: number; // 0-59
  period: "AM" | "PM";
}
```

## Styling

The package uses Tailwind CSS for styling.  
Import `import "timepick-kit-react/index.css";` into your app component.

## Utility Functions

### `formatTime`

```ts
import { formatTime } from "timepick-kit-react";

const timeString = formatTime(new Date()); // Returns "hh:mm a" format
```

### `useTimePicker`

```ts
import { useTimePicker } from "timepick-kit-react";

const { time, setHour, setMinute, setPeriod } = useTimePicker(initialValue);
```

### `useClickOutside`

```ts
import { useClickOutside } from "timepick-kit-react";

useClickOutside(ref, handleClickOutside);
```

## Features

### Keyboard Navigation

- **Up/Down arrows**: Increment/decrement values
- **Enter**: Confirm selection
- **Tab**: Navigate between inputs
- **Escape**: Close picker

### Customization

- Custom icons support
- Flexible styling with Tailwind CSS
- Animation customization via Framer Motion
- Light/Dark mode theming

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Created by [David Jaja](https://x.com/JajaDavid8)
