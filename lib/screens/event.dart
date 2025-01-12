import 'package:flutter/material.dart';
import 'package:vou/models/event_model.dart';
import 'package:vou/screens/event_detail.dart';

class EventsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.lightBlueAccent,
        title: Text('Available Events'),
        centerTitle: true,
      ),
      body: ListView.builder(
        padding: EdgeInsets.all(16.0),
        itemCount: events.length,
        itemBuilder: (context, index) {
          return Card(
            margin: EdgeInsets.symmetric(vertical: 10.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
            ),
            child: ListTile(
              contentPadding: EdgeInsets.all(16.0),
              leading: CircleAvatar(
                backgroundImage: AssetImage(events[index].imageUrl),
                radius: 30.0,
              ),
              title: Text(
                events[index].title,
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(events[index].description),
              trailing: Icon(Icons.arrow_forward_ios, color: Colors.lightBlueAccent),
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
    title: 'Event 1',
    description: 'Join our exciting event 1!',
    imageUrl: 'assets/images/event1.png',
    startTime: DateTime.now(),
    endTime: DateTime.now().add(Duration(hours: 2)),
    totalPoint: 100,
  ),
  Event(
    id: '2',
    title: 'Event 2',
    description: 'Don’t miss out on event 2!',
    imageUrl: 'assets/images/event2.png',
    startTime: DateTime.now(),
    endTime: DateTime.now().add(Duration(hours: 2)),
    totalPoint: 150,
  ),
  Event(
    id: '3',
    title: 'Event 3',
    description: 'Experience the fun in event 3!',
    imageUrl: 'assets/images/event3.png',
    startTime: DateTime.now(),
    endTime: DateTime.now().add(Duration(hours: 2)),
    totalPoint: 200,
  ),
];
