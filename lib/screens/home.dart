import 'package:flutter/material.dart';
import 'package:vou/models/event_model.dart';
import 'package:vou/screens/event.dart';
import 'package:vou/screens/event_detail.dart';
import 'package:vou/screens/profile.dart';
import 'package:vou/models/user_model.dart';

class HomePage extends StatelessWidget {
  final User user;
  final List<Event> event;
  HomePage(
      {
        required this.user,
        required this.event,
      });
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('VOU'),
        backgroundColor: Colors.lightBlueAccent,
        actions: [
          IconButton(
            icon: Icon(Icons.notifications),
            onPressed: () {
              // Navigate to Notifications page
              Navigator.pushNamed(context, '/notifications');
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Welcome Message
              Text(
                'Welcome Back,' + user.name,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 20),

              // Statistics Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => EventsPage()),
                      ); // Navigate to the voucher page
                    },
                    child: _buildStatCard('Voucher', '12', Colors.orange),
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => EventsPage()),
                      ); // Navigate to the event page
                    },
                    child: _buildStatCard('Event', '10', Colors.green),
                  ),
                ],
              ),
              SizedBox(height: 30),

              // Quick Actions
              Text(
                'Quick Actions',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildQuickAction(
                    icon: Icons.redeem,
                    label: 'Voucher',
                    onTap: () {
                      Navigator.pushNamed(context, '/voucher');
                    },
                  ),
                  _buildQuickAction(
                    icon: Icons.event,
                    label: 'Events',
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => EventsPage()), // Replace with your actual HomePage widget
                      );
                    },
                  ),
                ],
              ),
              SizedBox(height: 30),

              // Featured Section
              Text(
                'Event',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 10),
              Container(
                height: 150,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: 3, // Number of items in the list
                  itemBuilder: (context, index) {
                    return InkWell(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => EventDetailPage(event: event[index]),
                          ),
                        );
                      },
                      child: _buildEventCard("event[index].title", "event[index].imageUrl"),
                      //child: _buildEventCard(event[index].title, event[index].imageUrl),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],

        onTap: (index) {
          switch(index){
            case 2:
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => ProfilePage(user: user)), // Replace with your actual HomePage widget
              );
              break;
          }

          // Handle navigation based on index
        },
      ),
    );
  }



  Widget _buildStatCard(String title, String value, Color color) {
    return Container(
      width: 100,
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            value,
            style: TextStyle(
              color: color,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 5),
          Text(
            title,
            style: TextStyle(
              fontSize: 16,
              color: Colors.black87,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickAction({required IconData icon, required String label, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          CircleAvatar(
            radius: 30,
            backgroundColor: Colors.lightBlueAccent.withOpacity(0.2),
            child: Icon(icon, size: 30, color: Colors.lightBlueAccent),
          ),
          SizedBox(height: 5),
          Text(
            label,
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }

  Widget _buildEventCard(String title, String imagePath) {
    return Container(
      margin: EdgeInsets.only(right: 16),
      width: 200,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        image: DecorationImage(
          image: AssetImage(imagePath),
          fit: BoxFit.cover,
        ),
      ),
      child: Container(
        padding: EdgeInsets.all(16),
        alignment: Alignment.bottomLeft,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          gradient: LinearGradient(
            colors: [Colors.black.withOpacity(0.7), Colors.transparent],
            begin: Alignment.bottomCenter,
            end: Alignment.topCenter,
          ),
        ),
        child: Text(
          title,
          style: TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
