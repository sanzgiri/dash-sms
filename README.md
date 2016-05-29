# dash-sms
Send an SMS when an Amazon Dash button is pressed

## Setup

```
$ npm install
```

Copy config.json.sampl to config.json and update with your info (button id, Twilio creds, message settings).

An easy way to find your dash-button id is to use Wireshark (https://www.wireshark.org/#download) which is a free download for Mac/Win. Lauch Wireshark, set filter to capture packets on "arp", select wifi for network, and click the Blue Shark icon to enable the filter when capturing packets. 

![Wireshark Filter](https://github.com/sanzgiri/dash-sms/blob/master/Wireshark_ARP_Filter.png)

Next you will see a window like one below. Click the Green Shark icon to start capturing packets, press your Amazon Dash button. You will see a line in the top pabe that has "AmazonTe..." in the Source colunm. Select it and in the pane below, you will see the MAC address of the Amazon Dash button in paranthesis, next to the AmazonTe_... Src, as shown below.

![Wireshark Trace](https://github.com/sanzgiri/dash-sms/blob/master/Wiresharp_ARP_Trace.png)

Alternately, you can follow the [node-dash-button](https://github.com/hortinstein/node-dash-button) instructions to find your dash-button id.

Once configuration is done, you can run dash-sms using:

```
$ sudo node index.js
```

Or install it globally and run

```
$ cd /path/to/dash-sms
$ sudo npm install . -g
$ sudo dash-sms
```

Press your dash button and you should receive an SMS on the phone you set up.

## Acknowledgements

Edward Bensen (for his article on Medium that inspired this), Alex Hortin (for his node-dash-button module), Dan Nawara (for his dashgong app, from which I borrowed heavily)

