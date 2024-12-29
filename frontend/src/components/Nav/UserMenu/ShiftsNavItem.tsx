import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useLazyGetUserShiftsQuery } from "../../../redux/user/user.api";
import { Badge } from "../../Badge/Badge";
import { HoverableIcon } from "../../Icons/HoverableIcon";
import { NotificationsIcon } from "../../Icons/NotificationsIcon";
import { Loading } from "../../Loading/Loading";

export const ShiftsNavItem = () => {
  const userId = useAppSelector((state) => state.auth.userId);
  const organizationId = useAppSelector((state) => state.organization.id);
  const [getShifts, { isLoading, isUninitialized, data }] =
    useLazyGetUserShiftsQuery();
  const [shiftCount, setShiftCount] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource(`/api/events/shifts`, {
      withCredentials: true,
    });

    eventSource.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        if (
          data.type === "shift_added_event" &&
          userId &&
          userId === data.userId
        ) {
          setShiftCount(data.shiftCount);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
    };

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [userId, organizationId]);

  useEffect(() => {
    if (userId && organizationId) {
      getShifts({ userId, organizationId });
    }
  }, [getShifts, userId, organizationId]);

  useEffect(() => {
    if (data) {
      setShiftCount(data.length);
    }
  }, [data]);

  if (isUninitialized || isLoading) {
    return <Loading size="sm" />;
  }

  return (
    <div className="relative">
      <HoverableIcon>
        <NotificationsIcon />
        {shiftCount > 0 && <Badge>{shiftCount}</Badge>}
      </HoverableIcon>
    </div>
  );
};
