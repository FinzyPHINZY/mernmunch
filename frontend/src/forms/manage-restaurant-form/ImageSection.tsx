import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

const ImageSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div className="">
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>Add a cover image for your restaurant</FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white "
                    type="file"
                    accept=".jpg, .jpeg,.png"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ImageSection;
