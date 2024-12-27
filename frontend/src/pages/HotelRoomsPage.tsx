import { useNavigate, useParams } from "react-router";
import { Button } from "../components/Button/Button";
import { HotelRomms } from "../components/HotelRooms/HotelRooms";
import { Loading } from "../components/Loading/Loading";
import { CreateHotelRoom } from "../components/HotelRooms/CreateHotelRoom";

export const HotelRoomsPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();

  if (!hotelId) {
    return <Loading />;
  }

  const goBack = () => {
    navigate(`/app/hotel/${hotelId}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Button onClick={goBack}>Go back to hotel</Button>
        <CreateHotelRoom hotelId={hotelId} />
      </div>
      <HotelRomms hotelId={hotelId} />
    </div>
  );
};
