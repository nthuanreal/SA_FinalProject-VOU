import 'package:flutter/material.dart';
import 'package:vou/models/event_model.dart';
import 'package:vou/screens/event.dart';
import 'package:vou/screens/event_detail.dart';
import 'package:vou/screens/home.dart';
import 'package:vou/screens/profile.dart';
import 'package:vou/screens/register.dart';
import 'package:vou/models/user_service.dart';
import 'package:provider/provider.dart';
import 'package:vou/screens/voucher_convert.dart';
import 'screens/login.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:vou/models/user_model.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized(); // Ensure async code runs before the app starts
  final isLoggedIn = await isUserLoggedIn();
  final User user = new User(id: "id", name: "name", email: "email", avatarUrl: "url");
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider()),
      ],
      child: MyApp(isLoggedIn: isLoggedIn, user: user,event: events,),
    ),
  );
}

Future<bool> isUserLoggedIn() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getBool('isLoggedIn') ?? false;
}

Future<void> logout() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.remove('isLoggedIn');
}


class MyApp extends StatelessWidget {
  final bool isLoggedIn;
  final User user;
  final List<Event> event;

  MyApp(
      {
        required this.isLoggedIn,
        required this.user,
        required this.event,
      });
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(fontFamily: 'Poppins'),
        //home: isLoggedIn ? HomePage(user: user,event: event,) : Login(),
        home: HomePage(user: user, event: event),
    );
  }
}
