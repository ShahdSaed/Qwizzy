const fromEntity = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    created_at: user.created_at,
  };
};

const fromEntityList = (users) => {
  if (!users) return [];
  return users.map((user) => fromEntity(user));
};

module.exports = {
  fromEntity,
  fromEntityList,
};

