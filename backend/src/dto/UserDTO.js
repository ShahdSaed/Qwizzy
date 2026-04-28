class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.full_name = user.full_name;
    this.role = user.role;
    this.created_at = user.created_at;
  }

  static fromEntity(user) {
    if (!user) return null;
    return new UserDTO(user);
  }

  static fromEntityList(users) {
    return users.map(user => new UserDTO(user));
  }
}

module.exports = UserDTO;
