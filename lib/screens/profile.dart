import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:vou/models/user_model.dart';
import 'package:vou/screens/login.dart';


Future<void> logout() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.remove('isLoggedIn');
}

class ProfilePage extends StatelessWidget {
  final User user;
  ProfilePage({required this.user});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.lightBlueAccent,
        title: Text('Profile'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(height: 20),
            CircleAvatar(
              radius: 60,
              backgroundImage: AssetImage('assets/images/avatar_placeholder.png'),
            ),
            SizedBox(height: 10),
            Text(
              user.name,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Text(
              user.email,
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            SizedBox(height: 20),
            Divider(thickness: 1, color: Colors.grey[300]),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ListTile(
                    leading: Icon(Icons.account_circle, color: Colors.lightBlueAccent),
                    title: Text('Edit Profile', style: TextStyle(fontSize: 18)),
                    trailing: Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(context, '/editProfile');
                    },
                  ),
                  Divider(thickness: 1, color: Colors.grey[300]),
                  ListTile(
                    leading: Icon(Icons.lock, color: Colors.lightBlueAccent),
                    title: Text('Change Password', style: TextStyle(fontSize: 18)),
                    trailing: Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(context, '/changePassword');
                    },
                  ),
                  Divider(thickness: 1, color: Colors.grey[300]),
                  ListTile(
                    leading: Icon(Icons.history, color: Colors.lightBlueAccent),
                    title: Text('Activity History', style: TextStyle(fontSize: 18)),
                    trailing: Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(context, '/activityHistory');
                    },
                  ),
                  Divider(thickness: 1, color: Colors.grey[300]),
                  ListTile(
                    leading: Icon(Icons.settings, color: Colors.lightBlueAccent),
                    title: Text('Settings', style: TextStyle(fontSize: 18)),
                    trailing: Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.pushNamed(context, '/settings');
                    },
                  ),
                  Divider(thickness: 1, color: Colors.grey[300]),
                  ListTile(
                    leading: Icon(Icons.logout, color: Colors.redAccent),
                    title: Text('Logout', style: TextStyle(fontSize: 18, color: Colors.redAccent)),
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: Text('Logout'),
                          content: Text('Are you sure you want to logout?'),
                          actions: [
                            TextButton(
                              child: Text('Cancel'),
                              onPressed: () => Navigator.pop(context),
                            ),
                            TextButton(
                              child: Text('Logout'),
                              onPressed: () async {
                                await logout();
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) => Login()),
                                );
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
