import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:vou/models/event_model.dart';
import 'package:vou/models/user_model.dart';
import 'package:vou/screens/home.dart';
import 'package:vou/screens/register.dart';
import 'package:vou/screens/reset_password.dart';
import 'package:vou/services/user_service.dart';

class Login extends StatelessWidget {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final UserService userService = UserService();

  Login({super.key}); // Instance of UserService

  void _handleLogin(BuildContext context) async {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();

    if (email.isEmpty || password.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please fill in all fields'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    try {
      // Perform login using the UserService
      final loginResponse = await userService.loginUser(email, password);

      // Extract token and save it
      final prefs = await SharedPreferences.getInstance();
      prefs.setBool('isLoggedIn', true);
      prefs.setString('jwt_token', loginResponse['token']);

      // Fetch the user profile
      final userProfile = await userService.getUserProfile();

      // Create a User instance
      final user = User(
        id: userProfile['id'],
        username: userProfile['username'],
        email: userProfile['email'],
        role: userProfile['role'],
        partnerId: userProfile['partner_id'],
        isActive: userProfile['isActive'],
      );

      // Fetch events (replace this with a real API call)
      final List<Event> events = [
        Event(
          id: '1',
          title: 'Tech Festival 2025',
          description: 'Join our annual Tech Festival for exciting innovations and tech talks!',
          imageUrl: 'assets/images/tech_festival.png',
          startTime: DateTime(2025, 1, 20, 9, 0), // Jan 20, 2025, 9:00 AM
          endTime: DateTime(2025, 1, 20, 17, 0), // Jan 20, 2025, 5:00 PM
          totalPoint: 300,
        ),
        Event(
          id: '2',
          title: 'Cooking Masterclass',
          description: 'Learn to cook gourmet dishes with our top chefs!',
          imageUrl: 'assets/images/cooking_class.png',
          startTime: DateTime(2025, 1, 25, 14, 0), // Jan 25, 2025, 2:00 PM
          endTime: DateTime(2025, 1, 25, 16, 0), // Jan 25, 2025, 4:00 PM
          totalPoint: 200,
        ),
        Event(
          id: '3',
          title: 'Music Concert 2025',
          description: 'Experience live performances from your favorite artists!',
          imageUrl: 'assets/images/music_concert.png',
          startTime: DateTime(2025, 2, 5, 19, 0), // Feb 5, 2025, 7:00 PM
          endTime: DateTime(2025, 2, 5, 22, 0), // Feb 5, 2025, 10:00 PM
          totalPoint: 500,
        ),
      ];
      // Example method

      // Navigate to the home page
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => HomePage(user: user, event: events),
        ),
      );
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Login failed: $error'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.lightBlueAccent,
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            SizedBox(
              height: 400,
              child: Stack(
                children: <Widget>[
                  Positioned(
                    left: 30,
                    width: 80,
                    height: 200,
                    child: FadeInUp(
                      duration: const Duration(seconds: 1),
                      child: Container(
                        decoration: const BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage('assets/images/light-1.png'),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    left: 140,
                    width: 80,
                    height: 150,
                    child: FadeInUp(
                      duration: const Duration(milliseconds: 1200),
                      child: Container(
                        decoration: const BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage('assets/images/light-2.png'),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    right: 40,
                    top: 40,
                    width: 80,
                    height: 150,
                    child: FadeInUp(
                      duration: const Duration(milliseconds: 1300),
                      child: Container(
                        decoration: const BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage('assets/images/clock.png'),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    child: FadeInUp(
                      duration: const Duration(milliseconds: 1600),
                      child: Container(
                        margin: const EdgeInsets.only(top: 50),
                        child: const Center(
                          child: Text(
                            "Welcome to VOU \n\n          LOGIN",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 40,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(30.0),
              child: Column(
                children: <Widget>[
                  FadeInUp(
                    duration: const Duration(milliseconds: 1800),
                    child: Container(
                      padding: const EdgeInsets.all(5),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: const Color.fromRGBO(143, 148, 251, 1),
                        ),
                        boxShadow: const [
                          BoxShadow(
                            color: Color.fromRGBO(143, 148, 251, .2),
                            blurRadius: 20.0,
                            offset: Offset(0, 10),
                          )
                        ],
                      ),
                      child: Column(
                        children: <Widget>[
                          Container(
                            padding: const EdgeInsets.all(8.0),
                            decoration: const BoxDecoration(
                              border: Border(
                                bottom: BorderSide(
                                  color: Color.fromRGBO(143, 148, 251, 1),
                                ),
                              ),
                            ),
                            child: TextField(
                              controller: _emailController,
                              decoration: InputDecoration(
                                border: InputBorder.none,
                                hintText: "Email",
                                hintStyle: TextStyle(color: Colors.grey[700]),
                              ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.all(8.0),
                            child: TextField(
                              controller: _passwordController,
                              obscureText: true,
                              decoration: InputDecoration(
                                border: InputBorder.none,
                                hintText: "Password",
                                hintStyle: TextStyle(color: Colors.grey[700]),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 30),
                  FadeInUp(
                    duration: const Duration(milliseconds: 1900),
                    child: ElevatedButton(
                      //onPressed: () => _handleLogin(context),
                      onPressed: (){
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => HomePage(user: user, event: events),
                          ),
                        );
                      },
                      child: const Center(
                        child: Text(
                          "Login",
                          style: TextStyle(
                              color: Colors.black,
                              fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 70),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const ForgetPasswordPage(),
                        ),
                      );
                    },
                    child: const Text(
                      'Forget your password? Reset',
                      style: TextStyle(color: Colors.purple),
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => RegisterPage(),
                        ),
                      );
                    },
                    child: const Text(
                      'Don\'t have an account? Sign in',
                      style: TextStyle(color: Colors.purple),
                    ),
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


final user = User(id: 1, username: 'Viet', email: 'viet@example.com',role: 'user', partnerId: 0,isActive: true);

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