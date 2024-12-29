import { NewHotelForm } from "./NewHotelForm";

export const NewHotel = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Add New Hotel</h2>
        <p className="mt-2 text-sm text-gray-600">
          Please fill in the hotel details below. Fields marked with an asterisk
          (*) are required.
        </p>
      </div>

      <NewHotelForm />
    </div>
  );
};
