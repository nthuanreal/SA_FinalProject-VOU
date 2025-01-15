import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class UserService {
  final String baseUrl = "https://user.tuan-anh-sd.software";

  // User registration
  Future<void> registerUser(String name, String email, String password) async {
    final url = Uri.parse('$baseUrl/auth/register');
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "username": name,
        "email": email,
        "password": password,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to register: ${response.body}');
    }
  }

  // User login
  Future<Map<String, dynamic>> loginUser(String email, String password) async {
    final url = Uri.parse('$baseUrl/auth/login');
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "email": email,
        "password": password,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);

      // Save JWT token in SharedPreferences
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('jwt_token', data['token']);

      return data;
    } else {
      throw Exception("Failed to login");
    }
  }

  // Get user profile
  Future<Map<String, dynamic>> getUserProfile() async {
    final url = Uri.parse('$baseUrl/user/profile');

    // Get the token from SharedPreferences
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('jwt_token');

    if (token == null) {
      throw Exception("User is not logged in");
    }

    final response = await http.get(
      url,
      headers: {
        "Authorization": "Bearer $token",
        "Content-Type": "application/json",
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to fetch user profile");
    }
  }

  // Logout user
  Future<void> logoutUser() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwt_token'); // Clear the stored token
  }


}
