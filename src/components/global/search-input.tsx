import { Input } from "@/components/ui/input";
import {SearchInputProps} from "@/types/search-input"

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex justify-center">
      <Input
        type="text"
        placeholder="Enter the Pokémon you want to search ..."
        className="w-full sm:w-1/2 mb-4 mt-8 text-center rounded"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
