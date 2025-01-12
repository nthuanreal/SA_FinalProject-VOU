import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:vou/models/user_model.dart'; // Your User model file
import 'package:flutter/foundation.dart';

class UserService {
  final String apiUrl = 'https://api.com/users';

  Future<List<User>> fetchUsers() async {
    try {
      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        // Parse the JSON response
        final List<dynamic> data = json.decode(response.body);

        // Map the JSON to a list of User objects
        return data.map((userJson) => User.fromJson(userJson)).toList();
      } else {
        throw Exception('Failed to load users');
      }
    } catch (error) {
      throw Exception('Error fetching users: $error');
    }
  }
}

class UserProvider with ChangeNotifier {
  List<User> _users = [];

  List<User> get users => _users;

  void setUsers(List<User> users) {
    _users = users;
    notifyListeners();
  }
}