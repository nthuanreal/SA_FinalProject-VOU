import 'package:flutter/material.dart';
import 'package:vou/models/event_model.dart';
import 'package:vou/screens/event_detail.dart';

class EventsPage extends StatelessWidget {
  const EventsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.lightBlueAccent,
        title: const Text('Available Events'),
        centerTitle: true,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: events.length,
        itemBuilder: (context, index) {
          return Card(
            margin: const EdgeInsets.symmetric(vertical: 10.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
            ),
            child: ListTile(
              contentPadding: const EdgeInsets.all(16.0),
              leading: CircleAvatar(
                backgroundImage: AssetImage(events[index].imageUrl),
                radius: 30.0,
              ),
              title: Text(
                events[index].title,
                style: const TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(events[index].description),
              trailing: const Icon(Icons.arrow_forward_ios, color: Colors.lightBlueAccent),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => EventDetailPage(event: events[index]),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}

List<Event> getEvent(){
  List<Event> list = [];

  //Handle get event form API

  return list;
}
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
