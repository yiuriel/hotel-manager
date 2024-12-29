import React from "react";
import { User } from "../../redux/user/user.types";
import { format } from "date-fns";
import { Shift } from "../../redux/shift/shift.types";

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const isShiftCurrentOrIncoming = (shift: Shift) => {
    const now = new Date();
    const shiftStartTime = new Date(shift.startTime);
    const shiftEndTime = new Date(shift.endTime);

    return now >= shiftStartTime && now < shiftEndTime;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600 mb-1">{user.email}</p>
        <p className="text-gray-600">{user.phone}</p>
      </div>

      <hr className="my-6 border-gray-200" />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Role</h2>
        <p className="mb-1">{user.role.name}</p>
        {user.role.description && (
          <p className="text-gray-600">
            role description: {user.role.description}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Permissions</h2>
        <div className="flex flex-wrap gap-2">
          {(user.permissions.length > 0
            ? user.permissions
            : [{ name: "N/A" }]
          ).map((permission, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-sm border border-blue-500 text-blue-500"
            >
              {permission.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Shifts</h2>
        <div className="space-y-3">
          {user.shifts
            .toSorted(
              (a, b) =>
                new Date(b.startTime).getTime() -
                new Date(a.startTime).getTime()
            )
            .map((shift) => (
              <div
                key={shift.id}
                className={`p-3 rounded-md ${
                  isShiftCurrentOrIncoming(shift)
                    ? "bg-blue-50 text-blue-600"
                    : new Date(shift.startTime) < new Date()
                    ? "bg-gray-100 text-gray-500"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                <p className="font-medium flex items-center gap-2">
                  {format(new Date(shift.startTime), "PPp")} -{" "}
                  {format(new Date(shift.endTime), "PPp")}
                  {isShiftCurrentOrIncoming(shift) && (
                    <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-light">
                      Currently working
                    </span>
                  )}
                  {new Date(shift.startTime) > new Date() && (
                    <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm font-light">
                      Upcoming shift
                    </span>
                  )}
                </p>
                {shift.notes && <p className="text-sm mt-1">{shift.notes}</p>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
