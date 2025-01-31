class Event {
  final String id;
  final String title;
  final String description;
  final String imageUrl;
  final DateTime startTime;
  final DateTime endTime;
  int totalPoint;
//  final List<bool> game;
  Event({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.startTime,
    required this.endTime,
    required this.totalPoint,
//    required this.game,
  });

  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      imageUrl: json['imageUrl'],
      startTime: DateTime.parse(json['startTime']),
      endTime: DateTime.parse(json['endTime']),
      totalPoint: json['totalPoint'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'imageUrl': imageUrl,
      'startTime': startTime.toIso8601String(),
      'endTime': endTime.toIso8601String(),
      'totalPoint':totalPoint,
    };
  }
  void deductPoints(int points) {
    totalPoint -= points;
    if (totalPoint < 0) totalPoint = 0; // Ensure no negative points
  }
}
