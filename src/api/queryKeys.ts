export const queryKeys = {
  trainers:   { all: ['trainers']   as const },
  branches:   { all: ['branches']   as const },
  tenants:    { all: ['tenants']    as const },
  members:    { all: ['members']    as const },
  leads:      { all: ['leads']      as const },
  exercises:  { all: ['exercises']  as const },
  workouts:   { all: ['workouts']   as const },
  plans:      { all: ['plans']      as const },
  automation:    { all: ['automation']    as const },
  moduleAccess:  {
    byRole:   (tenantId: number, roleId: number) => ['module-access', tenantId, roleId] as const,
    matrix:   (tenantId: number)                 => ['module-access-matrix', tenantId]  as const,
    modules:  ()                                 => ['module-access-modules']            as const,
  },
};
