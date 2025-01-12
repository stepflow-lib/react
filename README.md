# React StepFlow

> An onboarding component for react, with a simple and easy to use API and a set of built-in components.

[![NPM Version](https://img.shields.io/npm/v/react-stepflow.svg)](https://www.npmjs.com/package/react-stepflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

🎨 Fully customizable UI components  
🔄 Smooth animations powered by Framer Motion  
🌗 Dark/Light theme support built-in  
📱 Mobile-first responsive design  
⚡ Zero-config Tailwind CSS integration  
✨ Type-safe with full TypeScript support

## Installation

```bash
npm install react-stepflow
```

## Peer Dependencies

```json
{
  "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
  "framer-motion": "^10.12.16",
  "lucide-react": "^0.244.0",
  "clsx": "^1.2.1",
  "tailwind-merge": "^1.12.0"
}
```

## Quick Start

```jsx
import {
  OnboardingProvider,
  OnboardingStep,
  OnboardingHeader,
  OnboardingStepIndicator,
} from "react-stepflow";
import "react-stepflow/index.css";

function App() {
  const steps: OnboardingStep[] = [
    { id: 1, component: <Welcome /> },
    { id: 2, component: <Setup /> },
    { id: 3, component: <Complete /> },
  ];

  return (
    <OnboardingProvider stepsCount={steps.length}>
      <div className="flex flex-col gap-4">
        <OnboardingHeader title="Welcome" />
        <OnboardingStepIndicator totalSteps={steps.length} />
        <OnboardingSteps steps={steps} />
      </div>
    </OnboardingProvider>
  );
}
```

## Components API

### OnboardingProvider

Root component that provides onboarding context.

| Prop         | Type        | Default      | Description                      |
| ------------ | ----------- | ------------ | -------------------------------- |
| `children`   | `ReactNode` | **required** | Child components                 |
| `stepsCount` | `number`    | **required** | Total number of onboarding steps |

### OnboardingSteps

Container component with animation support.

| Prop                      | Type                | Default      | Description               |
| ------------------------- | ------------------- | ------------ | ------------------------- |
| `steps`                   | `OnboardingStep[]`  | **required** | Array of step components  |
| `customAnimationConfig`   | `AnimationConfig`   | optional     | Custom animation settings |
| `customAnimationVariants` | `AnimationVariants` | optional     | Custom animation variants |

### OnboardingStepIndicator

Progress indicator component.

| Prop                    | Type              | Default      | Description               |
| ----------------------- | ----------------- | ------------ | ------------------------- |
| `totalSteps`            | `number`          | **required** | Total number of steps     |
| `className`             | `string`          | optional     | Custom container class    |
| `customAnimationConfig` | `AnimationConfig` | optional     | Custom animation settings |

### Button

Customizable button component.

| Prop       | Type                                               | Default     | Description          |
| ---------- | -------------------------------------------------- | ----------- | -------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Button style variant |
| `size`     | `'sm' \| 'md' \| 'lg'`                             | `'md'`      | Button size          |
| `loading`  | `boolean`                                          | `false`     | Loading state        |
| `disabled` | `boolean`                                          | `false`     | Disabled state       |

### Input

Form input component with validation.

| Prop           | Type      | Default  | Description              |
| -------------- | --------- | -------- | ------------------------ |
| `label`        | `string`  | optional | Input label              |
| `required`     | `boolean` | `false`  | Required field indicator |
| `errorMessage` | `string`  | optional | Validation error message |

### TextLabel

Label text component.

| Prop        | Type     | Default      | Description  |
| ----------- | -------- | ------------ | ------------ |
| `text`      | `string` | **required** | Label text   |
| `className` | `string` | optional     | Custom class |

### Checkbox

Custom checkbox component.

| Prop       | Type                         | Default      | Description    |
| ---------- | ---------------------------- | ------------ | -------------- |
| `name`     | `string`                     | **required** | Checkbox name  |
| `checked`  | `boolean`                    | **required** | Checked state  |
| `onChange` | `(checked: boolean) => void` | **required** | Change handler |
| `children` | `ReactNode`                  | **required** | Label content  |

### Dropdown

Customizable dropdown component.

| Prop        | Type                                       | Default      | Description      |
| ----------- | ------------------------------------------ | ------------ | ---------------- |
| `value`     | `string \| null`                           | **required** | Selected value   |
| `setValue`  | `Dispatch<SetStateAction<string \| null>>` | **required** | Value setter     |
| `children`  | `ReactNode`                                | **required** | Dropdown content |
| `className` | `string`                                   | optional     | Custom styling   |

### FormField

Base form field wrapper component.

| Prop             | Type      | Default      | Description              |
| ---------------- | --------- | ------------ | ------------------------ |
| `label`          | `string`  | **required** | Field label              |
| `id`             | `string`  | optional     | Input element ID         |
| `className`      | `string`  | optional     | Container class          |
| `inputClassName` | `string`  | optional     | Input element class      |
| `labelClassName` | `string`  | optional     | Label element class      |
| `required`       | `boolean` | `false`      | Required field indicator |
| `errorMessage`   | `string`  | optional     | Validation error message |

### Spinner

Loading spinner component.

| Prop        | Type     | Default  | Description          |
| ----------- | -------- | -------- | -------------------- |
| `className` | `string` | optional | Custom styling class |

Default styling includes:

- Animated spinning effect
- Responsive sizing (w-5 h-5)
- Semi-transparent appearance
- Current color inheritance

## Extras

For the components like that can't be targetted direcly, I've provided classnames to target them

- `OnboardingStepDivider`: **onboarding-divider-outer** and **onboarding-divider-inner**
- `OnboardingStepCircle`: **onboarding-step-circle**

## Animation Types

### AnimationConfig

| Property    | Type                         | Default        | Description         |
| ----------- | ---------------------------- | -------------- | ------------------- |
| `duration`  | `number`                     | `0.3`          | Animation duration  |
| `ease`      | `string`                     | `'easeInOut'`  | Easing function     |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Animation direction |

### AnimationVariants

| Property  | Type                | Description              |
| --------- | ------------------- | ------------------------ |
| `initial` | `AnimationProperty` | Starting animation state |
| `animate` | `AnimationProperty` | Active animation state   |
| `exit`    | `AnimationProperty` | Exit animation state     |

## Hook APIs

### useOnboarding

| Property      | Type                     | Description           |
| ------------- | ------------------------ | --------------------- |
| `currentStep` | `number`                 | Current active step   |
| `totalSteps`  | `number`                 | Total number of steps |
| `next`        | `() => void`             | Go to next step       |
| `prev`        | `() => void`             | Go to previous step   |
| `goToStep`    | `(step: number) => void` | Go to specific step   |

```

```

## Types API

### OnboardingStep

| Property    | Type        | Description            |
| ----------- | ----------- | ---------------------- |
| `id`        | `number`    | Unique step identifier |
| `component` | `ReactNode` | Step content component |

### AnimationConfig

| Property    | Type                         | Description         |
| ----------- | ---------------------------- | ------------------- |
| `duration`  | `number`                     | Animation duration  |
| `ease`      | `string`                     | Easing function     |
| `direction` | `'horizontal' \| 'vertical'` | Animation direction |

### AnimationProperty

| Property  | Type     | Description        |
| --------- | -------- | ------------------ |
| `opacity` | `number` | Opacity value      |
| `x`       | `number` | X-axis translation |
| `y`       | `number` | Y-axis translation |

### AnimationVariants

| Property  | Type                | Description     |
| --------- | ------------------- | --------------- |
| `initial` | `AnimationProperty` | Initial state   |
| `animate` | `AnimationProperty` | Animation state |
| `exit`    | `AnimationProperty` | Exit state      |

### ButtonProps

| Property  | Type                                               | Description   |
| --------- | -------------------------------------------------- | ------------- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | Button style  |
| `size`    | `'sm' \| 'md' \| 'lg'`                             | Button size   |
| `loading` | `boolean`                                          | Loading state |

### FormFieldProps

| Property         | Type     | Description         |
| ---------------- | -------- | ------------------- |
| `label`          | `string` | Field label         |
| `className`      | `string` | Container class     |
| `inputClassName` | `string` | Input element class |
| `labelClassName` | `string` | Label element class |
| `errorMessage`   | `string` | Error message       |

### CheckboxProps

| Property    | Type                         | Description    |
| ----------- | ---------------------------- | -------------- |
| `name`      | `string`                     | Checkbox name  |
| `children`  | `ReactNode`                  | Label content  |
| `checked`   | `boolean`                    | Checked state  |
| `onChange`  | `(checked: boolean) => void` | Change handler |
| `className` | `string`                     | Custom class   |

### OnboardingContextValue

| Property      | Type                     | Description            |
| ------------- | ------------------------ | ---------------------- |
| `currentStep` | `number`                 | Current step index     |
| `totalSteps`  | `number`                 | Total steps count      |
| `next`        | `() => void`             | Next step function     |
| `prev`        | `() => void`             | Previous step function |
| `goToStep`    | `(step: number) => void` | Go to step function    |

### DropdownProps

| Property    | Type        | Description      |
| ----------- | ----------- | ---------------- |
| `children`  | `ReactNode` | Dropdown content |
| `className` | `string`    | Custom class     |

### TextLabelProps

| Property    | Type     | Description  |
| ----------- | -------- | ------------ |
| `text`      | `string` | Label text   |
| `className` | `string` | Custom class |

## Styling

The package uses Tailwind CSS for styling.  
Import `import "react-stepflow/index.css";` into your app component.

### Browser Support

- Chrome (latest 3 versions)
- Firefox (latest 3 versions)
- Safari (latest 2 versions)
- Edge (latest 3 versions)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Created by [David Jaja](https://x.com/JajaDavid8)
