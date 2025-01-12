import React, { useState } from "react";
import { useOnboarding } from "../../hooks/useOnboarding";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export const WorkspaceSetup: React.FC = () => {
  const { next, prev } = useOnboarding();
  const [workspaceName, setWorkspaceName] = useState("");
  const [inviteEmails, setInviteEmails] = useState("");

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Set up your workspace</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="space-y-4">
        <Input
          label="Workspace Name"
          id="workspace-name"
          type="text"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          required
          errorMessage="Workspace name is required"
        />
        <Input
          label="Invite Team Members (Optional)"
          id="invite-emails"
          type="text"
          value={inviteEmails}
          onChange={(e) => setInviteEmails(e.target.value)}
          placeholder="Enter email addresses, separated by commas"
        />
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
