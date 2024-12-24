export const PERMISSIONS = {
  CREATE_USER: 'create:user',
  READ_USER: 'read:user',
  UPDATE_USER: 'update:user',
  DELETE_USER: 'delete:user',
  CREATE_ROLE: 'create:role',
  READ_ROLE: 'read:role',
  UPDATE_ROLE: 'update:role',
  DELETE_ROLE: 'delete:role',
  CREATE_PERMISSION: 'create:permission',
  READ_PERMISSION: 'read:permission',
  UPDATE_PERMISSION: 'update:permission',
  DELETE_PERMISSION: 'delete:permission',
  CREATE_ORGANIZATION: 'create:organization',
  READ_ORGANIZATION: 'read:organization',
  UPDATE_ORGANIZATION: 'update:organization',
  DELETE_ORGANIZATION: 'delete:organization',
  CREATE_HOTEL: 'create:hotel',
  READ_HOTEL: 'read:hotel',
  UPDATE_HOTEL: 'update:hotel',
  DELETE_HOTEL: 'delete:hotel',
  CREATE_SHIFT: 'create:shift',
  READ_SHIFT: 'read:shift',
  UPDATE_SHIFT: 'update:shift',
  DELETE_SHIFT: 'delete:shift',
  CREATE_MAINTENANCE_REQUEST: 'create:maintenance_request',
  READ_MAINTENANCE_REQUEST: 'read:maintenance_request',
  UPDATE_MAINTENANCE_REQUEST: 'update:maintenance_request',
  DELETE_MAINTENANCE_REQUEST: 'delete:maintenance_request',
  CREATE_ROOM: 'create:room',
  READ_ROOM: 'read:room',
  UPDATE_ROOM: 'update:room',
  DELETE_ROOM: 'delete:room',
} as const;

export type PermissionType = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const PERMISSIONS_LIST = [
  {
    permission: PERMISSIONS.CREATE_USER,
    label: 'Create User',
    description: 'Allow users with this permission to create new users.',
  },
  {
    permission: PERMISSIONS.READ_USER,
    label: 'Read User',
    description: 'Allow users with this permission to view user information.',
  },
  {
    permission: PERMISSIONS.UPDATE_USER,
    label: 'Update User',
    description: 'Allow users with this permission to edit user information.',
  },
  {
    permission: PERMISSIONS.DELETE_USER,
    label: 'Delete User',
    description: 'Allow users with this permission to delete users.',
  },
  {
    permission: PERMISSIONS.CREATE_ROLE,
    label: 'Create Role',
    description: 'Allow users with this permission to create new roles.',
  },
  {
    permission: PERMISSIONS.READ_ROLE,
    label: 'Read Role',
    description: 'Allow users with this permission to view role information.',
  },
  {
    permission: PERMISSIONS.UPDATE_ROLE,
    label: 'Update Role',
    description: 'Allow users with this permission to edit role information.',
  },
  {
    permission: PERMISSIONS.DELETE_ROLE,
    label: 'Delete Role',
    description: 'Allow users with this permission to delete roles.',
  },
  {
    permission: PERMISSIONS.CREATE_PERMISSION,
    label: 'Create Permission',
    description: 'Allow users with this permission to create new permissions.',
  },
  {
    permission: PERMISSIONS.READ_PERMISSION,
    label: 'Read Permission',
    description:
      'Allow users with this permission to view permission information.',
  },
  {
    permission: PERMISSIONS.UPDATE_PERMISSION,
    label: 'Update Permission',
    description:
      'Allow users with this permission to edit permission information.',
  },
  {
    permission: PERMISSIONS.DELETE_PERMISSION,
    label: 'Delete Permission',
    description: 'Allow users with this permission to delete permissions.',
  },
  {
    permission: PERMISSIONS.CREATE_ORGANIZATION,
    label: 'Create Organization',
    description:
      'Allow users with this permission to create new organizations.',
  },
  {
    permission: PERMISSIONS.READ_ORGANIZATION,
    label: 'Read Organization',
    description:
      'Allow users with this permission to view organization information.',
  },
  {
    permission: PERMISSIONS.UPDATE_ORGANIZATION,
    label: 'Update Organization',
    description:
      'Allow users with this permission to edit organization information.',
  },
  {
    permission: PERMISSIONS.DELETE_ORGANIZATION,
    label: 'Delete Organization',
    description: 'Allow users with this permission to delete organizations.',
  },
  {
    permission: PERMISSIONS.CREATE_HOTEL,
    label: 'Create Hotel',
    description: 'Allow users with this permission to create new hotels.',
  },
  {
    permission: PERMISSIONS.READ_HOTEL,
    label: 'Read Hotel',
    description: 'Allow users with this permission to view hotel information.',
  },
  {
    permission: PERMISSIONS.UPDATE_HOTEL,
    label: 'Update Hotel',
    description: 'Allow users with this permission to edit hotel information.',
  },
  {
    permission: PERMISSIONS.DELETE_HOTEL,
    label: 'Delete Hotel',
    description: 'Allow users with this permission to delete hotels.',
  },
  {
    permission: PERMISSIONS.CREATE_SHIFT,
    label: 'Create Shift',
    description: 'Allow users with this permission to create new shifts.',
  },
  {
    permission: PERMISSIONS.READ_SHIFT,
    label: 'Read Shift',
    description: 'Allow users with this permission to view shift information.',
  },
  {
    permission: PERMISSIONS.UPDATE_SHIFT,
    label: 'Update Shift',
    description: 'Allow users with this permission to edit shift information.',
  },
  {
    permission: PERMISSIONS.DELETE_SHIFT,
    label: 'Delete Shift',
    description: 'Allow users with this permission to delete shifts.',
  },
  {
    permission: PERMISSIONS.CREATE_MAINTENANCE_REQUEST,
    label: 'Create Maintenance Request',
    description:
      'Allow users with this permission to create new maintenance requests.',
  },
  {
    permission: PERMISSIONS.READ_MAINTENANCE_REQUEST,
    label: 'Read Maintenance Request',
    description:
      'Allow users with this permission to view maintenance request information.',
  },
  {
    permission: PERMISSIONS.UPDATE_MAINTENANCE_REQUEST,
    label: 'Update Maintenance Request',
    description:
      'Allow users with this permission to edit maintenance request information.',
  },
  {
    permission: PERMISSIONS.DELETE_MAINTENANCE_REQUEST,
    label: 'Delete Maintenance Request',
    description:
      'Allow users with this permission to delete maintenance requests.',
  },
  {
    permission: PERMISSIONS.CREATE_ROOM,
    label: 'Create Room',
    description: 'Allow users with this permission to create new rooms.',
  },
  {
    permission: PERMISSIONS.READ_ROOM,
    label: 'Read Room',
    description: 'Allow users with this permission to view room information.',
  },
  {
    permission: PERMISSIONS.UPDATE_ROOM,
    label: 'Update Room',
    description: 'Allow users with this permission to edit room information.',
  },
  {
    permission: PERMISSIONS.DELETE_ROOM,
    label: 'Delete Room',
    description: 'Allow users with this permission to delete rooms.',
  },
];
