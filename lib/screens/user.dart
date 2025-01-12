import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vou/models/user_service.dart';


class UserPage extends StatefulWidget {
  @override
  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  final UserService userService = UserService();

  @override
  void initState() {
    super.initState();
    fetchAndSetUsers();
  }

  Future<void> fetchAndSetUsers() async {
    try {
      final users = await userService.fetchUsers();
      Provider.of<UserProvider>(context, listen: false).setUsers(users);
    } catch (error) {
      print('Error fetching users: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    final users = Provider.of<UserProvider>(context).users;

    return Scaffold(
      appBar: AppBar(title: Text('Users')),
      body: ListView.builder(
        itemCount: users.length,
        itemBuilder: (ctx, index) {
          return ListTile(
            title: Text(users[index].name),
            subtitle: Text(users[index].email),
            leading: CircleAvatar(
              backgroundImage: NetworkImage(users[index].avatarUrl),
            ),
          );
        },
      ),
    );
  }
}
