import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:vou/models/user_model.dart';
import 'package:vou/screens/login.dart';

class ProfilePage extends StatelessWidget {
  final User user;

  const ProfilePage({super.key, required this.user});

  // Method to handle logout
  Future<void> logout(BuildContext context) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('isLoggedIn');
    await prefs.remove('jwt_token'); // Remove the JWT token if stored

    // Navigate to Login Page
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => Login()),
          (route) => false, // Remove all previous routes
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.lightBlueAccent,
        title: const Text('Profile'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(height: 20),

            const SizedBox(height: 10),
            Text(
              user.username,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Text(
              user.email,
              style: const TextStyle(fontSize: 16, color: Colors.grey),
            ),
            const SizedBox(height: 20),
            Divider(thickness: 1, color: Colors.grey[300]),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ListTile(
                    leading: const Icon(Icons.account_circle, color: Colors.lightBlueAccent),
                    title: const Text('Edit Profile', style: TextStyle(fontSize: 18)),
                    trailing: const Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(context, '/editProfile');
                    },
                  ),
                  Divider(thickness: 1, color: Colors.grey[300]),
                  ListTile(
                    leading: const Icon(Icons.lock, color: Colors.lightBlueAccent),
                    title: const Text('Change Password', style: TextStyle(fontSize: 18)),
                    trailing: const Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(context, '/changePassword');
                    },
                  ),
                  Divider(thickness: 1, color: Colors.grey[300]),
                  ListTile(
                    leading: const Icon(Icons.history, color: Colors.lightBlueAccent),
                    title: const Text('Activity History', style: TextStyle(fontSize: 18)),
                    trailing: const Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(context, '/activityHistory');
                    },
                  ),
                  Divider(thickness: 1, color: Colors.grey[300]),
                  ListTile(
                    leading: const Icon(Icons.settings, color: Colors.lightBlueAccent),
                    title: const Text('Settings', style: TextStyle(fontSize: 18)),
                    trailing: const Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(context, '/settings');
                    },
                  ),
                  Divider(thickness: 1, color: Colors.grey[300]),
                  ListTile(
                    leading: const Icon(Icons.logout, color: Colors.redAccent),
                    title: const Text('Logout', style: TextStyle(fontSize: 18, color: Colors.redAccent)),
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: const Text('Logout'),
                          content: const Text('Are you sure you want to logout?'),
                          actions: [
                            TextButton(
                              child: const Text('Cancel'),
                              onPressed: () => Navigator.pop(context),
                            ),
                            TextButton(
                              child: const Text('Logout'),
                              onPressed: () async {
                                await logout(context);
                              },
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
