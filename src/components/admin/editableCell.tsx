import { HTMLInputTypeAttribute, useState } from "react";
import { Input } from "../ui/input";
import { TableCell } from "../ui/table";

interface Props {
  value: string;
  onSave: (newValue: string) => void;
  type?: HTMLInputTypeAttribute;
}

export default function EditableCell({ value, onSave, type = "text" }: Props) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  return (
    <TableCell
      onClick={() => setEditing(true)}
      className="font-medium cursor-pointer"
    >
      {editing ? (
        <Input
          autoFocus
          type={type}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={() => {
            setEditing(false);
            onSave(tempValue);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditing(false);
              onSave(tempValue);
            }
          }}
        />
      ) : (
        tempValue
      )}
    </TableCell>
  );
}
