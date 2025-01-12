import React, { useState } from "react";

import { Button } from "../../ui/button";

import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
} from "../../ui/dropdown";
import { Input } from "../../ui/input";
import { useOnboarding } from "../../hooks/useOnboarding";

export const PersonalInfo: React.FC = () => {
  const { next, prev } = useOnboarding();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [role, setRole] = useState<string | null>("");

  const roles = [
    { value: "individual", label: "Individual" },
    { value: "team_member", label: "Team Member" },
    { value: "manager", label: "Manager" },
    { value: "executive", label: "Executive" },
  ];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Tell us about yourself</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="space-y-4">
        <Input
          label="Full Name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          errorMessage="Full name is required"
        />
        <Input
          label="Email Address"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          errorMessage="Email name is required"
        />
        <div>
          <label htmlFor="role" className="block mb-1 text-sm font-medium">
            Your Role
          </label>
          <Dropdown value={role} setValue={setRole}>
            <DropdownTrigger>
              <DropdownLabel>
                {roles.find((r) => r.value === role)?.label ||
                  "Select your role"}
              </DropdownLabel>
            </DropdownTrigger>
            <DropdownContent>
              {roles.map((r) => (
                <DropdownItem key={r.value} value={r.value}>
                  {r.label}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
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
