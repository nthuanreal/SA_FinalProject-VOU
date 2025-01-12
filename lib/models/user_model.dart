class User {
  final String id;
  final String name;
  final String email;
  final String avatarUrl;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.avatarUrl,
  });

  // Parse JSON into User model
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      //phoneNumber: json['phoneNumber'],
      avatarUrl: json['avatarUrl'],
    );
  }

  // Convert User model into JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      //'phoneNumber': phoneNumber,
      'avatarUrl': avatarUrl,
    };
  }
}



