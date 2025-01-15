import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:vou/models/event_model.dart';
import 'package:vou/models/event_provider.dart';
import 'package:vou/models/user_model.dart';
import 'package:vou/screens/home.dart';
import 'package:vou/screens/login.dart';
import 'package:vou/services/socket_service.dart';
import 'package:http/http.dart' as http;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize the socket service.
  final socketService = SocketService();
  socketService.connect();

  // Get the logged-in user information.
  final user = User(id: 1, username: 'Viet', email: 'Viet@example.com',role: 'user', partnerId: 0,isActive: true);
  final isLoggedIn = user != null;

  // Fetch events (use EventProvider for dynamic updates).
  final List<Event> events = [
    Event(
      id: '1',
      title: 'Tech Festival 2025',
      description: 'Join our annual Tech Festival for exciting innovations and tech talks!',
      imageUrl: 'assets/images/tech_festival.png',
      startTime: DateTime(2025, 1, 20, 9, 0), // Jan 20, 2025, 9:00 AM
      endTime: DateTime(2025, 1, 20, 17, 0), // Jan 20, 2025, 5:00 PM
      totalPoint: 100,
    ),
    Event(
      id: '2',
      title: 'Cooking Masterclass',
      description: 'Learn to cook gourmet dishes with our top chefs!',
      imageUrl: 'assets/images/cooking_class.png',
      startTime: DateTime(2025, 1, 25, 14, 0), // Jan 25, 2025, 2:00 PM
      endTime: DateTime(2025, 1, 25, 16, 0), // Jan 25, 2025, 4:00 PM
      totalPoint: 150,
    ),
    Event(
      id: '3',
      title: 'Music Concert 2025',
      description: 'Experience live performances from your favorite artists!',
      imageUrl: 'assets/images/music_concert.png',
      startTime: DateTime(2025, 2, 5, 19, 0), // Feb 5, 2025, 7:00 PM
      endTime: DateTime(2025, 2, 5, 22, 0), // Feb 5, 2025, 10:00 PM
      totalPoint: 200,
    ),
  ];


  //if (isLoggedIn) {
  //  events = await fetchEvents();
  //}

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => EventProvider()),
        Provider<SocketService>(create: (_) => socketService), // Provide the socket service.
      ],
      child: MyApp(isLoggedIn: isLoggedIn, user: user, events: events),
    ),
  );
}

Future<User?> getLoggedInUser() async {
  final prefs = await SharedPreferences.getInstance();
  final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;

  if (!isLoggedIn) return null;

  final id = prefs.getString('user_id');
  final username = prefs.getString('user_name');
  final email = prefs.getString('user_email');
  final role = prefs.getString('user_role') ?? 'user';
  final partnerId = prefs.getInt('partner_id') ?? 0;
  final isActive = prefs.getBool('isActive') ?? false;

  if (id != null && username != null && email != null) {
    return User(
      id: int.parse(id),
      username: username,
      email: email,
      role: role,
      partnerId: partnerId,
      isActive: isActive,
    );
  }
  return null;
}

// Function to fetch events from the backend API.
Future<List<Event>> fetchEvents() async {
  final url = Uri.parse('http://localhost:5000/events'); // Replace with your backend URL
  final response = await http.get(url);

  if (response.statusCode == 200) {
    final List<dynamic> data = json.decode(response.body);
    return data.map((eventJson) => Event.fromJson(eventJson)).toList();
  } else {
    throw Exception('Failed to fetch events');
  }
}

class MyApp extends StatelessWidget {
  final bool isLoggedIn;
  final User? user;
  final List<Event> events;

  const MyApp({super.key, required this.isLoggedIn, this.user, required this.events});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Poppins',
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
          home: Login(),
      //home: EventsPage(),

    );
  }
}
