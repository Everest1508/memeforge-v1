// components/ui/search-input.tsx
import { Input } from "@/components/ui/input";

const SearchInput = ({ value, onChange, placeholder }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full"
    />
  );
};

export default SearchInput;
