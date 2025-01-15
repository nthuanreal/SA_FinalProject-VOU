class User {
  final int id;
  final String username;
  final String email;
  final String role;
  final int partnerId;
  final bool isActive;

  User({
    required this.id,
    required this.username,
    required this.email,
    required this.role,
    required this.partnerId,
    required this.isActive,
  });

  // Factory to parse JSON
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      email: json['email'],
      role: json['role'],
      partnerId: json['partner_id'],
      isActive: json['isActive'],
    );
  }

  // Convert User to JSON (optional, if needed for requests)
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'email': email,
      'role': role,
      'partner_id': partnerId,
      'isActive': isActive,
    };
  }
}
