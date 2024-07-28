import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="flex items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Name <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cheese Pizza"
                  className="bg-white"
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Price <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="100.00" className="bg-white" />
              </FormControl>
            </FormItem>
          );
        }}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
