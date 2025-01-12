import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:vou/models/user_model.dart';
import 'package:flutter/foundation.dart';
import 'package:provider/provider.dart';


class UserService {
  final String apiUrl = 'https://1a14-115-74-192-50.ngrok-free.app/hello';

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
