class Voucher {
  final String id;
  final String title;
  final String description;
  final String code;
  final DateTime expirationDate;

  Voucher({
    required this.id,
    required this.title,
    required this.description,
    required this.code,
    required this.expirationDate,
  });

  factory Voucher.fromJson(Map<String, dynamic> json) {
    return Voucher(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      code: json['code'],
      expirationDate: DateTime.parse(json['expirationDate']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'code': code,
      'expirationDate': expirationDate.toIso8601String(),
    };
  }
}
