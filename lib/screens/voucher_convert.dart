import 'package:flutter/material.dart';

class ConvertPointsPage extends StatefulWidget {
  final int point;
  ConvertPointsPage({required this.point});

  @override
  _ConvertPointsPageState createState() => _ConvertPointsPageState();
}

class _ConvertPointsPageState extends State<ConvertPointsPage> {
  int point = 100; // Example user points
  int voucherValue = 10; // Points required per voucher
  int vouchersToRedeem = 0;

  void convertPointsToVoucher() {
    if (vouchersToRedeem * voucherValue <= point && vouchersToRedeem > 0) {
      setState(() {
        point -= vouchersToRedeem * voucherValue;
        vouchersToRedeem = 0;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Successfully redeemed vouchers!'),
          backgroundColor: Colors.green,
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Insufficient points or invalid input!'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Convert Points to Voucher'),
        backgroundColor: Colors.lightBlueAccent,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Your Points: $point',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Text(
              'Points per Voucher: $voucherValue',
              style: TextStyle(fontSize: 16, color: Colors.grey[700]),
            ),
            SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  icon: Icon(Icons.remove_circle, color: Colors.redAccent),
                  onPressed: () {
                    if (vouchersToRedeem > 0) {
                      setState(() {
                        vouchersToRedeem--;
                      });
                    }
                  },
                ),
                Text(
                  '$vouchersToRedeem',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: Icon(Icons.add_circle, color: Colors.greenAccent),
                  onPressed: () {
                    if ((vouchersToRedeem + 1) * voucherValue <= point) {
                      setState(() {
                        vouchersToRedeem++;
                      });
                    }
                  },
                ),
              ],
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: convertPointsToVoucher,
              child: Text('Convert to Voucher'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.lightBlueAccent,
                padding: EdgeInsets.symmetric(horizontal: 32, vertical: 12),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
