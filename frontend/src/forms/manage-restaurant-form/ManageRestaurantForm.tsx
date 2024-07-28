import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "../../components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "../../components/LoadingButton";
import { Button } from "../../components/ui/button";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery Price is required",
    invalid_type_error: "Must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated Delivery Time is required",
    invalid_type_error: "Must be a valid number",
  }),
  cuisines: z.array(
    z.string().nonempty({ message: "Please select at least one item" })
  ),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      price: z.coerce.number().min(1, "Price is required "),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required" }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: RestaurantFormData) => {
    // convert formdatajson to a new form data object
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) =>
      formData.append(`cuisines[${index}]`, cuisine)
    );
    formDataJson.menuItems.forEach(
      (menuItem, index) => (
        formData.append(`menuItems[${index}][name]`, menuItem.name),
        formData.append(
          `menuItems[${index}][price]`,
          (menuItem.price * 100).toString()
        )
      )
    );
    formData.append(`imageFile`, formDataJson.imageFile);

    onSave(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 rounded-lg "
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
