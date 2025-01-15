import 'package:flutter/foundation.dart';
import 'event_model.dart';

class EventProvider with ChangeNotifier {
  List<Event> _events = [
    Event(
      id: '1',
      title: 'Event 1',
      description: 'Join our exciting event 1!',
      imageUrl: 'assets/images/event1.png',
      startTime: DateTime.now(),
      endTime: DateTime.now().add(const Duration(hours: 2)),
      totalPoint: 100,
    ),
    Event(
      id: '2',
      title: 'Event 2',
      description: 'Don’t miss out on event 2!',
      imageUrl: 'assets/images/event2.png',
      startTime: DateTime.now(),
      endTime: DateTime.now().add(const Duration(hours: 2)),
      totalPoint: 150,
    ),
    Event(
      id: '3',
      title: 'Event 3',
      description: 'Experience the fun in event 3!',
      imageUrl: 'assets/images/event3.png',
      startTime: DateTime.now(),
      endTime: DateTime.now().add(const Duration(hours: 2)),
      totalPoint: 200,
    ),
  ];

  List<Event> get events => _events;

  void setEvents(List<Event> events) {
    _events = events;
    notifyListeners();
  }

  void deductEventPoints(String eventId, int points) {
    final event = _events.firstWhere((event) => event.id == eventId);
    event.deductPoints(points);
    notifyListeners();
  }
}
