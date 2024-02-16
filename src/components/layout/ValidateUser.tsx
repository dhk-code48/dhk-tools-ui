import React, { FC, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { textProps } from "@/lib/types/textProp";
import { handleValidation } from "@/lib/handleValidation";
import { toast } from "../ui/use-toast";
import { useStore } from "@/lib/store";

interface ValidateUserProps {
  data: textProps;
  handleVal: (password: string) => void;
}

const ValidateUser: FC<ValidateUserProps> = ({ data, handleVal }) => {
  const [password, setPassword] = useState<string>("");

  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">Enter Password To Access</h1>
      <p className="text-muted-foreground">
        The content you are trying to access is password protected,
        <br /> enter the password in the input field below to continue
      </p>
      <Input
        type="password" // Mask the entered password
        placeholder="Enter Password ..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => handleVal(password)}>Access</Button>
    </div>
  );
};

export default ValidateUser;
