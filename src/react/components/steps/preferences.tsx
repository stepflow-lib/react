import React, { useState } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
} from "../../ui/dropdown";
import { useOnboarding } from "../../hooks/useOnboarding";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { TextLabel } from "../../ui/text-label";
import { useTheme } from "../../hooks/useTheme";

export const Preferences: React.FC = () => {
  const { next, prev } = useOnboarding();
  const [theme, setTheme] = useState<string | null>("");

  const { setTheme: setUiTheme } = useTheme();

  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System Default" },
  ];

  const [checkBoxStates, setCheckBoxStates] = useState({
    notifications: false,
    newsletter: false,
    updates: false,
  });

  const setLightTheme = () => setUiTheme("light");
  const setDarkTheme = () => setUiTheme("dark");
  const setSystemTheme = () => {
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setUiTheme(preferredTheme);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Set your preferences</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Theme Preference
          </label>
          <Dropdown value={theme} setValue={setTheme}>
            <DropdownTrigger>
              <DropdownLabel>
                {themes.find((t) => t.value === theme)?.label ||
                  "Select a theme"}
              </DropdownLabel>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem value="dark" onClick={setDarkTheme}>
                Dark
              </DropdownItem>
              <DropdownItem value="light" onClick={setLightTheme}>
                Light
              </DropdownItem>
              <DropdownItem value="system" onClick={setSystemTheme}>
                System Default
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <Checkbox
                name="notifications"
                checked={checkBoxStates.notifications}
                onChange={(checked) =>
                  setCheckBoxStates({
                    ...checkBoxStates,
                    notifications: checked,
                  })
                }>
                <TextLabel text="Receive push notifications" />
              </Checkbox>
            </label>
          </div>
          <div>
            <Checkbox
              name="newsletter"
              checked={checkBoxStates.newsletter}
              onChange={(checked) =>
                setCheckBoxStates({ ...checkBoxStates, newsletter: checked })
              }>
              <TextLabel text="Subscribe to newsletter" />
            </Checkbox>
          </div>
          <div>
            <Checkbox
              name="updates"
              checked={checkBoxStates.updates}
              onChange={(checked) =>
                setCheckBoxStates({ ...checkBoxStates, updates: checked })
              }>
              <TextLabel text="Receive product updates" />
            </Checkbox>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prev}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};
