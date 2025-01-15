import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vou/models/event_provider.dart';

import '../models/event_model.dart';

class VoucherConvertPage extends StatefulWidget {
  final Event event;

  const VoucherConvertPage({super.key, required this.event});

  @override
  _VoucherConvertPageState createState() => _VoucherConvertPageState();
}

class _VoucherConvertPageState extends State<VoucherConvertPage> {
  final _pointsController = TextEditingController();
  String _message = '';
  int vouchersToRedeem = 0;
  final int voucherValue = 10;

  @override
  void dispose() {
    _pointsController.dispose();
    super.dispose();
  }

  void _convertPoints() {
    final eventProvider = Provider.of<EventProvider>(context, listen: false);
    final event = eventProvider.events.firstWhere((e) => e.id == widget.event.id);

    if (vouchersToRedeem <= 0 || vouchersToRedeem * voucherValue > event.totalPoint) {
      setState(() {
        _message = 'Invalid input or insufficient points.';
      });
      return;
    }

    // Deduct points and update the provider
    eventProvider.deductEventPoints(widget.event.id, vouchersToRedeem * voucherValue);

    setState(() {
      _message = 'Successfully redeemed $vouchersToRedeem voucher(s)!';
      vouchersToRedeem = 0; // Reset vouchers to redeem
    });
  }

  @override
  Widget build(BuildContext context) {
    final eventProvider = Provider.of<EventProvider>(context, listen: true);
    final event = eventProvider.events.firstWhere((e) => e.id == widget.event.id);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Convert Points to Voucher'),
        backgroundColor: Colors.lightBlueAccent,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Event: ${event.title}',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Text(
              'Available Points: ${event.totalPoint}',
              style: TextStyle(fontSize: 16, color: Colors.grey[700]),
            ),
            const SizedBox(height: 20),
            Text(
              'Points per Voucher: $voucherValue',
              style: TextStyle(fontSize: 16, color: Colors.grey[700]),
            ),
            const SizedBox(height: 20),
            Text(
              'Enter number of voucher to convert',
              style: TextStyle(fontSize: 16, color: Colors.grey[700]),
            ),

            const SizedBox(height: 60),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  iconSize: 40,
                  icon: const Icon(Icons.remove_circle, color: Colors.redAccent),
                  onPressed: () {
                    setState(() {
                      if (vouchersToRedeem > 0) vouchersToRedeem--;
                    });
                  },
                ),
                const SizedBox(width: 20),
                Text(
                  '$vouchersToRedeem',
                  style: const TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
                ),
                const SizedBox(width: 20),
                IconButton(
                  iconSize: 40,
                  icon: const Icon(Icons.add_circle, color: Colors.greenAccent),
                  onPressed: () {
                    setState(() {
                      if ((vouchersToRedeem + 1) * voucherValue <= event.totalPoint) {
                        vouchersToRedeem++;
                      }
                    });
                  },
                ),
              ],
            ),
            const SizedBox(height: 60),
            ElevatedButton(
              onPressed: _convertPoints,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.lightBlueAccent,
              ),
              child: const Text('Convert Points'),
            ),
            const SizedBox(height: 20),
            Text(
              _message,
              style: const TextStyle(fontSize: 16, color: Colors.red),
            ),
          ],
        ),
      ),
    );
  }
}
