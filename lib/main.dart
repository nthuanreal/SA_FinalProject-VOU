import 'package:flutter/material.dart';
import 'package:vou/screens/event.dart';
import 'package:vou/screens/event_detail.dart';
import 'package:vou/screens/home.dart';
import 'package:vou/screens/profile.dart';
import 'package:vou/screens/register.dart';
import 'package:vou/models/user_service.dart';
import 'package:provider/provider.dart';
import 'screens/login.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(fontFamily: 'Poppins'),
        home: HomePage()
        //home: EventDetailPage(title: "title", description: "description", imageUrl: "imageUrl", startTime: DateTime.now(), endTime: DateTime.now(), point: 300)
    );
  }
}
