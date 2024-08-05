import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cuisineList } from "../config/restaurant-options-config";
import { Label } from "./ui/label";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedcuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedcuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedcuisine);

    onChange(newCuisinesList);
  };
  const handleCuisinesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col ">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, i) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={i + cuisine}>
                <input
                  type="checkbox"
                  id={`cuisine_${cuisine}`}
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold  ${
                    isSelected
                      ? "border-green-600 text-green-600"
                      : "border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button
          variant="outline"
          className="mt-4 flex-1 *:flex *:flex-row *:items-center"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="">
              View less <ChevronUp />
            </span>
          ) : (
            <span className="">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
