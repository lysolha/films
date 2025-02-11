import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const SelectFilter = ({ filters, setFilters, options, defaultValue }) => {
  return (
    <div>
      <span>Set at least 3 characters in Search field </span>
      <Input
        className="mb-3"
        value={filters.searchValue}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, searchValue: e.target.value }))
        }
        placeholder="Search..."
      ></Input>
      <Select
        value={filters.sortType}
        onValueChange={(value) => {
          const valueArr = value.split("-");
          const order = valueArr[1] === "Z" ? "DESC" : "ASC";

          setFilters((prev) => ({
            ...prev,
            sortType: value,
            order: order,
          }));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              return (
                <SelectItem key={option.id} value={option.value}>
                  {option.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectFilter;
