import { useNavigate } from "react-router";
import { useAddNewHotelMutation } from "../../redux/hotel/hotel.api";
import { faker } from "@faker-js/faker";
import { FC, useState } from "react";
import { CreateHotelDto } from "../../redux/hotel/hotel.types";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useAppSelector } from "../../redux/hooks";

export const NewHotelForm: FC<{
  onSubmit?: () => void;
  onCancel?: () => void;
}> = ({ onSubmit, onCancel }) => {
  const organizationId = useAppSelector((state) => state.organization.id);
  const [addNewHotel, { isLoading }] = useAddNewHotelMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateHotelDto>({
    name: faker.person.fullName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postalCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!organizationId) {
      return;
    }

    try {
      await addNewHotel({ organizationId, hotel: formData });

      if (onSubmit) {
        onSubmit();
      } else {
        navigate("/app");
      }
    } catch (error) {
      console.log(error);
      if (onCancel) onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className={key === "address" ? "md:col-span-2" : ""}>
            <label className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {!(key === "email" || key === "country") && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <Input
              type={key === "email" ? "email" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              required={!(key === "email" || key === "country")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="text-red-500">*</span> Required fields
          </div>
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              onClick={() => {
                if (onCancel) onCancel();
                else navigate("/app");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="secondary"
              disabled={isLoading}
              className="relative min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">Add Hotel</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </>
              ) : (
                "Add Hotel"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
