import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { faker } from "@faker-js/faker";
import { CreateHotelDto } from "../../redux/hotel/hotel.types";
import { useAddNewHotelMutation } from "../../redux/hotel/hotel.api";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router";

export const NewHotelForm = () => {
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
      const response = await addNewHotel({ organizationId, hotel: formData });

      if (response.data?.ok) {
        navigate("/app");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {!(key === "email" || key === "country") && (
                  <span className="text-red-600">*</span>
                )}
              </label>
              <Input
                type="text"
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                required={!(key === "email" || key === "country")}
                className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
              />
            </div>
          ))}
        </div>
        <div className="w-full mt-4 flex justify-between">
          <div className="text-sm text-gray-700 mt-2">
            <span className="text-red-500">*</span> Required fields
          </div>
          <Button type="submit" color="secondary" disabled={isLoading}>
            Add Hotel
          </Button>
        </div>
      </form>
    </>
  );
};
